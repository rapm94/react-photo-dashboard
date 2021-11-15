import { createSlice } from '@reduxjs/toolkit'

export const loadState = () => {
  try {
    return localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {myPhotos: [], myPhotosIds: {}};
  } catch (err) {
    return undefined
  }
}

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    console.log(err)
  }
}

const myPhotosSlice = createSlice({
  name: 'myPhotos',
  initialState: loadState(),
  reducers: {

    // add a photo to the list of photos and a reference to it in the list of ids, then save the state to local storage
    addPhoto: (state, action) => {
      state.myPhotos.push(action.payload)
      state.myPhotosIds[action.payload.id] = true
      saveState(state)
    },
      
    //Filter out the photo with the id that was passed in
    removeOnePhoto: (state, action) => {
      state.myPhotos = state.myPhotos.filter(
        (photo) => photo.id !== action.payload,
      );
      state.myPhotosIds = Object.keys(state.myPhotosIds).reduce(
        (acc, key) => {
          if (key !== action.payload) {
            acc[key] = true
          }
          return acc
        },
        {},
      )
      saveState(state)
    },
    //Remove all photos resetting the state to an empty array
    removeAllPhotos: (state) => {
      state.myPhotos = []
      state.myPhotosIds = {}
      saveState(state)
    },
    //Change description of photo with the id that was passed in
    changeDescription: (state, action) => {
      const newPhotos = []

      state.myPhotos.forEach((photo) => {
        if (photo.id === action.payload.id) {
          newPhotos.push({
            ...photo,
            alt_description: action.payload.description,
            description: action.payload.description,
          })
        } else {
          newPhotos.push(photo)
        }
      })
      state.myPhotos = newPhotos
      saveState(state)
    },
    //Sort Photos by characteristics
    sortPhotos: (state, action) => {
      state.myPhotos.sort(function (a, b) {
        if (a[action.payload] < b[action.payload]) {
          return 1
        }
        if (a[action.payload] > b[action.payload]) {
          return -1
        }
        return 0
      })
    },
  },
})

export const {
  addPhoto,
  removeOnePhoto,
  removeAllPhotos,
  changeDescription,
  sortPhotos,
} = myPhotosSlice.actions

export const myPhotosReducer = myPhotosSlice.reducer

export default myPhotosSlice

export const myPhotosSelector = (state) => state.myPhotos.myPhotos
export const myPhotosIdsSelector = (state) => state.myPhotos.myPhotosIds
