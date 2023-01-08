import express from "express";
import connect from "./dataBase/mongodb.js";
import cors from 'cors';
import bodyParser from  "body-parser";

import TransactionApi from "./routes/TransactionsApi.js"
import AuthApi from "./routes/AuthApis.js"
import UserApi from "./routes/UserApi.js";

import passport from "passport";
import passportConfig from "./config/passport.js";

import  * as dotenv from 'dotenv';


dotenv.config();

const PORT = 4000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);

app.get("/", (req, res) => {res.send("hello world");}); 
app.use("/transaction",passport.authenticate('jwt',{session : false}), TransactionApi);
app.use("/auth", AuthApi);
app.use("/user", UserApi);

connect();

app.listen(PORT, () => {
  console.log("server is running at http://localhost:4000");
});
