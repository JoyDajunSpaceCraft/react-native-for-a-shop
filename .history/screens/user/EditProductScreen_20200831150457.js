import React, { useCallback, useEffect, useReducer } from 'react'; // useReducer 是可以将读入的内容分发的控件 与 redux reducer 无关
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    Platform,
    Alert
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as ProductActions from '../../store/actions/products';
import Input from '../../components/UI/Input';
const FORM_INPUT_UPDATE = 'UPDATE';



// state中的 inputValues inputValidities 与 action中 input关系 
// state 的数据结构是 formReducer{inputValues输入值,
//  inputIdentifier判断值是否能用,
//  formIsValid 判断整个表单是否能传值}
// action 中的数据结构是  dispatchFormState({
// 来源于 初始化的 useReducer 改变state
// type: FORM_INPUT_UPDATE, // dispatch什么样的方法
// value: text, // 传入输入值
// isValid: isValid,//判断输入的值是否能用
// input: inputIdentifier  // 什么样会trigger这个dispatch
const formReducer = (state, action) => {
    // 初始化的 state 是 由useReducer中的formState定义的
    // 初始化的action是dispatchFormState定义的 
    // 定义在 props外面 只有需要用到props的时候才会定义在里面
    // 和 redux无关 ！！！
    if (action.type === FORM_INPUT_UPDATE) {
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
        return {
            formIsValid: updateFormIsValid,
            inputValues: updateValues,
            inputValidities: updateInputValidaties
        };
    }
    return state;
}


const EditProductScreen = props => {
    // 在初始化参数之前先判断是在原有基础上更新还是 新建
    const prodId = props.navigation.getParam('productId');
    // console.log(prodId)
    const editProdcut = useSelector(state =>
        // find 不是方法
        state.products.userProducts.find(prod => prod.id === prodId)
    );
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
                title: editProdcut ? editProdcut.title : '',
                imageUrl: editProdcut ? editProdcut.imageUrl : '',
                description: editProdcut ? editProdcut.description : '',
                price: '' // 只要不是新建一个商品的情况下 price 始终设置为空
            },
            inputValidities: {
                title: editProdcut ? true : false,
                imageUrl: editProdcut ? true : false,
                description: editProdcut ? true : false,
                price: editProdcut ? true : false,//price可以在edit已有商品时设置validation为true
            },
            formIsValid: editProdcut ? true : false
        }
    );

    // const [titleIsValid, setTitleIsValid] = useState(false);

    // const [title, setTitle] = useState(
    //     editProdcut ? editProdcut.title : ' ');
    // const [imageUrl, setImageUrl] = useState(
    //     editProdcut ? editProdcut.imageUrl : '');
    // const [price, setPrice] = useState('');//已经出现的商品的价格不能被再次修改
    // const [description, setDescription] = useState(
    //     editProdcut ? editProdcut.description : '');

    const submitHandler = useCallback(() => {
        // useCallback确保这个方法不会在每次render的时候都被创建
        if (!formState.formIsValid) {
            Alert.alert('Wrong Input!', 'Please check the error in the from', [{ text: 'Okey' }])
            return;
        }
        if (editProdcut) {
            dispatch(ProductActions.updateProduct(prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl)
            )
        } else {
            dispatch(ProductActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price //加上+后表示是int 而不是 string 
            )
            );
        }
        props.navigation.goBack();// 在点击右上角的提交按钮之后会自动跳转
    }, [dispatch, formState.inputValues.imageUrl, formState.inputValues.title, formState.inputValues.description, formState.inputValues.price, prodId, formState.formIsValid])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    const textChangeHandler = (inputIdentifier, text) => {
        // useReducer用来处理 dispatch的地方
        let isValid = false
        if (text.trim().length > 0) {
            // trim()删除了空格
            // setTitleIsValid(false);
            isValid = true
        }
        // else {
        // setTitleIsValid(true);
        // }
        // setTitle(text);
        dispatchFormState({
            // 来源于 初始化的 useReducer 改变state
            type: FORM_INPUT_UPDATE, // dispatch什么样的方法
            value: text, // 传入输入值
            isValid: isValid,//判断输入的值是否能用
            input: inputIdentifier  // 什么样会trigger这个dispatch
        })
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Input
                    keyboardType="default"
                    autoCaptialize="sentences"
                    autoC
                    label="Title"
                    errorText=""
                />
                <View style={styles.formControl}>
                    <Text style={styles.label}>IMAGE URL</Text>
                    <TextInput
                        style={styles.input}
                        // value={imageUrl}
                        value={formState.inputValues.imageUrl}
                        onChangeText={textChangeHandler.bind(this, 'imageUrl')}
                    />
                </View>
                {/* 检查 是不是已经有了这个商品 如果已经有就返回null */}
                {editProdcut ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>PRICE</Text>
                    <TextInput
                        style={styles.input}
                        // value={price}
                        value={formState.inputValues.price}
                        onChangeText={textChangeHandler.bind(this, 'price')}
                        keyboardType='decimal-pad'
                    />
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>DESCRIPTION</Text>
                    <TextInput
                        style={styles.input}
                        // value={description}
                        value={formState.inputValues.description}
                        onChangeText={textChangeHandler.bind(this, 'description')}
                    />
                </View>
            </View>
        </ScrollView>
    );
};
EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');// 获得从  EditProductScreen设置的参数
    return {
        headerTitle: navData.navigation.getParam("productId")
            ? 'Edit Product'
            : 'Add Product',//因为两种形式不一样 一个是已经有现成的product传入id 另一个是新建 所以没有id传入
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName={
                        Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                    }
                    onPress={submitFn}
                />
            </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },

});

export default EditProductScreen;