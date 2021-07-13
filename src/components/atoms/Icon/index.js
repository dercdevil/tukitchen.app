import React from "react";
import {
    Ionicons,
    Feather,
    MaterialIcons,
    AntDesign,
    Entypo,
    FontAwesome,
    MaterialCommunityIcons,
    SimpleLineIcons,
} from "@expo/vector-icons";

import { withStyleProps } from "@/hocs";
import { useTheme } from "@/hooks";

const getIconProvider = (provider = "feather") => {
  switch (provider.toLowerCase()) {
    case "material-icons":
      return MaterialIcons;
    case "simple-line-icons":
      return SimpleLineIcons;
    case "material-community-icons":
      return MaterialCommunityIcons;
    case "fontawesome":
      return FontAwesome;
    case "entypo":
      return Entypo;
     case "ionicons":
       return Ionicons;
    case "ant-design":
      return AntDesign;
    default:
      return Feather;
  }
};

const PrimitiveIcon = ({
    focused,
    icon,
    iconFocused,
    provider,
    darkColor = "white",
    color = "black",
    ...rest
}) => {
    const { scheme } = useTheme();
    const IconProvider = getIconProvider(provider);
    const name = focused && iconFocused ? iconFocused : icon;

    if (typeof icon === "function") {
        return icon();
    }

    return (
        <IconProvider
            name={name || icon}
            color={scheme === "dark" ? darkColor : color}
            {...rest}
        />
    );
};

export const Icon = withStyleProps(PrimitiveIcon);

export * from "./CustomIcons";
