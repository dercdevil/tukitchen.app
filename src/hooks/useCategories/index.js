import { useQuery } from "react-query";
import api from '@/api/v2';

export const useCategories = () => {

    const {
        isLoading,
        data,
        error
    } = useQuery(
        "categories", () => api.categories.index()
    );

    return {
        isLoading,
        all: data?.docs || [],
        error
    }

}