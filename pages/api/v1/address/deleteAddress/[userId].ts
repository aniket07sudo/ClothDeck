import Address from "../../../../../models/AddressModel";
import { ApiHandler } from "../../../../../lib/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";


const DeleteAddress = async(req:NextApiRequest,res:NextApiResponse) => {

    const DeletedAddress = await Address.findOneAndUpdate({userId:req.query.userId}, {
        $pull:{
            addresses: { _id:req.body.addressUid }
        }
    })
    
    res.status(200).json({
        status:'success',
        data:DeletedAddress
    })
}

export default ApiHandler({
    delete:DeleteAddress
})