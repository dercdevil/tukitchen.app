import {create} from "axios";
import { DEFAULT_API_URL } from "@/constants";

const apiClient = create({
    baseURL: DEFAULT_API_URL
});


const { get,put,delete : destroy ,post } = apiClient;

const setAuthHeader = token => {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const setAccessTokenHeader = token => {
    apiClient.defaults.headers.common['x-access-token'] = `${token}`;
}

export default apiClient;

export {
    get,
    destroy,
    post,
    put,
    setAuthHeader,
    setAccessTokenHeader
}