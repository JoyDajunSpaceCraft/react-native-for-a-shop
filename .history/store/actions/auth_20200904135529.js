export const SIGNUP = 'SIGNUP';
export const signup = (email, password)=>{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC2kNjHHoVBzVrZimvmSgFk9CXl2sizpuk') // fetch网址https://firebase.google.com/docs/reference/rest/auth#section-create-email-password [API KEY] :项目设置中

    return async dispatch =>{
        dispatch({type:SIGNUP})
    }
}