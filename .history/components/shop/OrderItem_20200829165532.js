import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import CartItem from './CartItem';
const OrderItem = props =>{

    return (
        <View>
            <View>
                <Text>$TOTAL</Text>
                <Text>date</Text>
            </View>
            <Button title='details'/>
            <CartItem/>
        </View>
    )
};
const styles = StyleSheet.create({});

export default OrderItem;