import React from "react";
import View from "./View";
import Actions from "./Actions";

const OrdersConstainer = ({ navigation, ...args }) => {
  const actions = Actions({ navigation });
  return <View navigation={navigation} {...actions} {...args} />;
};

export default OrdersConstainer;