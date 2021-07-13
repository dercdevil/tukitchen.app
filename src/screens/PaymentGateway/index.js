import React from "react";
import View from "./View";
import Actions from "./Actions";

const PaymentGatewayContainer = ({ navigation, ...args }) => {
  const actions = Actions({ navigation });
  return <View navigation={navigation} {...args} {...actions} />;
};

export default PaymentGatewayContainer;