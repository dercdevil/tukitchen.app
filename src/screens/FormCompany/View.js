import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { validate } from "@/utils";
import {
  Col,
  Text,
  ResponsiveImage,
  Box,
  Spacing,
  Title,
  Input,
  Button,
  Header,
} from "@/components";
import { COPY } from "@/copy";
import { Colors } from "@/theme";
import { Images } from "@/assets";

const FormCompanyView = ({
  shouldEnableLogin,
  handleChangeForm,
  name,
  email,
  phone,
  message,
  sendEmail,
  isLoading,
}) => {
  return (
    <>
      <Header back title={"Formulario para Tiendas"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={"position"}
          //   keyboardVerticalOffset={10}
        >
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
          <Box p={0} roundness={40} h="auto" w={"100%"} bg={"white"}>
            <Col flex={0} self="center" w={300}>
              <Title bold center>
                {"Llena el formulario y envia tu solicitud"}
              </Title>
            </Col>
            <Col flex={0} grow={1} w={300} self="center">
              <Spacing top={10} />
              <Input
                mode="outlined"
                dense
                label={COPY["auth.name"]}
                onChangeText={(newValue) => handleChangeForm("name", newValue)}
                value={name}
                disabled={isLoading}
              />
              <Spacing top={10} />
              <Box>
                <Input
                  mode="outlined"
                  dense
                  label={COPY["auth.email"]}
                  onChangeText={(newValue) =>
                    handleChangeForm("email", newValue)
                  }
                  disabled={isLoading}
                  value={email}
                  error={email.length > 0 ? !validate(email, "email") : false}
                />
                {email.length > 0 &&
                  (!validate(email, "email") && (
                    <Text fontSize={10} color={Colors.error} mt={4}>
                      Email no válido
                    </Text>
                  ))}
              </Box>

              <Spacing top={10} />
              <Input
                mode="outlined"
                dense
                label={COPY["profile.phone"]}
                onChangeText={(newValue) => handleChangeForm("phone", newValue)}
                disabled={isLoading}
                value={phone}
              />
              <Spacing top={10} />
              <Input
                mode="outlined"
                dense
                label={"Mensaje"}
                multiline
                onChangeText={(newValue) =>
                  handleChangeForm("message", newValue)
                }
                disabled={isLoading}
                value={message}
              />
              <Spacing top={15} />

              <Button
                self="center"
                w={"100%"}
                bg={Colors.primary}
                disabled={shouldEnableLogin || isLoading}
                onPress={sendEmail}
                loading={isLoading}
              >
                <Text mt={6} fontSize={16} color={"white"} center>
                  Enviar solicitud
                </Text>
              </Button>
            </Col>
          </Box>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

export default FormCompanyView;
