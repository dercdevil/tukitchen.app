import React from "react";
import { Colors } from "@/theme";

export const withRut = (Component) => (props) => {
  return (
    <Component
      right={
        <Component.Icon
        //   provider={"ant-design"}
          name={"id-card"}
          color={Colors.darkGray}
        />
      }
      {...props}
    />
  );
};
