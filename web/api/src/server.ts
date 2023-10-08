// 

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongo from 'mongoose';
import { User } from "./route/user_api";

require('dotenv').config();

const app = express();

mongo.Promise = Promise;
mongo.connect(process.env.MONGODB)
const db = mongo.connection
db.on('error', (error: Error) => console.log(error.message))
db.on('open', () => console.log("Mongodb is connected."))
app.use(express.json())
// app.use(cors({
//     credentials: true
// }));
// app.use(compression());
// app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);


app.get("/", (req, res) => {
    res.status(200).json({success: true})
    res.status(200).json({hi: true})
})

// User Interface API routes
app.use("/api/user/", User)

// // Admin Interface API routes
// const admin = require("../route/admin_api")
// app.use("/api/admin/", admin)


server.listen(7000, () => console.log("Server running at http://localhost:7000"));