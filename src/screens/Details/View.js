import React from "react";
import { ImageBackground } from "react-native";
import { Images } from "@/assets";
import { useCart } from "@/hooks";
import { COPY } from "@/copy";
import {
  BrandLogo,
  Button,
  Col,
  Input,
  Row,
  Screen,
  Spacing,
  Title,
  Header,
  HeaderContent,
  Text,
  Touchable,
  Box,
  Avatar,
  Image,
  SliderItem,
  Icon,
  Subtitle,
} from "@/components";
import { Portal } from "react-native-paper";
import { useTheme } from "@/hooks";
import { Colors } from "@/theme";

import * as Linking from 'expo-linking';

const navigateTo = (url) => {
  Linking.openURL(url);
}

const DetailsView = ({ 
  item, 
  categories, 
  navigation,
  ...props 
}) => {
  const {
    name,
    description,
    price,
    youtube_link,
    time_for_preparation,
    gallery,
  } = props.route.params;
  const cart = useCart();

  useTheme({ barProps: { translucent: true , backgroundColor: "transparent" } });

  return (
      <Box 
        bg="green" 
        roundness={20} 
        w={"100%"} 
        flex={1} 
        h="100%"
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
      >
        <Box>
          <Box zIndex ={1000} position="absolute" top={40} left = {40} right = {0} bottom = {0}>
              <Touchable onPress = {() => { navigation.goBack() }}>
                <Icon fontSize = {24} color="#fff" icon="arrowleft" provider="ant-design" />
              </Touchable>
          </Box>
          <SliderItem gallery={gallery}/>
        </Box>
        <Box
          bg="#fff"
          flex={1}
          mt={-17}
          p={16}
          style={{
            borderTopStartRadius: 22,
            borderTopEndRadius: 22
          }}
        >
          <Col p={10} w={"100%"}>
            <Title bold fontSize={28}>
              {name}
            </Title>
            <Row align="center">
              <Icon icon = "clock" color = {Colors.muted} mr={5} fontSize={16} />
              <Text color = {Colors.muted} mt={5} pb={4} > 
                Tiempo de preparacion: {time_for_preparation} min
              </Text>
            </Row>
            <Box mt={18}>
              <Text>
                {description}
              </Text>
            </Box>

            {!!youtube_link && (
              <Touchable flexDirection = "row" onPress = {() => youtube_link ? navigateTo(youtube_link) : "" }> 
                <Row align="center" mt={18}>
                  <Icon icon = "link" provider = "ant-design" color = {Colors.primary} mr={5} fontSize={16} />
                  <Text color = {Colors.primary} mt={5} pb={4} style ={{
                    textDecorationLine: "underline",
                    textDecorationColor: Colors.primary,
                    textDecorationStyle: "solid"
                  }} > 
                    Ver video
                  </Text>
                </Row>
              </Touchable>
            )}

            <Box mt={38}> 
              <Button
                onPress={() => cart.add(props.route.params)}
                flex={0}
                width="auto"
                paddingHorizontal={15}
                icon={() => (
                  <Icon
                    fontSize={18}
                    color="#fff"
                    icon="shoppingcart"
                    provider="ant-design"
                  />
                )}
              >
                {COPY["add.to.cart"]}
              </Button>
            </Box>
          </Col>
        </Box>
        {/*
        <Row self="center">
          <Col p={10} w={"100%"}>
            <Title bold fontSize={28} center>
              {name}
            </Title>
            <Spacing top={20} />
            <Box p={10} mt={10} bw={1} bg={"#f6f6f6"} bc={"#000"}>
              <Row mb={10}>
                <Subtitle bold>Detalles: </Subtitle>
                <Text fontSize={16} mt={2}>
                  {description}.{" "}
                </Text>
              </Row>
              <Row>
                <Subtitle mb={10} bold>
                  Tiempo de preparación:{" "}
                </Subtitle>
                <Text fontSize={16} mt={2}>
                  {time_for_preparation} Min.{" "}
                </Text>
              </Row>
              <Row>
                <Subtitle bold>Link de Youtube: </Subtitle>
                <Text fontSize={16}>{youtube_link} </Text>
              </Row>
            </Box>
            <Spacing top={20} />
            <Subtitle bold fontSize={18} mt={10} center>
              {price} $
            </Subtitle>
            <Spacing top={20} />
            <Button
              onPress={() => cart.add(props.route.params)}
              flex={0}
              width="auto"
              paddingHorizontal={15}
              self="center"
              icon={() => (
                <Icon
                  fontSize={18}
                  color="#fff"
                  icon="shoppingcart"
                  provider="ant-design"
                />
              )}
            >
              {COPY["add.to.cart"]}
            </Button>
          </Col>
              </Row>*/}
      </Box>
  );
};
export default DetailsView;
