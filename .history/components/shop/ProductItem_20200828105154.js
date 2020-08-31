import React from 'react';
import { View, Text, Image, StyleSheet, Button, ColorPropType } from 'react-native';

import Colors from '../../constants/Colors';
const ProductItem = props => {
    return (
        <View style={styles.product}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.image }} /> 
            </View>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            {/* toFixed是js给的func返回string有decimal */}
            <View style={styles.actions}>
                <Button color={Colors.primary} title="View Details" onPress={props.onViewDetail} />
                <Button color={Colors.primary} title="To Cart" onPress={props.onAddToCart} />
            </View>
        </View>

    )

};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 2, height: 1 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer:{
        width: '100%',
        height: '60%',
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        overflow:'hidden'
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 18,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
   
});
export default ProductItem;