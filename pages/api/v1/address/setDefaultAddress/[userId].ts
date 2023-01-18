import Address from "../../../../../models/AddressModel";
import { ApiHandler } from "../../../../../lib/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";


const SetDefaultAddress = async(req:NextApiRequest,res:NextApiResponse) => {

    const AddAdress = await Address.findOne({userId:req.query.userId});

    if(!AddAdress) {
        throw 'Not Found'
    }

    AddAdress.addresses.forEach(item => item.isDefault = false);
    const FoundAddressIndex = AddAdress.addresses.findIndex(item => item._id.toString() === req.body.addressUid);

    if(FoundAddressIndex < 0) {
        throw 'Address Not Found'
    }

    AddAdress.addresses[FoundAddressIndex].isDefault = true;

    const UpdateAddress = await Address.findOneAndUpdate({userId:req.query.userId },{
        addresses:AddAdress.addresses
    });
    
    res.status(200).json({
        status:'success',
        data:UpdateAddress
    })
}

export default ApiHandler({
    post:SetDefaultAddress
})