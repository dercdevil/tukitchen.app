import {DEFAULT_API_URL} from "@/constants"; 

export const withApiURL = str => {

    if(typeof str !== "string") return "";

    return `${DEFAULT_API_URL}${str}`;

}