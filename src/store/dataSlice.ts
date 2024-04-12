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
    products: product[],
    sortPrice: boolean,
    sortRating: boolean

}

let initialState: data = {
    products: [],
    sortPrice: true,
    sortRating: true
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
        sortProductsByPrice(state) {
            state.products.sort((a, b) => {
                if(state.sortPrice) return a.price - b.price;
                return b.price - a.price;
            });
            state.sortPrice = !state.sortPrice;
        },
        sortProductsByRating(state) {
            state.products.sort((a, b) => {
                if(state.sortRating) return b.rating - a.rating;
                return a.rating - b.rating;
            });
            state.sortRating = !state.sortRating;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    }
});

export const selectProducts = (state: { data: data }) => state.data.products
export const { sortProductsByPrice, sortProductsByRating } = dataSlice.actions;
export default dataSlice.reducer;