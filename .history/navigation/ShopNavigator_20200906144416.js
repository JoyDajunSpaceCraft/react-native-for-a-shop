import React from 'react'; // 因为使用了 <Ionicon>这样的jsx需要加上React的依赖
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
 // createSwitchNavigator 针对 登录界面的 nav 一旦登录到这个界面 之后就不会返回这个界面
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
//npm install --save react-navigation-drawer
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';


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
        // drawConfig是 在总的shopNavigator 中定义的 contentOptions ->activeTintColor
        drawerIcon: (drawConfig) => <Ionicons
            name={Platform.OS == 'android' ? 'md-cart' : 'ios-cart'}
            size={23}
            color={drawConfig.tintColor}
            // known whether the item is selected and change itself 
        />
    },
    defaultNavigationOptions: defaultNavOptions
});


// 针对 drawer 设置 icon 需要在每个navigator中单独设置 
const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        // drawConfig是 在总的shopNavigator 中定义的 contentOptions ->activeTintColor
        drawerIcon: (drawConfig) => <Ionicons
            name={Platform.OS == 'android' ? 'md-list' : 'ios-list'}
            size={23}
            color={drawConfig.tintColor}
            // known whether the item is selected and change itself 
        />
    },
    defaultNavigationOptions: defaultNavOptions
});

const AdminNavigator = createStackNavigator(
    {
        UserProducts: UserProductsScreen, //用户自己创建商品界面
        EditProduct: EditProductScreen
    }, {
    navigationOptions: {
        // drawConfig是 在总的shopNavigator 中定义的 contentOptions ->activeTintColor
        drawerIcon: (drawConfig) => <Ionicons
            name={Platform.OS == 'android' ? 'md-create' : 'ios-create'}
            size={23}
            color={drawConfig.tintColor}
            // known whether the item is selected and change itself 
        />
    },
    defaultNavigationOptions: defaultNavOptions
});

const shopNavigator = createDrawerNavigator({
    // merge ProductsNavigator OrdersNavigator 总之就是套娃
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
         //这个activeTintColor 就是能够应用于所有drawerIcon中 的 drawCofig传入的参数
    },
    contentComponet: props => {
        const dispatch = useDispatch();
        //SafeAreaView 适用于此处 
        return (
            // <View style={{ flex: 1, paddingTop:'10' }}>
            //     <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            //         <DrawerNavigatorItems {...props} />
            //         <Button
            //             title="Logout"
            //             color={Colors.primary}
            //             onPress={() => { dispatch(authActions.logout())
            //                 // props.navigation.navigate("Auth");
            //             }}
            //         />
            //     </SafeAreaView>

            // </View>
            <Text>newnewnew</Text>
        )
    }

})

const AuthNavigator = createSwitchNavigator({
    Auth: AuthScreen,// Auth 作为第一个screen
},
    {
        defaultNavigationOptions: defaultNavOptions
    });
const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: shopNavigator
})

export default createAppContainer(MainNavigator)