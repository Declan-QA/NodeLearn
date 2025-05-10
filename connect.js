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
const sql3 =  sqlite3.verbose()
let database =new sql3.Database("./mydata.db", connected);

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
    full_name TEXT,
    date_of_birth DATE,
    email TEXT,
    username TEXT,
    password TEXT,
    job_title TEXT,
    recipient_email TEXT,
    project_name TEXT,
    FOREIGN KEY (recipient_email) REFERENCES receivers(email),
    FOREIGN KEY (project_name) REFERENCES projects(name)
  )
`);
}


export async function checkPrev(database,project_name,recipient_email) {
 const foundName = await sqlfuncs.checkProjectname(database, project_name);
  const foundEmail = await sqlfuncs.checkReceivingEmail(database, recipient_email);
  return [foundName,foundEmail]
}
await sqlfuncs.createProject(database,"Proj1")
await sqlfuncs.createRecipient(database,"DeptA@gmail.com")


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
