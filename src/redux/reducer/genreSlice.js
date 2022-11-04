import { createSlice } from "@reduxjs/toolkit";

const genreSlice = createSlice({
    name: 'genre',
    initialState:{
        genres: []
    },
    reducers:{
        addGenre: (state, action) => {
            state.genres = [...state.genres, action.payload];
        },
        removeGenre: (state, action) => {
            state.genres = state.genres.filter(element => parseInt(element) !== parseInt(action.payload));
        },
        clearGenre: (state) => {
            state.genres = [];
        }
    }
})

export const { addGenre, removeGenre, clearGenre } = genreSlice.actions;

export const genres = (state) => state.genre.genres;

export default genreSlice.reducer;