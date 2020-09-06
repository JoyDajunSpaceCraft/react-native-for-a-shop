// 解决每次logout 的时候 不会跳转到auth界面的问题
// 因为在App.js中已经使用了ShopNavigator  而 每次转换需要进入shopNavigator内部 
// 编写能够 包裹App.js中的 <ShopNavigator>实现清理Redux的component
import React ,{useEffect, useRef}from 'react';
import {useSelector} from 'react-redux';
import {NavigationActions} from 'react-navigation';

import ShopNavigator from './ShopNavigator';

const NavigationContainer = props =>{

    const navRef = useRef();// directly render element in jsx
    // allowed us naviagte from inside the component even we are outside the navigator
    // 同时表示在 ShopNavigator中不需要再naviagtion 到Auth 因为一旦检测到 这里的 isAuth 改变
    // 到Auth

    const isAuth = useSelector(state => !!state.auth.token); // 获得redux中的全局变量 !! 表示如果没有拿到token isAuth也是 false

    useEffect (() =>{
        if(!isAuth){
            // 如果isAuth 不是true说明 没有拿到 token 也就是用户没有登录 
            navRef.current.dispatch(NavigationActions.navigate({routeName:'Auth'}))
        }
    },[isAuth])
    

    return <ShopNavigator ref={navRef}/>
};
export default NavigationContainer;

 