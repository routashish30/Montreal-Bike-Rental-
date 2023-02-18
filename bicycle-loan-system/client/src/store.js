import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import locationsReducer from './reducers/locationsReducer';
import bikesReducer from './reducers/bikesReducer';
import reportsReducer from './reducers/reportsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    locations: locationsReducer,
    bikes: bikesReducer,
    reports: reportsReducer
});

const store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));

export default store;

