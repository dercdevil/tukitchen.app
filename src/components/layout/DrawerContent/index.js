import React, { useEffect, useRef } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import * as Animatable from "react-native-animatable";

import { Avatar } from "@/components";
import { URLS } from "@/constants";
import { useAuth } from "@/hooks";
import { isWeb } from "@/utils";
import { Tokens } from "@/theme";

import { Col } from "../Col";
import { Row } from "../Row";
import { Spacing } from "../Spacing";
import { Text, Hr } from "../../atoms";
import { BrandIcon, BrandLogo } from "../../app";
import { SidebarToggle } from "../../organisms";

import { LogOutItem } from "./LogOutItem";
import { DrawerItem } from "./DrawerItem";

const DrawerItemList = ({ state, descriptors, ...rest }) => {

  return state.routes.map((route, i) => (
    <DrawerItem
      i={i}
      key={route.name}
      state={state}
      route={route}
      {...descriptors[route.key].options}
      {...rest}
    />
  ));
};

export const DrawerContent = ({
  isLargeScreen,
  isLoggedIn,
  theme,
  collapsed,
  toggleSidebar,
  ...rest
}) => {
    const { user } = useAuth();
    const onPress = () => rest.navigation?.navigate(URLS.home);

    const brand = useRef(null);
    const logo = collapsed ? (
        <BrandIcon multiplier={1.5} onPress={onPress} />
    ) : (
        <BrandLogo onPress={onPress} />
    );
    useEffect(() => {
        if (collapsed) {
        brand.current?.fadeInRight(600);
        } else {
        brand.current?.fadeInLeft(800);
        }
    }, [collapsed]);

    return (
        <DrawerContentScrollView
            contentContainerStyle={{
                flex: 1,
                backgroundColor: theme?.colors?.background,
            }}
            {...rest}
        >
        <Row flex={0} ph={16} pv={24} center={isLargeScreen}>
            <Col center>
            {isLargeScreen ? (
                <Animatable.View easing="ease-out" ref={brand}>
                {logo}
                </Animatable.View>
            ) : (
                <Avatar size={40} name={user.name} />
            )}
            </Col>
            {!isLargeScreen && (
            <>
                <Spacing left={16} />
                <Col flex={1} justify="center">
                <Text>{user.name}</Text>
                {user?.username && <Text>{user.username}</Text>}
                </Col>
                {/* <DarkModeToggle self="center" p={Tokens.unit(1.5)} /> */}
            </>
            )}
        </Row>
        <DrawerItemList isLargeScreen={isLargeScreen} theme={theme} {...rest} />
        {!isLargeScreen && <LogOutItem isLargeScreen={isLargeScreen} {...rest} />}
        <Spacing fill />
        {isLargeScreen && <Hr mv={8} mh={32} />}
        <Row
            flex={0}
            p={16}
            mb={8}
            h={90}
            justify="space-between"
            align="center"
            center={isLargeScreen}
        >
            {isWeb() && isLargeScreen && (
            <Col self="center">
                <SidebarToggle collapsed={collapsed} toggle={toggleSidebar} />
            </Col>
            )}
            {!isLargeScreen && (
            <Text fontSize={12} color="gray" mh="auto">
                Version: v0.0.2
            </Text>
            )}
        </Row>
        </DrawerContentScrollView>
    );
};
