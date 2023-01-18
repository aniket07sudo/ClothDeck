import { NextApiRequest, NextApiResponse } from "next";
import Address from "../../../../../models/AddressModel";
import { ApiHandler } from "../../../../../lib/apiHandler";

const GetUserAddress = async(req:NextApiRequest,res:NextApiResponse) => {
    const getAddress = await Address.findOne({userId:req.query.userId});

    res.status(200).json({
        data:getAddress.addresses
    })
}   

export default ApiHandler({
    get:GetUserAddress
})