import React from "react";
import { useTheme } from "@/hooks";
import { Touchable, Text, Icon } from "@/components";


export const ButtonCar = (props) => {
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
      <Icon 
      provider="Entypo"
      icon="shopping-cart"
        //   color={disabled ? theme.colors.placeholder : Colors.primary}
          fontSize={24}
        //   pr={u(1.2)} 
        />
      <Text ml={8}>
        Agregar
      </Text>
    </Touchable>
  );
};
