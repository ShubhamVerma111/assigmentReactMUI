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
    allProducts: product[],
    products: product[],
    sortPrice: boolean,
    sortRating: boolean

}

let initialState: data = {
    allProducts:[],
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
            state.allProducts.sort((a, b) => {
                if (state.sortPrice) return a.price - b.price;
                return b.price - a.price;
            });
            state.products = state.allProducts.slice(0, state.products.length)
            state.sortPrice = !state.sortPrice;
        },
        sortProductsByRating(state) {
            state.allProducts.sort((a, b) => {
                if (state.sortRating) return b.rating - a.rating;
                return a.rating - b.rating;
            });
            state.products = state.allProducts.slice(0, state.products.length);
            state.sortRating = !state.sortRating;
        },
        deleteProductById(state, action) {
            state.products = state.products.filter(product => product.id !== action.payload);
            state.allProducts = state.allProducts.filter(product => product.id !== action.payload);
        },
        updateProductById: (state, action) => {
            const updatedProduct = action.payload;
            state.products = state.products.map(product =>
                product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
            );
            state.allProducts = state.allProducts.map(product =>
                product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
            );
        },
        addMoreToProducts: (state)=>{
            let currLen = state.products.length;
            const more = state.allProducts.slice(currLen, currLen+20);
            state.products = [...state.products, ...more];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.allProducts = action.payload;
            state.products = state.allProducts.slice(0,20);
        });
    }
});

export const selectProducts = (state: { data: data }) => state.data.products
export const selectAllProducts = (state: { data: data }) => state.data.allProducts;
export const selectSortPrice = (state: { data: data }) => state.data.sortPrice
export const selectSortRating = (state: { data: data }) => state.data.sortRating
export const { addMoreToProducts, sortProductsByPrice, sortProductsByRating, deleteProductById, updateProductById } = dataSlice.actions;
export default dataSlice.reducer;