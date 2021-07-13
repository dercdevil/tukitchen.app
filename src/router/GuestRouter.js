import React, { lazy, Suspense } from "react";
import { BrandLogo, Icon } from "@/components";
import { Appbar } from "react-native-paper";
import lazyRoute from "./lazyRoute";
import { URLS } from "@/constants";
import { COPY } from "@/copy";
import { Colors } from "@/theme";
import { useCart, useAuth } from "@/hooks";
import { SplashScreen } from "@/screens/SplashScreen";

const HomeContainer = lazy(() => import("@/screens/Products"));
const CartContainer = lazy(() => import("@/screens/Cart"));
const WizardScreen = lazy(() => import("@/screens/WizardScreen"));
const DetailsContainer = lazy(() => import("@/screens/Details"));

const GuestRouter = ({
  components: { Tab, Stack },
  getRouteOptions,
  commonProps,
  commonScreenProps,
  drawerProps: { iconColors },
  ...props
}) => {
  //const { shouldShowOnboarding } = useAuth();
  const { productsLength } = useCart();
  return (
    <Suspense fallback={<SplashScreen />}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen key="login" name={URLS.home}>
          {(props) => {
            return true ? (
              <Tab.Navigator tabBarOptions={iconColors}>
                <Tab.Screen
                  name={URLS.home}
                  options={getRouteOptions({
                    title: COPY["menu.home"],
                    icon: "home",
                    propName: "tabBarIcon",
                    headerTitle: () => <BrandLogo />,
                  })}
                >
                  {lazyRoute(HomeContainer, {
                    // isTopLevel: true,
                    showBrand: true,
                    showBack: false,
                    showMenu: true,
                    title: COPY["menu.home"],
                    headerRightContent: (
                      <Appbar.Action
                        style={{ marginLeft: "auto" }}
                        icon={(props) => (
                          <Icon
                            fontSize={24}
                            icon="user"
                            provider="material-icon"
                            {...props}
                          />
                        )}
                        onPress={() => props.navigation.navigate(URLS.login)}
                      />
                    ),
                    ...props,
                    ...commonProps,
                    ...commonScreenProps,
                  })}
                </Tab.Screen>
                <Tab.Screen
                  name={URLS.cart}
                  options={{
                    ...getRouteOptions({
                      title: COPY["menu.cart"],
                      icon: "cart",
                      propName: "tabBarIcon",
                      tabBarBadge: productsLength || null,
                      headerTitle: () => <BrandLogo />,
                    }),
                    tabBarBadgeStyle: {
                      backgroundColor: Colors.primary,
                    },
                  }}
                >
                  {lazyRoute(CartContainer, {
                    isTopLevel: true,
                    showBrand: true,
                    title: COPY["menu.cart"],
                    ...commonProps,
                    ...commonScreenProps,
                  })}
                </Tab.Screen>
              </Tab.Navigator>
            ) : (
              <WizardScreen />
            );
          }}
        </Stack.Screen>
        <Stack.Screen
          key="details"
          name={URLS.details}
          options={getRouteOptions({
            ...commonProps,
            // hide: true,
            // headerTitle: URLS.details,
          })}
        >
          {lazyRoute(DetailsContainer, {
            ...commonProps,
            ...commonScreenProps,
          })}
        </Stack.Screen>
      </Stack.Navigator>
    </Suspense>
  );
};

export default GuestRouter;
