import React from "react";
import { KeyboardAvoidingView } from "react-native";
import {
  // BrandLogo,
  Touchable,
  Col,
  InputRutRaw,
  Input,
  InputWithCensorToggle,
  Row,
  Box,
  Button,
  Spacing,
  Title,
  Text,
  Screen,
  ResponsiveImage,
  // Subtitle,
} from "@/components";
import { COPY } from "@/copy";
import { Colors } from "@/theme";
import { checkDigit } from "@/utils";
import { Images } from "@/assets";
import { URLS } from "@/constants";
const LogInView = ({
  error,
  resetError,
  loading,
  navigation,
  handleChangeForm,
  shouldEnableLogin,
  rut,
  password,
  handleLogIn,
  onEnterPress,
}) => {
  return (
    <Screen
      error={error}
      navigation={navigation}
      onShowError={resetError}
      notifyError="notify"
    >
      <KeyboardAvoidingView behavior={"position"} keyboardVerticalOffset={82}>
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
        <Box p={20} roundness={40} h="auto" w={"100%"} bg={"white"}>
          <Col flex={0} self="center" w={270}>
            <Title bold center>
              Trae la mejor cocina a tu casa
            </Title>
          </Col>
          <Col flex={0} grow={1} w={300} self="center">
            <Spacing top={10} />
            <Row>
              <Col w={200}>
                <Input
                  mode="outlined"
                  keyboardType="numeric"
                  dense
                  label={COPY["auth.rut"]}
                  onChangeText={(newValue) => handleChangeForm("rut", newValue)}
                  disabled={loading}
                  onKeyPress={onEnterPress}
                  maxLength={8}
                  value={rut}
                />
              </Col>
              <Spacing left={10} />
              <Col w={100}>
                <InputRutRaw
                  mode="outlined"
                  dense
                  disabled={true}
                  label="Digito"
                  value={rut.length >= 7 ? checkDigit(rut) : ""}
                />
              </Col>
            </Row>
            <Spacing top={10} />
            <InputWithCensorToggle
              mode="outlined"
              label={COPY["auth.password"]}
              dense
              disabled={loading}
              onChangeText={(newValue) =>
                handleChangeForm("password", newValue)
              }
              onKeyPress={onEnterPress}
              value={password}
            />
            <Spacing top={15} />
            <Button
              self="center"
              w={"100%"}
              bg={Colors.primary}
              disabled={shouldEnableLogin}
              onPress={handleLogIn}
              loading={loading}
            >
              <Text mt={6} fontSize={16} color={"white"} center>
                {COPY["auth.login"]}
              </Text>
            </Button>
            <Spacing top={20} />

            <Touchable
              self="center"
              onPress={() => {
                navigation.navigate(URLS.formCompany);
              }}
            >
              <Text>
                Si eres tienda,{" "}
                <Text color={Colors.secondary}>Contáctanos!!!</Text>
              </Text>
            </Touchable>
          </Col>
        </Box>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default LogInView;
