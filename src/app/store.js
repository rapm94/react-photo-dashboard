import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { myPhotosReducer } from '../reducers/myPhotosSlice';
import { searchedPhotosReducer } from '../reducers/searchedPhotosSlice';

const rootReducer = combineReducers({
    myPhotos: myPhotosReducer,
    searchedPhotos: searchedPhotosReducer,
    });


const store = configureStore({
    reducer: rootReducer
});

export default store;
