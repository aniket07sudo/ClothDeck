import { NEXT_URL } from "./config";
import connectDB from "./middlewares/connectDB";
import ProData from "./models/ProductData";

export const GetProducts =  async () => {

    await connectDB();

    const ProductData = await ProData.find();

    
    
    return {
        ProductData:ProductData
    }
    
}

export const GetProById = async (id) => {

    const ProductData = await fetch(`${NEXT_URL}/api/${id}`).then(res => res.json());
    
    
    return {
        ProductData:ProductData.ProductData
    }
    
}