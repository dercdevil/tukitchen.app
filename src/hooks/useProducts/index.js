import {
    useQuery,
    useInfiniteQuery
} from 'react-query';
import api from '@/api/v2';
import { useState , useEffect, useCallback } from 'react';
import { cammelToSnakeCase } from "@/utils";
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useMemo } from 'react';

const FILTERS = {
    word: '',
    idCategory: '',
    idSeller: '',
    stock: '',
    minPrice: '',
    maxPrice: '',
    dayAvailable: '',
    hourAvailable: '',
    word: '',
    sellers: '',
    premium: false
}

const parseFilters = (...filters) => {
    let f = {};
    filters.filter(Boolean).forEach( (filter) => {
        f = Object.assign(f , filter)
    });
    return f;
}

export const useProducts = (props) => {

    const { params } = useRoute();

    const [filters,setFilters] = useState({
        ...FILTERS
    });

    const [currentPage,setCurrentPage] = useState( data?.currentPage || 1 );

    const filtersProp = useMemo( () => props?.filters, [] )

    useEffect( () => {
        if(params?.sellers){
            const { sellers } = params
            setFilters( prev => ({...prev, sellers: [sellers] }))
        }
    } , [params]);

    useEffect( () => {
        setFilters( prev => ({
            ...prev, 
            ...filtersProp,
            days: typeof prev.days === "string" 
                ? Array.from(new Set(
                    [...[prev.days], ...(filtersProp?.days || [])]
                ))
                : Array.from(new Set(
                    [...(prev.days || []), ...(filtersProp?.days || [])]
                ))
        }));
    } , [filtersProp]);

    const {
        isLoading,
        data,
        error,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        refetch
    } = useInfiniteQuery(
        ["products", {filters}], 
        ({ pageParam = 1 }) => api
            .products
            .index(
                parseFilters(
                    { "get_categories": true },
                    filters.word && { word: filters.word },
                    filters.minPrice && { minPrice: filters.minPrice },
                    filters.maxPrice && { maxPrice: filters.maxPrice },
                    filters.category && { category_id: filters.category.id },
                    filters.sellers && { stores: filters.sellers.join(",") },
                    filters.days && { days: filters.days.join(",") },
                    filters.time_init && { time_init: filters.time_init},
                    filters.time_final && { time_final: filters.time_final }
                ), 
                pageParam
            ),
        {
            getNextPageParam: (lastPage, pages) => {
                return lastPage.nextPage;
            },
            keepPreviousData: true
        }
    );

    const {
        data : featuredProducts,
    } = useQuery(
        "featured_products", () => api.products.index(),
        {
            select: products => products?.data?.filter( product => product.is_premium ),
            initialData: []
        }
    );
    
    const filterBy = ( newFilters ) => {
        setFilters( prevFilters => {
            let prevDays = new Set([
                ...(prevFilters.days || [])
            ]);
            let newDays = new Set([
                ...(newFilters.days || [])
            ]);
            let days = new Set([...newDays,...prevDays].filter(x => !newDays.has(x) || !prevDays.has(x) ));
            return {
                ...prevFilters,
                ...newFilters,
                days: Array.from(days),
                sellers: prevFilters.sellers.includes(newFilters.seller) 
                    ? prevFilters.sellers.filter( seller => seller !== newFilters.seller )
                    : [...(prevFilters.sellers || []), newFilters.seller ]
            }
        });
    }

    const resetFilters = () => {
        setFilters({})
    }

    const getFeaturedProducts = () => {
        let featured = [ ...(featuredProducts || []), ...(data?.docs || []) ];
        return featured.slice(0,3);
    }

    const pagination = {
        pages: data?.lastPage || 1,
        currentPage,
        goto: (page) => setCurrentPage(page),
        nextPage: () => data?.nextPage ? setCurrentPage(currentPage+1) : null,
        previousPage: () => data?.previousPage ? setCurrentPage(currentPage-1) : null,
        canGoNext: data?.nextPage,
        canGoBack: data?.lastPage
    }

    return {
        isLoading,
        all: data?.pages.map( page => page.data ).flat() || [],
        pagination,
        hasNextPage,
        isFetchingNextPage,
        getFeaturedProducts,
        error,
        filterBy,
        fetchNextPage,
        filters,
        resetFilters
    }

};
