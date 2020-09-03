// npm install --save redux react-redux react-navigation react-navigation-header-buttons
// expo install react-native-gesture-handler react-native-reanimated
//npm install --save expo-font
//npm install --save validate.js 这个是用来判断输入是否准确的插件
// npm install --save redux-thunk 导入midwire

import React, { useState } from 'react';
import { createStore, combineReducers,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font'
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';


import productReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/orders';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

const rootReducer = combineReducers({
  products: productReducer,
  cart:cartReducer,
  orders:orderReducer
})
// ,composeWithDevTools() 这个是test时需要加到createStore上的
const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); 
//composeWithDevTools 只应用于dev

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => { console.log(err) }} />
    )
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  )
};

