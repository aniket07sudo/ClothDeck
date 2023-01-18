import connectDB from "../../middlewares/mongodb"
import Items from "../../models/ItemModel";

async function handler(req,res) {

  try {

    const ItemData = await Items.findById(req.params.id)
  
    res.status(200).json({
        ItemData
    })
  } catch (err) {
    console.log(err);
    
  }
}



export default connectDB(handler);