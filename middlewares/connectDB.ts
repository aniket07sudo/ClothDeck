import mongoose from "mongoose";

const connectDB = () => async (req, res) => {
    
    if (mongoose.connections[0].readyState) {
      // Use current db connection
      console.log("Already Connected");

      return;
    }
    // Use new db connection
    // return await mongoose.connect('mongodb+srv://aniket_cool:aniket1234@cluster0.uzxdnvy.mongodb.net/?retryWrites=true&w=majority').then(res => console.log("Connected"));
    return await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL,{
      dbName:"clothdeckDB"
    }).then(res => console.log("Connected"))
  };
  
  export default connectDB;