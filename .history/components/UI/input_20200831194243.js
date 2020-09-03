import React, { useReducer, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';


const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
        default:
            return state
    }
}



// 简化 EditProductScreen 中 输入项
const Input = props => {
    const [inputState, dispatch] = useReducer(
        // 代表state
        inputReducer,
        {
            value: props.initialValue ? props.initialValue : '',
            isValid: props.initiallyValid,
            touched: false,//用户是否点击这里
        }
    );

    //TODO 这里不是很理解 为什么会自动传给props？
    const { onInputChange, id } = props; // 指定要获取什么props 保证其他props改变的时候不会再次渲染
    useEffect(() => {
        // 在每次的value 改变的时候再加载 是EditProductScreen 传入的参数 保证监听 是否修改
        if (inputState.touched) {
            // 执行的是EditScreen中的 inputChangeHandler 需要传入的参数是 输入的值， 以及这个值是否有效
            onInputChange( id,inputState.value, inputState.isValid)
        }
    }, [inputState, onInputChange])

    const textChangeHandler = text => {
        console.log(text)
        // 代表 action
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }

        dispatch(
            {
                type: INPUT_CHANGE,
                value: text,
                isValid: isValid

            }
        )
    };

    const lostFocusHandler = () => {
        dispatch({
            type: INPUT_BLUR,
        })
    }
    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.labelName}</Text>
            <TextInput
                {...props}// 所有外界传入的props全都能用上
                style={styles.input}
                value={inputState.value}
                onChangeText={textChangeHandler}//textChangeHandler最后的一个参数会作为React Native 自动传入 所以不需要再调用时bind
                onBlur={lostFocusHandler} // 当用户点击屏幕的其他地方
            />
            {!inputState.isValid &&
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