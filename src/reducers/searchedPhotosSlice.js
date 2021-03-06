import { createSlice } from '@reduxjs/toolkit'

const searchedPhotosSlice = createSlice({
  name: 'searchedPhotos',
  initialState: {
    searchedPhotos: [],
    pageCount: 0,
  },
  reducers: {
    searchedPhotosRequest: (state) => {
      state.isLoading = true
    },
    searchedPhotosSuccess: (state, { payload }) => {
      state.searchedPhotos = payload.results
      state.pageCount = payload.total_pages
      state.searchTerm = payload.searchTerm
    },
  },
})

export function fetchPhotos(searchTerm, pageNumber) {
  return async (dispatch) => {
    dispatch(searchedPhotosSlice.actions.searchedPhotosRequest())
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${searchTerm}&per_page=12&client_id=xrJ1LP9YOXq01I6uPbvcvNFm4A5wjJF0dJf9_AuRe3M`,
      )
      const data = await response.json()
      dispatch(searchedPhotosSlice.actions.searchedPhotosSuccess({...data, searchTerm, pageNumber}))
    } catch (error) {
      console.log(error)
    }
  }
}

export const {
  searchedPhotosRequest,
  searchedPhotosSuccess,
} = searchedPhotosSlice.actions

export const searchedPhotosReducer = searchedPhotosSlice.reducer

export const photosSelector = (state) => state.searchedPhotos.searchedPhotos
export const pageCountSelector = (state) => state.searchedPhotos.pageCount
export const searchTermSelector = (state) => state.searchedPhotos.searchTerm
export const pageNumberSelector = (state) => state.searchedPhotos.pageNumber
