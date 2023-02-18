const initialState = {
    locations: [],
    error: null
};

function locationsReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_LOCATIONS_SUCCESS':
            return { ...state, locations: action.payload.locations, error: null };
        case 'GET_LOCATIONS_FAILURE':
            return { ...state, error: action.error };
        case 'ADD_LOCATION_SUCCESS':
            return { ...state, locations: [
                ...state.locations,
                {
                    address: action.payload.address,
                    totalSpots: action.payload.totalSpots,
                    bikesAvailable: action.payload.bikesAvailable,
                    openSpots: action.payload.openSpots
                }
            ]}
        case 'ADD_LOCATION_FAILURE':
            return { ...state, error: action.error };
        case 'CLEAR_LOCATIONS_ERROR':
            return { ...state, error: null };
        default:
            return state;
    }
};

export default locationsReducer;