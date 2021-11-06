import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { searchTermReducer } from '../reducers/searchTermSlice';
import { myPhotosReducer } from '../reducers/myPhotosSlice';
import { searchedPhotosReducer } from '../reducers/searchedPhotosSlice';


const rootReducer = combineReducers({
    searchTerm: searchTermReducer,
    myPhotos: myPhotosReducer,
    searchedPhotos: searchedPhotosReducer
    });

const store = configureStore({
    reducer: rootReducer
});

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
