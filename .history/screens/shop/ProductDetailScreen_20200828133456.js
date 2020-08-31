import React from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const ProductDetails = props => {
    const productId = props.navigation.getParam('productId');
    //state 第一个products 参数是App.js 里面的Reducer 第二个参数是 store/reducers里面的 availableProducts
    // console.log(productId)
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId));
    // console.log(selectedProduct.title)
    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <Button title="Add to Cart" onPress={() => { }} />
            <Text style={style.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={style.descirption}>{selectedProduct.descirption}</Text>
        </ScrollView>
    )
}

ProductDetails.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}
const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:300
    },
    price:{
        fontSize:20,
        color:'#888',
        textAlign:'center',
        marginVertical:20,
    },
    descirption:{
        fontSize:40,
        textAlign:'center',
    }

});


export default ProductDetails;