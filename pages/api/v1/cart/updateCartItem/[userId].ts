import Cart from "../../../../../models/CartModel";
import { ApiHandler } from "../../../../../lib/apiHandler";
import Variant from "../../../../../models/VariantModel";

const UpdateCartItem = async(req,res) => {

    const UserId = req.query.userId;

    const { variantId,quantity,size } = req.body;

    const FoundVariant = await Variant.findById(variantId);

    const SizeIndex = FoundVariant.stock.findIndex(item => item.size == size);

    if(SizeIndex < 0) {
        throw 'Size Not Available'
    }


    console.log("Found Variant ",FoundVariant);
    

    if(quantity <= 0) {
        throw 'Invalid Quantity'
    }

    if(!FoundVariant) {
        throw 'Product Not Found'
    }

    const FoundCart = await Cart.findOne({userId:UserId});

    console.log("Found Cart",FoundCart);
    

    const UpdateIndex = FoundCart.products.findIndex(item => item.variantId == variantId);

    console.log("Price -----",FoundVariant.stock[SizeIndex].price);
    


    if(UpdateIndex < 0) {
        throw 'Size Not Found'
        
    } else {
        FoundCart.products[UpdateIndex].quantity = quantity;
        FoundCart.products[UpdateIndex].size = size;
        FoundCart.products[UpdateIndex].price =  FoundVariant.stock[SizeIndex].price;

    }

    
    const doc = new Cart(FoundCart);
    
    const ItemsUpdated = await doc.save();

    console.log("ItemUpdated",ItemsUpdated);
    

    res.status(200).json({
        status:'success',
        total:ItemsUpdated.total
    })

}

export default ApiHandler({
    patch:UpdateCartItem
})


