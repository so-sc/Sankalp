//

import express from "express";
import fs from "fs";
import https from "https";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import mongo from "mongoose";
import { Admin } from "./route/admin_api";
import { App } from "./route/app_api";
import { Auth } from "./route/auth_api";
require("dotenv").config();

const app = express();

mongo.Promise = Promise;
mongo.connect(process.env.MONGODB);
const db = mongo.connection;
db.on("error", (error: Error) =>
  console.log("Check your mongodb please. There is an issue with mongodb.")
);
db.on("open", () => console.log("Mongodb is connected."));
app.use(express.json());

if (process.env.PRODUCTION === "true") {
  app.use(
    cors({
      origin: "*", // process.env.DOMAIN,
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials: true,
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Authorization",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Methods",
        "Access-Control-Allow-Headers",
      ],
    })
  );

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //process.env.DOMAIN);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, HEAD, PUT, PATCH, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers"
    );
    next();
  });
}

if (process.env.PRODUCTION === "true") {
  app.set("trust proxy", true);
}
app.use(bodyParser.json());

var server;
if (process.env.PRODUCTION === "true") {
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/sankalp-api.sosc.org.in/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/sankalp-api.sosc.org.in/fullchain.pem",
    "utf8"
  );

  const credentials = { key: privateKey, cert: certificate };
  server = https.createServer(credentials, app);
} else {
  server = http.createServer(app);
}

app.get("/", async (req, res) => {
  res.status(200).json({ success: true });
  return;
});

// User Interface API routes
app.use("/api/app", App);

// Admin Interface API routes
app.use("/api/admin", Admin);

// Auth Interface API routes
app.use("/api/auth", Auth);

server.listen(process.env.PRODUCTION === "true" ? 443 : 7000, () =>
  console.log(
    `Server running at ${
      process.env.PRODUCTION === "true"
        ? "https://sankalp-api.sosc.org.in"
        : "http://localhost:7000"
    }`
  )
);
