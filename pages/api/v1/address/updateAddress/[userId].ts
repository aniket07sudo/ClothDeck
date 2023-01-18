import Address from "../../../../../models/AddressModel";
import { ApiHandler } from "../../../../../lib/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";


const UpdateAddress = async(req:NextApiRequest,res:NextApiResponse) => {

    console.log(req.body.addressUid,req.query.userId);
    
    const FindAddress = await Address.findOne({userId:req.query.userId});

    if(FindAddress.addresses.length == 0) {
        throw 'No Address Present'
    }

    const IndexFound = FindAddress.addresses.findIndex(item => item._id.toString() === req.body.addressUid);

    console.log("FindAddress",IndexFound);

    if(IndexFound < 0) {
        throw 'Address not Found'
    }

    console.log("Full Obj",FindAddress.addresses[IndexFound]);
    

    let UpdateAddressObj = FindAddress.addresses[IndexFound];

    console.log("TO Be Update",UpdateAddressObj);
    
    UpdateAddressObj = {
        ...UpdateAddressObj._doc,
        ...req.body.update
    }

    FindAddress.addresses[IndexFound] = UpdateAddressObj;

    const UpdateAddress = await Address.findOneAndUpdate({userId:req.query.userId} , {
        addresses:FindAddress.addresses
    })
    
    res.status(200).json({
        status:'success',
        data:UpdateAddress
    })
}

export default ApiHandler({
    patch:UpdateAddress
})