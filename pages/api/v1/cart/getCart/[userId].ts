import { NextApiRequest, NextApiResponse } from "next";
import Cart from "../../../../../models/CartModel";
import { ApiHandler } from "../../../../../lib/apiHandler";
import mongoose from "mongoose";

const GetCartData = async (req:NextApiRequest , res:NextApiResponse) => {
    console.log("req.body",req.query.userId);
    
    // const CartData = await Cart.findOne({userId:req.query.userId});

    const CartData = await Cart.aggregate([
        {
            $match: { userId : mongoose.Types.ObjectId(req.query.userId) }
        },
        {
            $unwind: {
                path: '$products'
            }
        },
        {
            $group : {
                _id:'$products.variantId',
                document:{ $push : "$$ROOT" }
            }
        },
        {
            $unwind : {
                path:'$document'
            }
        },
        {
            $lookup:{
                from:'variants',
                localField:'document.products.variantId',
                foreignField:'_id',
                as:'variantInfo'
            }
        },
        {
            $unwind : {
                path:'$variantInfo'
            }
        },
        {
            $project :{
                user:{ $mergeObjects: [ "$document", "$variantInfo" ] }
            }
        },
        {
            $replaceRoot: {
                newRoot : '$user',
            }
        },
        {
            $project : {
                item : {
                    image: { $first : '$images' },
                    stocks:'$stock',
                    discounted_price:'$products.price',
                    price:'$price'
                },
                products:1,

            }
        },
        {
            $project : {
                main : { $mergeObjects: ["$item","$products"] }
            }
        },
        {
            $replaceRoot:{
                newRoot:'$main',
            },
        },
        {
            $addFields : {
                discountPercentage: { $round : [{ $multiply : [ { $divide: [ { $subtract : ["$price","$discounted_price"] } , "$price" ] } , 100 ] } , 0] }
            }
        },
    ])

    let subTotal = CartData.reduce((acc,obj) => {
        return (obj.price * obj.quantity) + acc;
    },0)

    
    res.status(200).json({
        status:'success',
        data:CartData,
        subTotal
    })
}

export default ApiHandler({
    get:GetCartData
})