import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
    },
    addresses:[{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true,
        },
        Address:{
            type:String,
            required:true
        },
        postalCode:{
            type:Number,
            length:6,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        isDefault:{
            type:Boolean,
            default:false,
            required:true
        }
    }],
    modifiedOn:{
        type:Date,
        default:Date.now()
    },
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})


var Address = mongoose.models.Address || mongoose.model('Address',AddressSchema);

export default Address;