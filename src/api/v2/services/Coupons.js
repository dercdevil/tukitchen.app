import { resolve } from "url";
import { get } from "../base";

const endpoints = {
    coupons: 'coupons',
    validateCoupon: (coupon) => `is-coupon-valid/${coupon}`
};

export const index = async () => {
    const res = await get(endpoints.coupons);
    return res.data
}

export const validate = async (coupon) => {
    const res = await get(endpoints.validateCoupon(coupon));

    if(res.data.is_used){
        throw new Error("Este cupon ya fue canjeado")
    }

    return res.data;
}