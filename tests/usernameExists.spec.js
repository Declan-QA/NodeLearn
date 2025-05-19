
import sqlite3 from "sqlite3";
import {alreadyUsername} from "../sqlfuncs.js";
import { expect } from "chai";
const sql3 =  sqlite3.verbose()

function connected(err) {
  if (err) {
    console.log(err.message);
    return;
  } else {
    console.log("Sqlite Query success");
  }
}


const database =new sql3.Database("./testdata.db", connected);

function TestAlreadyUser(username,expected){
    describe("Test Suite", function () {
        it("Test for checking username already existimg", async function () {
            console.log(`${username} should return true for being a user already`)
            const result = await alreadyUsername(username,database) 
            console.log(result)
            expect(result).to.equal(expected)
        });
    });
}
//   full_name TEXT UNIQUE,
//       date_of_birth DATE,
//       email TEXT UNIQUE,
//       username TEXT UNIQUE,
//       password TEXT UNIQUE,
TestAlreadyUser("janedoe",false)
TestAlreadyUser("johndoe",false)
TestAlreadyUser("johndoe90",true)



