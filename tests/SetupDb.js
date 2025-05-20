import sqlite3 from "sqlite3";
import {
    setUp,
    createProject,
    createRecipient,
    createUser,
} from "../sqlfuncs.js";

function connected(err) {
    if (err) {
        console.log(err.message);
        return;
    } else {
        console.log("Sqlite Query success");
    }
}
const sql3 = sqlite3.verbose();
const database = new sql3.Database("./testdata.db", connected);
await setUp(database);
await createProject(database, "Proj1");
await createRecipient(database, "DeptA@gmail.com");
await createUser(database, [
    "John Doe",
    "1990-01-01",
    "johndoe@example.com",
    "johndoe90",
    "SecurePass123!",
    "Software Developer",
    "DeptA@gmail.com",
    "Proj1",
]);
