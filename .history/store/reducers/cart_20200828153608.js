import {ADD_TO_CART} from '../actions/cart';
import CartItem from '../../models/cart-model';
const initialState = {
    items:{},// js object with id and extra title quantity
    totalAmont:0,
    imgUrl: '',
};

export default(state = initialState, action) => {
    switch (action.type){
        case ADD_TO_CART:
            const addedProduct= action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;
            if (items[addedProduct.id]){
                //already have item in the cart 

            }else{
                const newCartItem = new CartItem(1, product )
            }

    }

}