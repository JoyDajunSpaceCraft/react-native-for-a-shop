import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import CartItem from './CartItem';
import Colors from '../../constants/Colors'; 
const OrderItem = props => {

    return (
        <View style={styles.OrderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title='show details' />
        </View>
    )
};
const styles = StyleSheet.create({
    OrderItem:{ shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 2, height: 1 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,},

});

export default OrderItem;