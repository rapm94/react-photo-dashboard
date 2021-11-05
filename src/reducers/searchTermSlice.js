import { createSlice } from '@reduxjs/toolkit';

const searchTermSlice = createSlice({
    name: 'searchTerm',
    initialState: '',
    reducers: {
        setSearchTerm: (state, action) => action.payload,
    }
});

export default searchTermSlice;

export const { setSearchTerm } = searchTermSlice.actions;

export const searchTermReducer = searchTermSlice.reducer;

export const selectSearchTerm = (state) => state.searchTerm;