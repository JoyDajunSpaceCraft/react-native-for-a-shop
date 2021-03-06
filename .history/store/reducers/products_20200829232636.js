import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../actions/products';
import Product from '../../models/product';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};
export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT:
            const newProduct = new Product(
                new Date().toString(),
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price

            )
            

        case UPDATE_PRODUCT:

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