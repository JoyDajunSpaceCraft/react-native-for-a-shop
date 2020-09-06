// 解决每次logout 的时候 不会跳转到auth界面的问题
// 因为在App.js中已经使用了ShopNavigator  而 每次转换需要进入shopNavigator内部 
// 编写能够 包裹App.js中的 <ShopNavigator>实现清理Redux的component
import React from 'react';
import {useSelector} from 'react-redux';

import ShopNavigator from './ShopNavigator';

const NavigationContainer = props =>{
    const isAuth = useSelector(state => state.auth.token); // 获得redux中的全局变量

    return <ShopNavigator/>
};
export default NavigationContainer;

 