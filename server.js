import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// express app
const app = express();

console.log("Please open the url: http://localhost:3000")

// listen for requests
app.listen(3000);

app.use('/public/', express.static(path.join(__dirname, './public')))
app.use('/pages/', express.static(path.join(__dirname, './pages')))


app.get("/",function(request,response){
  response.sendFile(path.join(__dirname, "pages/index.html"));
})

// 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "pages/404.html"));
});