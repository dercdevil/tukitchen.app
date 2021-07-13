import React from "react";
import View from "./View";
import { Actions } from "./Actions";

const HistoryContainer = ({ navigation, ...args }) => {
  const actions = Actions({ navigation });
  return <View navigation={navigation} {...args} {...actions} />;
};

export default HistoryContainer;