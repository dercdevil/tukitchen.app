import React, { useState } from "react";
import { Colors } from "@/theme";

export const withCensorToggle = (Component) => (props) => {
  const [isCensoredText, setIsCensoredText] = useState(true);

  return (
    <Component
      right={
        <Component.Icon
          name={isCensoredText ? "eye-off" : "eye" }
          onPress={() => setIsCensoredText((prevState) => !prevState)}
          color={Colors.darkGray}
        />
      }
      secureTextEntry={isCensoredText}
      {...props}
    />
  );
};
