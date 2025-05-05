import sqlite3 from "sqlite3";
const sql3 = sqlite3.verbose()

const DB  = new sql3.Database("./mydata.db",sqlite3.OPEN_READWRITE,connected)

function connected (err){
    if (err){
    console.log(err.message)
    return
    } else{
        console.log("success")
    }

}

DB.exec("PRAGMA foreign_keys = ON;");

// Create the project table
DB.run(`
  CREATE TABLE IF NOT EXISTS project (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  )
`);


DB.run(`
  CREATE TABLE IF NOT EXISTS employee (
    id INTEGER PRIMARY KEY,
    full_name TEXT,
    date_of_birth DATE,
    username TEXT,
    password TEXT,
    job_title TEXT,
    recipient TEXT,
    project_id INTEGER,
    FOREIGN KEY (project_id) REFERENCES project(id)
  )
`);


const createUser = (full_name,date_of_birth,username,password,job_title,recipient,project_id) => {
    DB.run(`INSERT INTO employee 
        VALUES(?,?,?,?,?,?,?)`,[full_name,date_of_birth,username,password,job_title,recipient,project_id])

}

const createProject = (project_id,project_name) => {
    DB.run(`INSERT INTO project 
            VALUES(?,?)`,[project_id,project_name])
}

createUser(
    'Alice Johnson',
    '1990-05-10',
    'alicej',
    'securePass123',
    'Engineer',
    'Department A',
    101
  );
  