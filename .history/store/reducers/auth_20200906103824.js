import { AUTHENTICATE ,LOGOUT} from "../actions/auth";
// import { LOGIN, SIGNUP } from "../actions/auth";

const initialState = {
    token: null,
    userId: null
};
export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:// 不再使用 LOGIN SIGNUP 而是使用 AUTHENTICATE因为从action中传入的就是 AUTHENTICATE
            return {
                token: action.token,
                userId: action.userId
            }

        // case SIGNUP:
        //     return {
        //         token: action.token,
        //         userId: action.userId
        //     }
        default:
            return state;
    }
}
