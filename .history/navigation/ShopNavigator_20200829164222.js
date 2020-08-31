import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';//npm install --save react-navigation-drawer
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import Colors from '../constants/Colors';

const defaultNavOptions = {
    // extract defaultNavigationOptions 
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    headerBackTitleStyle: {
        fontFamily: 'open-sans-bold'
    }
};

// 针对 drawer 设置 icon 需要在每个navigator中单独设置 
const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawConfig => <Ionicons
            name={Platform.OS == 'android' ? 'md-cart' : 'ios-cart'}
            size={23}
            color={drawConfig.tintColor}// known whether the item is selected and change itself 
        />
    },
    defaultNavigationOptions: defaultNavOptions
});


// 针对 drawer 设置 icon 需要在每个navigator中单独设置 
const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawConfig => <Ionicons
            name={Platform.OS == 'android' ? 'md-list' : 'ios-list'}
            size={23}
            color={drawConfig.tintColor}// known whether the item is selected and change itself 
        />
    },
    defaultNavigationOptions: defaultNavOptions
});

const shopNavigator = createDrawerNavigator({
    // merge ProductsNavigator OrdersNavigator 总之就是套娃
    Products: ProductsNavigator,
    Orders: OrdersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
})

export default createAppContainer(shopNavigator)