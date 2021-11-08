import { createSlice } from '@reduxjs/toolkit';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      localStorage.setItem('state', JSON.stringify([]));
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}; 

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log(err);
}
};

const myPhotosSlice = createSlice({
    name: 'myPhotos',
    initialState: loadState(),
    reducers: {
        addPhoto: (state, action) => {
            state.myPhotos.push(action.payload);
            saveState(state);
        },
        removeOnePhoto: (state, action) => {
            state.myPhotos.splice(action.payload, 1);
            saveState(state);
        },
        removeAllPhotos: (state) => {
            state.myPhotos = [];
        },
        updatePhoto: (state, action) => {
            state.myPhotos.myPhoyos[action.payload.index] = action.payload.photo;
        },
    },
})

export const {
    addPhoto,
    removeOnePhoto, 
    updatePhoto,
} = myPhotosSlice.actions;

export const myPhotosReducer = myPhotosSlice.reducer;

export default myPhotosSlice;

export const myPhotosSelector = state => state.myPhotos.myPhotos;