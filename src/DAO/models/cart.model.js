/*
id_cart
products:{
    id_product
quantity
}*/

import { Schema,model } from "mongoose";

const schema = new Schema({
    products:
        {
        type:[
            {
                product:{
                    type: Schema.Types.ObjectId,
                    ref:'product'
                    },
                quantity:{type:String}
            }
        ],
        default:[]
    }
});

export const CartModel = model('cart', schema);