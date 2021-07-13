import { round } from "@/utils";


const ADD_PRODUCT = "ADD_PRODUCT";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const DESTROY_PRODUCT = "DESTROY_PRODUCT";
const PRODUCTS_BATCH_UPDATE = "PRODUCTS_BATCH_UPDATE";
const REVALIDATE_CART = "REVALIDATE_CART";
const RESTORE_CART = "RESTORE_cART";
const EMPTY_CART="EMPTY_CART";
const UPDATE_PAYMENT_METHOD = "UPDATE_PAYMENT_METHOD";
const UPDATE_DELIVERY_COST = "UPDATE_DELIVERY_COST";
const UPDATE_LOCATION = "UPDATE_LOCATION";

const initialState = {
    products: [],
    total: 0,
    productsLength: 0,
    location: null,
    hasProductsFromDifferentStores: false,
    paymentMethod: "FLOW",
    deliveryCost: 0
}

export const revalidateCart = () => ({
    type: REVALIDATE_CART
})

export const batchUpdate = products => ({
    type: PRODUCTS_BATCH_UPDATE,
    payload: {
        products
    }
})

export const addProduct = product => ({
    type: ADD_PRODUCT,
    payload: {
        product: {
            ...product,
            quantity: 1
        }
    }
})

export const removeProduct = product => ({
    type: REMOVE_PRODUCT,
    payload: {
        product
    }
})

export const destroyProduct = product => ({
    type: DESTROY_PRODUCT,
    payload: {
        product
    }
});

export const emptyCart = () => ({
    type: EMPTY_CART
})

export const restoreCart = () => ({
    type: RESTORE_CART
})

export const updatePaymentMethod = paymentMethod => ({
    type: UPDATE_PAYMENT_METHOD,
    payload: {
        paymentMethod
    }
})

export const updateDeliveryCost = deliveryCost => ({
    type: UPDATE_DELIVERY_COST,
    payload: {
        deliveryCost
    }
});

export const updateLocation = location => ({
    type: UPDATE_LOCATION,
    payload: {
        location
    }
})

export const cartReducer = (state = initialState , {type,payload}) => {

    switch(type){

        case UPDATE_PAYMENT_METHOD: {
            return {
                ...state,
                paymentMethod: payload.paymentMethod,
                deliveryCost: payload.paymentMethod === "CASH" ? 0 : state.deliveryCost
            }
        }

        case UPDATE_DELIVERY_COST: {
            return {
                ...state,
                deliveryCost: payload.deliveryCost
            }
        }

        case REVALIDATE_CART: {
            //a product is invalid when it has a flow order because it was paid
            const invalidProducts = state.products.filter( product => product.flowOrder );
            return {
                ...state,
                products: state.products.filter( product => !product.flowOrder ),
                total: state.total - invalidProducts.reduce( (t,product) => t + product.price , 0 ),
                productsLength: state.productsLength - invalidProducts.reduce( (t,product) => t + product.quantity , 0 )
            }
        }

        case EMPTY_CART: {
            return {
                ...initialState
            }
        }

        case PRODUCTS_BATCH_UPDATE:
            return {
                ...state,
                products: payload.products
            }

        case REMOVE_PRODUCT:{
            let newProducts = [...state.products];
                //map products so if new product was already added decrease the quantity
                newProducts = newProducts.map( product => {
                    if(product.id === payload.product.id){
                        return {
                            ...product,
                            quantity: product.quantity - 1
                        };
                    } 
                    return product;
                })
            return {
                ...state,
                total: state.total - round(payload.product.price),
                productsLength: state.productsLength - 1,
                products: newProducts
            }
        }

        case RESTORE_CART: {
            return {
                ...state,
                hasProductsFromDifferentStores: false
            }
        }

        case UPDATE_LOCATION: {
            return {
                ...state,
                location: payload.location
            }
        }

        case ADD_PRODUCT:{
            let productAlreadyAdded = false;
            let hasProductsFromDifferentStores = false;
            let newProducts = [...state.products];
                //map products so if new product was already added increase the quantity
                newProducts = newProducts.map( product => {
                    hasProductsFromDifferentStores = product.profile.name_store !== payload.product.profile.name_store
                    if(product.id === payload.product.id){
                        productAlreadyAdded = true;
                        return {
                            ...product,
                            quantity: product.quantity + 1
                        };
                    } 
                    return product;
                })

            return {
                ...state,
                total: state.total + round(payload.product.price),
                productsLength: hasProductsFromDifferentStores ? state.productsLength : state.productsLength + 1,
                hasProductsFromDifferentStores,
                products: productAlreadyAdded || hasProductsFromDifferentStores
                    ? newProducts
                    : [...newProducts , {...payload.product}]
            }
        }

        case DESTROY_PRODUCT:{

            const newProducts = state.products.filter(
                product => product.id !== payload.product.id
            )

            return {
                ...state,
                products: newProducts,
                productsLength: state.productsLength - payload.product.quantity,
                total: state.total - round( payload.product.price * payload.product.quantity )
            }
        }

        default:
            return state

    }


}