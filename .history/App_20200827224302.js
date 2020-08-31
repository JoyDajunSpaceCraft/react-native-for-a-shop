// npm install --save redux react-redux react-navigation react-navigation-header-buttons
// expo install react-native-gesture-handler react-native-reanimated

import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import productReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';


const rootReducer = combineReducers({
  products:productReducer
}) 

const store = createStore(rootReducer);


export default function App() {
  retunr (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
