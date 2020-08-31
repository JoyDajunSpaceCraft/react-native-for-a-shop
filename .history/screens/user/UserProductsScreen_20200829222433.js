import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as ProductActions from '../../store/actions/products'

const UserProductsScreen = props => {
    // state来源 state中products 来源于App.js定义的products: productReducer, userProducts来源于 reducers中的initialState
    // 在model中的product！！！
    const userProducts = useSelector(state => state.products.userProducts)
    // console.log(userProducts)
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', { productId: id }); // 点击就指向 EditProduct  并且传入参数 id 
    }

    return (
        // const
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={
                itemData => //这里不是要返回方法而是返回obj
                    <ProductItem
                        // itemData.item是以model中 product的定义为基准的
                        // 在用户自己的界面不需要 onViewDetail onAddToCart两个方法
                        image={itemData.item.imageUrl}
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onSelect={() => {
                            editProductHandler(itemData.item.id)
                        }}
                    >
                        <Button
                            color={Colors.primary}
                            title="Edit"
                            onPress={() => {
                                editProductHandler(itemData.item.id) //优化代码结构！！！
                            }}
                        />
                        <Button
                            color={Colors.primary}
                            title="Delete"
                            onPress={() => {
                                dispatch(ProductActions.deleteProduct(itemData.item.id))
                            }} />
                    </ProductItem>
            }
        />

    )
};

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your products",
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
            </HeaderButtons>
    }
}

export default UserProductsScreen;