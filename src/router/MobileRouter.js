import React, { lazy } from "react";

import { BrandLogo, DrawerContent, Loader } from "@/components";
import { URLS } from "@/constants";
import { COPY } from "@/copy";
import { Colors } from "@/theme";
import lazyRoute from "./lazyRoute";
import { useCart, useAuth, useUserAddresses } from "@/hooks";
import { createStackNavigator } from "@react-navigation/stack";

const CartContainer = lazy(() => import("@/screens/Cart"));
const ProfileContainer = lazy(() => import("@/screens/Profile"));
const ProfileDataContainer = lazy(() => import("@/screens/ProfileData"));
const HomeContainer = lazy(() => import("@/screens/Home"));
const WizardScreen = lazy(() => import("@/screens/WizardScreen"));
//const NotFoundContainer = lazy(() => import("@/screens/NotFound"));
// const SettingsContainer = lazy(() => import("@/screens/Settings"));
const ProductContainer = lazy(() => import("@/screens/Products"));
const OrdersContainer = lazy(() => import("@/screens/Orders"));
const HistoryContainer = lazy(() => import("@/screens/History"));
const DetailsContainer = lazy(() => import("@/screens/Details"));
const DetailsOrdersContainer = lazy(() => import("@/screens/DetailsOrders"));
const DetailsHistoryContainer = lazy(() => import("@/screens/DetailsHistory"));
const PaymentGatewayContainer = lazy(() => import("@/screens/PaymentGateway"));
const ChangePasswordContainer = lazy(() => import("@/screens/ChangePassword"));

const MobileRouter = ({
  components: { Drawer, Tab, Stack },
  getRouteOptions,
  commonProps,
  drawerProps: { drawerType, iconColors },
}) => {
  const commonScreenProps = {
    showMenu: true,
    isLargeScreen: commonProps.isLargeScreen,
    theme: commonProps.theme,
  };
  const { user, isLoggedInAsGuest } = commonProps;
  const { productsLength } = useCart();

  const initialRoute =
    ( user?.profile ) || isLoggedInAsGuest ? URLS.home : URLS.profileData;
  const { shouldShowOnboarding } = useAuth();
  const show = () => setVisible(true);
  return (
    <Drawer.Navigator
      {...iconColors}
      drawerType={drawerType}
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName={initialRoute}
    >
      <Drawer.Screen
        key="home"
        name={URLS.home}
        options={getRouteOptions({
          ...commonProps,
          title: COPY["menu.product"],
          icon: "products",
        })}
      >
        {!shouldShowOnboarding
          ? () => {
              return (
                <Tab.Navigator tabBarOptions={iconColors}>
                  <Tab.Screen
                    name={URLS.summary}
                    options={getRouteOptions({
                      title: COPY["menu.home"],
                      icon: "home",
                      propName: "tabBarIcon",
                      headerTitle: () => <BrandLogo />,
                    })}
                  >
                    {lazyRoute(HomeContainer, {
                      isTopLevel: true,
                      showBrand: true,
                      title: COPY["menu.home"],
                      ...commonProps,
                      ...commonScreenProps,
                    })}
                  </Tab.Screen>
                  <Tab.Screen
                    name={URLS.product}
                    options={getRouteOptions({
                      title: COPY["menu.product"],
                      icon: "products",
                      propName: "tabBarIcon",
                      headerTitle: () => <BrandLogo />,
                    })}
                  >
                    {lazyRoute(ProductContainer, {
                      isTopLevel: true,
                      showBrand: true,
                      title: COPY["menu.product"],
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
                  <Tab.Screen
                    name={URLS.profile}
                    options={getRouteOptions({
                      title: COPY["menu.profile"],
                      icon: "profile",
                      propName: "tabBarIcon",
                      headerTitle: () => <BrandLogo />,
                    })}
                  >
                    {() => (
                      <Stack.Navigator headerMode="none">
                        <Stack.Screen
                          key="profile"
                          name={URLS.profile}
                          options={getRouteOptions({
                            ...commonProps,
                            title: COPY["menu.profile"],
                            icon: "profile",
                          })}
                        >
                          {lazyRoute(ProfileContainer, {
                            isTopLevel: true,
                            showBrand: true,
                            title: COPY["menu.profile"],
                            ...commonProps,
                            ...commonScreenProps,
                          })}
                        </Stack.Screen>
                        <Stack.Screen
                          key="orders"
                          name={URLS.orders}
                          options={getRouteOptions({
                            ...commonProps,
                            title: COPY["menu.orders"],
                            icon: "profile",
                          })}
                        >
                          {lazyRoute(OrdersContainer, {
                            isTopLevel: true,
                            showBrand: true,
                            title: COPY["menu.orders"],
                            ...commonProps,
                            ...commonScreenProps,
                          })}
                        </Stack.Screen>
                        <Stack.Screen
                          key="profileData"
                          name={URLS.profileData}
                          options={getRouteOptions({
                            ...commonProps,
                            title: COPY["menu.profileData"],
                            icon: "profile",
                          })}
                        >
                          {lazyRoute(ProfileDataContainer, {
                            isTopLevel: true,
                            showBrand: true,
                            title: COPY["menu.profileData"],
                            ...commonProps,
                            ...commonScreenProps,
                          })}
                        </Stack.Screen>
                        <Stack.Screen
                          key="changePassword"
                          name={URLS.changePassword}
                          options={getRouteOptions({
                            ...commonProps,
                            title: COPY["menu.change-password"],
                            icon: "profile",
                          })}
                        >
                          {lazyRoute(ChangePasswordContainer, {
                            isTopLevel: true,
                            showBrand: true,
                            title: COPY["menu.change-password"],
                            ...commonProps,
                            ...commonScreenProps,
                          })}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                </Tab.Navigator>
              );
            }
          : lazyRoute(WizardScreen, {
              show,
            })}
      </Drawer.Screen>
      <Drawer.Screen
        key="profile"
        name={URLS.profile}
        options={getRouteOptions({
          ...commonProps,
          title: COPY["menu.profile"],
          icon: "profile",
        })}
      >
        {() => (
          <Stack.Navigator headerMode="none">
            <Stack.Screen
              key="profile"
              name={URLS.profile}
              options={getRouteOptions({
                ...commonProps,
                title: COPY["menu.profile"],
                icon: "profile",
              })}
            >
              {lazyRoute(ProfileContainer, {
                isTopLevel: true,
                showBrand: true,
                title: COPY["menu.profile"],
                ...commonProps,
                ...commonScreenProps,
              })}
            </Stack.Screen>
            <Stack.Screen
              key="orders"
              name={URLS.orders}
              options={getRouteOptions({
                ...commonProps,
                title: COPY["menu.orders"],
                icon: "profile",
              })}
            >
              {lazyRoute(OrdersContainer, {
                isTopLevel: true,
                showBrand: true,
                title: COPY["menu.orders"],
                ...commonProps,
                ...commonScreenProps,
              })}
            </Stack.Screen>
            <Stack.Screen
              key="profileData"
              name={URLS.profileData}
              options={getRouteOptions({
                ...commonProps,
                title: COPY["menu.profileData"],
                icon: "profile",
              })}
            >
              {lazyRoute(ProfileDataContainer, {
                isTopLevel: true,
                showBrand: true,
                title: COPY["menu.profileData"],
                ...commonProps,
                ...commonScreenProps,
              })}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </Drawer.Screen>
      <Stack.Screen
        key="details"
        name={URLS.details}
        options={getRouteOptions({
          ...commonProps,
          hide: true,
          headerTitle: URLS.details,
        })}
      >
        {lazyRoute(DetailsContainer, {
          ...commonProps,
          ...commonScreenProps,
        })}
      </Stack.Screen>
      <Stack.Screen
        key="historial"
        name={URLS.history}
        options={getRouteOptions({
          ...commonProps,
          hide: true,
          headerTitle: URLS.history,
        })}
      >
        {lazyRoute(HistoryContainer, {
          isTopLevel: true,
          showBrand: true,
          title: COPY["menu.history"],
          ...commonProps,
          ...commonScreenProps,
        })}
      </Stack.Screen>
      <Stack.Screen
        key="profileData"
        name={URLS.profileData}
        options={getRouteOptions({
          ...commonProps,
          hide: true,
          headerTitle: URLS.profileData,
        })}
      >
        {lazyRoute(ProfileDataContainer, {
          title: COPY["menu.profileData"],
          ...commonProps,
          ...commonScreenProps,
        })}
      </Stack.Screen>
      <Stack.Screen
        key="details-history"
        name={URLS.detailsHistory}
        options={getRouteOptions({
          ...commonProps,
          hide: true,
          headerTitle: URLS.detailsHistory,
        })}
      >
        {lazyRoute(DetailsHistoryContainer, {
          ...commonProps,
          ...commonScreenProps,
        })}
      </Stack.Screen>
      <Stack.Screen
        key="details-orders"
        name={URLS.datailsOrders}
        options={getRouteOptions({
          ...commonProps,
          hide: true,
          headerTitle: URLS.datailsOrders,
        })}
      >
        {lazyRoute(DetailsOrdersContainer, {
          ...commonProps,
          ...commonScreenProps,
        })}
      </Stack.Screen>
      <Stack.Screen
        key="paymentGateway"
        name={URLS.paymentGateway}
        options={getRouteOptions({
          ...commonProps,
          hide: true,
          headerTitle: URLS.paymentGateway,
        })}
      >
        {lazyRoute(PaymentGatewayContainer, {
          ...commonProps,
          ...commonScreenProps,
        })}
      </Stack.Screen>
    </Drawer.Navigator>
  );
};

export default MobileRouter;
