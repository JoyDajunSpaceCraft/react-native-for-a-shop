import React from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const ProductDetails = props => {
    const productId = props.navigation.getParam('productId');
    //state 第一个products 参数是App.js 里面的Reducer 第二个参数是 store/reducers里面的 availableProducts
    console.log(productId)
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId));
    // console.log(selectedProduct.title)
    return (
        <View>
            <Text>
                {selectedProduct.title}
            </Text>
        </View>
    )
}

ProductDetails.navigationOptions= navData =>{
    return {
        headerTitle:navData.navigation.getParam('productTitle')
    }
}
const styles = StyleSheet.create({

});


export default ProductDetails;