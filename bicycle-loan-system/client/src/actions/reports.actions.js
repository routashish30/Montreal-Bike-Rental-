import { 
    SUBMIT_REPORT_FAILURE, 
    SUBMIT_REPORT_SUCCESS,
    GET_ALL_REPORTS_SUCCESS,
    GET_ALL_REPORTS_FAILURE,
    CLEAR_REPORTS_ERROR
} from "../actions";
import reportsService from "../services/reports.service";

export const getAllReportsSuccess = ( payload ) => ({
    type: GET_ALL_REPORTS_SUCCESS,
    payload
});

export const getAllReportsFailure = ( error ) => ({
    type: GET_ALL_REPORTS_FAILURE,
    error
});

export const submitReportSuccess = ( payload ) => ({
    type: SUBMIT_REPORT_SUCCESS,
    payload
});

export const submitReportFailure = ( error ) => ({
    type: SUBMIT_REPORT_FAILURE,
    error
});

export const getAllReports = () => {
    return dispatch => {
        return reportsService.getAllReports()
        .then(
            (data) => {
                dispatch(getAllReportsSuccess(data));
                return Promise.resolve();
            },
            (error) => {
                dispatch(getAllReportsFailure(error));
                return Promise.reject();
            }
        )
    }
};

export const submitReport = (bikeID, status, report) => {
    return dispatch => {
        return reportsService.submitReport(bikeID, status, report)
        .then(
            (data) => {
                dispatch(submitReportSuccess(data));
                return Promise.resolve();
            },
            (error) => {
                dispatch(submitReportFailure(error));
                return Promise.reject();
            }
        )
    }
};

export const clearReportsError = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_REPORTS_ERROR
        });
    }
}