import sqlite3 from "sqlite3";
const sql3 = sqlite3.verbose()

const DB  = new sql3.Database("",sqlite3.OPEN_READWRITE,connected)

function connected(){

}
// Currently att https://youtu.be/_RtpUaBSie0?t=704
export {DB}