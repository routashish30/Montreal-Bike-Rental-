import { 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE, 
    REGISTER_SUCCESS, 
    REGISTER_FAILURE, 
    LOGOUT, 
    CLEAR_AUTH_ERROR
} from '../actions';
import authService from '../services/auth.service';

export const loginSuccess = ( payload ) => ({
    type: LOGIN_SUCCESS,
    payload
});

export const loginFailure = ( error ) => ({
    type: LOGIN_FAILURE,
    error
});

export const registerSuccess = ( payload ) => ({
    type: REGISTER_SUCCESS,
    payload
});

export const registerFailure = ( error ) => ({
    type: REGISTER_FAILURE,
    error
});

export const login = ( username, password ) => {
    return dispatch => {
        return authService.login(username, password)
        .then(
            (data) => {
                dispatch(loginSuccess(data));
                return Promise.resolve();
            },
            (error) => {
                dispatch(loginFailure(error));
                return Promise.reject();
            }
        )
    }
};

export const register = ( username, password, accountType ) => {
    return dispatch => {
        return authService.register(username, password, accountType)
        .then(
            (data) => {
                dispatch(registerSuccess(data));
                return Promise.resolve();
            },
            (error) => {
                dispatch(registerFailure(error));
                return Promise.reject();
            }
        )
    }
};

export const logout = () => {
    return dispatch => {
        authService.logout();
        dispatch({
            type: LOGOUT
        });
    }
};

export const clearAuthError = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_AUTH_ERROR
        });
    }
};