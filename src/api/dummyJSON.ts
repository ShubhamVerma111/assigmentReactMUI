import axios from "axios";

const api = axios.create({
    baseURL: 'https://dummyjson.com/products'
})

export async function getProducts(skip:number = 0) {
    try {
        const response = await api.get('', {
            params :{
                skip: skip,
                limit: 10
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}