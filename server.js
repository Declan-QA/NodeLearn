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
const database =new sql3.Database("./mydata.db", connected);


// express app
const app = express();

console.log("Please open the url: http://localhost:3000")

// listen for requests
app.listen(3000);

app.use('/public/', express.static(path.join(__dirname, './public')))
app.use("/js/",express.static(path.join(__dirname,"./public/js")))
app.use("/styles/",express.static(path.join(__dirname,"./public/styles")))
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());
// await sqlfuncs.setUp(database)
// await sqlfuncs.createProject(database, "Proj1");
// await sqlfuncs.createRecipient(database, "DeptA@gmail.com");



app.get("/",async function(request,response){
  response.sendFile(path.join(__dirname, "public/pages/register.html"));
})

app.get("/login",async function(request,response){
  response.sendFile(path.join(__dirname, "public/pages/login.html"));
})

app.get("/home",async function(request,response){
  response.sendFile(path.join(__dirname, "public/pages/home.html"));
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
  const success = await sqlfuncs.createUser(database,Object.values(req.body))
  res.json(success)
})



app.post("/checkformlogin",async (req, res) => {
  const [email, password ] = req.body;
  const result = await sqlfuncs.checkLoginDetails(database,email,password)
  res.json(result)
});

app.post("/userData", async (req,res) =>{
  const email = req.body.email
  const user = await sqlfuncs.getUserData(database,email)
  res.json(user)
})




// 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public/pages/404.html"));
});
