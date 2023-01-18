import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiHandler } from "../../../../../lib/apiHandler";
import Review from "../../../../../models/ReviewModel";

const GetReviews = async (req:NextApiRequest , res:NextApiResponse) => {
    
    const Reviews = await Review.find({item_id:req.query.productId},undefined,{limit:3}).populate({
        path:'user_id',
        select:'fname'
    });
    console.log("Reviews",Reviews);
    
    res.status(200).json({
        status:'success',
        data:Reviews
    })
}

export default ApiHandler({
    get:GetReviews
})