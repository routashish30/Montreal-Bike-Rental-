import { 
    GET_LOCATIONS_FAILURE, 
    GET_LOCATIONS_SUCCESS,
    ADD_LOCATION_SUCCESS,
    ADD_LOCATION_FAILURE,
    CLEAR_LOCATIONS_ERROR
} from "../actions";
import locationsService from "../services/locations.service";

export const getLocationsSuccess = ( payload ) => ({
    type: GET_LOCATIONS_SUCCESS,
    payload
});

export const getLocationsFailure = ( error ) => ({
    type: GET_LOCATIONS_FAILURE,
    error
});

export const addLocationSuccess = ( payload ) => ({
    type: ADD_LOCATION_SUCCESS,
    payload
});

export const addLocationFailure = ( error ) => ({
    type: ADD_LOCATION_FAILURE,
    error
});

export const getLocations = () => {
    return dispatch => {
        return locationsService.getLocations()
        .then(
            (data) => {
                dispatch(getLocationsSuccess(data));
                return Promise.resolve();
            },
            (error) => {
                dispatch(getLocationsFailure(error));
                return Promise.reject();
            }
        )
    }
};

export const addLocation = (address, totalSpots, availBikes, openSpots) => {
    return dispatch => {
        return locationsService.addLocation(address, totalSpots, availBikes, openSpots)
        .then(
            (data) => {
                dispatch(addLocationSuccess(data));
                return Promise.resolve();
            },
            (error) => {
                dispatch(addLocationFailure(error));
                return Promise.reject();
            }
        )
    }
};

export const clearLocationsError = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_LOCATIONS_ERROR
        });
    }
};