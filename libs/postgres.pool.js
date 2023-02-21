const { Pool } = require("pg");

const connectionPool = new Pool({
    host: "localhost",
    port: 5432,
    user: "vmiguel",
    password: "admin",
    database: "vmiguel"
});

module.exports = connectionPool;