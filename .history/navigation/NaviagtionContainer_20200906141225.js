// 解决每次logout 的时候 不会跳转到auth界面的问题
// 因为在App.js中已经使用了ShopNavigator  而 每次转换需要进入shopNavigator内部 
// 编写能够 包裹App.js中的 <ShopNavigator>实现清理Redux的component
import React from 'react';

const NavigationContainer = props =>{

};
export default NavigationContainer;

 