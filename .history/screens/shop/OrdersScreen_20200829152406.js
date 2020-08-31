import React from 'react';
import {View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';


const OrderScreen = props =>{
    //来源于 App.js中定义的orders orderReducer 和在reducers中定义的order.js的initialState的order数组
    const orders = useSelector(state =>state.orders.orders)
};
export default OrderScreen;