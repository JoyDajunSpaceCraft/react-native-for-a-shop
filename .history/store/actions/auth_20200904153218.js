export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
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

        if (!response.ok) {
            throw new Error('Something wrong in auth!');
        }
        const resData = await response.json();
        console.log(resData)

        dispatch({ type: SIGNUP })
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
            if (errorId ==='EMAIL_NOT_FOUND'){
                message = errorId; 
            }
            // throw new Error('Something wrong in auth!');
        }
        resData = await response.json(); 
        dispatch({ type: LOGIN })
    }
}