import React from "react";
import { View } from "react-native";
import {
  // Screen,
  Title,
  Col,
  Button,
  Text,
  Spacing,
  Box,
  Touchable,
  // Row,
  // BrandLogo,
  ResponsiveImage,
} from "@/components";
import { Images } from "@/assets";
import { URLS } from "@/constants";
// import { COPY } from "@/copy";
import { Tokens, Colors } from "@/theme";

export const Landing = ({ navigation }) => {
  
  return (
    <View>
      <ResponsiveImage
        initialWidth={320}
        initialHeight={320}
        source={Images.app}
        containerProps={{
          self: "center",
          top: 10,
          mr: 5,
        }}
      />
      <Box p={20} roundness={40} w={"100%"} bg={"white"}>
        <Col self="center" maxW={400} pt={Tokens.unit(1)} mb={Tokens.unit(3)}>
          <Title bold  center>
          Sacia tu hambre!
          </Title>
          <Spacing top={Tokens.unit(5)} />
          <Button
            self="center"
            w={300}
            bg={Colors.primary}
            disableHover
            onPress={() => {
              navigation.navigate(URLS.login);
            }}
          >
            <Text mt={6} fontSize={16} color={"white"} center>Iniciar Sesión</Text>
          </Button>
          <Spacing top={Tokens.unit(2)} />
          <Button
            self="center"
            w={300}
            bg={"#e9bd15"}
            disableHover
            onPress={() => {
              navigation.navigate(URLS.home);
            }}
          >
            <Text mt={6} fontSize={16} color={"white"} center>Invitado</Text>
          </Button>
        </Col>
      </Box>
    </View>
  );
};

Landing.header = null;

export default Landing;
