import sqlite3 from "sqlite3";
import { setUp,createProject,createRecipient } from "../sqlfuncs.js";

function connected(err) {
  if (err) {
    console.log(err.message);
    return;
  } else {
    console.log("Sqlite Query success");
  }
}
const sql3 =  sqlite3.verbose()
const database =new sql3.Database("./testdata.db", connected);
await setUp(database)
await createProject(database, "Proj1");
await createRecipient(database, "DeptA@gmail.com");

