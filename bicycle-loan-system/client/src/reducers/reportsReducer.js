const initialState = {
    reports: [],
    userReport: null,
    error: null
};

function reportsReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_REPORTS_SUCCESS': 
            return { ...state, reports: action.payload.reports, error: null };
        case 'GET_ALL_REPORTS_FAILURE':
            return { ...state, error: action.error };
        case 'SUBMIT_REPORT_SUCCESS':
            return { ...state, userReport: {
                    bikeID: action.payload.bikeID,
                    status: action.payload.status,
                    report: action.payload.report
                }};
        case 'SUBMIT_REPORT_FAILURE':
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export default reportsReducer;