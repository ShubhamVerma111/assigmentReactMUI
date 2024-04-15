import axios from "axios";

type productType = {
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

export async function deleteProduct(id: number) {
    try {
        const response = await api.delete(`/${id}`);
        return (response.data.isDeleted);
    } catch (error) {
        console.error('Error deleteing data:', error);
        throw error;
    }
}

export async function updateData(product: Partial<productType>) {
    try {
        let id = product.id;
        let x = {...product};
        delete x.id;
        const response = await api.put(`/${id}`, x);
        return (response.data);
    } catch (error) {
        console.error(error);
    }
    return false;
}