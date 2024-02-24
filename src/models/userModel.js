const pool = require("../db/db");

const getUsers = async () => {
  const client = await pool.connect();
  try {
    const results = await client.query("SELECT * FROM users");
    return results.rows;
  } finally {
    client.release();
  }
};

module.exports = { getUsers };
