import React from 'react';
import {View, Text, StyleSheet, Image, Button, ScrollView} from 'react-native';
import { useSelector } from 'react-redux';


const ProductDetails = props=>{
    const productId = props.navigation.getParam('productId')
    return (
        <View>
            <Text>
                The Product Detail Screen!
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({

});


export default ProductDetails;