import React from 'react';
import {
    ScrollView,
    View,
    Button,
    KeyboardAvoidingView,
    StyleSheet
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient' //npm install --save expo-linear-gradient

import Input from '../../components/UI/Input';
import Cart from '../../components/UI/Card';
import Colors from '../../constants/Colors';

const AuthScreen = props => {
    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient colors={['#ffedff','#ffe3ff']}>
                <Cart style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label='E-Mail'
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage="Please enter a valid email address"
                            onInputChange={() => { }}
                            initialValue=""
                        />

                        <Input
                            id="password"
                            label='Password'
                            keyboardType="default"
                            secureTextEntry// TextInput 支持  secureTextEntry 防止用户密码泄露
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorMessage="Please enter a valid password"
                            onInputChange={() => { }}
                            initialValue=""
                        />
                        <Button
                            title="Login"
                            color={Colors.primary}
                            onPress={() => { }} />

                        <Button
                            title="Switch to Sign up"
                            color={Colors.accent}
                            onPress={() => { }}
                        />

                    </ScrollView>
                </Cart>
            </LinearGradient>
        </KeyboardAvoidingView>

    )
}

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 500,
        padding: 20
    }
});

export default AuthScreen;