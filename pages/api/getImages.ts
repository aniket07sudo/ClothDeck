import connectDB from "../../middlewares/mongodb"
import ImagesModel from "../../models/images";

async function handler(req,res) {

  try {
    const images = await ImagesModel.find()
  
    res.status(200).json({
      images
    })
  } catch (err) {
    console.log(err);
    
  }
}

export default connectDB(handler);