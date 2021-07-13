// Extracted https://github.com/react-navigation/react-navigation/blob/ce4eb7e9273a25e4433eb82e255a58ba3bf4d632/packages/drawer/src/views/DrawerItem.tsx
// TODO: create pull request to be able to set `ref` to `DrawerItem` to be able to deprecate this file

import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, useTheme } from "@react-navigation/native";
import Color from "color";

const ANDROID_VERSION_LOLLIPOP = 21;

class TouchableItem extends React.PureComponent {
  render() {
    /*
     * TouchableNativeFeedback.Ripple causes a crash on old Android versions,
     * therefore only enable it on Android Lollipop and above.
     *
     * All touchables on Android should have the ripple effect according to
     * platform design guidelines.
     * We need to pass the background prop to specify a borderless ripple effect.
     */
    if (
      Platform.OS === "android" &&
      Platform.Version >= ANDROID_VERSION_LOLLIPOP
    ) {
      const { borderless, pressColor, style, children, ...rest } = this.props;
      return (
        <TouchableNativeFeedback
          {...rest}
          style={null}
          background={TouchableNativeFeedback.Ripple(pressColor, borderless)}
        >
          <View style={style}>{React.Children.only(children)}</View>
        </TouchableNativeFeedback>
      );
    }

    const { children } = this.props;

    return <TouchableOpacity {...this.props}>{children}</TouchableOpacity>;
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 4,
    overflow: "hidden",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  label: {
    marginRight: 32,
  },
  button: {
    display: "flex",
  },
});

const Touchable = ({
  children,
  style,
  onPress,
  to,
  accessibilityRole,
  delayPressIn,
  ...rest
}) => {
  if (Platform.OS === "web" && to) {
    // React Native Web doesn't forward `onClick` if we use `TouchableWithoutFeedback`.
    // We need to use `onClick` to be able to prevent default browser handling of links.
    return (
      <Link
        {...rest}
        to={to}
        style={[styles.button, style]}
        onPress={(e) => {
          if (
            !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && // ignore clicks with modifier keys
            (e.button == null || e.button === 0) // ignore everything but left clicks
          ) {
            e.preventDefault();
            onPress?.(e);
          }
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <TouchableItem
      {...rest}
      accessibilityRole={accessibilityRole}
      delayPressIn={delayPressIn}
      onPress={onPress}
    >
      <View style={style}>{children}</View>
    </TouchableItem>
  );
};

/**
 * A component used to show an action item with an icon and a label in a navigation drawer.
 */
export const DrawerItem = (props) => {
  const { colors } = useTheme();

  const {
    icon,
    label,
    labelStyle,
    to,
    focused = false,
    activeTintColor = colors.primary,
    inactiveTintColor = Color(colors.text).alpha(0.68).rgb().string(),
    activeBackgroundColor = Color(activeTintColor).alpha(0.12).rgb().string(),
    inactiveBackgroundColor = "transparent",
    style,
    onPress,
    innerRef,
    reverse,
    ...rest
  } = props;

  const { borderRadius = 4 } = StyleSheet.flatten(style || {});
  const color = focused ? activeTintColor : inactiveTintColor;
  const backgroundColor = focused
    ? activeBackgroundColor
    : inactiveBackgroundColor;

  const iconNode = icon ? icon({ size: 24, focused, color }) : null;

  return (
    <View
      collapsable={false}
      ref={innerRef}
      {...rest}
      style={[styles.container, { borderRadius, backgroundColor }, style]}
    >
      <Touchable
        delayPressIn={0}
        onPress={onPress}
        style={[
          styles.wrapper,
          {
            borderRadius,
            flexDirection: reverse ? "row-reverse" : "row",
          },
        ]}
        accessibilityTraits={focused ? ["button", "selected"] : "button"}
        accessibilityComponentType="button"
        accessibilityRole="button"
        accessibilityStates={focused ? ["selected"] : []}
        to={to}
      >
        <React.Fragment>
          {iconNode}
          <View
            style={[
              styles.label,
              { marginLeft: iconNode ? 32 : 0, marginVertical: 5 },
            ]}
          >
            {typeof label === "string" ? (
              <Text
                numberOfLines={1}
                style={[
                  {
                    color,
                    fontWeight: "500",
                  },
                  labelStyle,
                ]}
              >
                {label}
              </Text>
            ) : (
              label({ color, focused })
            )}
          </View>
        </React.Fragment>
      </Touchable>
    </View>
  );
};
