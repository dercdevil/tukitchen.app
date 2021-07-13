import React, { useRef, useState, Fragment} from "react";
import { View, TouchableHighlight } from "react-native";
import { DEFAULT_API_URL, URLS } from "@/constants";
import Wizard from "react-native-wizard";
import {
    Button,
    Box,
    Row,
    Col,
    Avatar,
    Text,
    Title,
    Spacing,
    Surface,
    Pill,
    TruckCheckIcon,
    WalletIcon,
    DoubleCardIcon,
    Icon
} from "@/components";
import { withCoin, mapStatusToText , mapStatusToTone , applyDiscount } from "@/utils";
import { COPY } from "@/copy";
import { FastFoodBox } from "@/assets/svgs";
import { Colors } from "@/theme";

const DottedLine = () => {

    return(
        <Box 
            self="flex-end"
            flex={1}
            ml={8}
            mr={8}
            mb={2}
            style={{
                height: 0,
                borderWidth: 1,
                borderStyle: "dotted",
                borderRadius: 1,
                borderColor: "#000"
            }}
        />
    )

}

const PaymentGateway = ({
    cart,
    proceedWithPayment,
    calculateDelivery,
    isPaying,
    orders,
    navigation,
    coupons,
    userLocations
}) => {
    const wizard = useRef();
    const [isFirstStep,setFirstStep] = useState(false);
    const [isLastStep, setLastStep] = useState(false);
    const [currentStep, setCurrentStep] = useState(false); 

    const renderPaymentOrders = () => {

        return cart.productsByStore.map( store => {
            return ({
                content: (
                    <Col align="center">
                        <Avatar
                            size={98}
                            roundness={98*0.35}
                            name={store.name}
                            source={DEFAULT_API_URL+store.imgProfile}
                        />
                        <Spacing top ={20}/>
                        <Title>
                            Pagar a: {store.name}
                        </Title>
                        <Spacing top ={20} />
                        <Box paddingHorizontal = {28}> 
                            {store.products.map( product => (
                                <Fragment key = {product.id}>
                                    <Row
                                        width = "100%"
                                        justify="space-between"
                                        p={10}
                                    >
                                        <Text>
                                            {product.name}
                                        </Text>
                                        <DottedLine/>
                                        <Text>
                                            {product.quantity}&times;{withCoin(product.price)}
                                        </Text>
                                    </Row>
                                    <Spacing top = {20} />
                                </Fragment>
                            ))}
                            <Row width="100%" align="center">
                                <Box w={60} h={80} mt={-14} color = "red" align="center">
                                    <TruckCheckIcon color={Colors.muted} />
                                </Box>
                                <Box ml={12}>
                                    <Text>
                                        Direccion de envio
                                    </Text>
                                    <Box w={300} mb={20} mt={10} self="center">
                                        <Text muted fontSize={10}>
                                            {`${userLocations?.[0]?.address} ${userLocations?.[0]?.city}`}
                                        </Text>
                                    </Box>
                                </Box>
                            </Row>
                            <Row width="100%" align="center">
                                <Box w={50} h={70} mt={-14} color = "red" align="center">
                                    <DoubleCardIcon color={Colors.muted} />
                                </Box>
                                <Box ml={18}>
                                    <Text>
                                        Metodo de pago
                                    </Text>
                                    <Box w={300} mb={20} mt={10} self="center">
                                        <Text muted fontSize={10}>
                                            {cart.paymentMethod ==="CASH" ? "Efectivo" : "Flow"}
                                        </Text>
                                    </Box>
                                </Box>
                            </Row>
                            <Row
                                width = "100%"
                                p={10}
                                justify="space-between"
                            >
                                <Text bold>
                                    Costo de envío
                                </Text>
                                <DottedLine/>
                                <Text>
                                    {withCoin(cart.deliveryCost)}
                                </Text>
                            </Row>
                            {coupons.map( coupon => (
                                <Row
                                    width = "100%"
                                    p={10}
                                    justify="space-between"
                                >
                                    <Text bold>
                                        Cupones
                                    </Text>
                                    <DottedLine/>
                                    <Text>
                                        -{withCoin(applyDiscount( store.total , coupon.discount ))}
                                    </Text>
                                </Row>
                            ))}
                            <Row
                                width = "100%"
                                p={10}
                                justify="space-between"
                            >
                                <Text bold>
                                    Sub Total
                                </Text>
                                <DottedLine/>
                                <Text>
                                    {withCoin(store.total)}
                                </Text>
                            </Row>
                            <Row
                                width = "100%"
                                p={10}
                                justify="space-between"
                            >
                                <Text bold>
                                    Total
                                </Text>
                                <DottedLine/>
                                <Text>
                                    {withCoin(store.total + cart.deliveryCost - applyDiscount( store.total , coupons.reduce( (total,coupon) => total + coupon.discount , 0 ) ) )}
                                </Text>
                            </Row>
                            <Spacing top ={20} />
                            <Row width="100%" justify="center">
                                <Button
                                    width="100%"
                                    pl={40}
                                    pr={40}
                                    onPress={proceedWithPayment({
                                        ...store,
                                        //Total que se gasta en productos
                                        total_neto: store.total,
                                        //Total de la factura (total en productos - cupones + delivery)
                                        total: store.total + cart.deliveryCost - applyDiscount( store.total , coupons.reduce( (total,coupon) => total + coupon.discount , 0 ) )
                                    })}
                                    disabled={isPaying}
                                >
                                    Pagar
                                </Button>
                            </Row>
                        </Box>
                    </Col>
                )
            })
        })
    }

    const renderOrderSummary = () => {

        return [
            {
                content: (
                    <Col flex = {0} justify="center" align="center">
                        <Box>
                            <FastFoodBox style={{ width: 165 , height: 165 }} />
                        </Box>
                        <Spacing top = {18} />
                        <Title>
                            {COPY["order.received"]}
                        </Title>
                        <Spacing top = {10}/>
                        <Text>
                            {COPY["order.received.suggest"]}
                        </Text>
                        <Spacing top = {10}/>
                        <Box width = "100%" pl = {15} pr = {15}> 
                            {orders.map( order => (
                                <TouchableHighlight key = {order.flowOrder || order.id} onPress = {() => {}}>
                                    <Surface p={20} style = {{elevation: 1}} >
                                        <Row justify = "space-between" align = "center">
                                        <Box flex = {1} direction = "row" align = "center">
                                            <Text>
                                                #{order.flowOrder}
                                            </Text>
                                            <Pill ml = {15} tone={ mapStatusToTone(order.status) } >
                                                { mapStatusToText(order.status) }
                                            </Pill>
                                        </Box>
                                        <Icon 
                                            fontSize={24} 
                                            color = {"#000"} 
                                            icon="keyboard-arrow-right" 
                                            provider="material-icons"
                                        />
                                        </Row>
                                    </Surface>
                                </TouchableHighlight>
                            ))}
                        </Box>
                        <Spacing top = {18}/>
                        <Button
                            onPress = {() => navigation.navigate(URLS.summary) }
                        >
                            {COPY["return.home"]}
                        </Button>
                    </Col>
                )
            }
        ]
    }

    return(
      <Box
        flex={1}
      >
        <View style={{ 
            flexDirection: "row"
        }}>
            <Row center flex={1} pt={5} pb={5}>
                {/* <Button type = "tertiary" onPress={()=>{}}>
                    Siguiente
                </Button> */}
                <Text fontSize={24} center>
                    Pasarela de Pago
                </Text>
                {/* <Button type = "tertiary" onPress={()=>{}}>
                    Anterior
                </Button> */}
            </Row>
        </View>
        <Box pt={50}>
            <Wizard
                ref = {wizard}
                activeStep={0}
                steps={ !!cart.productsByStore.length ? renderPaymentOrders() : renderOrderSummary() }
                isFirstStep={val => setFirstStep(val)}
                isLastStep={val => setLastStep(val)}
                currentStep={({ currentStep }) => {
                    setCurrentStep(currentStep)
                }}
            />
        </Box>
      </Box>
    )
}

export default PaymentGateway;