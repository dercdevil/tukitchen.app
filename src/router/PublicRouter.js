import React, { Suspense, lazy } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { URLS } from "@/constants";
import { SplashScreen } from "@/screens/SplashScreen";
import { COPY } from "@/copy";
import { BrandLogo, DrawerContent } from "@/components";
import lazyRoute from "./lazyRoute";
import { getRouteOptions } from "./routerConfig";
import { View } from "react-native";

import GuestRouter from "./GuestRouter";

const LogInContainer = lazy(() => import("@/screens/LogIn"));
const LandingScreen = lazy(() => import("@/screens/Landing"));
const SignUpContainer = lazy(() => import("@/screens/SignUp"));
const ResetContainer = lazy(() => import("@/screens/Reset"));
const FormCompanyContainer = lazy(() => import("@/screens/FormCompany"));
//const HelpScreen = lazy(() => import("@/screens/Help"));
//const NotFoundContainer = lazy(() => import("@/screens/NotFound"));

const Tab = createBottomTabNavigator();

const PublicRouter = ({ 
  components, 
  commonProps,
  drawerProps, 
}) => {

  const commonScreenProps = {
    showMenu: true,
    isLargeScreen: commonProps.isLargeScreen,
    theme: commonProps.theme,
  };

  const { Stack, Drawer } = components;

  return (
    <Suspense fallback={<SplashScreen />}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen key="landing" name={URLS.landing}>
          {(props) => <LandingScreen {...commonProps} {...props} />}
        </Stack.Screen>
        <Stack.Screen key="formCompany" name={URLS.formCompany}>
          {(props) => <FormCompanyContainer {...commonProps} {...props} />}
        </Stack.Screen>
        <Stack.Screen key="login" name={URLS.login}>
          {(props) => {
            return (
              <Tab.Navigator>
                <Tab.Screen
                  name={URLS.login}
                  options={getRouteOptions({
                    title: COPY["auth.logIn"],
                    icon: "login",
                    propName: "tabBarIcon",
                    headerTitle: () => <BrandLogo />,
                  })}
                >
                  {lazyRoute(LogInContainer, {
                    //title: COPY["menu.home"],
                    ...commonProps,
                    ...props,
                  })}
                </Tab.Screen>
                <Tab.Screen
                  name={URLS.signup}
                  options={getRouteOptions({
                    title: COPY["auth.signup"],
                    icon: "register",
                    propName: "tabBarIcon",
                    headerTitle: () => <BrandLogo />,
                  })}
                >
                  {lazyRoute(SignUpContainer, {
                  ...commonProps,
                  ...props
                })}
                </Tab.Screen>
                <Tab.Screen
                  name={URLS.reset}
                  options={getRouteOptions({
                    title: COPY["auth.reset"],
                    icon: "reset",
                    propName: "tabBarIcon",
                    headerTitle: () => <BrandLogo />,
                  })}
                >
                  {lazyRoute(ResetContainer, {
                  ...commonProps,
                  ...props
                })}
                </Tab.Screen>
              </Tab.Navigator>
            );
          }}
        </Stack.Screen>
        <Stack.Screen key="home" name={URLS.home} >
          {(props) => {
            return(
              <GuestRouter
                {...props}
                commonProps = {commonProps}
                drawerProps = {drawerProps}
                components = {components}
                getRouteOptions = {getRouteOptions}
                commonScreenProps = {commonScreenProps}
              />
            )
          }}
        </Stack.Screen>
      </Stack.Navigator>
    </Suspense>
  );
};

export default PublicRouter;
