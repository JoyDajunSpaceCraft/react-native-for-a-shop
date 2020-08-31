import React from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';

const ProductItem = props =>{
    return (
        <View>
            <Image />
            <Text>TITLE</Text>
            <Text>PRICE</Text>
            <View>
                <Button title="View Details"/>
                <Button title="To Cart"/>

            </View>
        </View> 
        
    )

};

const styles = StyleSheet.create({});
export default ProductItem;