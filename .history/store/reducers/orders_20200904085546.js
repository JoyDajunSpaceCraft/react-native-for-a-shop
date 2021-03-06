import { ADD_ORDER,SET_ORDERS } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
    orders: []
};
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Order(
                action.orderData.id,// 这个id 是action中的resData.name 也就是 firebase中给的id
                // new Date().toString(),  //对应的是order-model中的 id
                action.orderData.items, // item
                action.orderData.amount, // total amount
                action.orderData.date
            );//date
            return {
                ...state,//即使现在copy一份是redundant多余的 但是要保证已经copy了
                orders: state.orders.concat(newOrder)
            };
        case SET_ORDERS:
            return {
                orders:action.orders//为什么直接就返回了orders因为在action中loadOrder方法已经将所有参数传入
            }
    }
    return state;
}