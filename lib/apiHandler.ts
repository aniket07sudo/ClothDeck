import { NextApiRequest , NextApiResponse } from "next"
import mongoose from "mongoose";

export function ApiHandler(handler:any) {
    return async(req:NextApiRequest,res:NextApiResponse) => {
        const method = req.method?.toLowerCase();
        console.log(handler);
        
        if(!handler[method]) {
            return res.status(405).json({
                status:'error',
                message:'Method Not Allowed'
            })
        }

        try {
            if(!mongoose.connections[0].readyState) {
                mongoose.set("strictQuery", false);

                await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL,{
                    dbName:'clothdeckDB',
                }).then(res => {
                   
                })
                require('../models/ItemModel/index');
                require('../models/ReviewModel/index');
                require('../models/UserModel/index');
                require('../models/VariantModel/index');
                require('../models/CategoryModel/index');
                require('../models/CartModel/index');
                
                
            }
            await handler[method](req,res);
            
        } catch(err) {
            console.log(err);
            
            res.status(500).json({
                status:'Error',
                message:'Global Error',
                error:err
            })
        }
    }
}