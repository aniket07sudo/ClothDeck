import { NextApiRequest, NextApiResponse } from "next";
import { ApiHandler } from "../../../../lib/apiHandler";
import User from "../../../../models/UserModel";

const GetUserData = async (req:NextApiRequest,res:NextApiResponse) => {

    const UserData = await User.findOne({email:req.body.email})

    res.status(200).json({
        status:'success',
        data:UserData
    })
}

export default ApiHandler({
    post:GetUserData
})