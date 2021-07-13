import React from "react";
import View from "./View";
import Actions from "../Profile/Actions";

const ProfileContainer = ({ navigation, ...args }) => {
  const actions = Actions({ navigation });
  return <View navigation={navigation} {...args} {...actions} />;
};

export default ProfileContainer;