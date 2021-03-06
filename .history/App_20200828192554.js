// npm install --save redux react-redux react-navigation react-navigation-header-buttons
// expo install react-native-gesture-handler react-native-reanimated
//npm install --save expo-font

import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font'
import {composeWithDevTools} from 'redux-devtools-extension';


import productReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';
import cartReducer from './store/reducers/cart';


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

const rootReducer = combineReducers({
  products: productReducer
})

const store = createStore(rootReducer,composeWithDevTools()); 
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

