import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { ApiHandler } from "../../../../../lib/apiHandler";
import Item from "../../../../../models/ItemModel";

const GetItemData = async (req:NextApiRequest , res:NextApiResponse) => {

    const token = await getToken({req});
    console.log("Token --> ",token);
    
    console.log("req.body",req.query.id);
    
    const ItemData = await Item.find().populate('variants category').select('-description');
    console.log(ItemData);
    
    res.status(200).json({
        status:'success',
        data:ItemData
    })
}

export default ApiHandler({
    get:GetItemData
})