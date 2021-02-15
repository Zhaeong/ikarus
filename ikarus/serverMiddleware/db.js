import { response } from "./rest";

const { Pool, Client } = require("pg");

const createFireDBquery = `
  CREATE TABLE IF NOT EXISTS fire (
    id serial PRIMARY KEY,
    title varchar, 
    content varchar,
    created TIMESTAMP NOT NULL DEFAULT NOW(), 
    modified TIMESTAMP NOT NULL DEFAULT NOW());
`;
const createStaticsDBquery = `
  CREATE TABLE IF NOT EXISTS statics (
    id serial PRIMARY KEY,
    title varchar, 
    content varchar,
    created TIMESTAMP NOT NULL DEFAULT NOW(), 
    modified TIMESTAMP NOT NULL DEFAULT NOW());
   `;

const insertFireQuery = "INSERT INTO fire(title, content) VALUES($1, $2)";
const editFireQuery = "UPDATE fire SET title = $1, content = $2 WHERE id = $3";
const deleteFireQuery = "DELETE FROM fire WHERE id = $1";

const selectFireQuery = `
SELECT id, title, content, created 
FROM public.fire
ORDER BY id ASC `;

const opts = {
  max: 3, // maximum size of the pool
  min: 1 // minimum size of the pool
};

const pool = new Pool({
  user: "wooduqmm",
  host: "ziggy.db.elephantsql.com",
  database: "wooduqmm",
  password: "V_Fzp8pzrdwC8EKKy7-HqgaMIPbc4YsB",
  port: 5432,
  opts
});

export default {
  tester: "aaaa",
  sendQuery: async function(inputQuery) {
    response = await pool.query(inputQuery).catch(e => {
      console.log("PROMISE_ERROR", e);
    });
    return response.rows;
  },
  insertFire: async function(title, content) {
    var input = [title, content];
    response = await pool.query(insertFireQuery, input).catch(e => {
      console.log("PROMISE_ERROR_INSERT_FIRE", e);
      return "FAIL";
    });

    //    return "SUCCESS";
    console.log("fromDB", response.rowCount);

    return response.rowCount;
  },
  selectFire: async function() {
    response = await pool.query(selectFireQuery).catch(e => {
      console.log("PROMISE_ERROR_INSERT_FIRE", e);
      return "FAIL";
    });

    return response.rows;
  },
  editFire: async function(id, title, content) {
    var input = [title, content, id];
    response = await pool.query(editFireQuery, input).catch(e => {
      console.log("PROMISE_ERROR_EDIT_FIRE", e);
      return "FAIL";
    });

    //    return "SUCCESS";
    console.log("fromDB", response.rowCount);

    return response.rowCount;
  },
  deleteFire: async function(id) {
    var input = [id];
    response = await pool.query(deleteFireQuery, input).catch(e => {
      console.log("PROMISE_ERROR_DELETE_FIRE", e);
      return "FAIL";
    });

    return response.rowCount;
  }
};
