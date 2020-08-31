import React from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const ProductDetails = props => {
    const productId = props.navigation.getParam('productId');
    //state 第一个products 参数是App.js 里面的Reducer 第二个参数是 store/reducers里面的 availableProducts
    const selectProdunctor = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId));

    return (
        <View>
            <Text>
                {selectProdunctor.title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({

});


export default ProductDetails;