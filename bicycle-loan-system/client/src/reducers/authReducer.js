import { retrieveCookie } from "../utils";

const user = retrieveCookie("user");
const role = retrieveCookie("role");

const initialState = user ?
{ 
    loggedIn: true, 
    user, 
    role,
    error: null 
} : { 
    loggedIn: false, 
    user: null, 
    role: null,
    error: null 
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, loggedIn: true, user: action.payload.user, role: action.payload.role, error: null };
        case 'LOGIN_FAILURE':
            return { ...state, loggedIn: false, user: null, role: null, error: action.error };
        case 'REGISTER_SUCCESS':
            return { ...state, loggedIn: true, user: action.payload.user, role: action.payload.role, error: null };
        case 'REGISTER_FAILURE':
            return { ...state, loggedIn: false, user: null, role: null, error: action.error };
        case 'LOGOUT': 
            return { ...state, loggedIn: false, user: null, role: null, error: null };
        case 'CLEAR_AUTH_ERROR':
            return { ...state, error: null };
        default:
            return state;
    }
}

export default authReducer;