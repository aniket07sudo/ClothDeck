import connectDB from "../../middlewares/mongodb"
import Items from "../../models/ItemModel";

async function handler(req,res) {

  try {

    const ProductData = await Items.find();
  
    res.status(200).json({
        ProductData
    })
  } catch (err) {
    console.log(err);
    
  }
}



export default connectDB(handler);