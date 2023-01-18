import connectDB from "../../middlewares/mongodb"
import Categories from "../../models/CategoryModel";
import { ApiHandler } from "../../lib/apiHandler";

const SaveProducts = async (req,res) => {
    console.log(req.body);
    
    const CategoryData = await Categories.create(req.body);
    res.status(200).json({
        CategoryData
    })
    
}


export default ApiHandler({
    post:SaveProducts
});