import { createSlice } from '@reduxjs/toolkit';

const myPhotosSlice = createSlice({
    name: 'myPhotos',
    initialState: {
        myPhotos: [],
    },
    reducers: {
        hydrateMyPhotos: (action) => {
           return action.payload;
        },
        addPhoto: (state, action) => {
            state.myPhotos.push(action.payload);
        },
        removePhoto: (state, action) => {
            state.myPhotos.splice(action.payload, 1);
        },
        updatePhoto: (state, action) => {
            state.myPhotos[action.payload.index] = action.payload.photo;
        },
    },
})

export const {
    addPhoto,
    removeOnePhoto, 
    updatePhoto,
    hydrateMyPhotos,
} = myPhotosSlice.actions;

export const myPhotosReducer = myPhotosSlice.reducer;

export default myPhotosSlice;

export const myPhotosSelector = state => state.myPhotos.myPhotos;