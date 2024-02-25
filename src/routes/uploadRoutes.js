const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  uploadController,
  getFile
} = require("../controllers/uploadController");

// Set up multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), uploadController);
router.get("/get_file", getFile);

module.exports = router;
