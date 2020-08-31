import React from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useSelector } from 'react-redux'

const ProductDetails = props => {
    const productId = props.navigation.getParam('productId');
    const selectProdunctor = useSelector(state=>state.products.availableProducts)

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