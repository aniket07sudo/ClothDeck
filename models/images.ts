import mongoose from "mongoose";

const SampleSchema = new mongoose.Schema({
    img_url:String
})


var Sample = mongoose.models.Image || mongoose.model('Image',SampleSchema)

export default Sample;
