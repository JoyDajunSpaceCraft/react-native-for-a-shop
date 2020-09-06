import React from 'react';
import {View,
     StyleSheet, 
     ActivityIndicator,
     AsyncStorage
    } from 'react-native';
import Colors from '../constants/Colors';

const StartupScreen = props =>{
     return <View>
          <ActivityIndicator size="large" color={Colors.primary}/>

     </View>
};
const styles = StyleSheet.create({});
export default StartupScreen;