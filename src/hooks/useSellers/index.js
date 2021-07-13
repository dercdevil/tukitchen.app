import { useQuery } from "react-query";
import api from "@/api/v2";

export const useSellers = () => {
    
    const {
        data,
        isLoading,
        error
    } = useQuery(
        "sellers",
        () => api.users.getSellers()
    );

    return {
        all: data || [],
        isLoading,
        error
    };

}