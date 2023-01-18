import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
    },
    products:[{
        variantId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Variant',
            required:true,
            unique:true
        },
        quantity:{
            type:Number,
            required:true,
            max:10
        },
        name:{
            type:String,
            required:true
        },
        size:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        }
    }],
    status:{
        type:String,
        enum:['active','inactive','pending'],
        default:'inactive'
    },
    modifiedOn:Date,
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

CartSchema.virtual('total').get(function() {
    let total = this.products.reduce((acc,curr) => acc + (curr.quantity * curr?.price),0);
    return total;
})


var Cart = mongoose.models.Cart || mongoose.model('Cart',CartSchema);

export default Cart;