import { createSlice } from '@reduxjs/toolkit'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      localStorage.setItem('state', JSON.stringify([]))
    }
    return JSON.parse(serializedState)
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
    //Save a photo to the state and local storage{
    addPhoto: (state, action) => {
      state.myPhotos.push(action.payload)
      saveState(state)
    },
    //Filter out the photo with the id that was passed in
    removeOnePhoto: (state, action) => {
      state.myPhotos = state.myPhotos.filter(
        (photo) => photo.id !== action.payload,
      )
      saveState(state)
    },
    //Remove all photos resetting the state to an empty array
    removeAllPhotos: (state) => {
      state.myPhotos = []
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
