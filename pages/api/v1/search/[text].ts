import { NextApiRequest, NextApiResponse } from "next"
import { ApiHandler } from "../../../../lib/apiHandler"
import Variant from "../../../../models/VariantModel";

const SearchProducts = async(req:NextApiRequest,res:NextApiResponse) => {
    console.log("Searched Text",req.query.text);
    const stats = await Variant.aggregate([
        {
            $search: {
                index: 'searchVariants',
                text: {
                  query: req.query.text,
                  path: {
                    'wildcard': '*'
                  },
                  fuzzy:{}
                }
            },
          
        },
        {
            $lookup:{
                from:'items',
                localField:'itemId',
                foreignField:'_id',
                as:'productInfo'
            }
        },
        {
            $unwind:{
                path:'$images'
            }
        },
        {
            $project : {
                title:1,
                itemId:1,
                image:'$images',
                "productInfo" : {
                    "category":1,
                    "brand":1,
                    "ratings_average":1,
                    "ratings_quantity":1,
                    "price":1,
                }
            }
        }
    ])

    res.status(200).json({
        status:'success',
        data:stats
    })
}

export default ApiHandler({
    get:SearchProducts
})