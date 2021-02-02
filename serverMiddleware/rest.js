const bodyParser = require("body-parser");
const app = require("express")();

/*
postgres://wooduqmm:V_Fzp8pzrdwC8EKKy7-HqgaMIPbc4YsB@ziggy.db.elephantsql.com:5432/wooduqmm
*/

const { Pool, Client } = require("pg");

const createFireDBquery = `
  CREATE TABLE IF NOT EXISTS fire (
    id serial PRIMARY KEY,
    title varchar, 
    content varchar,
    created TIMESTAMP NOT NULL,
    modified TIMESTAMP NOT NULL);
`;

const pool = new Pool({
  user: "wooduqmm",
  host: "ziggy.db.elephantsql.com",
  database: "wooduqmm",
  password: "V_Fzp8pzrdwC8EKKy7-HqgaMIPbc4YsB",
  port: 5432
});

app.get("/", (req, res) => {
  res.send("asfdsfsdfs");
});
app.get("/title", (req, res) => {
  console.log("in titlie");
  pool.query(createFireDBquery, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Yaaa:", result);
    pool.end();
    res.send("susuusuusus");
  });
});

module.exports = app;
