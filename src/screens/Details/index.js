import React from "react";
import View from "./View";
// import Actions from "./Actions";

const DetailsContainer = ({ navigation, ...args }) => {
//   const actions = Actions({ navigation });
  return <View navigation={navigation} {...args} />;
};

export default DetailsContainer;