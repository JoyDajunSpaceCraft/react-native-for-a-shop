// npm install --save redux react-redux react-navigation react-navigation-header-buttons
// expo install react-native-gesture-handler react-native-reanimated

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers} from 'redux';
import {} from 'react-redux';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
