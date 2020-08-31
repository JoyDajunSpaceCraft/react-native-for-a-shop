import {ADD_TO_CART} from '../actions/cart';
const initialState = {
    items:{},// js object with id and extra title quantity
    totalAmont:0,
    imgUrl: '',
};

export default(state = initialState, action) => {
    switch (action.type){
        case ADD_TO_CART:
            const addedProduct= action.product;
            const addedProductPrice = addedProduct.price;
            const addedProductTitle = addedProduct.title;


    }

}