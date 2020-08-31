import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import Colors from '../constants/Colors'; 
const ProductsNavigator = createStackNavigator({
    ProductsOverview:ProductsOverviewScreen,

},{
    defaultNavigationOptions:{
        headerStyle:{

        }
    }
});