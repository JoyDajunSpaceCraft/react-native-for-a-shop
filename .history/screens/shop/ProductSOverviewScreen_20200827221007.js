import React from 'react';
import { View, FlatList,Text } from 'react-native';
import { useSelector } from 'react-redux';

const ProductsOverviewScreen = props => {
    // redux的useSelect 自动传入state参数
    const products = useSelector(state => state.products.availableProducts); // reducer中的  availableProducts array

    return (
    <FlatList 
    data={products}
    keyExtractor={item=>item.id}
    renderItem={itemData =>{

    }}
    />
    );
};

export default ProductsOverviewScreen;
