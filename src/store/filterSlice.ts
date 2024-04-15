import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
    categories: string[],
    isFilterSelected:boolean
}

let initialState: initialStateType = {
    categories: [],
    isFilterSelected:false
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        updateFilterCategories(state, action) {
            state.categories = action.payload;
            if(state.categories.length === 0) state.isFilterSelected=false;
            else state.isFilterSelected=true;
        }
    }
});

export const { updateFilterCategories } = filterSlice.actions;
export default filterSlice.reducer;
export const selectFilter = (state: { filter: initialStateType }) => state.filter.categories;
export const selectIsFilterSelected = (state: { filter: initialStateType }) => state.filter.isFilterSelected;