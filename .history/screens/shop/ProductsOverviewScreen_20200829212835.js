import React from 'react';
import { FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as CartActions from '../../store/actions/cart';
import HeaderButton from '../../components/UI/HeaderButton';

const ProductsOverviewScreen = props => {
    // redux的useSelect 自动传入state参数
    const products = useSelector(state => state.products.availableProducts); // reducer中的  availableProducts array
    const dispatch = useDispatch(); // useDispatch from redux
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
                    onViewDetail={() => {
                        // console.log(itemData.item.title)
                        //ProductDetails
                        props.navigation.navigate({
                            routeName: 'ProductDetail',
                            params: {
                                productId: itemData.item.id,
                                productTitle: itemData.item.title
                            }
                        });
                    }}
                    onAddToCart={() => { dispatch(CartActions.addToCart(itemData.item)) }}
                />}
        />

    );
};

ProductsOverviewScreen.navigationOptions = navData => {
    //加上了navData 就变成动态传参的 方法了 
    return {
        //为了传递参数到 CartScreen
        // headerTitle: "All products",
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

export default ProductsOverviewScreen;
