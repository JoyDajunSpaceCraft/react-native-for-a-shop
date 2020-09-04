import React from 'react';
import { ScrollView, View, KeyboardAvoidingView, StyleSheet } from 'react-native'

import Input from '../../components/UI/Input';
import Cart from '../../components/UI/Card';
import Input from '../../components/UI/Input';
const AuthScreen = props => {
    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
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
                        onValueChaneg={() => { }}
                        initialValue=""
                    />

                    <Input
                        id="passport"
                        label='Passport'
                        keyboardType="default"
                        required
                        email
                        autoCapitalize="none"
                        errorMessage="Please enter a valid email address"
                        onValueChaneg={() => { }}
                        initialValue=""
                    />

                </ScrollView>
            </Cart>
        </KeyboardAvoidingView>

    )

}
const styles = StyleSheet.create({});

export default AuthScreen;