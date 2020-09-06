import { AsyncStorage } from 'react-native'; //存储 tokensession 不用一直登录

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = (userId, token) => {
    return { type: AUTHENTICATE, userId: userId, token:token}
}


export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(// 创建一个新用户
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC2kNjHHoVBzVrZimvmSgFk9CXl2sizpuk',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        ); // fetch网址https://firebase.google.com/docs/reference/rest/auth#section-create-email-password [API KEY] :项目设置中

        if (!response.ok) {//signin 界面要匹配数据库中数据
            const errorResData = await response.json();
            // console.log(errorResData);//精细化错误表达
            // Object {
            //     "error": Object {
            //       "code": 400,
            //       "errors": Array [
            //         Object {
            //           "domain": "global",
            //           "message": "EMAIL_NOT_FOUND",
            //           "reason": "invalid",
            //         },
            //       ],
            //       "message": "EMAIL_NOT_FOUND",
            //     },
            //   }
            let message = "Something is wrong "
            const errorId = errorResData.error.message;
            if (errorId === 'EMAIL_EXISTS') {
                message = "This email is already exist!";
            }

            throw new Error(message); // 这里的error传到AuthScreen 中 setIsError(err.message)
        }
        const resData = await response.json();
        console.log(resData)

        dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId })
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(// 创建一个新用户
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC2kNjHHoVBzVrZimvmSgFk9CXl2sizpuk',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {//在login 界面要匹配数据库中数据
            const errorResData = await response.json();
            // console.log(errorResData);//精细化错误表达
            // Object {
            //     "error": Object {
            //       "code": 400,
            //       "errors": Array [
            //         Object {
            //           "domain": "global",
            //           "message": "EMAIL_NOT_FOUND",
            //           "reason": "invalid",
            //         },
            //       ],
            //       "message": "EMAIL_NOT_FOUND",
            //     },
            //   }
            let message = "Something is wrong "
            const errorId = errorResData.error.message;
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = "This email is not found!";
            }
            else if (errorId === 'INVALID_PASSWORD') {
                message = "This password is invalid"
            }
            throw new Error(message); // 这里的error传到AuthScreen 中 setIsError(err.message)
        }
        const resData = await response.json();
        dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);// 设置 用户名密码在其中的失效时间
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
};
const saveDataToStorage = (token, userId, expirationDate) => {
    // 将用户的信息作为session存入本地机器
    AsyncStorage.setItem("userData",// userData是作为key
        // 一定要是String
        JSON.stringify(
            {
                token: token,
                userId: userId,
                expriyDate: expirationDate.toISOString()
            }
        )
    );
}