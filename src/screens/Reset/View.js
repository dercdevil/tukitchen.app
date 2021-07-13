import React from "react";
import { View } from "react-native";
import {
  // BrandLogo,
  Col,
  Loader,
  // Row,
  ResponsiveImage,
  Box,
  Spacing,
  Title,
  Input,
  Button,
  Text,
} from "@/components";
import { COPY } from "@/copy";
import { Colors } from "@/theme";
import { Images } from "@/assets";

const RegisterView = ({
  // error,
  // resetError,
  // navigation,
  loading,
  shouldEnableRecoverPassword,
  handleReset,
  onEnterPress,
  email,
  setEmail,
}) => {
  if (loading) {
    return <Loader />;
  }

  return (
    <View>
      {/* <Row position={"absolute"} mb={Tokens.unit(10)} self="center">
        <BrandLogo />
      </Row> */}
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

      <Box p={20} roundness={40} h={200} w={"100%"} bg={"white"}>
        <Col flex={0} self="center" w={300}>
          <Title bold center>
            {"Recupera tu contraseña"}
          </Title>
        </Col>

        <Col flex={1} grow={1} w={300} self="center">
          <Spacing top={18} />
          <Input
            mode="outlined"
            label={COPY["auth.email"]}
            value={email}
            dense
            onChangeText={setEmail}
            disabled={loading}
            onKeyPress={onEnterPress}
          />
          <Spacing top={15} />
          <Button
              self="center"
              w={"100%"}
              bg={Colors.primary}
              disabled={loading || shouldEnableRecoverPassword}
              onPress={handleReset}
              loading={loading}
            >
              <Text mt={6} fontSize={16} color={"white"} center>Recuperar Contraseña</Text>
            </Button>
          <Spacing top={24} />
        </Col>
      </Box>
    </View>
  );
};

export default RegisterView;
