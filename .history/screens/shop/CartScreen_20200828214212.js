import React from 'react';
import { FlatList, View, StyleSheet, Button, Text } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../../constants/Colors';

const CartScreen = props => {
    //来源于 App.js中定义的rootReducers 以及在reducers/cart中的totalAmount获取每一个toCart之后商品价格
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItem = useSelector(state=>{
        const transformedCartItems = [];
        for (const key in state.cart.items){
            //将 items由object转换为Array
            transformedCartItems.push({
                productId:key,
                productTitle:state.cart.items[key].productTitle,
                productPrice:state.cart.items[key].productPrice,
                quantity:state.cart.items[key].quantity,
                sum:state.cart.items[key].sum
            })
        }
        return transformedCartItems
    });
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}> Total :
                     <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}
                    </Text>
                </Text>
                <Button
                 color={Colors.accent} 
                title="Order Now"
                disabled={ cartItem.length===0} //如果是$0 说明不需要结算 disabled方法返回true时不执行 
                onPress={() => {
                }} />
            </View>
            {/* <FlatList/> */}
            <View>
                <Text>CART ITEMS</Text>
            </View>
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
export default CartScreen;