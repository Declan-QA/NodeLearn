import * as basefuncs from "./basesqlfuncs.js";

//create
export const createProject = async (db, project_name) => {
    try {
        await basefuncs.execute(db, `INSERT INTO projects VALUES(?,?)`, [
            null,
            project_name,
        ]);
    } catch (err) {
        console.log(err);
        return;
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
        return;
    }
};

export const checkReceivingEmail = async (db, email) => {
    try {
        const result = await basefuncs.fetchFirst(
            db,
            "SELECT id from receivers WHERE email = ?",
            [email]
        );
        return result;
    } catch (error) {
        console.log(error);
        return;
    }
};
export const checkProjectname = async (db, name) => {
    try {
        const result = await basefuncs.fetchFirst(
            db,
            "SELECT id from projects WHERE name = ?",
            [name]
        );
        return result;
    } catch (error) {
        console.log(error);
        return;
    }
};

export const checkUsername = async (db, name) => {
    try {
        const result = await basefuncs.fetchFirst(
            db,
            "SELECT id FROM employees WHERE username = ?",
            [name]
        );
        return result;
    } catch (error) {
        console.log(error);
        return;
    }
};

export const createUser = async (db, userdata) => {
    try {
        console.log(userdata);
        userdata.unshift(null);
        await basefuncs.execute(
            db,
            `INSERT INTO employees 
          VALUES(?,?,?,?,?,?,?,?,?)`,
            userdata
        );
        return { success: true };
    } catch (err) {
        console.log(err);
        return { success: false };
    }
};

//delete
export const deleteUser = async (db, id) => {
    try {
        await basefuncs.DeleteData(db, "DELETE FROM employees WHERE id=?", [
            id,
        ]);
    } catch (error) {
        console.log(error);
        return;
    }
};

export const resetemployees = async (db) => {
    try {
        await basefuncs.execute(db, `DROP TABLE employees;`);
    } catch (error) {
        console.log(error);
        return error;
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
        return;
    }
};

export async function setUp(DB) {
    await basefuncs.execute(
        DB,
        `
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
    `
    );

    await basefuncs.execute(
        DB,
        `
  CREATE TABLE IF NOT EXISTS receivers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE
  )
  `
    );

    await basefuncs.execute(
        DB,
        `
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT UNIQUE,
      date_of_birth DATE,
      email TEXT UNIQUE,
      username TEXT UNIQUE,
      password TEXT,
      job_title TEXT,
      recipient_email TEXT,
      project_name TEXT,
      FOREIGN KEY (recipient_email) REFERENCES receivers(email),
      FOREIGN KEY (project_name) REFERENCES projects(name)
    )
  `
    );
}

export async function checkPrev(database, project_name, recipient_email) {
    const foundName = await checkProjectname(database, project_name);
    const foundEmail = await checkReceivingEmail(database, recipient_email);
    return [foundName, foundEmail];
}

export async function checkLoginDetails(database, email, password) {
    const failstate = {
        valid: false,
        reason: "Password or Email may be incorrect",
    };
    const passstate = { valid: true };
    const emailexists = await basefuncs.fetchFirst(
        database,
        "SELECT id FROM employees WHERE email = ?",
        [email]
    );
    if (!emailexists) {
        return failstate;
    } else {
        const passwordexists = await basefuncs.fetchFirst(
            database,
            "SELECT id FROM employees WHERE email = ? AND password = ?",
            [email, password]
        );

        if (passwordexists?.id == emailexists.id) {
            return passstate;
        } else {
            return failstate;
        }
    }
}

export async function getUserData(database, email) {
    try {
        const userdata = await basefuncs.fetchFirst(
            database,
            `SELECT full_name, date_of_birth, username, job_title, recipient_email, project_name FROM employees WHERE email = ?`,
            [email]
        );
        userdata.email = email;
        return userdata;
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function alreadyUsername(database, username) {
    try {
        const result = await basefuncs.fetchFirst(
            database,
            "SELECT email FROM employees WHERE username = ?",
            [username]
        );
        return Boolean(result);
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function alreadyEmail(database, email) {
    try {
        const result = await basefuncs.fetchFirst(
            database,
            "SELECT full_name FROM employees WHERE email = ?",
            [email]
        );
        return Boolean(result);
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function alreadyFullname(database, fullname) {
    try {
        const result = await basefuncs.fetchFirst(
            database,
            "SELECT email FROM employees WHERE lower(full_name) = ?",
            [fullname.toLowerCase()]
        );
        return Boolean(result);
    } catch (error) {
        console.log(error);
        return error;
    }
}
