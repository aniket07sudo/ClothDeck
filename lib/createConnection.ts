import mongoose, { Mongoose } from "mongoose";
// dotenvs are already loaded by next.js from .env* files

const createConnectionManager = () => {
  let current: Mongoose | null = null;

  return {
    connect: async () => {
      if (current) return current;

      mongoose.set("strictQuery", false);
      // I think the options you are passing are deprecated/removed from mongoose 
      // const instance = await mongoose.connect('mongodb+srv://aniket_cool:aniket1234@cluster0.uzxdnvy.mongodb.net/?retryWrites=true&w=majority');
      const instance = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL,{
        dbName:'clothdeckDB'
      }).then(res => {
        require('../models/ItemModel/index');
          require('../models/ReviewModel/index');
          require('../models/UserModel/index');
          require('../models/VariantModel/index');
          require('../models/CategoryModel/index');
          require('../models/CartModel/index');
      })
      
      return instance;
    },
  };
};

export const manager = createConnectionManager();