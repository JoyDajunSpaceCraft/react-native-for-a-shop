import React, { useReducer } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const inputReducer = useReducer(
    state, action
)

// 简化 EditProductScreen 中 输入项
const Input = props => {
    const [] = useReducer(
        inputReducer,
        {
            value:props.initialValue ? props.initialValue :'',
            isValid: props.initiallyValid,
             touched: //用户是否点击这里

        }
        )

    const textChangeHandler = text => {

    }
    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.labelName}</Text>
            <TextInput
                {...props}// 所有外界传入的props全都能用上
                style={styles.input}
                value={formState.inputValues.title}
                onChangeText={textChangeHandler}//textChangeHandler最后的一个参数会作为React Native 自动传入 所以不需要再调用时bind
            />
            {!formState.inputValidities.title &&
                (<Text>{props.errorText}</Text>)}
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