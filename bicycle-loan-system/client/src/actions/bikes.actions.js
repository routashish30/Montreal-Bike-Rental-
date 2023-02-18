import {
    GET_ALL_BIKES_SUCCESS,
    GET_ALL_BIKES_FAILURE,
    UPDATE_BIKE_SUCCESS,
    UPDATE_BIKE_FAILURE,
    ADD_BIKE_SUCCESS,
    ADD_BIKE_FAILURE,
    GET_USER_BIKE_SUCCESS,
    GET_USER_BIKE_FAILURE,
    SET_USER_BIKE_SUCCESS,
    SET_USER_BIKE_FAILURE,
    REMOVE_USER_BIKE_SUCCESS,
    REMOVE_USER_BIKE_FAILURE,
    CLEAR_BIKES_ERROR
} from "../actions";
import bikesService from "../services/bikes.service";

export const getAllBikesSuccess = ( payload ) => ({
    type: GET_ALL_BIKES_SUCCESS,
    payload
});

export const getAllBikesFailure = ( error ) => ({
    type: GET_ALL_BIKES_FAILURE,
    error
});

export const updateBikeSuccess = ( payload ) => ({
    type: UPDATE_BIKE_SUCCESS,
    payload
});

export const updateBikeFailure = ( error ) => ({
    type: UPDATE_BIKE_FAILURE,
    error
});

export const addBikeSuccess = ( payload ) => ({
    type: ADD_BIKE_SUCCESS,
    payload
});

export const addBikeFailure = ( error ) => ({
    type: ADD_BIKE_FAILURE,
    error
});

export const getUserBikeSuccess = ( payload ) => ({
    type: GET_USER_BIKE_SUCCESS,
    payload
});

export const getUserBikeFailure = ( error ) => ({
    type: GET_USER_BIKE_FAILURE,
    error
});

export const setUserBikeSuccess = ( payload ) => ({
    type: SET_USER_BIKE_SUCCESS,
    payload
});

export const setUserBikeFailure = ( error ) => ({
    type: SET_USER_BIKE_FAILURE,
    error
});

export const removeUserBikeSuccess = ( payload ) => ({
    type: REMOVE_USER_BIKE_SUCCESS,
    payload
});

export const removeUserBikeFailure = ( error ) => ({
    type: REMOVE_USER_BIKE_FAILURE,
    error
});

export const getAllBikes = () => {
    return dispatch => {
        return bikesService.getAllBikes()
        .then(
            (data) => {
                dispatch(getAllBikesSuccess(data));
                return Promise.resolve();
            },
            (error) => {
                dispatch(getAllBikesFailure(error));
                return Promise.reject();
            }
        )
    }
};

export const updateBike = (bikeID, status = null, location = null) => {
    return dispatch => {
        return bikesService.updateBike(bikeID, status, location)
        .then(
            (data) => {
                dispatch(updateBikeSuccess(data));
                return Promise.resolve();
            },
            (error) => {
                dispatch(updateBikeFailure(error));
                return Promise.reject();
            }
        )
    }
};

export const addBike = (status, location = null) => {
    return dispatch => {
        return bikesService.addBike(status, location)
        .then(
            (data) => {
                dispatch(addBikeSuccess(data));
                return Promise.resolve();
            },
            (error) => {
                dispatch(addBikeFailure(error));
                return Promise.reject();
            }
        )
    }
};

export const getUserBike = () => {
    return dispatch => {
        return bikesService.getUserBike()
        .then(
            (data) => {
                dispatch(getUserBikeSuccess(data));
                return Promise.resolve();
            },
            (error) => {
                dispatch(getUserBikeFailure(error));
                return Promise.reject();
            }
        )
    }
};

export const setUserBike = (status, location, code = null) => {
    return dispatch => {
        return bikesService.setUserBike(status, location, code)
        .then(
            (data) => {
                dispatch(setUserBikeSuccess(data));
                return Promise.resolve();
            },
            (error) => {
                dispatch(setUserBikeFailure(error));
                return Promise.reject();
            }
        )
    }
};

export const removeUserBike = (location, code = null) => {
    return dispatch => {
        return bikesService.removeUserBike(location, code)
        .then(
            (data) => {
                dispatch(removeUserBikeSuccess(data));
                return Promise.resolve();
            },
            (error) => {
                dispatch(removeUserBikeFailure(error));
                return Promise.reject();
            }
        )
    }
};

export const clearBikesError = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_BIKES_ERROR
        });
    }
};