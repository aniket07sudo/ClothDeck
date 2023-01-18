import { NextApiRequest, NextApiResponse } from "next";
import { ApiHandler } from "../../../../lib/apiHandler";
import User from "../../../../models/UserModel";

const GetAllUsers = async (req:NextApiRequest,res:NextApiResponse) => {

    const Users = await User.find();

    res.status(200).json({
        status:'success',
        data:Users
    })
}

export default ApiHandler({
    get:GetAllUsers
})