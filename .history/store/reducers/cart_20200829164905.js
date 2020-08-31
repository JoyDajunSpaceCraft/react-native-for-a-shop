import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import {ADD_ORDER} from '../actions/orders'
import CartItem from '../../models/cart-model';

const initialState = {
    // item 是以 productId为id price等为内容的object 详细内容 同 CartItem
    items: {},// js object with id and extra title quantity

    totalAmount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            //  addedProduct.id is the key of items
            const addedProduct = action.product; //action 是根据actions/cart中定义addToCart方法中传入的
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

            let updatedOrNewCartItem; //设置为变量

            // state.items是在 此reducer中定义的initialState中获得的
            // 根据id找到对应的 items
            if (state.items[addedProduct.id]) {
                //already have item in the cart 
                updatedOrNewCartItem = new CartItem(
                    //限制了到底要输入什么
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    prodPrice + state.items[addedProduct.id].sum
                );
            } else {
                updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);

            }
            return {//拼接 替换
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },//保留原来的 state.items 再加上 新的
                totalAmount: state.totalAmount + prodPrice
            };
        case REMOVE_FROM_CART:
            // cart中的删除按钮
            // 分为删除整个商品 还是删除一个商品
            const selectedCartItem = state.items[action.pid];
            const currentQuantity = selectedCartItem.quantity;// action 是 由actions/cart 中 removeFromCart方法中传入的pid
            let updatedCartItems;// 需要是变量
            if (currentQuantity > 1) {
                // need to reduce it not to erase it 
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                );
                updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
            } else {

                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.pid];//js自带语法 删除 []中的特定 id元素        
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            };
        case ADD_ORDER:

    }
    return state;

}