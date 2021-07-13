import { IS_PRODUCTION, DEBUG_GATEWAY } from "@/constants";
import { post, get } from "../base";


const endpoints = {
    flowGetStatus: "https://www.flow.cl/api/payment/create",//IS_PRODUCTION && !DEBUG_GATEWAY ? "https://www.flow.cl/api/payment/create" : "https://sandbox.flow.cl/api/payment/getStatus",
    flowPaymentCreate: "https://www.flow.cl/api/payment/create" //IS_PRODUCTION && !DEBUG_GATEWAY ? "https://www.flow.cl/api/payment/create" : "https://sandbox.flow.cl/api/payment/create"
};

const FLOW_STATUS = {
    1: "PENDING_PAYMENT",
    2: "PAYED",
    3: "DENIED",
    4: "CANCELLED"
}

export const getPaymentUrl = async (data) => {

    const res = await post(endpoints.flowPaymentCreate,data,{  
        headers:{
            "content-type": "application/x-www-form-urlencoded"
        }
    });

    return {
        ...res.data,
        status: FLOW_STATUS[res.data.status]
    };

}

export const getOrderStatus = async(data) => {

    const res = await get(endpoints.flowGetStatus,{
        params: data
    });

    return res.data;

}
