const { Pool } = require("pg");

const pool = new Pool({
    user: "ramsingh",
    host: "localhost",
    database: "mynodeapp",
    password: "12345",
    port: 5432
})

module.exports = pool