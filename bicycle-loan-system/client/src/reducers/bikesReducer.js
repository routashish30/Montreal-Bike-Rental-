const initialState = {
    bikes: [],
    userBike: null,
    error: null
};

function bikesReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_BIKES_SUCCESS':
            return { ...state, bikes: action.payload.bikes, error: null };
        case 'GET_ALL_BIKES_FAILURE':
            return { ...state, error: action.error };
        case 'ADD_BIKE_SUCCESS':
            return { ...state, bikes: [
                ...state.bikes,
                {
                    bikeID: action.payload.bikeID,
                    status: action.payload.status,
                    customer: action.payload.customer,
                    location: action.payload.location
                }
            ]};
        case 'ADD_BIKE_FAILURE':
            return { ...state, error: action.error };
        case 'UPDATE_BIKE_SUCCESS': 
            const updatedBikes = state.bikes.map(bike => {
                if (bike.bikeID === action.payload.bikeID) {
                    return { 
                        ...bike, 
                        status: action.payload.status,
                        location: action.payload.location
                    }
                }
                return bike;
            });
            return { ...state, error: null, bikes: updatedBikes };
        case 'UPDATE_BIKE_FAILURE':
            return { ...state, error: action.error };
        case 'GET_USER_BIKE_SUCCESS': 
            return { ...state, error: null, 
                userBike: {
                    bikeID: action.payload.bikeID,
                    status: action.payload.status,
                    location: action.payload.location,
                    code: action.payload.code
                }
            };
        case 'GET_USER_BIKE_FAILURE':
            return { ...state, error: action.error };
        case 'SET_USER_BIKE_SUCCESS':
            return { ...state, errorr: null, 
                userBike: {
                    bikeID: action.payload.bikeID,
                    status: action.payload.status,
                    location: action.payload.location,
                    code: action.payload.code
                }
            };
        case 'SET_USER_BIKE_FAILURE':
            return { ...state, error: action.error };
        case 'REMOVE_USER_BIKE_SUCCESS': 
            return { ...state, userBike: null };
        case 'REMOVE_USER_BIKE_FAILURE':
            return { ...state, error: action.error };
        case 'CLEAR_BIKES_ERROR':
            return { ...state, error: null };
        default:
            return state;
    }
};

export default bikesReducer;