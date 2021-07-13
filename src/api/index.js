import {create} from 'axios';
import { ENV } from '@/constants';

const authApi = create({
    baseURL: ENV.TUKITCHEN_API_URL
});

authApi.configAuth = function(token){
    this.defaults.headers.common['Authorization'] = token;
}

export default authApi;
