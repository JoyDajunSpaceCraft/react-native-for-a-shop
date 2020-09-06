import React, {useEffect}  from 'react';
import {View,
     StyleSheet, 
     ActivityIndicator,
     AsyncStorage
    } from 'react-native';
import Colors from '../constants/Colors';

const StartupScreen = props =>{

     useEffect(() =>{
          const tryLogin = async ()=>{
               const userData = await AsyncStorage.getItem('userData').
          };
          tryLogin();
     },[])

     return <View style={styles.screen}>
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