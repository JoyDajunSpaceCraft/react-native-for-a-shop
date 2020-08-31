// npm install --save redux react-redux react-navigation react-navigation-header-buttons
// expo install react-native-gesture-handler react-native-reanimated

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers} from 'redux';
import { Provider} from 'react-redux';

import productReducer from './store/reducers/products';

export default function App() {
 return (
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
