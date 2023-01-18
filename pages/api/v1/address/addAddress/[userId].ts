import Address from "../../../../../models/AddressModel";
import { ApiHandler } from "../../../../../lib/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";


const AddAddress = async(req:NextApiRequest,res:NextApiResponse) => {
    const AddAdress = await Address.findOneAndUpdate({userId:req.query.userId },{
        $push : { addresses : {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            Address:req.body.Address,
            postalCode:req.body.postalCode,
            state:req.body.state,
            country:req.body.country,
        } }
    },{ upsert:true, new:true,setDefaultsOnInsert:true });
    
    res.status(200).json({
        status:'success',
        data:AddAdress
    })

}

export default ApiHandler({
    post:AddAddress
})