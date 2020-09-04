export const ADD_ORDER = 'ADD_ORDER';
export const addOrder = (cartItems, totalAmount) => {
    //接收两个参数 cart中传入的 item和 总共的amount
    return async dispatch=>{
        dispatch{
            type: ADD_ORDER,
            orderData: {
                items: cartItems,
                amount: totalAmount
            }
    }
    return 
    };
};