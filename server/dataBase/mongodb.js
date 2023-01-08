import mongoose from "mongoose";
import  * as dotenv from 'dotenv';


dotenv.config();

mongoose.set('strictQuery', 
false);
const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const url = process.env.MONGO_DB_URL;
async function connect(){
await mongoose
.connect(
  `mongodb+srv://${username}:${password}@${url}/?retryWrites=true&w=majority`
);
console.log("Mogodb conected ");
}

export default connect;
