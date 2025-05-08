//express
import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//sql
import {setUp} from "./connect.js";
import sqlite3 from "sqlite3";
import * as sql_funcs from "./sqlfuncs.js"

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
  response.sendFile(path.join(__dirname, "public/pages/index.html"));
  await setUp(database)
})

app.post("/checkform", async (req, res) => {
  const { recipient_email, project_name } = req.body;
  const foundName = await sql_funcs.checkProjectname(database, project_name);
  const foundEmail = await sql_funcs.checkReceivingEmail(database, recipient_email);
  if (foundName && foundEmail) {
    return res.json({ valid: true });
  }

  const response_json = { valid: false };

  if (!foundName) {
    response_json.project_name = `<p><small class="error">You must enter an existing project</small></p>`;
  }

  if (!foundEmail) {
    response_json.recipient_email = `<p><small class="error">You may have entered the wrong URL</small></p>`;
  }

  res.json(response_json);
});


// 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public/pages/404.html"));
});