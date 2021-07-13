import React from "react";

import Actions from "./Actions";
import View from "./View";

const LogInContainer = ({ navigation, ...args }) => {
  const actions = Actions({ navigation });

  return <View navigation={navigation} {...args} {...actions} />;
};

export default LogInContainer;
