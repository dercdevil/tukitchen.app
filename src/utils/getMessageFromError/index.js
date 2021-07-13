import { COPY } from '@/copy';

const FORBIDDEN = 403;
const SERVER_ERROR = 500;
export const getMessageFromError = (err) => {

    if(err?.response){

        const message = err.response.data.message;

        if(message === "Forbidden" && err?.response.status === FORBIDDEN){
            return "Usuario o clave invalida"
        }

        if(err?.response.status === SERVER_ERROR){
            return "Error al recibir respuesta del servidor"
        }

        return message;

    }

    return COPY["error.default"];
}