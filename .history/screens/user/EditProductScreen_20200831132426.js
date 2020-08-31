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

const FORM_INPUT_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
    // 定义在 props外面 只有需要用到props的时候才会定义在里面
    // 和 redux无关 ！！！
    if (action.type === FORM_INPUT_UPDATE) {


    }
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

    const [formState, dispatchFormState] = useReducer(
        // formState 是所有的键入按钮状态 每次有修改 就会重新加载EditProductScreen 赋予新的state 
        // dispatchFormState 是一个func 来against这个reducer
        // 以上两个命名是随意的
        // 类似于trigger可以 当用户键入时进行判断
        // initialState
        formReducer,
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

    const [titleIsValid, setTitleIsValid] = useState(false);

    // const [title, setTitle] = useState(
    //     editProdcut ? editProdcut.title : ' ');
    // const [imageUrl, setImageUrl] = useState(
    //     editProdcut ? editProdcut.imageUrl : '');
    // const [price, setPrice] = useState('');//已经出现的商品的价格不能被再次修改
    // const [description, setDescription] = useState(
    //     editProdcut ? editProdcut.description : '');

    const submitHandler = useCallback(() => {
        // useCallback确保这个方法不会在每次render的时候都被创建
        if (!titleIsValid) {
            Alert.alert('Wrong Input!', 'Please check the error in the from', [{ text: 'Okey' }])
            return;
        }
        if (editProdcut) {
            dispatch(ProductActions.updateProduct(prodId,
                title,
                description,
                imageUrl)
            )
        } else {
            dispatch(ProductActions.createProduct(title,
                description,
                imageUrl,
                +price //加上+后表示是int 而不是 string 
            )
            );
        }
        props.navigation.goBack();// 在点击右上角的提交按钮之后会自动跳转
    }, [dispatch, imageUrl, title, description, price, prodId, titleIsValid])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    },
        [submitHandler]
    )



    const textChangeHandler = (inputIdentifier, text) => {
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
            // 来源于
            type: FORM_INPUT_UPDATE, // dispatch什么样的方法
            value: text, // 传入输入值
            isValid: isValid,//判断输入的值是否能用
            input:'title' // 什么样会trigger这个dispatch
         })
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>TITLE</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={titleChangeHandler}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        // autoCorrect=''
                        returnKeyType='next'// 点击界面上return 时会自动跳转到 下一行
                    />
                    {!titleIsValid && <Text>Please enter a valid title</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>IMAGE URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={titleChangeHandler}

                    />
                </View>
                {/* 检查 是不是已经有了这个商品 如果已经有就返回null */}
                {editProdcut ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>PRICE</Text>
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={text => {
                            setPrice(text)
                            keyboardType = 'decimal-pad'
                        }}
                    />
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>DESCRIPTION</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => { setDescription(text) }}
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

export default EditProductScreen;