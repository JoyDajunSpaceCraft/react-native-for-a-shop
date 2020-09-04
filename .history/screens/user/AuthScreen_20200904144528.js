import React, { useReducer, useCallback,useState } from 'react';
import {
    ScrollView,
    View,
    Button,
    KeyboardAvoidingView,
    StyleSheet
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient' //npm install --save expo-linear-gradient  实现 线性的颜色变换
import { useDispatch } from 'react-redux';


import Input from '../../components/UI/Input';
import Cart from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    // 初始化的 state 是 由useReducer中的formState定义的
    // 初始化的action是dispatchFormState定义的 
    // 定义在 props外面 只有需要用到props的时候才会定义在里面
    // 和 redux无关 ！！！
    if (action.type === FORM_INPUT_UPDATE) {
        console.log("传入其中的 action dispatch Form ", action.value)
        const updateValues = {
            // 在原有的  inputValues基础上加上了  dispatchFormState新添加的 value
            ...state.inputValues,// 此处copy的是 useReducer中的formReducer中的 inputValues
            [action.input]: action.value
            //根据 已有的 action的input 也就是dispatchFormState中的 inputIdentifier 确定 
            //在修改了 value也就是用户的输入值
        };

        const updateInputValidaties = {
            // 在原有的  inputValues基础上加上了  dispatchFormState新添加的 value
            ...state.inputValidities,// 此处copy的是 useReducer中的formReducer中的 inputValidities
            [action.input]: action.isValid //根据 已有的 action的isValid 修改了 也就是用户输入的是否是有效的
        }
        let updateFormIsValid = true;
        for (const key in updateInputValidaties) {
            updateFormIsValid = updateFormIsValid && updateInputValidaties[key];//想要全部的validate就要遍历所有的inputValidaties  
        }
        const returnval = {
            formIsValid: updateFormIsValid,
            inputValues: updateValues,
            inputValidities: updateInputValidaties
        }

        return returnval;
    }
    return state;
}

const AuthScreen = props => {
    const [isSignup, setIsSignup] =useState(false);// 判断是否是signup

    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(// 初始化 类似于useState用法
        // formState 是所有的键入按钮状态 每次有修改 就会重新加载EditProductScreen 赋予新的state 
        // dispatchFormState 是一个func 来against这个reducer
        // 以上两个命名是随意的
        // 类似于trigger可以 当用户键入时进行判断
        // initialState
        formReducer,//传入的方法怎样update
        {
            inputValues: {
                email: '',
                password: ''
            },
            inputValidities: {
                email: false,
                password: false
            },
            formIsValid: false
        }
    );


    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        // useReducer用来处理 dispatch的地方
        // let isValid = false
        // if (text.trim().length > 0) {
        //     // trim()删除了空格
        //     // setTitleIsValid(false);
        //     isValid = true
        // }
        // else {
        // setTitleIsValid(true);
        // }
        // setTitle(text);
        dispatchFormState({
            // 来源于 初始化的 useReducer 改变state
            type: FORM_INPUT_UPDATE, // dispatch什么样的方法
            value: inputValue, // 传入输入值
            isValid: inputValidity,//判断输入的值是否能用
            input: inputIdentifier  // 什么样会trigger这个dispatch
        })
    }, [dispatchFormState])


    const signupHandler = () => {
        dispatch(
            authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password));
    }
    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Cart style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label='E-Mail'
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address"
                            onInputChange={inputChangeHandler}
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
                            errorText="Please enter a valid password"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                title={isSignup ? "Sign up":"Login"}
                                color={Colors.primary}
                                onPress={signupHandler} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Switch to Sign up"
                                color={Colors.accent}
                                onPress={() => { }}
                            />
                        </View>

                    </ScrollView>
                </Cart>
            </LinearGradient>
        </KeyboardAvoidingView>

    )
};
AuthScreen.navigationOptions = {
    headerTitle: 'Authentica'// 为什么没有办法显示标题？
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,

    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 500,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default AuthScreen;