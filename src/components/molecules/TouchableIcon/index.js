import React from "react";

import { Colors } from "@/theme";
import { Touchable, Icon } from "@/components/atoms";

export const TouchableIcon = ({
  icon,
  provider,
  size = 24,
  color,
  iconProps,
  ...rest
}) => {
  return (
    <Touchable size={size} {...rest}>
      <Icon
        color={color || Colors.gray600}
        fontSize={size}
        icon={icon}
        provider={provider}
        {...iconProps}
      />
    </Touchable>
  );
};
