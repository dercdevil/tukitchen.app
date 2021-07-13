import React from "react";
import { SafeAreaView } from "react-native";
import { Notifier, Easing } from "react-native-notifier";

import { Box } from "../../components/atoms/Box";
import { Text } from "../../components/atoms/Text";
import { isWeb } from "../platform";
import { Colors } from "@/theme";

const Base = ({ title, description, ...rest }) => (
  <SafeAreaView style={{ display: "flex", alignItems: "center" }}>
    <Box
        display="flex"
        minW={300}
        w={isWeb() ? "-webkit-fit-available" : "auto"}
        maxW={500}
        p={20}
        {...rest}
    >
      <Text bold>{title}</Text>
      <Text>{description}</Text>
    </Box>
  </SafeAreaView>
);

export const notify = {
  warning: (config) =>
    Notifier.showNotification({
      duration: 5000,
      showAnimationDuration: 800,
      showEasing: Easing.ease,
      hideOnPress: true,
      Component: Base,
      componentProps: {
        bg: "#F03D3D",
      },
      ...config,
    }),
  success: (config) =>
    Notifier.showNotification({
      duration: 5000,
      showAnimationDuration: 800,
      showEasing: Easing.ease,
      hideOnPress: true,
      Component: Base,
      componentProps: {
        bg: Colors.success,
      },
      ...config,
    }),
  error: (config) =>
    Notifier.showNotification({
      duration: 5000,
      showAnimationDuration: 800,
      showEasing: Easing.ease,
      hideOnPress: true,
      Component: Base,
      componentProps: {
        bg: Colors.error,
      },
      ...config,
    }),
};
