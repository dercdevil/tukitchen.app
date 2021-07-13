import { useOrders } from "@/hooks";
import { useState } from "react";

export const Actions = () => {

    const orders = useOrders();

    const [ orderBeingUpdated , setOrderBeingUpdated ] = useState({});

    const updateOrder = (order) => {

        setOrderBeingUpdated(order);

        setTimeout( () => {
            setOrderBeingUpdated({})
        } , 60000);

        //ask backend to refresh order status

        //if order is still in progreese we should generate a new order so user can pay

        //else we update the status 

    }

    return {
        orders,
        updateOrder,
        orderBeingUpdated
    }
}