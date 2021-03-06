import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

import Card from '../UI/Card';
// import Colors from '../../constants/Colors';
const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <Card style={styles.product}>
            
            <View style={styles.touchable}>
                <TouchableCmp onPress={props.onSelect} useForeground>
                    <View>
                        {/* useForeground作用于 Android 是将波纹效果作用于当前模块而不加上背景模块 */}
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: props.image }} />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                            {/* toFixed是js给的func返回string有decimal */}
                        </View>
                        <View style={styles.actions}>
                            {props.children}
                            {/* <Button color={Colors.primary} title="View Details" onPress={props.onViewDetail} />
                            <Button color={Colors.primary} title="To Cart" onPress={props.onAddToCart} /> */}
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </Card>
    )

};

const styles = StyleSheet.create({
    product: {
       
        height: 300,
        margin: 20,
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10
    },
    details: {
        alignItems: 'center',
        height: '17%',
        padding: 10
      },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden' //加上了overflow 是不让 product的style中 radius在图片中覆盖掉图片本身的radius
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2,
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        color: '#888'
    },
    actions: {
        fontFamily:'open-sans-bold',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    },

});
export default ProductItem;