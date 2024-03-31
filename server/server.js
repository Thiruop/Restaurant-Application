import express from "express";
import cors from 'cors';
import routers from "./Routes/authRoutes.js";
import connection from "./Models/db.js"
import dotenv from 'dotenv';
dotenv.config();
const app=express();
app.use(express.json())

app.use(cors(({origin:"http://localhost:5173"})));

const PORT = process.env.PORT || 3000;
app.use("/api",routers);
app.listen(PORT,()=>{
    console.log("its running in the port 3000");
})
