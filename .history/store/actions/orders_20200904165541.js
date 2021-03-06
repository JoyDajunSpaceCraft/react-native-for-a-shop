import Order from "../../models/order";
export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';// 实现order 的fetch

export const fetchOrders = () => {
    // 显示在 OrdersScreen界面的 返回的就是orders 
    return async dispatch => {
        // any asyn code you want 
        const userId = getState().auth.userId;
        try {
            const response = await fetch(
                `https://rn-complete-guide-d23c6.firebaseio.com/order/${userId}.json`);
            // GET 是默认方法所以不用 写method 而且不需要 header和body

            if (!response.ok) {
                //检查response response.ok说明是200
                throw new Error('something is wrong ');
            }
            const resData = await response.json();
            const loadedOrders = []

            for (const key in resData) {
                loadedOrders.push(
                    new Order(
                        key,
                        resData[key].cartItems,
                        resData[key].totalAmount,
                        new Date(resData[key].date)//因为 resData[key].date是string 所以这里设置为 new Date 转换为 object
                    )
                )
            }
            dispatch({
                type: SET_ORDERS,
                orders:loadedOrders
            });
        } catch (err) {
            throw err;
        }
    };
};
export const addOrder = (cartItems, totalAmount) => {
    //接收两个参数 cart中传入的 item和 总共的amount
    const date = new Date();
    return async (dispatch,getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(
            `https://rn-complete-guide-d23c6.firebaseio.com/order/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                // 将js转化为json 
                cartItems,
                totalAmount,
                date: date.toISOString()// toISOString 转换为ISO格式2020-09-03T13:10:57.299Z  YYYY-MM-DDTHH:mm:ss.sssZ
            })
        });
        if (!response.ok) {
            throw new Error("Something is wrong on order create!");
        }
        const resData = await response.json;
        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: resData.name,
                items: cartItems,
                amount: totalAmount,
                date: date
            }
        });
    }
}