import React from "react";
import { DrawerItem } from "@react-navigation/drawer";

import { Icon, Tooltip } from "@/components";
import { URLS } from "@/constants";
import { isWeb } from "@/utils";
import { COPY } from "@/copy";
import { useAuth } from "@/hooks";

export const LogOutItem = ({
  activeTintColor,
  inactiveTintColor,
  activeBackgroundColor,
  inactiveBackgroundColor,
  itemStyle,
  labelStyle,
  isLargeScreen,
}) => {
  const { logOut, user } = useAuth();

  const handleLogOut = () => {
    // TODO: show logout confirmation alert
    // TODO: native
    logOut(user);

    if (isWeb()) {
      window.location.pathname = `/${URLS.login}`;
    }
  };

  return (
    <Tooltip
      title={COPY["menu.logout"]}
      position="right"
      distance={-100}
      disabled={!isLargeScreen}
    >
      <DrawerItem
        key="logout"
        label={!isLargeScreen ? COPY["menu.logout"] : ""}
        icon={(props) => (
          <Icon icon="log-out" center display="flex" fontSize={24} {...props} />
        )}
        activeTintColor={activeTintColor}
        inactiveTintColor={inactiveTintColor}
        activeBackgroundColor={activeBackgroundColor}
        inactiveBackgroundColor={inactiveBackgroundColor}
        labelStyle={labelStyle}
        style={{
          ...itemStyle,
          ...(isLargeScreen),
          marginBottom: 8,
        }}
        onPress={handleLogOut}
      />
    </Tooltip>
  );
};
