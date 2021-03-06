import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
const EditProductScreen = props => {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>TITLE</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>IMAGE URL</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>PRICE</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>DESCRIPTION</Text>
                    <TextInput style={styles.input} />
                </View>
            </View>
        </ScrollView>
    );
};
EditProductScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam("productId")
            ? 'Edit Product'
            : 'Add Product',//因为两种形式不一样 一个是已经有现成的product传入id 另一个是新建 所以没有id传入
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName={
                        Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark '
                    }
                    onPress={() => {
                    }}
                />
            </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,

    },



});

export default EditProductScreen;