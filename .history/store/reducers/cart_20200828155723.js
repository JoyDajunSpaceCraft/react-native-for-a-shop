import { ADD_TO_CART } from '../actions/cart';
import CartItem from '../../models/cart-model';
const initialState = {
    items: {},// js object with id and extra title quantity
    totalAmont: 0,
    imgUrl: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            //  addedProduct.id is the key of items
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

            let updatedOrNewCartItem ;

            // const prodImage = addedProduct.imageUrl;
            if (state.items[addedProduct.id]) {
                //already have item in the cart 
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    prodPrice + state.items[addedProduct.id].sum
                );
            } else {
                updatedOrNewCartItem= new CartItem(1, prodPrice, prodTitle, prodPrice);
               
            }
            return {//拼接 替换
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },//保留原来的 state.items 再加上 新的
                totalAmont:state.totalAmont+prodPrice
            };

    }

}