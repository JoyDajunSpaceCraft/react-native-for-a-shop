import React from 'react';
import { FlatList, View, StyleSheet, Button, Text } from 'react-native';
import {useSelector} from 'react-redux';

const CartScreen = props => {
    const products = useSelector(state=>state.cart)
    return (
        <View>
            <View>
                <Text> Total :
                     <Text>${19.99}
                    </Text>
                </Text>
                <Button title="Order Now" onPress={() =>{

                }}/>
            </View>
            {/* <FlatList/> */}
            <View>
                <Text>CART ITEMS</Text>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({});
export default CartScreen;