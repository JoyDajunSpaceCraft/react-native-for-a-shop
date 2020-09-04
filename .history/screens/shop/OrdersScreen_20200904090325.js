import React, { useEffect , useState} from 'react';
import { View, FlatList, Platform, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as orderActions from '../../store/actions/orders';
const OrderScreen = props => {
    //来源于 App.js中定义的orders orderReducer 和在reducers中定义的orders.js的initialState的order数组
    const orders = useSelector(state => state.orders.orders);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const loadOrder = useCallback(
       async () => {
           setError(null);
           setIsLoading(true);
            try {
                await dispatch(orderActions.fetchOrders());

            }catch(err){
                setError(err)
            }
            set
        },
        [input],
    )

    useEffect(() =>{

    })
    return <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData =>
            //这里参数传入的引入需要查看 models/order中怎样定义一个order中的参数名的
            // this.id = id;
            // this.items = items;
            // this.totalAmount = totalAmount;
            // this.date = date;
            <OrderItem
                date={itemData.item.readableDate}
                amount={itemData.item.totalAmount}
                items={itemData.item.items}
            />
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