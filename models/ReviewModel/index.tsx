import mongoose from "mongoose";
import Item from "../ItemModel";

const ReviewSchema = new mongoose.Schema({
    heading:{
        type:String,
        maxLength:30
    },
    description:{
        type:String,
    },
    rating:{
        type:Number,
        required:true
    },
    item_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Item',
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    images:[String],
    user_liked:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps:true
})


ReviewSchema.statics.calcAverageRatings = async function(itemId) {

    const stats = await this.aggregate([
        {
            $match : { item_id: itemId }
        },
        {
            $group : {
                _id: '$item_id',
                nRating: { $sum : 1 },
                avgRating : { $avg : '$rating' }
            }
        }
    ])

    if(stats.length > 0) {
        await Item.findByIdAndUpdate(itemId,{
            ratings_quantity:stats[0].nRating,
            ratings_average:stats[0].avgRating
        })
    } else {
        await Item.findByIdAndUpdate(itemId,{
            ratings_quantity:0,
            ratings_average:0
        })
    }

    
}

ReviewSchema.post('save',function() {
    
    this.constructor.calcAverageRatings(this.item_id);
})

ReviewSchema.pre(/^findOneAnd/,async function(next) {
    this.r = await this.findOne().clone();
    next();
})

ReviewSchema.post(/^findOneAnd/,async function() {
    await this.r.constructor.calcAverageRatings(this.r.item_id);
})

ReviewSchema.index({ item_id:1 , user_id:1 },{ unique:true });

var Review = mongoose.models.Review || mongoose.model('Review',ReviewSchema);

export default Review;