import { useMutation } from "react-query";
import { useState } from "react";
import { COPY } from "@/copy";
import { useAuth, useErrorChecker } from "@/hooks";
import api from "@/api/v2";
import { notify } from "@/utils";

const Actions = () => {

    const { user } = useAuth();

    const {
        mutate : mutatePassword,
        isLoading,
        error 
    } = useMutation(
        ({password}) => api.users.changePassword({
            password,
            rut: user.rut
        }),
        {
            onSuccess: () => {
                notify.success({
                    title: COPY["password-update-success"]
                })
            }
        }
    );

    useErrorChecker([error]);

    const [ password , setPassword ] = useState("");

    const shouldEnableUpdate = !!password;

    const onPress = () => {
        mutatePassword({password});
    }

    return {
        mutatePassword,
        shouldEnableUpdate,
        isLoading,
        setPassword,
        onPress,
        password,
        error
    }
}

export default Actions;