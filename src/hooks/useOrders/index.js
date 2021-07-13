import { useState } from "react";
import { useQuery } from "react-query";
import api from '@/api/v2';

export const useOrders = () => {

    const [currentPage,setCurrentPage] = useState( data?.currentPage || 1 );

    const {
        isLoading,
        data,
        error
    } = useQuery(
        "orders", () => api.orders.index()
    );

    const models = data || [];

    const pagination = {
        pages: data?.total || 1,
        currentPage
    }

    return {
        isLoading,
        all: models,
        error,
        pagination,
        where: ( { status } ) => models.filter( model => model[ [status] ] === status )
    }

}