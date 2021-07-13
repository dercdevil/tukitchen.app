import React from "react";
import { useTheme } from "@/hooks";

import { Text } from "../Text";
import { GoogleIcon } from "../Icon";
import { Touchable } from "../Touchable";

export const GoogleLoginButton = (props) => {
  const { theme } = useTheme();
  return (
    <Touchable
      userSelect="none"
      align="center"
      flex={0}
      roundness={4}
      self="center"
      direction="row"
      p={16}
      activeOpacity={0.8}
      {...props}
    >
      <GoogleIcon />
      <Text ml={8} color={theme.colors.text}>
        Inicia sesión con Google
      </Text>
    </Touchable>
  );
};
