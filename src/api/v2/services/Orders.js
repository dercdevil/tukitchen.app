import { post , get } from "../base";

const endpoints = {
    orders: "orders"
};

export const create = async (data) => {

    const res = await post(endpoints.orders,data);
    return res.data;

}

export const index = async () => {

    const res = await get(endpoints.orders,{
        params: {
            "not_paginate":true
        }
    });
    return res.data;

}