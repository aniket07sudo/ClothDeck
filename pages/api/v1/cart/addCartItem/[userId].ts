import Cart from "../../../../../models/CartModel";
import { ApiHandler } from "../../../../../lib/apiHandler";
import Variant from "../../../../../models/VariantModel";

const SaveProducts = async (req,res) => {

    console.log("User Id",req.query,req.body,typeof req.query.userId);

    const cart = await Cart.findOne({userId:req.query.userId});

    const item = await Variant.findOne({_id:req.body.variantId});

    console.log("Item Api Hitted",item);

    console.log("Api Hitted Cart",cart)
    

    const findSize = item.stock.find(item => item.size == req.body.size);

    if(!findSize) {
        throw 'Size not Available';
    }
    
    console.log(cart);
    let ResponseObj;

    if(cart) {
        const itemindex = cart.products.findIndex((item) => (item.variantId == req.body.variantId) && (item.size == findSize.size));
        console.log("itemindex",itemindex);
        let subTotal = 0;
      
        if(itemindex > -1) {
            let FoundProduct = cart.products[itemindex];
            FoundProduct.quantity = req.body.quantity;
            FoundProduct.price = findSize.price;
            FoundProduct.name = item.title;
            FoundProduct.size = findSize.size;
            cart.products[itemindex] = FoundProduct;
            console.log("FoundProduct",FoundProduct);

            console.log("Cart products",cart.products);
            
            console.log("Console Prices",cart.total,FoundProduct.price,FoundProduct.quantity);
            
            ResponseObj = {
                ...FoundProduct._doc,
                image:item.images[0],
                discountPercentage:item.discountPercentage,
                price:item.price,
                discounted_price:FoundProduct.price,
                subTotal:cart.total,
                stocks:item.stock
            }
            console.log("Res Obj",ResponseObj);

            console.log("Size Price",findSize.price,item.total);



        } else {
            cart.products.push({
                variantId:req.body.variantId,
                quantity:req.body.quantity,
                name:item.title,
                price:findSize.price,
                size:findSize.size
            });
            console.log("Cart -->",cart);
            // console.log("Console Prices",item.total,item.price,item.quantity);
            console.log("Console Prices",cart.total,item.price,item.quantity);

            ResponseObj = {
                variantId:req.body.variantId,
                quantity:req.body.quantity,
                name:item.title,
                // price:findSize.price,
                size:findSize.size,
                image:item.images[0],
                discountPercentage:item.discountPercentage,
                price:item.price,
                discounted_price:findSize.price,
                subTotal:cart.total,
                stocks:item.stock
            }
            console.log("Res Obj",ResponseObj);
            console.log("Size Price",findSize.price,item.total);


        }
        const doc = new Cart(cart);
        const CartUpdated = await doc.save();
        
        console.log("Crt Updated",ResponseObj);
        
        

        res.status(200).json({
            status:'success',
            data:ResponseObj
        })

    } else {
        const CartData = await Cart.findOneAndUpdate({ userId: req.query.userId },{ 
            $addToSet : { products : {
                variantId:req.body.variantId,
                quantity:req.body.quantity,
                name:item.title,
                price:findSize.price,
                size:findSize.size
            }}
         },{ upsert:true,new:true,setDefaultsOnInsert:false });

         console.log("Cart Data",CartData);
         ResponseObj = {
            ...CartData.products[0]._doc,
            image:item.images[0],
            discountPercentage:item.discountPercentage,
            price:item.price,
            discounted_price:findSize.price,
            subTotal:CartData.total,
            stocks:item.stock
         } 
         
        
        res.status(200).json({
            status:'success',
            data:ResponseObj
        })
    }
    
}


export default ApiHandler({
    post:SaveProducts
});