import React, { Fragment, useRef } from "react";
import {
  CommonActions,
  DrawerActions,
  useLinkBuilder,
} from "@react-navigation/native";

import { Hr, Tooltip } from "@/components";
import { useFocus, useHover } from "@/hooks";
import { active, isWeb } from "@/utils";

import { DrawerItem as RNDrawerItem } from "./original";

export const DrawerItem = ({
  i,
  route,
  title,
  drawerLabel,
  drawerIcon,
  divider,
  hide,
  action,
  extraLabelStyle,
  extraItemStyle,
  extraLabelStyleFocused,
  hideTooltip,
  state,
  navigation,
  activeTintColor,
  inactiveTintColor,
  activeBackgroundColor,
  inactiveBackgroundColor,
  itemStyle,
  labelStyle,
  isLargeScreen,
  theme,
  reverse,
}) => {
  if (hide) return null;
  const ref = useRef(null);
  const hovered = useHover(ref);
  const focused = useFocus(ref);
  const buildLink = useLinkBuilder();
  const isCurrentlyFocused = i === state.index;
  const menuLabel = () => {
    if (drawerLabel !== undefined) {
      return drawerLabel;
    }

    if (title !== undefined) {
      return title;
    }

    return route.name;
  };

  const primitiveLabelStyle = {
    ...labelStyle,
    ...extraLabelStyle,
    ...(isCurrentlyFocused && extraLabelStyleFocused),
  };

  return (
    <Fragment key={route.key}>
      {action ? (
        action()
      ) : (
        <Tooltip
          title={menuLabel()}
          position="right"
          distance={-100}
          disabled={hideTooltip || !isLargeScreen}
        >
          <RNDrawerItem
            innerRef={ref}
            label={action ? "" : menuLabel()}
            icon={drawerIcon}
            focused={isCurrentlyFocused}
            reverse={reverse}
            activeTintColor={activeTintColor}
            inactiveTintColor={inactiveTintColor}
            activeBackgroundColor={activeBackgroundColor}
            inactiveBackgroundColor={
              (isWeb() && theme && hovered) || focused
                ? active(theme.colors.surface, 3, theme.dark)
                : inactiveBackgroundColor
            }
            labelStyle={primitiveLabelStyle}
            style={{ ...itemStyle, ...extraItemStyle, marginBottom: 12 }}
            to={buildLink(route.name, route.params)}
            onPress={() => {
              navigation.dispatch({
                ...(focused
                  ? DrawerActions.closeDrawer()
                  : CommonActions.navigate(route.name)),
                target: state.key,
              });
            }}
          />
        </Tooltip>
      )}
      {divider && <Hr mv={8} mh={32} />}
    </Fragment>
  );
};
