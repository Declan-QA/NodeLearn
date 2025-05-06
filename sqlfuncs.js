export const execute = async (db, sql, params = []) => {
  if (params && params.length > 0) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

export const fetchAll = async (db, sql, params) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

export const fetchFirst = async (db, sql, params) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

export const DeleteData = async (db,sql,params) => {
  try {
    await execute(db, sql, params);
  } catch (err) {
    console.log(err);
  }
}


export const createProject = async (db,project_id,project_name) =>{
  try {
    await execute(db, `INSERT INTO projects 
            VALUES(?,?)`,[project_id,project_name]);
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (db,userdata) =>{
  try {
    const stored = [null,...userdata]
    console.log(stored)
    await execute(db,`INSERT INTO employee 
        VALUES(?,?,?,?,?,?,?,?)`,stored);
  } catch (err) {
    console.log(err);
  }
};


export const deleteUser = async (db,id) =>{
  try {
    await DeleteData(db,"DELETE FROM employee WHERE id=?",[id])
  } catch (error) {
    console.log(error)
  }
}


export const updateUserbyID = async (db,id,attribute,data) =>{
  const allowedAttributes = ['name', 'email', 'password', 'role'];
  if (!allowedAttributes.includes(attribute)) {
    throw new Error('Invalid attribute name');
  }
  try {
    await execute(db,"UPDATE employee SET ? = ? WHERE id=?",[attribute,data,id])
  } catch (error) {
    console.log(error)
  }
}