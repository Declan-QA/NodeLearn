import http from "http";
import fs from "fs";

const server = http.createServer((request,response)=>{
    const routes_dict = {"/":"pages/index.html","/about":"pages/about.html"}
    response.setHeader("Content-Type","html")
    let path = ""
    const baseAssetspath="./Frontend/"
    let nextpage = routes_dict[request.url]

    if (nextpage){
        path = baseAssetspath + nextpage
    } else {
        path = baseAssetspath + "pages/404.html"
    }

    fs.readFile(path,(err,data)=>{
        if (err){
            console.log(err)
            response.end()
        } else {
            console.log(path)
            response.end(data)
        }
    })
})

server.listen(3000,"localhost",()=>{
    console.log("Listening for requests on port 3000")
})

