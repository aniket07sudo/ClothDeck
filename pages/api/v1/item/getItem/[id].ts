import { NextApiRequest, NextApiResponse } from "next";
import Item from "../../../../../models/ItemModel";
import { ApiHandler } from "../../../../../lib/apiHandler";

const GetItemData = async (req:NextApiRequest , res:NextApiResponse) => {
    console.log("req.body",req.query.id);
    
    const ItemData = await Item.findOne({_id:req.query.id}).populate('reviews variants category')
    console.log(ItemData);
    
    res.status(200).json({
        status:'success',
        data:ItemData
    })
}

export default ApiHandler({
    get:GetItemData
})