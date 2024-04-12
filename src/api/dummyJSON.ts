import axios from "axios";

const api = axios.create({
    baseURL: 'https://dummyjson.com/products'
})

export async function getProducts() {
    try {
        const response = await api.get('', {
            params: {
                limit: 100,
                select: 'title,description,price,discountPercentage,rating,stock,brand,category'
            }
        });
        return response.data.products;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}