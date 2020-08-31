import React from 'react';
import { View, FlatList,Platform, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';

const OrderScreen = props => {
    //来源于 App.js中定义的orders orderReducer 和在reducers中定义的orders.js的initialState的order数组
    const orders = useSelector(state => state.orders.orders);
    return <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData =>
           <OrderItem date={itemData.item.date} amount={itemData.item.amount} />
        }
    />
};

OrderScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={
                        Platform.OS === 'android' ? 'md-menu' : 'ios-menu'
                    }
                    onPress={() => {
                        navData.navigation.toggleDrawer();// 表示点击左上角就可以打开 drawer 
                    }}
                />
            </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Cart"
                iconName={
                    Platform.OS === 'android' ? 'md-cart' : 'ios-cart'
                }
                onPress={() => {
                    navData.navigation.navigate('Cart') //这里的Cart 就是 stack navigator 中的 CartScreen 
                }}
            />
        </HeaderButtons>

    }

}

export default OrderScreen;