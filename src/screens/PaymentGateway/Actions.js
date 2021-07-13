
import {useState, useEffect} from "react";
import api from "@/api/v2";
import { useCart, useAuth, useCoupons, useUserAddresses } from "@/hooks";
import { DEFAULT_API_URL } from "../../constants";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import Constants from 'expo-constants';
import { prepareFlowRequest, uuid, notify } from "@/utils";
import { useRoute } from '@react-navigation/native';
import { COPY } from "@/copy";
import { applyDiscount } from "../../utils";

const flowStatusToApiStatusMap = {
    1: "IN-PROGRESS",
    2: "SUCCESS",
    3: "FAIL",
    4: "REJECT"
};

const flowStatusToApiStatus = status => flowStatusToApiStatusMap[status] || "IN-PROGRESS";

const PaymentGatewayActions = ({navigation}) => {

    const cart = useCart();
    const { user } = useAuth();

    const [isPaying,setPayment] = useState(false);
    const [redirectData,setRedirectData] = useState({});
    const [orders,setOrders] = useState([]);
    const { coupons, clear : clearCoupons } = useCoupons();

    const { addresses: userLocations } = useUserAddresses();

    useEffect( () => {

        const unsubscribe = navigation.addListener( 'blur' , () => {
            setOrders([])
        })

        return unsubscribe;

    } , []);

    const removeLinkingListener = () => {
        Linking.removeEventListener("url", handleRedirect);
    };

    const handleRedirect = () => {
        if (Constants.platform.ios) {
            WebBrowser.dismissBrowser();
        } else {
           removeLinkingListener();
        }
      
        let data = Linking.parse(event.url);
        setRedirectData(data);
    }

    const addLinkingListeners = () => {
        Linking.addEventListener("url", handleRedirect);
    }

    const payUsingFlow = async ({
        total,
        api_key,
        currency,
        email,
        secret_key,
        commerceOrder
    }) => {

        const redirect = Linking.makeUrl("/home");
        const params = {
            apiKey: api_key,
            commerceOrder,
            subject: 'Pago flow',
            currency,
            amount: Math.floor(total),
            email: email || user?.profile?.email,
            urlConfirmation: `${DEFAULT_API_URL}flow/update-status`,
            urlReturn: `${DEFAULT_API_URL}flow/redirect?redirect_app=${redirect}`,
            optional: JSON.stringify({
                redirect_app: redirect
            })
        }

        //Create order request on flow
        const {
            url,
            token,
            flowOrder
        } = await api.gateway.getPaymentUrl( prepareFlowRequest(params,secret_key) );
    
        return {
            url,
            token,
            flowOrder
        }
    }

    const proceedWithPayment = ({
        total,
        api_key,
        currency = "CLP",
        email,
        secret_key,
        store_id,
        products,
        total_neto
    }) => async () => {

        if(total < 350){
            notify.warning({
                title: COPY["errors.invalid-cart-amount"]
            });
            return;
        }

        const commerceOrder = uuid();

        const store = cart.productsByStore?.[0]

        try{
            setPayment(true);
            if( cart.paymentMethod === "FLOW" ){
                const { flowOrder , token, url } = await payUsingFlow({
                    total,
                    api_key,
                    currency,
                    email,
                    secret_key,
                    store_id,
                    products,
                    commerceOrder
                })
                //Save flow pre order on backend
                const storedOrder = await api.orders.create({
                    user_id: user.id,
                    profile_id: store_id,
                    total: total,
                    reference: commerceOrder,
                    flow_order: flowOrder,
                    method: "FLOW",
                    total_neto,
                    coupon: coupons?.[0]?.name || undefined,
                    user_address_id: userLocations[0]?.id,
                    products: products.map( product => ({ product_id: product.id })),
                });
                //update all products so in case of app closing or something cart updates anyways
                cart.batchUpdate( products.map( product => ({...product,flowOrder} )));

                //addLinkingListeners();

                //Wait for user to pay
                await WebBrowser.openBrowserAsync(
                    `${url}?token=${token}`,
                    {showInRecents: true}
                );

                //Get result from order operation (e.g if order denied or success)
                const order = await api.gateway.getOrderStatus( 
                    prepareFlowRequest({
                        apiKey: api_key,
                        token
                    }, secret_key , { as: "queryParameters" }) 
                );
                //Updates order stored in backeend with the resulting status
                //await api.orders.update(storedOrder.id , { status: flowStatusToApiStatus(order.status)} )
                order.products = products;

                if( !orderIsDeniedOrCancelled(order.status) ){
                    for(const product of products){
                        cart.destroy(product);
                    }    
                    setOrders([...orders, order]);
                }else{
                    notify.warning({
                        title: COPY["errors.order-cancelled-or-denied"] || "Orden fue cancelada o denengada"
                    });
                }

            }else {
                const storedOrder = await api.orders.create({
                    user_id: user.id,
                    profile_id: store_id,
                    total: total,
                    reference: commerceOrder,
                    flow_order: "0",
                    method: "CASH",
                    total_neto,
                    coupon: coupons?.[0]?.name || undefined,
                    products: products.map( product => ({ product_id: product.id })),
                    cupons: []
                });
                for(const product of products) 
                    cart.destroy(product);
                setOrders([...orders, storedOrder]);
            }
        }catch(error){
            console.log(error);
            notify.error({
                title: COPY["errors.cant-connect-to-gateway"]
            })
        }finally {
            setPayment(false);
            clearCoupons()
        }
    }

    return {
        cart,
        isPaying,
        proceedWithPayment,
        orders,
        coupons,
        userLocations
    }
}

export default PaymentGatewayActions;

const orderIsDeniedOrCancelled = status => ["CANCELLED","DENIED",3,4].includes(status)