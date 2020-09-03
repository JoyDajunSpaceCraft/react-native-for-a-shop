import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

// 简化 EditProductScreen 中输入项
const Input = props => {
    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>TITLE</Text>
            <TextInput
                style={styles.input}
                // value={title}
                value={formState.inputValues.title}
                onChangeText={textChangeHandler.bind(this, 'title')}//textChangeHandler最后的一个参数会作为React Native 自动传入 所以不需要再调用时bind
                keyboardType='default'
                autoCapitalize='sentences'
                // autoCorrect=''
                returnKeyType='next'//  点击界面上return 时会自动跳转到 下一行
            />
            {!formState.inputValidities.title && <Text>Please enter a valid title</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,

    }, 
});
export default Input;