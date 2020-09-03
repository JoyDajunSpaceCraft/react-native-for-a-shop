import React, { useEffect, useState } from 'react';
import { Text,FlatList, Platform, Button, ActivityIndicator, View , StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as CartActions from '../../store/actions/cart';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';

const ProductsOverviewScreen = props => {
    // redux的useSelect 自动传入state参数
    const products = useSelector(state => state.products.availableProducts); // reducer中的  availableProducts array
    const dispatch = useDispatch(); // useDispatch from redux

    const [isLoading, setIsLoading] = useState(false); //设置loading spinner

    useEffect(() => {
        const loadProduct = async () => {
            // await等待dispatch结束 设置isLoading 为false
            setIsLoading(true);
            await dispatch(productActions.fetchProducts()).then(set)// 在主界面上加载全部数据
            setIsLoading(false);
        };
        loadProduct();// 因为async不能直接用在useEffect上 因为asycn 返回的是一个promiss
    }, [dispatch])


    if(isLoading){
        return <View style={StyleSheet.centered}>
            <ActivityIndicator 
            size="large"
            color={Colors.primary}
            />
        </View>
    }

    if(!isLoading && products.length===0){
        return <View style={StyleSheet.centered}>
            <Text>No product file may be add something</Text>
        </View>
    }

    const selectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productId: id,
                productTitle: title
            }
        });
    }


    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                //这里的itemData 是 models/product 中定义的
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title) //优化代码结构！！！
                    }}
                >
                    {/* 转换为{props.children}之后将两个按钮作为内容传入而不是属性 */}
                    <Button
                        color={Colors.primary}
                        title="View Details"
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title) //优化代码结构！！！
                        }}
                    />
                    <Button
                        color={Colors.primary}
                        title="To Cart"
                        onPress={() => {
                            dispatch(CartActions.addToCart(itemData.item))
                        }} />
                </ProductItem>
            }
        />

    );
};

ProductsOverviewScreen.navigationOptions = navData => {
    //加上了navData 就变成动态传参的 方法了 
    return {
        //为了传递参数到 CartScreen
        headerTitle: "All products",
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={
                        Platform.OS === 'android' ? 'md-menu' : 'ios-menu'
                    }
                    onPress={() => {
                        navData.navigation.toggleDrawer();// 表示点击左上角就可以打开 drawer 
                    }}
                />
            </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Cart"
                iconName={
                    Platform.OS === 'android' ? 'md-cart' : 'ios-cart'
                }
                onPress={() => {
                    navData.navigation.navigate('Cart') //这里的Cart 就是 stack navigator 中的 CartScreen 
                }}
            />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    centered:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default ProductsOverviewScreen;
