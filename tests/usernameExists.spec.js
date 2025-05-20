
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
function TestUsername(input,expected){
    describe("Test Suite", function () {
        it("Test for checking if username already exists", async function () {
            console.log(`${input} should return ${expected}`)
            const result = await alreadyUsername(database,input) 
            console.log(result)
            expect(result).to.equal(expected)
        });
    });
}


TestUsername("janedoe",false)
TestUsername("johndoe",false)
TestUsername("johndoe90",true)
