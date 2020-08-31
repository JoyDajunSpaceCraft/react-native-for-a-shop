import React from 'react';
import {View, StyleSheet } from 'react-native';

const Card = props =>{
    return <View style={styles.card}>
        {props.children}

    </View>

}
const styles = StyleSheet.create({});
export default Card