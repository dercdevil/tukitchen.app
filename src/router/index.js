import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { useSidebar } from "@/hooks";

import { getRouteOptions } from "./routerConfig";

import MobileRouter from "./MobileRouter";
import PublicRouter from "./PublicRouter";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const Router = ({ 
    theme, 
    scheme, 
    isLoggedIn,
    isLoggedInAsGuest, 
    user, 
    isLargeScreen 
}) => {
    const { collapsed, toggle } = useSidebar();
    let AppRouter = PublicRouter;

    if ( (isLoggedIn && user) || isLoggedInAsGuest ) {
        AppRouter = MobileRouter;
    }
    
    return (
        <AppRouter
            components={{
                Drawer,
                Stack,
                Tab,
            }}
            getRouteOptions={getRouteOptions}
            toggleSidebar={toggle}
            collapsed={collapsed}
            commonProps={{
                isLargeScreen,
                isLoggedIn: isLoggedIn || isLoggedInAsGuest,
                isLoggedInAsGuest,
                user,
                theme,
                dark: scheme === "dark",
                hideTooltip: !collapsed,
                extraLabelStyleFocused: {
                    fontWeight: "bold",
                }
            }}
            drawerProps={{
                drawerType: isLargeScreen && isLoggedIn ? "permanent" : undefined,
                iconColors: {
                    activeTintColor: theme.colors.primary,
                    inactiveTintColor: theme.colors.disabled,
                }
            }}
        />
    );
};
