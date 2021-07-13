import { useSelector, useDispatch } from "react-redux";
import { applyCoupon, clearCoupons } from "@/redux/ducks/coupons";

export const useCoupons = () => {
    const dispatch = useDispatch();
    const state = useSelector( ({coupons}) => coupons );
    return {
        ...state,
        apply: coupon => dispatch(applyCoupon(coupon)),
        clear: () => dispatch(clearCoupons())
    }

}