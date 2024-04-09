import { createSlice } from "@reduxjs/toolkit";

interface product {
    "id": number,
    "title": string,
    "description": string,
    "price": number,
    "discountPercentage": number,
    "rating": number,
    "stock": number,
    "brand": string,
    "category": string,
    "thumbnail": string,
    "images": string[]
}

type data = {
    "products": product[],
    "total": number,
    "skip": number,
    "limit": number
}

let initialState: data = {
    'products': [],
    'total': 0,
    'skip': 0,
    'limit': 0
}

export const dataSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setWholeData: (state, action) => {
            state.products = action.payload.products;
            state.total = action.payload.total;
            state.skip = action.payload.skip;
            state.limit = action.payload.limit;
        }
    }
})

export default dataSlice.reducer
export const { setWholeData } = dataSlice.actions;
export const selectProducts = (state:{data:data}) => state.data.products; 
export const selectTotal = (state:{data:data}) => state.data.total; 
export const selectSkip= (state:{data:data}) => state.data.skip; 