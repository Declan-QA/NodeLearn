import { expect } from "chai";
import {alreadyUsername} from "../sqlfuncs.js";



function TestAlreadyUser(username,expected){
    describe("Test Suite", function () {
        it("Test for checking username already existimg", function () {
            console.log(`${username} should return true for being a user already`)
            const result = alreadyUsername(database,username) 
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
TestAlreadyUser("janedoe",true)



