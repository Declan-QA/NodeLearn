import sqlite3 from "sqlite3";
import * as sqlfuncs from "./sqlfuncs.js";
const sql3 = sqlite3.verbose()

const DB  = new sql3.Database("./mydata.db",connected)

function connected (err){
    if (err){
    console.log(err.message)
    return
    } else{
        console.log("success")
    }
}
sqlfuncs.updateUserbyID(DB,1,"password","password123?")
// DB.exec("PRAGMA foreign_keys = ON;");

// Create the project table
// DB.run(`
//   CREATE TABLE IF NOT EXISTS projects (
//     id INTEGER PRIMARY KEY,
//     name TEXT NOT NULL
//   )
// `);


// DB.run(`
//   CREATE TABLE IF NOT EXISTS employee (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     full_name TEXT,
//     date_of_birth DATE,
//     username TEXT,
//     password TEXT,
//     job_title TEXT,
//     recipient TEXT,
//     project_id INTEGER,
//     FOREIGN KEY (project_id) REFERENCES projects(id)
//   )
// `);

// createProject(DB,1,"Proj1")


// createUser(DB,[
//     'Alice Jones',
//     '1990-05-10',
//     'alicej',
//     'securePass123',
//     'Engineer',
//     'Department A',
//     1]
//   );

// DB.all("SELECT COUNT(*) as count FROM employee", [], (err, rows) => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     console.log(rows);
//   }
// });