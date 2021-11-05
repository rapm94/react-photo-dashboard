import {createSlice} from '@reduxjs/toolkit';

export const searchedPhotosSlice = createSlice({
    name: 'searchedPhotos',
    initialState: {
        searchedPhotos: [],
        isLoading: false,
        error: null
    },
    reducers: {
        searchedPhotosRequest: (state) => {
            state.isLoading = true;
        },
        searchedPhotosSuccess: (state, action) => {
            state.searchedPhotos = action.payload;
            state.isLoading = false;
        }
    }
});

export  const {searchedPhotosRequest, searchedPhotosSuccess} = searchedPhotosSlice.actions;

export const searchedPhotosReducer = searchedPhotosSlice.reducer;   
