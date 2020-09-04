import React from 'react';
import { ScrollView, View, KeyboardAvoidingView, StyleSheet } from 'react-native'

import Input from '../../components/UI/Input';
import Cart from '../../components/UI/Card';
const AuthScreen = props => {
    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            style={styles.screen}
        >

            <Cart style={styles.authContainer}>
                <ScrollView />
            </Cart>
        </KeyboardAvoidingView>

    )

}
const styles = StyleSheet.create({});

export default AuthScreen;