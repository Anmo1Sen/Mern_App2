import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  * as dotenv from 'dotenv';


dotenv.config();
const router = Router();

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(406).json({ message: "user already exists" });
    return;
  }
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });
   await user.save();
  res.json({ message: "user created" });
 
  res.status(201).json({ message: "user is created" });
});


router.post("/login", async (req, res) => {
    const { email, password} = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(406).json({ message: "credintial not found" });
      return;
    }

 const matched = await bcrypt.compare(password,user.password);   
if(!matched){
    res.status(406).json({ message: "credintial not found" });
    return;
}

const payload = {
   username : email,
    _id : user._id,
}
const token = jwt.sign(payload,process.env.JWT_SECRET);

res.json({message : "successfully logged in",token, user})
});
export default router;
