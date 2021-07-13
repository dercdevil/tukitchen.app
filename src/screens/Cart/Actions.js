import React, { useState } from "react";
import { useCart, useSellers, useAuth, useCoupons } from "@/hooks";
import { nameStore, getkilometres, notify, withCoin, applyDiscount } from "@/utils";
import { useQuery } from "react-query";
import api from "@/api/v2";
import { Colors } from "@/theme";
import {
  Box,
  Text
} from "@/components";



const useUserAdresses = () => {
  const { data: addresses } = useQuery("user-addresses", () =>
    api.users.getAddresses()
  );

  return {
    addresses,
  };
};

const useStore = () => {
  const cart = useCart();
  const sellers = useSellers();
  if (cart?.productsByStore[0]?.store_id) {
    const {
      carriers,
      user_address: storeLocations,
      profile: profileStore,
    } = nameStore(sellers.all, cart?.productsByStore[0]?.store_id);
    return {
      carriers,
      storeLocations,
      profileStore,
    };
  }

  return {
    carriers: {},
    addresLocations: {},
    profileStore: {},
  };
};

const Actions = () => {
  const { user, isLoggedIn } = useAuth();

  const cart = useCart();

  const [index, setIndex] = useState(0);
  const [selectMethod, setSelectMethod] = useState(0);
  const { coupons ,  apply : applyCoupon, clear : clearCoupons } = useCoupons()
  const [currentLocation, setCurrentLocation] = useState({});
  const [distance, setDistance] = useState(0);
  const { addresses: userLocations } = useUserAdresses();

  const onChangeLocation = (l) => {
    setCurrentLocation(l);
  };

  const { carriers, storeLocations, profileStore } = useStore();

  const calculateDelivery = (
    clientLocation, 
    storeLocation,
    storeCarriers
  ) => {
    const canCalculateDelivery =
      clientLocation && storeLocation && storeCarriers?.length > 0 

    let deliveryRate;

    if (canCalculateDelivery) {
      const km = getkilometres(
        storeLocation?.latitude,
        storeLocation?.longitude,
        clientLocation?.latitude,
        clientLocation?.longitude
      );
      setDistance(km);
      if (clientLocation.city) {
        if (km > storeCarriers[0]?.radio) {
          const carrierBasePrice = parseInt(storeCarriers[0]?.base_price, 10);
          const carrierRadio = parseInt(storeCarriers[0]?.radio);
          const extraDistance = storeCarriers[0]?.extra_distance;
          const extraPrice = parseInt(storeCarriers[0]?.extra_price);

          //tarifa del delivery
          deliveryRate =
            carrierBasePrice +
            ((km - carrierRadio) / (extraDistance / 1000)) * extraPrice;

        } else {
          deliveryRate = parseInt(storeCarriers[0]?.base_price, 10);
        }
        return deliveryRate;
      }
      return 0;
    }
    return 0;
  };

  const renderCoupons = () => {
    return coupons.map( (coupon,id) => (
      <Box
        isplay="flex"
        justify="space-between"
        direction="row"
        w={300}
        mb={20}
        self="center"
        key = {id}
      >
        <Text>Cupon aplicado</Text>
        <Text color={Colors.primary}>
          -{withCoin(( cart.total * coupon.discount / 100 ) )}
        </Text>
      </Box>
    ))
  }

  const l = currentLocation || userLocations?.[0] || {};

  return {
    user,
    cart,
    isLoggedIn,
    distance,
    userLocations,
    onChangeLocation,
    storeLocations,
    store: profileStore,
    clearCoupons,
    currentLocation: l,
    renderCoupons,
    discount: coupons.reduce( (totalDiscount,coupon) => {
      return totalDiscount + applyDiscount(cart.total,coupon.discount)
  } , 0),
    applyCoupon,
    index,
    carriers,
    profileStore,
    setIndex,
    calculateDelivery,
  };
};

export default Actions;
