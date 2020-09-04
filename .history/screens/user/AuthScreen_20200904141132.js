import React,{useReducer} from 'react';
import {
    ScrollView,
    View,
    Button,
    KeyboardAvoidingView,
    StyleSheet
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient' //npm install --save expo-linear-gradient  实现 线性的颜色变换
import {useDispatch} from 'react-redux';


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
        console.log("update value 之后的", updateValues)

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
        console.log("最后的return", returnval.inputValues)

        return returnval;
    }
    return state;
}

const AuthScreen = props => {
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
                //代替了 设置state的方法
                title: editedProduct ? editedProduct.title : '',
                imageUrl: editedProduct ? editedProduct.imageUrl : '',
                description: editedProduct ? editedProduct.description : '',
                price: '' // 只要不是新建一个商品的情况下 price 始终设置为空
            },
            inputValidities: {
                title: editedProduct ? true : false,
                imageUrl: editedProduct ? true : false,
                description: editedProduct ? true : false,
                price: editedProduct ? true : false,//price可以在edit已有商品时设置validation为true
            },
            formIsValid: editedProduct ? true : false
        }
    );


    const signupHandler = () =>{

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
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Login"
                                color={Colors.primary}
                                onPress={() => { }} />
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