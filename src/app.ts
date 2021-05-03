import express from "express";
import fs from 'fs';
import path from 'path';
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server has been started on ${PORT}...`);
})

app.get('/api/notes', (req: express.Request, res: express.Response) => {
    fs.readFile(path.join(__dirname,'models','notes.json'),(err,data)=>{
        if(err){
            console.error(err);
            res.writeHead(500);
            res.end();
        }
        else {
            res.end(data);
        }
    })
})