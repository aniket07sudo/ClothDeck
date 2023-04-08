import { NextApiRequest, NextApiResponse } from "next"
import { ApiHandler } from "../../../../lib/apiHandler"
import Variant from "../../../../models/VariantModel";

const SearchProducts = async(req:NextApiRequest,res:NextApiResponse) => {
    console.log("Searched Text",req.query.text);

    // let stats = await Variant.aggregate([
    //     {
    //       $search: {
    //         // index: "product", 
    //         compound: {
    //           should: [
    //             {
    //               text: {
    //                 query: req.query.text,
    //                 path: ["facets"],
    //                 fuzzy: {  
    //                   maxEdits: 1,
    //                 },
    //               },
    //             },
    //           ],

    //           must: [
    //             {
    //               text: {
    //                 query: req.query.text,
    //                 path: ["facets"],
    //                 fuzzy: {
    //                   maxEdits: 1,
    //                 },
    //               },
    //             },
    //           ],
            
    //         },
    //       },
    //     },
    //      {  $limit:10 }, 
    //     {
    //       $project: {
    //         _id: 1,
    //         facets:1
    //       },
    //     },
      
    //   ]);
    const stats = await Variant.aggregate([
        {
            $search: {
                index: 'suggestions', // searchVariants
                text: {
                  query: req.query.text,
                  path: {
                    'wildcard': '*'
                  },
                  fuzzy:{}
                }
            },
        },
        // {
        //     $lookup:{
        //         from:'items',
        //         localField:'itemId',
        //         foreignField:'_id',
        //         as:'productInfo'
        //     }
        // },
        // {
        //     $project : {
        //         title:1,
        //         itemId:1,
        //         image: { $first : '$images' },
        //         "productInfo" : {
        //             "category":1,
        //             "brand":1,
        //             "ratings_average":1,
        //             "ratings_quantity":1,
        //             "price":1,
        //         }
        //     }
        // },
        {
            $limit : 5
        }
    ])

    res.status(200).json({
        status:'success',
        // data:stats,
        data:stats
    })
}

export default ApiHandler({
    get:SearchProducts
})