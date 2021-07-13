import React from "react";

import View from "./View";
import Actions from "./Actions";

const ResetContainer = (props) => {
  const actions = Actions(props);

  return <View {...props} {...actions} />;
};

export default ResetContainer;
