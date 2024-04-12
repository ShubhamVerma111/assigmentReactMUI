import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from "../api/dummyJSON";

type product = {
    "id": number,
    "title": string,
    "description": string,
    "price": number,
    "discountPercentage": number,
    "rating": number,
    "stock": number,
    "brand": string,
    "category": string
}

type data = {
    products: product[];
}

let initialState: data = {
    products: []
};

export const fetchData = createAsyncThunk(
    'data/fetchData',
    async () => {
        let response = await getProducts();
        return response
    }
);

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        // sortData: (state, action) => {
            
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    }
});

export const selectProducts = (state: { data: data }) => state.data.products
// export const { sortData } = dataSlice.actions;
export default dataSlice.reducer;