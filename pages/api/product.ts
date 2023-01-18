import connectDB from "../../middlewares/mongodb"
import Item from "../../models/ItemModel";
import { ApiHandler } from "../../lib/apiHandler";

const SaveProducts = async (req,res) => {
    console.log(req.body);
    
    const ProductData = await Item.create(req.body);
    res.status(200).json({
        ProductData
    })
    
}



export default ApiHandler({
    post:SaveProducts
});