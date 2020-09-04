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
                cartItems,
                totalAmount,
                date:new Date().toISOString()// toISOString 转换为ISO格式2020-09-03T13:10:57.299Z  YYYY-MM-DDTHH:mm:ss.sssZ
            })
        });
        if (!response.ok){
            throw new Error("Something is wrong on order create!");
        }
        const resData = await response.json
        dispatch({
            type: ADD_ORDER,
            orderData: {
                id:res
                items: cartItems,
                amount: totalAmount
            }
        });
    }
}