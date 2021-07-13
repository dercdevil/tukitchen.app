import { post , get, setAccessTokenHeader } from "../base";

const endpoints = {
    logIn: '/login',
    signUp: '/users',
    user: '/users',
    recoverPassword: '/auth_recovery_pass'
};

export const logIn = async (userData) => {
    const { data : auth } = await post(endpoints.logIn,userData);
    setAccessTokenHeader(auth.token);
    const { data : user } = await get(endpoints.user);
    return {
        ...auth,
        user: {
            ...auth.user,
            ...user
        }
    };
}

export const signUp = async (userData) => {
    const res = await post(endpoints.signUp,{ ...userData, role: userData.role || "COMPRADOR" });
    return res.data;
};