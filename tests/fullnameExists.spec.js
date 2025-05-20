
import sqlite3 from "sqlite3";
import {alreadyFullname} from "../sqlfuncs.js";
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
function TestEmail(input,expected){
    describe("Test Suite", function () {
        it("Test for checking fullname already exists", async function () {
            console.log(`${input} should return ${expected}`)
            const result = await alreadyFullname(database,input) 
            console.log(result)
            expect(result).to.equal(expected)
        });
    });
}

TestEmail("John Doe",true)
TestEmail("john doe",true)
TestEmail("jon doe",false)
TestEmail("jane doe",false)
