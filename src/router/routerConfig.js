import React from "react";
import { AppBar, Icon } from "@/components";

const homeIcon = {
    provider: "ant-design",
    icon: "home",
};

const routeIcons = {
    home: homeIcon,
    root: homeIcon,
    summary: homeIcon,

    logout: {
        icon: "log-out",
    },
    login: {
        provider: "ionicons",
        icon: "log-in-outline",
    },
    register: {
        provider: "ionicons",
        icon: "person-add",
    },
    products:{
        provider: "ionicons",
        icon: "fast-food-outline",
    },
    profile: {
        provider: "ionicons",
        icon: "person",
    },
    category: {
        provider: "material-icons",
        icon: "category",
    },
    cart: {
        provider: "entypo",
        icon: "shopping-cart",
    },
    reset: {
        provider: "material-community-icons",
        icon: "key",
    },
};

export const getRouteOptions = ({
    navigation,
    theme,
    isLargeScreen,
    icon,
    propName = "drawerIcon",
    ...rest
}) => ({
    ...(icon && {
        [propName]: (props) => (
            <Icon
                {...routeIcons[icon.toLowerCase()]}
                {...props}
                center
                display="flex"
                fontSize={24}
            />
        ),
    }),
    animationEnabled: true,
    headerTitleAlign: isLargeScreen ? "left" : "center",
    headerLeft: isLargeScreen
        ? undefined
        : () => (
            <AppBar.Action
                color={theme?.colors?.text}
                icon="menu"
                style={{ marginLeft: 16 }}
                onPress={() => navigation.toggleDrawer()}
            />
        ),
     ...rest,
});
