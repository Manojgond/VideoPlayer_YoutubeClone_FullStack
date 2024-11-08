import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isMenuOpen: true,
}

export const youtubeSlice = createSlice({
    name: 'menuhide',
    initialState,
    reducers: {
        toggleMenuHide: (state) => {
            state.isMenuOpen = !state.isMenuOpen
        },
    },
})

export const {toggleMenuHide} = youtubeSlice.actions

export default youtubeSlice.reducer


