import { Router } from "express";
import passport from "passport";
import Transaction from "../models/transaction.js"
const router = Router();

router.get("/", async(req, res) => {
    const transaction = await Transaction.find({user_id: req.user._id}).sort({createdAt: -1}); 
    res.json({data : transaction});
  }); 
 
  router.post("/", async(req, res) => {
    console.log(req.user);
    const {amount,description , date } =req.body;
    const transaction = new Transaction({
        amount,
        description,
        user_id : req.user._id,
        date,
    }); 
   await transaction.save();
    res.json({message : "Success"});
  });



  router.delete("/:id", async(req, res) => {
   await Transaction.findOneAndDelete({_id : req.params.id});
    res.json({message : "Success"});
  });

  
  router.patch("/:id", async(req, res) => {
    await Transaction.updateOne({_id : req.params.id}, {$set : req.body });
    
     res.json({message : "Success"});
   });

  export default router;