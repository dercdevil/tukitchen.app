import React from "react";
import { ImageBackground, TouchableHighlight } from "react-native";
import { Images } from "@/assets";
import { overflowValue, withApiURL } from "@/utils";
import { COPY } from "@/copy";
import { Colors } from "@/theme";
import { URLS } from "@/constants";
import {
  Col,
  Row,
  Screen,
  Spacing,
  Title,
  Avatar,
  Header,
  Text,
  Box,
  Icon,
  WalletIcon,
  TruckIcon,
  Touchable,
  CreditCartIcon,
  Surface
} from "@/components";

const profileMenuActions = [
  {
    text: COPY["profile.history"],
    icon: WalletIcon,
    url: URLS.history
  },
  {
    text: COPY["profile.orders"],
    icon: TruckIcon,
    url: URLS.orders
  },
  // {
  //   text: COPY["profile.payments"],
  //   icon: CreditCartIcon,
  //   url: URLS.payments
  // },
]

const ProfileView = ({
  profile: {
    img_profile,
    name,
  },
  handleChangeForm,
  onEnterPress,
  isMutating,
  navigation,
  error,
  ...props
}) => {
  return (
    <>
    <Header {...props} />
    <Screen
      error={error}
      notifyError
      navigation={navigation}
      noHeader
      containerProps={{
        contentContainerStyle: {
          flex: 1,
          paddingBottom: 0,
          overflow: overflowValue(),
        },
      }}
    >
      <ImageBackground source={Images.bg} style={{ height: "100%", flex: 1 }}>
        <Box pl={30} pr={30}> 
          <Spacing/> 
          <Col flex={0} self="center">
            <Title bold center>
              Mi Perfil
            </Title>
          </Col>
          <Col flex={0} center w="100%">
            <Spacing top={9} />
            <Row self="center">
              <Avatar 
                size={80} 
                source={img_profile ? withApiURL(img_profile) : null}
                name={name} 
                center
              />
            </Row>
            <Spacing top={15}/>
            <Row justify = "space-between" roundness = {4} bc ={Colors.secondary} bw={1} p = {20} w = "70%">
              {profileMenuActions.map( (menu,id) => (
                <Col align = "center" key = {id}>
                  <Box justify="center" align="center" mb = {8} size = {48} roundness = {48 * 0.35} >
                  <Touchable onPress = {() => navigation.navigate(menu.url)}>
                    <menu.icon  color = {Colors.secondary} size={38} />
                  </Touchable>
                  </Box>
                  <Text bold>
                    {menu.text}
                  </Text>
                </Col>
              ))}
            </Row>
          </Col>
          <Col>
            <Spacing top={30} />
            <TouchableHighlight onPress = {() => navigation.navigate(URLS.profileData)}>
              <Surface p={20} style = {{elevation: 1}} >
                <Row justify = "space-between" align = "center">
                  <Box flex = {1} direction = "row" align = "center">
                    <Box mr = {10}>
                      <Icon fontSize={24} icon="message1" provider="ant-design"/>
                    </Box>
                    <Text>
                      {COPY["profile.data"]}
                    </Text>
                  </Box>
                  <Icon fontSize={24} color = {Colors.secondary} icon="keyboard-arrow-right" provider="material-icons"/>
                </Row>
              </Surface>
            </TouchableHighlight>
            <Spacing top={20} />
            <TouchableHighlight onPress = {() => navigation.navigate(URLS.changePassword)}>
              <Surface p={20} style = {{elevation: 1}}>
                <Row justify = "space-between" align = "center">
                  <Box flex = {1} direction = "row" align = "center">
                    <Box mr = {10}>
                      <Icon fontSize = {24} icon="message1" provider="ant-design"/>
                    </Box>
                    <Text>
                      {COPY["profile.change-password"]}
                    </Text>
                  </Box>
                  <Icon fontSize = {24} color = {Colors.secondary} icon="keyboard-arrow-right" provider="material-icons"/>
                </Row>
              </Surface>
            </TouchableHighlight>
          </Col>
        </Box>
      </ImageBackground>
    </Screen>
    </>
  );
};

export default ProfileView;
