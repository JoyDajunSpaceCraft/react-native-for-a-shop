// import React from 'react';
// import { FlatList, Text } from 'react-native';
// import { useSelector } from 'react-redux';

// import ProductItem from '../../components/shop/ProductItem';

// const ProductsOverviewScreen = props => {
//     // redux的useSelect 自动传入state参数
//     const products = useSelector(state => state.products.availableProducts); // reducer中的  availableProducts array

//     return (
//         <FlatList
//             data={products}
//             keyExtractor={item => item.id}
//             renderItem={itemData =>
//                 //这里的itemData 是 models/product 中定义的
//                 <ProductItem image={itemData.item.imageUrl}
//                     title={itemData.item.title}
//                     price={itemData.item.price}
//                     onViewDetail={() => {
//                         //ProductDetails
//                         props.navigation.navigate({
//                             routeName: 'ProductDetail',
//                             params: {
//                                 productId: itemData.item.id,
//                                 productTitle: itemData.item.title
//                             }
//                         })
//                     }}
//                     onAddToCart={() => { }}

//                 />}
//         />
//     );
// };

// ProductsOverviewScreen.navigationOptions = {
//     headerTitle: "All products"
// }

// export default ProductsOverviewScreen;
import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate('ProductDetail', {
              productId: itemData.item.id,
              productTitle: itemData.item.title
            });
          }}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products'
};

export default ProductsOverviewScreen;
