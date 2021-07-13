import {useEffect} from "react";
import { useAuth } from "../useAuth";
const UNAUTHORIZED = 401;

export const useErrorChecker = (errors) => {

    const { logOut } = useAuth();

    useEffect( () => {
        //array of errors
        if(Array.isArray(errors)){

            errors.forEach( error => {
                if( error && error.response && error.response.status === UNAUTHORIZED ){
                    logOut();
                    throw error;
                }
            })

        }
        //single error
        else {
            let error = errors;

            if( error && error.response && error.response.status === UNAUTHORIZED ){
                logOut();
                throw error;
            }
        }

    } , [errors] );

}