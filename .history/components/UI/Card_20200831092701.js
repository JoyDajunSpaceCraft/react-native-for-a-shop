import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    return (
        // 不但能从原始的style中获取 而且在能从 props中获取
        <View style={{ ...styles.card, ...props.style }}>
            {props.children}
            {/* 传入props.children可以实现将 使用 Card这个component的方法传入 */}
        </View>
    )

}
const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 2, height: 1 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    }
});
export default Card;