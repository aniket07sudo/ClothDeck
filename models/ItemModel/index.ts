import mongoose from "mongoose";
import Review from "../ReviewModel";
import Variant from "../VariantModel";

const ItemSchema = new mongoose.Schema({
    description:[
        {
            heading:{
                type:String,
                default:'Detail Product'
            },
            detail:{
                type:String
            }
        },
    ],
    title:{
        type:String,
        required:true
    },
    category:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }],
    brand:{
        title:String,
        iconUrl:String
    },
    ratings_average:{
        type:Number,
        required:true,
        min:0,
        max:5,
        set:(val) => Math.round(val * 10) / 10
    },
    // price:{
    //     type:Number,
    //     required:true
    // },
    // discounted_price:{
    //     type:Number,
    // },
    ratings_quantity:{
        type:Number,
        default:0
    },
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

ItemSchema.virtual('reviews', {
    ref:'Review',
    foreignField:'item_id',
    localField:'_id',
    // options: { limit:3 },
    // justOne:false,
    count:true,
})

ItemSchema.virtual('variants',{
    ref:'Variant',
    foreignField:'itemId',
    localField:'_id'
})


ItemSchema.pre('deleteOne', async function() {
    console.log("Delete Middleware Started");

    const items = await this.findOne(this.getFilter()).clone();
    console.log("items",items);
    
    const variantsDeleted = await Variant.deleteMany({itemId:items._id}).clone();
    const ReviewsDeleted = await Review.deleteMany({item_id:items._id});
    console.log("Delete Middleware Ended",ReviewsDeleted);
    
})

var Item = mongoose.models.Item || mongoose.model('Item',ItemSchema);

export default Item;