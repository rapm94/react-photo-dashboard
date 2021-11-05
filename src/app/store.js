import {configureStore} from '@reduxjs/toolkit';
import {searchTermSlice} from '../reducers/searchTermSlice';
import {downloadedPhotosSlice} from '../reducers/downloadedPhotosSlice';
import {searchedPhotosSlice} from '../reducers/searchedPhotosSlice';

export const store = configureStore({
    reducer: {
        searchTerm: searchTermSlice,
        downloadedPhotos: downloadedPhotosSlice,
        searchedPhotos: searchedPhotosSlice
    }
});
