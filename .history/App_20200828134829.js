// npm install --save redux react-redux react-navigation react-navigation-header-buttons
// expo install react-native-gesture-handler react-native-reanimated
//npm install --save expo-font

import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading} from 'expo';
import * as font from '@expo-font'

import {} from '../';
import productReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';


const fetchFont =()=>{

}

const rootReducer = combineReducers({
  products:productReducer
}) 

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  )
};

