import { createSlice } from '@reduxjs/toolkit';


const searchedPhotosSlice = createSlice({
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
        searchedPhotosSuccess: (state, { payload } ) => {
            state.searchedPhotos = payload;
            state.isLoading = false;
        },
        searchedPhotosFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});



export function fetchPhotos(searchTerm) {
    return async (dispatch) => {
        dispatch(searchedPhotosSlice.actions.searchedPhotosRequest());
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchTerm}&client_id=xrJ1LP9YOXq01I6uPbvcvNFm4A5wjJF0dJf9_AuRe3M`);
            const data = await response.json();
            dispatch(searchedPhotosSlice.actions.searchedPhotosSuccess(data.results));
        } catch (error) {
            dispatch(searchedPhotosSlice.actions.searchedPhotosFailure(error));
        }
    }
}

export const { searchedPhotosRequest, searchedPhotosSuccess } = searchedPhotosSlice.actions;

export const searchedPhotosReducer = searchedPhotosSlice.reducer;   

export const photosSelector = state => state.searchedPhotos.searchedPhotos;
