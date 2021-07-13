import React from "react";
import { KeyboardAvoidingView } from "react-native";
import {
  // BrandLogo,
  Col,
  // Loader,
  Text,
  // Touchable,
  ResponsiveImage,
  Box,
  Spacing,
  Title,
  InputRutRaw,
  Input,
  Screen,
  InputWithCensorToggle,
  Button,
  NavLink,
  Row,
} from "@/components";
import { COPY } from "@/copy";
import { Colors } from "@/theme";
import { checkDigit } from "@/utils";
import { Images } from "@/assets";
import { Checkbox } from "react-native-paper";

const SignUpView = ({
  error,
  resetError,
  navigation,
  loading,
  shouldEnableLogin,
  handleSignUp,
  onEnterPress,
  rut,
  password,
  passwordRepeat,
  handleChangeForm,
  userAcceptTermsAndConditions,
  setUserAcceptTermsAndConditions,
}) => {
  return (
    <Screen
      error={error}
      navigation={navigation}
      onShowError={resetError}
      notifyError
      noHeader
    >
      <KeyboardAvoidingView behavior={"position"} keyboardVerticalOffset={110}>
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
          <Col flex={0} self="center" w={300}>
            <Title bold center>
              {"Registrarse es gratis"}
            </Title>
          </Col>
          <Col flex={0} grow={1} w={300} self="center">
            <Spacing top={10} />
            <Row>
              <Col w={200}>
                <Input
                  mode="outlined"
                  dense
                  keyboardType="numeric"
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
              value={password}
              disabled={loading}
              onChangeText={(newValue) =>
                handleChangeForm("password", newValue)
              }
              onKeyPress={onEnterPress}
            />
            <Spacing top={10} />
            <InputWithCensorToggle
              mode="outlined"
              label={"Repetir Contraseña"}
              dense
              disabled={loading}
              value={passwordRepeat}
              onChangeText={(newValue) =>
                handleChangeForm("passwordRepeat", newValue)
              }
              onKeyPress={onEnterPress}
            />
            <Spacing top={15} />
            <Row align="center">
              <Checkbox
                onPress={() => {
                  setUserAcceptTermsAndConditions(
                    !userAcceptTermsAndConditions
                  );
                }}
                color={Colors.primary}
                status={userAcceptTermsAndConditions ? "checked" : "unchecked"}
              />
              <NavLink to="https://vorazkitchen.cl/terminos-y-condiciones/">
                Acepto los terminos y condiciones
              </NavLink>
            </Row>
            <Spacing top={15} />
            <Button
              self="center"
              w={"100%"}
              bg={Colors.primary}
              disabled={shouldEnableLogin}
              onPress={handleSignUp}
              loading={loading}
            >
              <Text mt={6} fontSize={16} color={"white"} center>
                Registrarse
              </Text>
            </Button>
          </Col>
        </Box>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default SignUpView;
