import React from 'react';
import { FlatList, View, StyleSheet, Button, Text } from 'react-native';

const CartScreen = props => {
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
        </View >
    )
}

const styles = StyleSheet.create({});
export default CartScreen;