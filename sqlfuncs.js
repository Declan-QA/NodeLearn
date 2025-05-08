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
    const result = await basefuncs.execute(db,"SELECT id from receivers WHERE email = ?",[email])
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
