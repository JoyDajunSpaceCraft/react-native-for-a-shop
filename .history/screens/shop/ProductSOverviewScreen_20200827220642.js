import React from 'react';
import { View, FlatList, } from 'react-native';
import { useSelector } from 'react-redux';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => ); // redux的useSelect 自动传入state参数
    return (
    <FlatList>

    </FlatList>
    );
};

export default ProductsOverviewScreen;
