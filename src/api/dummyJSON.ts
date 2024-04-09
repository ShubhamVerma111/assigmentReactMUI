import axios from "axios";

const api = axios.create({
    baseURL: 'https://dummyjson.com/products'
})

export async function getProducts() {
    try {
        const response = await api.get('');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}