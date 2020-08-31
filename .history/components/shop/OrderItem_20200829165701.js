import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import CartItem from './CartItem';
const OrderItem = props =>{

    return (
        <View style={styles.OrderItem}>
            <View style={styles.summary}>
    <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
    <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button title='show details'/>
        </View>
    )
};
const styles = StyleSheet.create({});

export default OrderItem;