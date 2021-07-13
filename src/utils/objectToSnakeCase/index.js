import { cammelToSnakeCase } from "../cammelToSnakeCase";

export const objectToSnakeCase = obj => {

    const newObj = {}

    Object.entries(obj).forEach( ([key,value]) => {

        newObj[cammelToSnakeCase(key)] = value; 

    });

    return newObj;

}