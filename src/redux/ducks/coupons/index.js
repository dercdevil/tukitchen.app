const APPLY_COUPON = "APPLY_COUPON";
const CLEAR_COUPONS = "CLEAR_COUPONS";

const initialState = {
    coupons: [],
    discount: 0
}

export const applyCoupon = coupon => ({
    type: APPLY_COUPON,
    payload: {
        coupon
    }
});

export const clearCoupons = () => ({
    type: CLEAR_COUPONS
});

export const couponsReducer = (state = initialState , {type,payload}) => {
    switch(type){
        case APPLY_COUPON:
            return {
                ...state,
                coupons: [payload.coupon]
            }
        case CLEAR_COUPONS:
            return {
                ...state,
                coupons: []
            }
        default:
            return state
    }
}