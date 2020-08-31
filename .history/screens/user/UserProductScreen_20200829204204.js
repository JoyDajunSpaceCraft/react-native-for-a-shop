import React from 'react';
import {FlatList } from 'react-native';
import {useSelector, useDispatch } from 'react-redux'

import ProductItem from '../../components/shop/ProductItem';

const UserProductScreen =props =>{
    // state来源 state中products 来源于App.js定义的products: productReducer, userProducts来源于 reducers中的initialState
    const userProducts = useSelector(state =>state.products.userProducts)

    return <FlatList  
    date={userProducts}
    keyExtractor={item=>item.id}
    renderItem={
        itemData=>{
            
        }
    }
    />
};

export default UserProductScreen;