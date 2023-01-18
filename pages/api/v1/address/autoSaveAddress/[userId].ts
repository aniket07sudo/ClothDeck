import { NextApiRequest, NextApiResponse } from "next";
import Address from "../../../../../models/AddressModel";
import { ApiHandler } from "../../../../../lib/apiHandler";

const AddAddress = async (req:NextApiRequest , res:NextApiResponse) => {
    
    // const AddressData = await Address.findOneAndUpdate({ userId:req.query.userId }, {
    //     $push : { addresses : {
    //         firstName:req.body.firstName,
    //         lastName:req.body.lastName,
    //         Address:req.body.Address,
    //         postalCode:req.body.postalCode,
    //         state:req.body.state,
    //         country:req.body.country,
    //         default:true
    //     } }
    // } , { upsert:true,new:true })

    const SaveAddress = await Address.create({
        userId:req.query.userId,
        addresses:[
            {
                userId:req.query.userId,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                Address:req.body.Address,
                postalCode:req.body.postalCode,
                state:req.body.state,
                country:req.body.country,
                isDefault:true
            }
        ]
    })
    
    res.status(200).json({
        status:'success',
        data:SaveAddress
    })
}

export default ApiHandler({
    post:AddAddress
})