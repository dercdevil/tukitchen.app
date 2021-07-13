import React from "react";
import View from "./View";
// import Actions from "./Actions";

const DetailsHistoryContainer = ({ navigation, ...args }) => {
//   const actions = Actions({ navigation });
  return <View navigation={navigation} {...args} />;
};

export default DetailsHistoryContainer;