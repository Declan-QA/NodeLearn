import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// express app
const app = express();


// listen for requests
app.listen(3000);

app.use('/public/', express.static(path.join(__dirname, './public')))


app.get("/",function(request,response){
  response.sendFile(path.join(__dirname, "/pages/index.html"));
})



// 404 page
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "/public/pages/index.html"));
});