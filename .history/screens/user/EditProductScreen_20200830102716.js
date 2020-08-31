import React, { useState , useCallback, useEffect} from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as ProductActions from '../../store/actions/products';
const EditProductScreen = props => {

    // 在初始化参数之前先判断是在原有基础上更新还是 新建
    const prodId = props.navigation.getParam('productId');
    const editProdcut = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );
    const dispatch = useDispatch();


    const [title, setTitle] = useState(
        editProdcut ? editProdcut.title : ' ');
    const [imageUrl, setImageUrl] = useState(
        editProdcut ? editProdcut.imageUrl : '');
    const [price, setPrice] = useState('');//已经出现的商品的价格不能被再次修改
    const [description, setDescription] = useState(
        editProdcut ? editProdcut.description : '');

    const submitHandler = useCallback(() => {
        // 确保这个方法不会在每次render的时候都被创建
        if (editProdcut){
            dispatch(ProductActions.updateProduct(prodId,
                 title, 
                 description,
                 imageUrl))
        }else{
            dispatch(ProductActions.createProduct(title,
                description,
                imageUrl,
                +price //加上+后表示是int 而不是 string 
                )
            );
        }
    },[dispatch, imageUrl, title, description,price])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    },
        [submitHandler]
    )

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>TITLE</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => { setTitle(text) }}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>IMAGE URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={text => { setImageUrl(text) }}
                    />
                </View>
                {/* 检查 是不是已经有了这个商品 如果已经有就返回null */}
                {editProdcut ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>PRICE</Text>
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={text => { setPrice(text) }}
                    />
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>DESCRIPTION</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => { setDescription(text) }}
                    />
                </View>
            </View>
        </ScrollView>
    );
};
EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');// 获得从  EditProductScreen设置的参数
    return {
        headerTitle: navData.navigation.getParam("productId")
            ? 'Edit Product'
            : 'Add Product',//因为两种形式不一样 一个是已经有现成的product传入id 另一个是新建 所以没有id传入
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName={
                        Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                    }
                    onPress={submitFn}
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