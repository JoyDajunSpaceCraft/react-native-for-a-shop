import React from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';

const ProductItem = props =>{
    return (
        <View style={styles.product}>
            <Image source={{uri:props.image}}/>
    <Text>{props.title}</Text>
            <Text>${props.price.toFix(2)}</Text> 
            {/* toFix是js给的func返回string有decimal */}
            <View>
                <Button title="View Details" onPress={props.onViewDetail}/>
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
        backgroundColor:'white',
        height:300,
        margin:20,

    }
});
export default ProductItem;