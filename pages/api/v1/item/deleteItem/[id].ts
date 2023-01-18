import { NextApiRequest, NextApiResponse } from "next";
import Item from "../../../../../models/ItemModel";
import { ApiHandler } from "../../../../../lib/apiHandler";

const DeleteItem = async (req:NextApiRequest , res:NextApiResponse) => {
    console.log("req.body",req.query.id);
    
    const ItemDeleted = await Item.deleteOne({_id:req.query.id});
    console.log(ItemDeleted);
    
    res.status(200).json({
        status:'success',
        data:ItemDeleted
    })
}

export default ApiHandler({
    delete:DeleteItem
})