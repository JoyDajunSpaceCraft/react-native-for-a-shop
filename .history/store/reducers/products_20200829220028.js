import PRODUCTS from '../../data/dummy-data';
import {DELETE_PRODUCT} from '../actions/products';
import Product from '../../models/product';
const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};
export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            // 整体上删除 product  availableProducts userProducts 包括在cart中
            return {
                ...state,
                userProducts:
                    state.userProducts.filter(
                        prod => prod.id !== action.pid
                    ),
                availableProducts:
                    state.availableProducts.filter(
                        prod => prod.id !== action.pid
                    ),

            }
    }

    return state;
};