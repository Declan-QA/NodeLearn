import sqlite3 from "sqlite3";
import * as sqlfuncs from "./sqlfuncs.js";

function connected(err) {
  if (err) {
    console.log(err.message);
    return;
  } else {
    console.log("Sqlite Query success");
  }
}
const sql3 = sqlite3.verbose();
let database = new sql3.Database("./mydata.db", connected);

export async function setUp(DB) {
  await DB.exec("PRAGMA foreign_keys = ON;");

  await DB.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );
  `);

  await DB.run(`
    CREATE TABLE IF NOT EXISTS receivers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE
    );
  `);

  await DB.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT UNIQUE,
      date_of_birth DATE,
      email TEXT UNIQUE,
      username TEXT UNIQUE,
      password TEXT,
      job_title TEXT,
      receiver_id INTEGER,
      project_id INTEGER,
      FOREIGN KEY (project_id) REFERENCES projects(id),
      FOREIGN KEY (receiver_id) REFERENCES receivers(id)
      
      );
  `);

}

export async function checkPrev(database, project_name, recipient_email) {
  const foundName = await sqlfuncs.checkProjectname(database, project_name);
  const foundEmail = await sqlfuncs.checkReceivingEmail(
    database,
    recipient_email
  );
  return [foundName, foundEmail];
}

// await setUp(database)
// await sqlfuncs.createProject(database, "Proj1");
// await sqlfuncs.createRecipient(database, "DeptA@gmail.com");

// const userdata = await sqlfuncs.getAllUserData(database)
// console.log(userdata)


const result = await sqlfuncs.alreadyUsername("johndoe",database) 
console.log(result)