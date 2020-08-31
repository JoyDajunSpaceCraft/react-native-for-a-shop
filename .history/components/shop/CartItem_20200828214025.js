import React from 'react';
import {View, Text,StyleSheet, TouchableOpacity,Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons'

import CartItem from '../../models/cart-model';


const CartItem = props =>{

    return <View>
        <Text>
            <Text>QUANTITY</Text>
            <Text>TITLE</Text>
        </Text>
        <View>
            <Text>$AMOUNT</Text>
            <TouchableOpacity>
                <Ionicons />
            </TouchableOpacity>
            
        </View>
    </View>
};

const styles = StyleSheet.create({});

export default CartItem;