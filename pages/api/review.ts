import Review from "../../models/ReviewModel";
import { ApiHandler } from "../../lib/apiHandler";

const SaveProducts = async (req,res) => {
    console.log(req.body);
    
    const ReviewData = await Review.create(req.body);
    res.status(200).json({
        ReviewData
    })
    
}



export default ApiHandler({
    post:SaveProducts
});