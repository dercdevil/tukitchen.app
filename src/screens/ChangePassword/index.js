import React from "react";
import View from "./View";
import Actions from "./Actions";

const ChangePasswordContainer = ({navigation,...args}) => {

    const actions = Actions({ navigation });

    return <View navigation={navigation} {...actions} {...args} />;

}

export default ChangePasswordContainer;