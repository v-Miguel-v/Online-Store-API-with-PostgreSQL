const { Client } = require("pg");

async function getConnection() {
    const client = new Client({
        host: "localhost",
        port: 5432,
        user: "vmiguel",
        password: "admin",
        database: "vmiguel"
    });
    await client.connect();
    return client;
}

module.exports = getConnection;