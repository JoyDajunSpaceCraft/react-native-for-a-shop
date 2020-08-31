import React from 'react';
import { FlatList, View, StyleSheet, Button, Text } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../../constants/Colors';

const CartScreen = props => {
    //来源于 App.js中定义的rootReducers 以及在reducers/cart中的totalAmount获取每一个toCart之后商品价格
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    console.log('added cart')
        return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}> Total :
                     <Text style={styles.amount}>${cartTotalAmount}
                    </Text>
                </Text>
                <Button title="Order Now" onPress={() => {

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
    screen:{
        margin:20,
    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,//为了FlatList准备
        padding:10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 2, height: 1 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText:{
        fontFamily:'open-sans-bold',
        fontSize:18
    },
    amount:{
        color:Colors.accent
    }
});
export default CartScreen;