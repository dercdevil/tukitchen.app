import { get } from "../base";

const endpoints = {
    products: 'products'
};

export const index = async (filters = {},currentPage) => {

    const res = await get(endpoints.products,{  
        params: {
            ...filters,
            page: currentPage
        }
    });
    
    return res.data;

}