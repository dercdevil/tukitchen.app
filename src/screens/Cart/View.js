import React, { useState } from "react";
import { FlatList, View, ScrollView, StyleSheet } from "react-native";
import { DEFAULT_API_URL } from "@/constants";
import { COPY } from "@/copy";
import { Colors, fontConfig } from "@/theme";
import { URLS } from "@/constants";
import { withCoin, getkilometres, notify } from "@/utils";
import api from "@/api/v2";
import Map from "@/components/app/Map";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {
  Button,
  Col,
  Row,
  Spacing,
  Title,
  Header,
  Touchable,
  Box,
  Text,
  Avatar,
  Input,
  Subtitle,
  IconButton,
  CounterButton,
  EmptyState,
  Hr,
  AsyncField,
  DoubleCardIcon
} from "@/components";

import { Picker } from 'react-native-woodpicker'

const ControlSegmented = ({ index, onchange, values, mapIndex }) => {
  let selectedKey;

  if (mapIndex && typeof mapIndex === "object") {
    Object.entries(mapIndex).forEach(([key, value]) => {
      if (value == index) {
        selectedKey = key;
      }
    });
  }

  const selectedIndex = selectedKey || index;

  return (
    <SegmentedControl
      values={values}
      selectedIndex={selectedIndex}
      onChange={(event) => {
        const selected = event.nativeEvent.selectedSegmentIndex;
        if (mapIndex && typeof mapIndex === "object") {
          onchange(mapIndex[selected]);
          return;
        }
        onchange(selected);
      }}
      backgroundColor={"#f6f6f6"}
      tintColor={Colors.primary}
      fontStyle={{ color: "black", fontSize: 16 }}
      activeFontStyle={{ color: "white" }}
    />
  );
};

const Item = ({ item, onPress, onChange, cart }) => {
  const boxShadow = `12px 12px 16px 0 rgba(0, 0, 0, 0.12), -8px -8px 12px 0 rgba(208, 208, 208, 0.30)`;
  return (
    <Touchable onPress={onPress} mr={8} w={300} mv={10} self="center">
      <Box p={10} roundness={20} bg={"#f6f6f6"} boxShadow={boxShadow}>
        <Row>
          <Col mr={10}>
            <Avatar
              size={100}
              source={
                item.gallery?.[0]?.img_product
                  ? DEFAULT_API_URL + item.gallery?.[0]?.img_product
                  : null
              }
              name={item.name}
            />
          </Col>
          <Box flex={1} ml={245} top={-4} position={"absolute"}>
            <IconButton
              provider="feathers"
              icon="trash"
              color={"red"}
              fontSize={18}
              onPress={() => {
                cart.destroy(item);
              }}
            />
          </Box>
          <Col w={200} center>
            <Row center>
              <Title fontSize={18} w={100} center>
                {item.name}
              </Title>
            </Row>
            <Subtitle fontSize={12} mt={10} center>
              {item.price} $
            </Subtitle>
            <Spacing top={10} />
            <CounterButton
              self="center"
              onChange={onChange}
              start={item.quantity}
            />
          </Col>
        </Row>
      </Box>
    </Touchable>
  );
};

const CartView = ({
  cart,
  user,
  discount,
  onChangeA,
  calculateDelivery,
  currentAddress,
  addresses,
  storeLocations,
  carriers,
  profileStore,
  index,
  renderCoupons,
  setIndex,
  selectMethod,
  setSelectMethod,
  currentLocation,
  distance,
  onChangeLocation,
  applyCoupon,
  userLocations,
  isLoggedIn,
  clearCoupons,
  ...props
}) => {
  const { navigation } = props;
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        cart={cart}
        onChange={(e, v, action) => {
          switch (action) {
            case "plus": {
              cart.add(item);
              break;
            }
            case "minus": {
              cart.remove(item);
              break;
            }
          }
        }}
        navigation={navigation}
      />
    );
  };

  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const close = () => setVisible(false);

  const delivery = calculateDelivery(
    currentLocation?.address ? currentLocation : userLocations?.[0],
    storeLocations?.[0],
    carriers
  );

  
  //const currentStore = cart.productsByStore?.[0];
  //const [ selectedCarrier , setSelectedCarrier ] = useState(null);
  //const isDelivery = index == 0;

  return (
    <>
      {!isLoggedIn ? (
        <Box mb={3}>
          <Header {...props} />
          <EmptyState
            when={!cart.products.length}
            description="Upss parece que no tienes nada para llevar"
          >
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={cart.products}
              renderItem={renderItem}
              keyExtractor={(item) => item.name}
              extraData={{
                selectedId,
                cart,
              }}
            />
            <Hr mb={20} />
            <Box
              isplay="flex"
              justify="space-between"
              direction="row"
              w={300}
              mb={20}
              self="center"
            >
              <Text>Envio</Text>
              <Text weight="bold">{"$ 0"}</Text>
            </Box>
            {renderCoupons()}
            <Box
              isplay="flex"
              justify="space-between"
              direction="row"
              w={300}
              mb={20}
              self="center"
            >
              <Text>Sub-Total</Text>
              <Text weight="bold">{withCoin(cart.total)}</Text>
            </Box>
            <Box
              isplay="flex"
              justify="space-between"
              direction="row"
              w={300}
              mb={20}
              self="center"
            >
              <Text>{COPY["total"]}</Text>
              <Text weight="bold">{withCoin(cart.total - discount)}</Text>
            </Box>
            <Button
              onPress={() => {
                if (cart.isValid) {
                  if (navigation.navigate(URLS.paymentGateway)) {
                    navigation.navigate(URLS.paymentGateway);
                  } else {
                    navigation.navigate(URLS.login);
                  }
                } else {
                  notify.warning({
                    message: COPY["errors.there-are-invalid-products-in-cart"],
                  });
                }
              }}
              w={300}
              self="center"
            >
              {COPY["pay"]}
            </Button>
          </EmptyState>
        </Box>
      ) : (
        <View style={{ flex: 1 }}>
          {visible ? (
            <Map
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<View style={{ height: `100%` }} />}
              containerElement={<View style={{ height: `400px` }} />}
              mapElement={<View style={{ height: `100%` }} />}
              close={close}
              onChangeA={onChangeLocation}
            />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Box mb={3}>
                <Header {...props} />
                <EmptyState
                  when={!cart.products.length}
                  description="Upss parece que no tienes nada para llevar"
                >
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={cart.products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                    extraData={{
                      selectedId,
                      cart,
                    }}
                  />
                  <Hr mb={20} />
                  <Col pr={40} pl={40} mb={20}>
                    <Title fontSize={18} mb={5} bold>
                      Metodo de pago:
                    </Title>
                    <ControlSegmented
                      index={cart.paymentMethod == "FLOW" ? 0 : 1}
                      onchange={(index) => {
                        cart.updatePaymentMethod(
                          index == 0 ? "FLOW" : "CASH");
                      }}
                      values={["Online", "Efectivo"]}
                    />
                  </Col>
                  <Col pr={40} pl={40} mb={20}>
                    <Title fontSize={18} mb={5} bold>
                      Metodo de entrega:
                    </Title>
                    <ControlSegmented
                      index={index}
                      onchange={setIndex}
                      values={["Delivery", "Retiro En Tienda"]}
                    />
                  </Col>
                  <Col>
                    {index == 0 ? (
                      <>
                        <Box
                          isplay="flex"
                          justify="space-between"
                          direction="row"
                          w={300}
                          mt={10}
                          self="center"
                          align="center"
                        >
                          <Text bold subtitle>
                            {COPY["shipping-address"]}
                          </Text>
                          <Button onPress={() => show()} type="tertiary">
                            {COPY["edit"]}
                          </Button>
                        </Box>

                        <Box w={300} mb={20} self="center">
                          <Text muted small>
                            Dirección:{" "}
                            {currentLocation?.address ||
                              userLocations?.[0]?.address ||
                              "No hay dirección seleccionada"}
                          </Text>
                          <Text muted small>
                            Ciudad:{" "}
                            {currentLocation?.city ||
                              userLocations?.[0]?.city ||
                              "No hay dirección seleccionada"}
                          </Text>
                          <Text>Estas a: {distance} km de la tienda</Text>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box
                          isplay="flex"
                          justify="space-between"
                          direction="row"
                          w={300}
                          mt={16}
                          self="center"
                          align="center"
                        >
                          <Text bold subtitle>
                            Retirar en la siguiente direccion:
                          </Text>
                        </Box>
                        <Box w={300} mb={20} mt={10} self="center">
                          <Text muted small>
                            {"Dirección: " + storeLocations?.[0]?.address ||
                              "parece que ha ocurrido un error al traer la direccion de la tienda"}
                          </Text>
                          <Text muted small>
                            {"Ciudad: " + storeLocations?.[0]?.city ||
                              "parece que ha ocurrido un error al traer la direccion de la tienda"}
                          </Text>
                          <Text muted small>
                            {profileStore?.phone ||
                              "parece que ha ocurrido un error"}
                          </Text>
                          <Text>Estas a: {distance} km de la tienda</Text>
                        </Box>
                      </>
                    )}
                  </Col>
                  <Box w={300} mb={20} self="center">
                    <AsyncField
                      mode="outlined"
                      label="Cupon de descuento"
                      dense
                      self="center"
                      onTextChange = { async (value) => {
                        clearCoupons();
                        const res = await api.coupons.validate(value);
                        return res;
                      }}
                      onSuccess = { (coupon) => applyCoupon(coupon) }
                      message = {(res,error) => {
                        if(res){
                          return "Cupón valido"
                        }else if(error){
                          return error?.response
                            ? "Tu cupon no es valido"
                            : error.message
                        }
                        return "Ingresa el codigo de tu cupón"
                      }}
                    />
                  </Box>
                  {/*!!carriers?.length && isDelivery && (
                    <Box w={300} mb={20} self="center">
                      <Picker
                        onItemChange={(data) => { setSelectedCarrier(data) }}
                        items={carriers.map(
                          carrier => ({ label: carrier.name, value: carrier })
                        )}
                        title="Transportistas"
                        placeholder="Seleccionar Transportista"
                        item={selectedCarrier}
                        style={styles.pickerStyle}
                        placeholderStyle={styles.text}
                      />
                    </Box>
                        )*/}
                  <Box
                    isplay="flex"
                    justify="space-between"
                    direction="row"
                    w={300}
                    mb={20}
                    self="center"
                  >
                    <Text>Envio</Text>
                    <Text weight="bold">
                      {index == 0 ? withCoin(delivery) : "$ 0"}
                    </Text>
                  </Box>
                  {renderCoupons()}
                  <Box
                    isplay="flex"
                    justify="space-between"
                    direction="row"
                    w={300}
                    mb={20}
                    self="center"
                  >
                    <Text>Sub-Total</Text>
                    <Text weight="bold">{withCoin(cart.total)}</Text>
                  </Box>
                  <Box
                    isplay="flex"
                    justify="space-between"
                    direction="row"
                    w={300}
                    mb={20}
                    self="center"
                  >
                    <Text>{COPY["total"]}</Text>
                    <Text weight="bold">
                      {index == 0
                        ? withCoin(cart.total + delivery - discount)
                        : withCoin(cart.total - discount)}
                    </Text>
                  </Box>
                  <Button
                    onPress={() => {
                      cart.updateDeliveryCost(
                        index == 0
                          ? delivery
                          : 0
                      );
                      if (cart.isValid) {
                        if (navigation.navigate(URLS.paymentGateway)) {
                          navigation.navigate(URLS.paymentGateway);
                        } else {
                          navigation.navigate(URLS.login);
                        }
                      } else {
                        notify.warning({
                          message:
                            COPY["errors.there-are-invalid-products-in-cart"],
                        });
                      }
                    }}
                    w={300}
                    self="center"
                  >
                    {COPY["pay"]}
                  </Button>
                </EmptyState>
              </Box>
            </ScrollView>
          )}
        </View>
      )}
    </>
  );
};

export default CartView;

const styles = StyleSheet.create({
  pickerStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.muted,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    height: 43,
    width: 300,
  },
  text:{
    color: Colors.muted
  }
});
