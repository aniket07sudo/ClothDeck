import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiHandler } from "../../../../../lib/apiHandler";
import Review from "../../../../../models/ReviewModel";

const AddReview = async (req:NextApiRequest , res:NextApiResponse) => {
    
    const AddReview = await Review.create({
        heading:req.body.heading,
        description:req.body.description,
        rating:req.body.rating,
        item_id:req.body.item_id,
        user_id:req.body.user_id,
        user_liked:req.body.user_liked,
        images:req.body.images,
    })
    console.log(AddReview);
    
    res.status(200).json({
        status:'success',
        data:AddReview
    })
}

export default ApiHandler({
    post:AddReview
})