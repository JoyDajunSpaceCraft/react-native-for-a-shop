import PRODUCTS from '../../data/dummy-data';
import {
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT
} from '../actions/products';
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
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),
            }

        case UPDATE_PRODUCT:
            // 要看明白这里的数据结构!!!
            const productIndex = state.userProducts.findIndex(prod =>
                prod.id === action.pid); // 获取了 用户的product中应该修改的那一项的index
            const updatedProduct = new Product(
                // type:UPDATE_PRODUCT,
                // pid:id,
                // productData:{title,description,imageUrl}
                action.pid,// 方法中传入的pid

                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price
            );
            const updatedUserProducts = [...state.userProducts ];
            updatedUserProducts[productIndex] = updatedProduct;

            const availableProductsIndex = state.availableProducts.findIndex(prod =>
                prod.id === action.pid);
            const updatedAvailableProducts = [...state.availableProducts ];
            updatedAvailableProducts[availableProductsIndex] = updatedProduct;
            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            };
        case DELETE_PRODUCT:
            // 整体上删除 product  availableProducts userProducts 包括在cart中
            return {
                ...state,
                userProducts:
                    state.userProducts.filter(
                        product => product.id !== action.pid
                    ),
                availableProducts:
                    state.availableProducts.filter(
                        product => product.id !== action.pid
                    ),
            };
    }
    return state;
};