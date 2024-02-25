const pool = require("../db/db");
const fs = require("fs");
const path = require("path");
const dirCreator = require("../../dirCreator");

const directory = dirCreator();

const uploadController = (req, res) => {
  // Get file data from request
  const fileData = req.file.buffer;
  const { originalname, mimetype, size } = req.file;

  // Store file in PostgreSQL database
  pool.connect((err, client, done) => {
    if (err) {
      console.error("Error fetching client from pool", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      // Insert file metadata and data into database
      const query =
        "INSERT INTO files (filename, mime_type, size, data) VALUES ($1, $2, $3, $4)";
      const values = [originalname, mimetype, size, fileData];
      console.log(originalname);
      client.query(query, values, (err, result) => {
        done();
        if (err) {
          console.error("Error executing query", err);
          res.status(500).json({ error: "Internal server error" });
        } else {
          res.status(201).json({
            message: "File uploaded successfully",
            name: originalname
          });
        }
      });
    }
  });
};

const getFile = (req, res) => {
  // Query the database to check if the file exists
  const name = req.query.name;
  pool.query(
    "SELECT * FROM files WHERE filename = $1",
    [name],
    (err, result) => {
      if (err) {
        console.error("Error executing query", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (result.rows.length > 0) {
          const filePath = path.join(directory, result.rows[0].filename);
          console.log("File exists in the database:", result.rows[0]);

          const fileData = result.rows[0].data;
          fs.writeFile(filePath, fileData, (err) => {
            if (err) {
              console.error("Error saving file to local folder", err);
            } else {
              console.log("File saved to local folder:", filePath);
            }
          });
          res.status(200).json({ message: result.rows[0] });
        } else {
          console.log("File does not exist in the database");
          res.status(200).json({ message: "file not available" });
        }
      }
    }
  );
};

module.exports = { uploadController, getFile };
