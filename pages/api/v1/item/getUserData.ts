import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../models/UserModel";
import { ApiHandler } from "../../../../lib/apiHandler";

const GetUserData = async (req:NextApiRequest , res:NextApiResponse) => {
    console.log("req.body",req.body);
    
    const UserData = await User.findOne({email:req.body.email});
    console.log(UserData);
    
    res.status(200).json({
        status:'success',
        data:UserData
    })
}

export default ApiHandler({
    post:GetUserData
})