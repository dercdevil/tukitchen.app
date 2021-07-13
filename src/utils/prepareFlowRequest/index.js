//import c from "react-native-crypto-js";
import crypto from "crypto-js";
import { objectToFormData } from "../objectToFormData";

const initConfig = {
    as: "formData"
}

export const prepareFlowRequest = (params,secretKey, config = initConfig) => {

    const {
        as: type
    } = config

    //https://www.flow.cl/docs/api.html#section/Introduccion/Como-firmar-con-su-SecretKey
    const toSign = Object
        .keys(params)
        .sort()
        .map( key => `${key}${params[key]}`)
        .join("");
    //Create signature for payment
    const hash = crypto.HmacSHA256(
        toSign,
        secretKey
    );

    const s = hash.toString(crypto.enc.Hex);

    if( type === "formData" ) return objectToFormData({...params,s});
    if( type === "queryParameters") return {...params,s};

    return {...params,s}

}