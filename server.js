//express
import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//sql
import * as sqlfuncs from "./sqlfuncs.js"
import sqlite3 from "sqlite3";

function connected(err) {
  if (err) {
    console.log(err.message);
    return;
  } else {
    console.log("Sqlite Query success");
  }
}
const sql3 =  sqlite3.verbose()
let database =new sql3.Database("./mydata.db", connected);


// express app
const app = express();

console.log("Please open the url: http://localhost:3000")

// listen for requests
app.listen(3000);

app.use('/public/', express.static(path.join(__dirname, './public')))

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());


app.get("/",async function(request,response){
  response.sendFile(path.join(__dirname, "public/pages/register.html"));
  sqlfuncs.setUp(database)
})

app.get("/login",async function(request,response){
  response.sendFile(path.join(__dirname, "public/pages/login.html"));
  sqlfuncs.setUp(database)
})

app.post("/checkform", async (req, res) => {
  const { recipient_email, project_name } = req.body;
  const [foundName,foundEmail] = await sqlfuncs.checkPrev(database,project_name,recipient_email)
  
  if (foundName && foundEmail) {
    return res.json({ valid: true });
  }

  const response_json = { valid: false };

  if (!foundName) {
    response_json.project_name = `<br id="errornamebr"><small id="errorname" class="error">You must enter an existing project</small>`;
  }

  if (!foundEmail) {
    response_json.recipient_email = `<br id="erroremailbr"><small id= "erroremail" class="error">You must enter an existing email</small>`;
  }

  res.json(response_json);
});

app.post("/saveUser",async(req,res) =>{
  console.log(req.body)
  const userid = await sqlfuncs.checkUsername(req.body.username)
  const success = await sqlfuncs.createUser(database,Object.values(req.body))
  res.json(success)
})

app.post("/checkformlogin",async (req, res) => {
  const { email, password } = req.body;
  const logincheck = await sqlfuncs.checkLoginDetails(database,email,password)
  if (logincheck.success){
    res.json({"valid":"true"})
  } else{
    res.json({"valid":"false","reason":`<br id="errorloginbr"><small id= "errorlogin" class="error">${logincheck.reason}</small>`})
  }
});


app.post("/allowlogin",async(req,res) =>{
  const success = await sqlfuncs.createUser(database,Object.values(req.body))
  res.json(success)
})

// 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public/pages/404.html"));
});
