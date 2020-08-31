import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform } from 'react-native'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import Colors from '../constants/Colors';
import OrdersScreen from '../screens/shop/OrdersScreen';


const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail:ProductDetailScreen,
    Cart:CartScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary:''
        },
        headerTitleStyle:{
            fontFamily:'open-sans-bold'
        },
        headerTintColor: Platform.OS === 'android' ? 'white':Colors.primary,
        headerBackTitleStyle:{
            fontFamily:'open-sans-bold'
        }
    }
});

export default createAppContainer(ProductsNavigator)