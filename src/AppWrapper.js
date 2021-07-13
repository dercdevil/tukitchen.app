import React , { useRef } from "react";
import { Provider as RNPProvider, Portal } from "react-native-paper";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import api from "@/api/v2";

import { URLS } from "@/constants";
import { Col } from "@/components";
import { useAuth, useTheme, useDimensions, useCart } from "@/hooks";
import { getActiveRouteName, capitalize } from "@/utils";
import { Router } from "@/router";

import { SplashScreen } from "@/screens/SplashScreen";
import { useEffect } from "react";

const linking = {
    prefixes: ["", ""],
    config: {
      screens: {
        // && only logged out
        [URLS.landing]: URLS.landing,
        [URLS.formCompany]: URLS.formCompany,
        [URLS.login]: {
          path: URLS.login,
          screens: {
            [URLS.login]: URLS.login,
            [URLS.signup]: URLS.signup,
            [URLS.reset]: URLS.reset,
            [URLS.profile]: URLS.profile,
          },
        },
        
        [URLS.home]: {
          path: URLS.home,
          screens: {
            [URLS.home]: {
              path: "/",
              exact: true
            },
            [URLS.cart]: {
              path: URLS.cart,
              exact: true
            },
            [URLS.product]: URLS.product,

            [URLS.summary]: URLS.summary,
            [URLS.profile]: {
              path: URLS.profile,
              screens: {
                [URLS.profile]: {
                  path: URLS.profile,
                  exact: true
                },
                [URLS.profileData]:URLS.profileData,
                [URLS.orders]:URLS.orders,
                [URLS.history]:URLS.history,
              }
            },
          }
        },

        //[URLS.notFound]: "*",
      },
    },
};

export const Wrapper = ({
    defaultTheme,
    showSplash,
    containerRef,
    initialNavigationState,
    isLoggedIn,
  }) => {
    
    const { token, user , isLoggedIn : userLoggedIn = isLoggedIn, isLoggedInAsGuest } = useAuth();
    const routeNameRef = useRef();
    const { theme, scheme , barProps, resetBar } = useTheme(defaultTheme);
    const { window } = useDimensions();
    const cart = useCart();

    useEffect( () => {
      //It destroy all products which have a flow order due to they already have been pay
      cart.revalidate();
    } , []);

    useEffect( () => {
      if(token){
        api.setAccessTokenHeader(token);
      }
    } , [token])

    const onRouteChange = (state) => {
      const currentRouteName = getActiveRouteName(state);
      // Save the current route name for later comparision
      resetBar();
      routeNameRef.current = currentRouteName;
    };
  
    return (
      <RNPProvider theme={theme}>
        <Portal.Host>
          {showSplash 
            ? (
            <SplashScreen />
            ) : (
            <Col flex={1}>
              <StatusBar {...barProps} />
              <NavigationContainer
                theme={theme}
                ref={containerRef}
                initialState={initialNavigationState}
                onStateChange={onRouteChange}
                linking={linking}
                fallback={<SplashScreen />}
                documentTitle={{
                  formatter: (options, route) =>
                    capitalize(options?.title ?? route?.name),
                }}
              >
                <Router
                  theme={theme}
                  scheme={scheme}
                  isLoggedIn={userLoggedIn}
                  isLoggedInAsGuest={isLoggedInAsGuest}
                  user={user}
                  isLargeScreen={window.width >= 1024}
                />
              </NavigationContainer>
            </Col>
          )}
        </Portal.Host>
      </RNPProvider>
    );
  };