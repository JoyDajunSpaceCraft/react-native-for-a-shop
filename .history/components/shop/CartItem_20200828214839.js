import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import CartItem from '../../models/cart-model';


const CartItem = props => {

    return (
        <View style={styles.cartItem}>
            <Text style={styles.itemData}>
                <Text style={styles.mainText}>QUANTITY</Text>
                <Text style={styles.title}>TITLE</Text>
            </Text>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>$AMOUNT</Text>
                <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color="red"
                    />
                </TouchableOpacity>

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    cartItem: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        marginHorizontal:20//???
    },
    itemData: {
        flexDirection:'row',
        alignItems:'center',
    
    },
    price: {
        fontFamily:'open-sans',
        color:'#888',
        fontSize:18
    },
    mainText: {
        fontFamily:'open-sans-bold',
        fontSize:16
    },
    deleteButton: {
        marginLeft: 10
    },

});

export default CartItem;