import React, {useEffect}  from 'react';
import {View,
     StyleSheet, 
     ActivityIndicator,
     AsyncStorage
    } from 'react-native';

import {useDispatch} from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const StartupScreen = props =>{
     const dispatch = useDispatch();



     useEffect(() =>{
          const tryLogin = async ()=>{
               const userData = await AsyncStorage.getItem('userData'); // 从 actions/auth.js中获得的saveDataToStorage 存储在用户手机中的数据
               if(!userData){
                    props.navigation.navigate('Auth');
                    return;
               }
               const transformData = JSON.parse(userData);
               const {token, userId, expiryDate} = transformData;
               const expirationDate = new Date(expiryDate);
               if(expirationDate <= new Date() ||!token || !userId){
                    // 如果过期时间小于当前时间 说明已经过期 
                    props.navigation.navigate('Auth');
                    return; 
               }
               props.navigation.navigate('Shop');
               dispatch(authActions.authenticate(userId, token));
          };
          tryLogin();
     },[dispatch])

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