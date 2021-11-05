import {createSlice} from '@reduxjs/toolkit';

export const downloadedPhotosSlice = createSlice({
    name: 'downloadedPhotos',
    initialState: {
        photos: [],
        isLoading: false,
        error: null
    },
    reducers: {}
});

export const {actions} = downloadedPhotosSlice;

export default downloadedPhotosSlice.reducer;