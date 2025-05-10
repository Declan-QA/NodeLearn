import * as basefuncs from "./basesqlfuncs.js"
//create
export const createProject = async (db, project_name) => {
  try {
    await basefuncs.execute(
      db,
      `INSERT INTO projects 
              VALUES(?,?)`,
      [null, project_name]
    );
  } catch (err) {
    console.log(err);
  }
};
export const checkReceivingEmail = async(db,email) => {
  try {
    const result = await basefuncs.fetchFirst(db,"SELECT id from receivers WHERE email = ?",[email])
    return result
  } catch (error) {
    console.log(error)
    return
  }
}
export const checkProjectname = async(db,name) => {
  try {
    const result = await basefuncs.fetchFirst(db,"SELECT id from projects WHERE name = ?",[name])
    return result
  } catch (error) {
    console.log(error)
    return
  }
}
export const createRecipient = async (db, receiver_email) => {
  try {
    await basefuncs.execute(db, `INSERT INTO receivers VALUES(?,?)`, [
      null,
      receiver_email,
    ]);
  } catch (err) {
    console.log(err);
    return
  }
};

export const createUser = async (db,userdata) => {
  try {
    const stored = [null, ...userdata];
    await basefuncs.execute(
      db,
      `INSERT INTO employees 
          VALUES(?,?,?,?,?,?,?,?,?)`,
      stored
    );
  } catch (err) {
    console.log(err);
    return
  }
};

//delete
export const deleteUser = async (db, id) => {
  try {
    await basefuncs.DeleteData(db, "DELETE FROM employees WHERE id=?", [id]);
  } catch (error) {
    console.log(error);
    return
  }
};

//update
export const changePassword = async (db, email, newpassword) => {
  try {
    await execute(db, "UPDATE employees SET password = ? WHERE email=?", [
      newpassword,
      email,
    ]);
  } catch (error) {
    console.log(error);
    return
  }
};


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
 const foundName = await checkProjectname(database, project_name);
  const foundEmail = await checkReceivingEmail(database, recipient_email);
  return [foundName,foundEmail]
}