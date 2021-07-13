import React, { Fragment, useState } from "react";
import { Appbar } from "react-native-paper";

import { Avatar, Hide, Menu, MenuItem, Spacing, AppBar } from "@/components";
import { useAuth, useTheme, useNavigation } from "@/hooks";
import { Tokens, fontConfig } from "@/theme";
import { URLS } from "@/constants";
import { isWeb } from "@/utils";
import { COPY } from "@/copy";

import { BrandLogo } from "../../app";
import { Hr, Icon } from "../../atoms";
import { Row } from "../Row";

const headerRight = ({
  isLargeScreen,
  renderRight,
  toggle,
  navigation,
  theme,
  scheme,

}) => {
  const { logOut, user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogOut = () => {
    // TODO: show logout confirmation alert
    // TODO: native
    logOut(user);

    if (isWeb()) {
      window.location.pathname = `/${URLS.login}`;
    }
  };
  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  return (
    <Fragment>
      {renderRight && renderRight()}
      {isLargeScreen && (
        <Fragment>
          <Menu
            visible={showMenu}
            onDismiss={closeMenu}
            pt={Tokens.unit(5)}
            pr={Tokens.unit(3)}
            roundness={Tokens.unit(1)}
            minWidth={240}
            contentStyle={{
              backgroundColor: theme.colors.surface,
            }}
            anchor={
              <Row>
                <Avatar
                  withShadow
                  size={40}
                  name={user.name || ""}
                  onPress={openMenu}
                />
                <Spacing right={Tokens.unit(1)} />
              </Row>
            }
          >
            <MenuItem
              icon={() => (
                <Icon
                  fontSize={24}
                  provider="material-community-icons"
                  darkColor="yellow"
                  icon={`lightbulb${scheme !== "dark" ? "-outline" : "-on"}`}
                />
              )}
              onPress={toggle}
              title={COPY.darkMode}
            />
            <MenuItem
              icon={() => (
                <Icon fontSize={24} icon="setting" provider="ant-design" />
              )}
              onPress={() => {
                navigation.navigate(URLS.settings);
                closeMenu();
              }}
              title={COPY.settings}
            />
            <Hr />

            <MenuItem
              icon={() => <Icon icon="log-out" display="flex" fontSize={24} />}
              onPress={handleLogOut}
              title={COPY.logOut}
            />
          </Menu>
        </Fragment>
      )}
    </Fragment>
  );
};

export const Header = ({
  title,
  isLargeScreen,
  subtitle,
  isTopLevel = false,
  showMenu = false,
  showBrand = false,
  showBack = true,
  back = false,
  hideAvatar = false,
  onClose = null,
  renderRight = null,
  brandLeft = false,
  brandLogoProps,
  pt,
  headerRightContent,
  ...rest
}) => {

  const navigation = useNavigation();
  const { theme, toggle, scheme } = useTheme();
  let leftContent = null;
  let centerContent = null;
  let rightContent = headerRightContent;

  if (showBrand) {
    centerContent = (
      <BrandLogo
        ml={"27%"}
        m={"auto"}
        {...brandLogoProps}
      />
    );
  } else if (title) {
    centerContent = (
      <Appbar.Content
        title={title}
        subtitle={subtitle}
        titleStyle={{
          fontFamily: fontConfig.default.regular.fontFamily,
        }}
      />
    );
  }

  if (showBack && !isTopLevel) {
    leftContent = (
      <Appbar.BackAction
        onPress={() => {
          if(back || navigation?.goBack()){
            navigation.goBack()
          }else{
            navigation.navigate(URLS.home)
          }
        }}
      />
    );
  } else if (onClose) {
    leftContent = <Appbar.Action icon="close" onPress={onClose} />;
  } else if (showMenu && !isLargeScreen) {
    leftContent = (
      <Appbar.Action icon="menu" onPress={navigation?.toggleDrawer} />
    );
  }

  if (isLargeScreen && !hideAvatar) {
    rightContent = headerRight({
      renderRight,
      isLargeScreen,
      toggle,
      navigation,
      theme,
      scheme,
    });
  } else if (renderRight) {
    rightContent = renderRight();
  }

  // HACK: add extra item to center centerContent
  // only on mobile
  if (!brandLeft && (title || showBrand) && !isLargeScreen) {
    if (!leftContent && rightContent) {
      leftContent = <Hide>{rightContent}</Hide>;
    } 
    // else if (leftContent && !rightContent) {
    //   rightContent = <Hide>{leftContent}</Hide>;
    // }
  }

  return (
    <Fragment>
      <Spacing top={pt} />
      <AppBar {...rest}>
        {leftContent}
        {centerContent}
        {rightContent} 
      </AppBar>
    </Fragment>
  );
};
