import { LOGIN, SIGNUP } from "../actions/auth";

const initialState = {
    token:null,
    userId:null
};
export default (state= initialState, action) =>{
    switch (action.type){
        case LOGIN:

        case SIGNUP:
        
        return state
    }
}
