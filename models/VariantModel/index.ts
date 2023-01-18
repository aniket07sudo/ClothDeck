import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    itemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Item',
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discounted_price:{
        type:Number
    },
    images:[{
        type:String,
        select:true
    }],
    attr:{
        color:{
            type:String
        }
    },
    facets:[String],
    stock:[
        {
            size:{
                type:String,
                enum:['XS','S','M','L','XL','XXL','XXXL','22','24','26','28','30','32','34','36','38','40','42','44','46','48'],
            },
            count:Number,
            price:Number
        }
    ]
},{
    toJSON : { virtuals:true },
    toObject : { virtuals:true },
})


VariantSchema.virtual('discountPercentage').get(function() {
    let val = (((this.price - this.discounted_price) / this.price) * 100);
    return Math.round(val);
})


var Variant = mongoose.models.Variant || mongoose.model('Variant',VariantSchema);

export default Variant;