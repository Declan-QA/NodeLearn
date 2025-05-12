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
  )
`);

  await DB.run(`
    CREATE TABLE IF NOT EXISTS receivers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE
    )
`);

  await DB.run(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT UNIQUE,
    date_of_birth DATE,
    email TEXT UNIQUE,
    username TEXT UNIQUE,
    password TEXT UNIQUE,
    job_title TEXT,
  )
`);

  await DB.run(`
  CREATE TABLE IF NOT EXISTS senders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (receiver_id) REFERENCES receivers(id),
    UNIQUE(project_id, receiver_id)
  )
`);

  await DB.run(`
  CREATE TABLE IF NOT EXISTS user_senders (
    user_id INTEGER NOT NULL,
    sender_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES employees(id),
    FOREIGN KEY (sender_id) REFERENCES senders(id),
    PRIMARY KEY (user_id, sender_id)
  )
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
await sqlfuncs.createProject(database, "Proj1");
await sqlfuncs.createRecipient(database, "DeptA@gmail.com");

// DB.all("SELECT COUNT(*) as count FROM employee", [], (err, rows) => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     console.log(rows);
//   }
// });

// const checkemail = await sqlfuncs.checkReceivingEmail(DB,"mail")
// console.log(checkemail)
// const name = await sqlfuncs.checkProjectname(DB,"Proj1")
// console.log(name)
