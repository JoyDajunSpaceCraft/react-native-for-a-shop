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
               const userData = await AsyncStorage.getItem('userData'); // 从 actions/auth.js中获得的saveDataToStorage 存储在用户手机中的数据
               if(!userData){
                    props.navigation.navigate('Auth');
                    return;
               }

               const transformData = JSON.parse(userData);
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