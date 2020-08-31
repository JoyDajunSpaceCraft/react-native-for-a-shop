export const ADD_ORDER = 'ADD_ORDER';
export const addOrder = (cartItems, totalAmount) =>{
    //接收两个参数 cart中传入的 item和 总共的amount
    return {
        type:ADD_ORDER,
       orderDate:{
           items:cartItems,
           amount:totalAmount

       }

    }
}