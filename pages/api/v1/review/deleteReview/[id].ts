import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiHandler } from "../../../../../lib/apiHandler";
import Review from "../../../../../models/ReviewModel";

const DeleteReview = async (req:NextApiRequest , res:NextApiResponse) => {
    console.log("req.body",req.query.id);
    
    const DeletedReview = await Review.findOneAndDelete({_id:req.query.id});
    console.log(DeletedReview);
    
    res.status(200).json({
        status:'success',
        data:DeletedReview
    })
}

export default ApiHandler({
    delete:DeleteReview
})