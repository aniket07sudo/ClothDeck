import Cart from "../../../../../models/CartModel";
import { ApiHandler } from "../../../../../lib/apiHandler";

const DeleteCartItem = async(req,res) => {

    const RemovedItem = await Cart.updateOne({userId:req.query.userId},{
        $pull:{
            products : { _id: req.body.cartProductId }
        },
    });

    res.status(400).json({
        status:'success',
        RemovedItem
    })

}

export default ApiHandler({
    delete:DeleteCartItem
})


