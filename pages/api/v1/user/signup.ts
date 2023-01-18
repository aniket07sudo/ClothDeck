import { NextApiRequest, NextApiResponse } from "next";
import { ApiHandler } from "../../../../lib/apiHandler";
import User from "../../../../models/UserModel";

const GetUserData = async (req:NextApiRequest,res:NextApiResponse) => {

    const UserData = await User.create({
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm
    })

    res.status(200).json({
        status:'success',
        data:UserData
    })
}

export default ApiHandler({
    post:GetUserData
})