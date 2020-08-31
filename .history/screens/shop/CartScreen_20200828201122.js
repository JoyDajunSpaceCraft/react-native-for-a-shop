import React from 'react';
import { FlatList, View, StyleSheet, Button, Text } from 'react-native';
import { useSelector } from 'react-redux';

const CartScreen = props => {
    //来源于 App.js中定义的rootReducers 以及在reducers/cart中的totalAmount获取每一个toCart之后商品价格

    const products = useSelector(state => state.cart.totalAmont);
        return (
        <View>
            <View>
                <Text> Total :
                     <Text>${19.99}
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

const styles = StyleSheet.create({});
export default CartScreen;