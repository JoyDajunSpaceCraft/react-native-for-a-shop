import React from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';

const ProductItem = props =>{
    return (
        <View style={styles.product}>
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

const styles = StyleSheet.create({
    product:{
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:2,height:1},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white'
    }
});
export default ProductItem;