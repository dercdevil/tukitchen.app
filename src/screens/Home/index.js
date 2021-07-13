import React from "react";
import { Home } from "./View";
import { Actions } from "./Actions";

const HomeContainer = ({navigation,...props}) => {

  const actions = Actions({navigation});

  return <Home {...actions} {...props} />;
  
};

export default HomeContainer;
