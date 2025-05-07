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

export const createRecipient = async (db, receiver_email) => {
  try {
    await basefuncs.execute(db, `INSERT INTO receivers VALUES(?,?)`, [
      null,
      receiver_email,
    ]);
  } catch (err) {
    console.log(err);
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
  }
};

//delete
export const deleteUser = async (db, id) => {
  try {
    await basefuncs.DeleteData(db, "DELETE FROM employees WHERE id=?", [id]);
  } catch (error) {
    console.log(error);
  }
};

//update
export const updateUserPassword = async (db, email, newpassword) => {
  try {
    await execute(db, "UPDATE employees SET password = ? WHERE email=?", [
      newpassword,
      email,
    ]);
  } catch (error) {
    console.log(error);
  }
};
