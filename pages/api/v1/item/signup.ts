import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../models/UserModel";
import connectDB from "../../../../middlewares/mongodb";

export default connectDB(async (req:NextApiRequest , res:NextApiResponse) => {
    if(req.method == 'GET') return;
    try {
        console.log(req.body);
        
        const newUser = await User.create({
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            password:req.body.password,
            passwordConfirm:req.body.passwordConfirm
        });
        res.status(200).json({
            status:'success',
            newUser
        })
    } catch(err) {
        console.log(err);
        res.status(200).json({
            status:'error',
            error:err
        })
        
    }
    
})