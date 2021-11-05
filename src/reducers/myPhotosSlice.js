import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  photos: [],
  loading: false,
  error: null,
};


const myPhotosSlice = createSlice({
    name: 'myPhotos',
    initialState,
    reducers: {
        setPhotos: (state, action) => {
            state.photos = action.payload;
        },
        removeOnePhoto: (state, action) => {
            state.photos = state.photos.filter(photo => photo.id !== action.payload);
        },
    }
});

export const {actions} = myPhotosSlice;

export const downloadedPhotosReducer = myPhotosSlice.reducer;

export default myPhotosSlice;