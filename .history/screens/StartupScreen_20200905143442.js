import React from 'react';
import {View,
     StyleSheet, 
     ActivityIndicator,
     AsyncStorage
    } from 'react-native';
import Colors from '../constants/Colors';

const StartupScreen = props =>{
     return <View style={screen}>
     return <View style={styles.}>
          <ActivityIndicator size="large" color={Colors.primary}/>

     </View>
};
const styles = StyleSheet.create({
     screen:{
          flex:1,
          justifyContent:'center',
          alignItems:'center'

     }
});
export default StartupScreen;