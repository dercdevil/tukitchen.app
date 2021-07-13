import React from "react";
import View from "./View";
import Actions from "./Actions";

const FormCompanyContainer = ({ navigation, ...args }) => {
  const actions = Actions({ navigation });
  return <View navigation={navigation} {...args} {...actions} />;
};

export default FormCompanyContainer;
