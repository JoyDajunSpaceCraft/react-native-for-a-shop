import React from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as CartActions from '../../store/actions/cart';


const ProductDetails = props => {
    const productId = props.navigation.getParam('productId');
    //state 第一个products 参数是App.js 里面的Reducer 第二个参数是 store/reducers里面的 availableProducts
    // console.log(productId)
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId));
    // console.log(selectedProduct.title)

    const dispatch = useDispatch();
    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.actions}>
                <Button color={Colors.primary} title="Add to Cart" onPress=
                {()=>{dispatch(CartActions.addToCart(selectedProduct))} }/>
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}

ProductDetails.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'

    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 0
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center',
    }

});


export default ProductDetails;