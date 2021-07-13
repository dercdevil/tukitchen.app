import { get } from "../base";

const endpoints = {
    categories: 'categories'
};

export const index = async () => {

    const res = await get(endpoints.categories);

    return res.data

}