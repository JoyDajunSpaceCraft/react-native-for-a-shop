import React from 'react';
import { FlatList, View, StyleSheet, Button, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';

const CartScreen = props => {
    //来源于 App.js中定义的rootReducers 以及在reducers/cart中的totalAmount获取每一个toCart之后商品价格
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItem = useSelector(state => {
        // 转化为数组之后会在下面 FlatList 时 更好使用 
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            //将 items由object转换为Array
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedCartItems.sort((a,b)=> a.productId >b.productId ? 1:-1)
    });

    const dispatch = useDispatch();
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}> Total :
                     <Text style={styles.amount}>
                         为了确保最后不出现负号
                         ${Math.round(cartTotalAmount.toFixed(2) *100) / 100}
                    </Text>
                </Text>
                <Button
                    color={Colors.accent}
                    title="Order Now"
                    disabled={cartItem.length === 0} //如果是$0 说明不需要结算 disabled方法返回true时不执行 
                    onPress={() => {
                        dispatch(orderActions.addOrder(cartItem,cartTotalAmount))//虽然和redux中的定义数组不一样但是可以执行 
                    }} />
            </View>
            <FlatList
                data={cartItem}
                keyExtractor={item => item.productId}
                renderItem={
                    itemData =>
                     <CartItem
                        deleteAble//只要摆一个？？
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        onRemove={() =>{
                            dispatch(cartActions.removeFromCart(itemData.item.productId))}}
                    />
                }
            />

        </View >
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,//为了FlatList准备
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 2, height: 1 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});

CartScreen.navigationOptions = {
    headerTitle:'Your Carts'
}
export default CartScreen;