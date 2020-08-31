import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import ProductItem from '../../components/shop/ProductItem';

const UserProductsScreen = props => {
    // state来源 state中products 来源于App.js定义的products: productReducer, userProducts来源于 reducers中的initialState
    const userProducts = useSelector(state => state.products.userProducts)

    return (
        <View>
            <Text>hehehe{userProducts}</Text>

            <FlatList
                date={userProducts}
                keyExtractor={item => item.id}
                renderItem={
                    itemData => {
                        <ProductItem
                            // itemData.item是以model中 product的定义为基准的
                            // 在用户自己的界面不需要 onViewDetail onAddToCart两个方法
                            image={itemData.item.imageUrl}
                            title={itemData.item.title}
                            price={itemData.item.price}
                            onViewDetail={() => { }}
                            onAddToCart={() => { }}
                        />
                    }
                }
            />
        </View>
    )
};

export default UserProductsScreen;