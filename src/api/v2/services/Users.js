import { objectToSnakeCase, objectToFormData } from "@/utils";
import api , { get, put, post } from "../base";

const endpoints = {
    user: 'users',
    users: 'users-all',
    profile: 'profile',
    sellers: 'users-sellers',
    userAddresses: (id) => id ? `/user-addresses/${id}` : `/user-addresses`,
};

const INIT_CONFIG = {
    as: "object"
}

export const getAuthenticatedUser = async () => {
    const res = await get(endpoints.user);
    return res.data;
}

export const getProfile = async() => {

    const { profile } = await getAuthenticatedUser();
    return profile;

}

export const getSellers = async () => {
    const res = await get(endpoints.sellers);
    return res.data;
}

export const update = async (userData) => {
    const res = await put(endpoints.user,userData);
    return res.data;
}

export const updateProfile = async (profileData) => {
    const res = await put(endpoints.profile, objectToSnakeCase(profileData) );
    return res.data;
}
export const registerAddresses = async (addresses) => {
    const res = await post(endpoints.userAddresses, addresses );
    return res.data;
}
export const updateAddresses = async (addresses) => {
    const res = await put(endpoints.userAddresses, objectToSnakeCase(addresses) );
    return res.data;
}

export const mutateProfile = async (profileData, config = INIT_CONFIG) => {

    let data;

    let {
        name,
        last_name,
        phone,
        address,
        image,
        email
    } = profileData;

    if(config.as === "formdata") {
        data = objectToFormData({
            name,
            last_name,
            phone,
            address,
            email
        });
    }

    if(typeof image === "object"){
        data.append("image",image);
    }

    api.defaults.headers.common['Content-Type'] = `multipart/form-data`;

    const res = await api({
        url: endpoints.profile,
        method: profileData.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data
    });

    api.defaults.headers.common['Content-Type'] = `application/json`

    return {data: res.data , hasID: !!profileData.id};
}

export const getAddresses = async () => {

    const res = await get(endpoints.userAddresses());

    return res.data;

}

export const mutateUserAddress = async (address_id,addressData) => {

    const res = await api({
        url: endpoints.userAddresses(address_id),
        method: address_id ? "PUT" : "POST",
        data: {
            ...addressData,
            description: 'sin descripción'
        }
    });

    return res.data;

}

export const changePassword = async ({ rut, password }) => {

    const res = await put(
        endpoints.user,
        {   
            rut,
            password
        }
    );

    return res.data;

}