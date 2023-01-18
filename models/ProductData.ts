import mongoose from "mongoose";


const SampleSchema = new mongoose.Schema({
    title:String,
    category:String,
    price:Number,
    discountedPrice:Number,
    imageUrl:String,
    rating:Number
})


var ProData = mongoose.models.ProductData || mongoose.model('ProductData',SampleSchema)

export default ProData;
