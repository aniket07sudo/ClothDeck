import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please Provide a Email']
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:true,
        select:false,
        validate:{
            validator:function(el) {
                return el == this.password;
            },
        message:'Passwords are not the same'
        }
    },
    image:{
        type:String,
        default:'/Images/guest.png',
    },
    role:{
        type:String,
        enum:['user','manager','admin'],
        default:'user'
    },
    email_verified:{
        type:Boolean,
        default:false
    },
    active:{
        type:Boolean,
        default:true
    },
    ip:{
        type:String
    }
},{
    timestamps:true
})

UserSchema.pre('save',async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    this.passwordConfirm = undefined;
    next();
})

UserSchema.methods.verifypassword = async function(candidatePassword:string,userPassword:string) {
    return await bcrypt.compare(candidatePassword,userPassword);
}

var User = mongoose.models.User || mongoose.model('User',UserSchema)

export default User;