import connectDB from "../../middlewares/mongodb"
import Product from "../../models/ProductData";

async function handler(req,res) {


  try {
    const data = await Product.findById(req.query.id)
  
    res.status(200).json({
        data
    })
  } catch (err) {
    console.log(err);
    
  }
}

export default connectDB(handler);