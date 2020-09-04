export const ADD_ORDER = 'ADD_ORDER';
export const addOrder = (cartItems, totalAmount) => {
    //接收两个参数 cart中传入的 item和 总共的amount
    return async dispatch => {
        const response = await fetch(
            'https://rn-complete-guide-d23c6.firebaseio.com/order/u1.json', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                // 将js转化为json 
                title,
                description,
                imageUrl,
                price
            })
        });
        if (!response.ok){
            throw new Error("Something is wrong on order create!");
        }
        dispatch({
            type: ADD_ORDER,
            orderData: {
                items: cartItems,
                amount: totalAmount
            }
        });
    }
}