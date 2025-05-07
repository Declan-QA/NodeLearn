import sqlite3 from "sqlite3";
import * as sqlfuncs from "./sqlfuncs.js";
const sql3 = sqlite3.verbose();

const DB = new sql3.Database("./mydata.db", connected);

function connected(err) {
  if (err) {
    console.log(err.message);
    return;
  } else {
    console.log("success");
  }
}

// DB.exec("PRAGMA foreign_keys = ON;");

// Create the project table
// DB.run(`
//   CREATE TABLE IF NOT EXISTS projects (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL
//   )
// `);

// DB.run(`
//     CREATE TABLE IF NOT EXISTS receivers (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       email TEXT NOT NULL
//     )
// `);

// DB.run(`
//   CREATE TABLE IF NOT EXISTS employees (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     full_name TEXT,
//     date_of_birth DATE,
//     email TEXT,
//     username TEXT,
//     password TEXT,
//     job_title TEXT,
//     recipient_email TEXT,
//     project_name TEXT,
//     FOREIGN KEY (project_name) REFERENCES projects(name),
//     FOREIGN KEY (recipient_email) REFERENCES receivers(email)
//   )
// `);

// sqlfuncs.createProject(DB,1,"Proj1")
// sqlfuncs.createRecipient(DB,1,"DeptA@gmail.com")
sqlfuncs.createUser(DB,[
    'Alice Jones',
    '1990-05-10',
    "AliceJ@gmail.com",
    'alicej',
    'securePass123',
    'Engineer',
    'DeptA@gmail.com',
    'Project1']
  );

// DB.all("SELECT COUNT(*) as count FROM employee", [], (err, rows) => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     console.log(rows);
//   }
// });
