import { useDispatch, useSelector } from "react-redux"
import { 
    addProduct , 
    removeProduct, 
    destroyProduct, 
    batchUpdate, 
    revalidateCart,
    restoreCart,
    emptyCart,
    updatePaymentMethod,
    updateDeliveryCost,
    updateLocation
} from "@/redux/ducks/cart";
import { round } from "@/utils";

const isValidProduct = (product) => {

    const { profile } = product;

    return profile && 
        profile.api_key &&
        profile.secret_key &&
        profile.name_store 
        //profile.img_profile 

}

const validateCart = cart => {

    return cart.products.every( product => isValidProduct(product) )

}

//return an array of stores with the products purchased to that store
const getProductsByStore = (state) => {
    let stores = state.products.filter( product => isValidProduct(product) );
    stores = stores.map( product => product.profile.id)
    stores = [...new Set(stores)];
    return stores.map( store_id => {
        const storeProducts = state.products.filter( product => product.profile?.id === store_id )
        const store = storeProducts[0]?.profile;

        return ({
            store_id: store_id,
            api_key: store.api_key,
            secret_key: store.secret_key,
            imgProfile: store.img_profile,
            name: store.name_store,
            products: storeProducts,
            total: storeProducts.reduce( (total,product) => round( product.price * product.quantity + total ) , 0 )
        });
    });
}

export const useCart = () => {

    const dispatch = useDispatch();
    const state = useSelector( ({cart}) => cart );
    const productsByStore = useSelector( ({cart}) => getProductsByStore(cart) );
    const isValidCart = useSelector( ({cart}) => validateCart(cart) );

    return {
        ...state,
        add: product => dispatch( addProduct(product) ),
        remove: product => dispatch( removeProduct(product) ),
        destroy: product => dispatch( destroyProduct(product) ),
        batchUpdate: products => dispatch( batchUpdate(products) ),
        revalidate: () => dispatch( revalidateCart() ),
        restore: () => dispatch( restoreCart() ),
        empty: () => dispatch( emptyCart() ),
        updateLocation: (location) => dispatch( updateLocation(location) ),
        updatePaymentMethod: paymentMethod => dispatch( updatePaymentMethod(paymentMethod) ),
        updateDeliveryCost: deliveryCost => dispatch( updateDeliveryCost(deliveryCost) ),
        productsByStore,
        isValid: isValidCart
    }

}