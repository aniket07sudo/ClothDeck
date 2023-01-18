import Variant from "../../models/VariantModel";
import { ApiHandler } from "../../lib/apiHandler";

const SaveProducts = async (req,res) => {
    console.log(req.body);
    
    const VariantData = await Variant.create(req.body);
    res.status(200).json({
        VariantData
    })
    
}


export default ApiHandler({
    post:SaveProducts
});