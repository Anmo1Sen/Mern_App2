import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
mongoose.set('strictQuery', 
false);
const PORT = 4000;
const app = express();
app.use(cors());


await mongoose
  .connect(
    "mongodb+srv://Anmol:anmol1234@cluster0.rpgnxqc.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() =>console.log("MongoDb connected successfully"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("hello world");
}); 

app.listen(PORT, () => {
  console.log("server is running at http://localhost:4000");
});
