import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

import Card from '../UI/Card';
import CartItem from './CartItem';
import Colors from '../../constants/Colors';


const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <Card style={styles.OrderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button
                color={Colors.primary}
                title={showDetails ?'hide details ': 'show details'}
                onPress={() => {
                    setShowDetails(prevState => !prevState) // prevState 是基于原来的state不论是true还是false
                }} />
            {showDetails &&
                //上面表达式是if (shoDetails is true)
                <View style={styles.detailItems}>
                    {/* 如果点击showDetails按钮 就会加载CartItem 需要 title price amount */}
                    {props.items.map((cartItem => <CartItem
                        // cartItem 来源于 reducer orders <- actions orders 
                        // addOrder 方法中传入cartItems<- CartScreen中dispatch传入的 orderActions.addOrder(cartItem...)
                        //是array形式
                        quantity={cartItem.quantity}
                        amount={cartItem.sum}
                        title={cartItem.productTitle}
                        key={cartItem.productId}//map要求有key 不一定 cartItem 要有key
                    />))}
                </View>}
        </Card>
    )
};
const styles = StyleSheet.create({
    OrderItem: { 
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    detailItems: {
        width: "100%",

    }
});

export default OrderItem;