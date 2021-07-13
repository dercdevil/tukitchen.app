import React from "react";
import { validate } from "@/utils";
import { COPY } from "@/copy";
import {
  Header,
  Spacing,
  Box,
  Text,
  Col,
  Row,
  Input,
  Button,
  Title,
  Avatar,
  ImagePicker,
  AddressField,
} from "@/components";
import { ScrollView } from "react-native-gesture-handler";
import { addresses } from "../../redux/ducks";
import { Colors } from "@/theme";

const ProfileDataView = ({
  profile: { img_profile, name, last_name, phone, email, id },
  addresses,
  //address,
  handleChangeForm,
  onEnterPress,
  onChangeA,
  isMutating,
  hasError,
}) => {
  /*
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const close = () => setVisible(false);
  const [pass, setPass] = useState(false);
  */

  return (
    <>
      {id ? (
        <Header title={"Datos del Perfil"} />
      ) : (
        <Header title={"Registro del perfil"} showBack={false} />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacing top={50} />
        <Col flex={0} self="center" w={300}>
          <Title bold center>
            Mi Perfil
          </Title>
        </Col>
        <Col flex={1} grow={1} w={300} self="center">
          <Spacing top={9} />
          <Row self="center">
            <ImagePicker
              value={img_profile}
              onChange={(file) => handleChangeForm("image", file)}
            >
              {({ image }) => {
                console.log({ image: typeof image });
                return (
                  <Avatar
                    size={80}
                    name={name}
                    center
                    {...(image
                      ? typeof image === "string"
                        ? { source: image }
                        : { source: image?.uri }
                      : null)}
                  />
                );
              }}
            </ImagePicker>
          </Row>
          <Spacing top={50} />
          <Input
            mode="outlined"
            label={COPY["profile.name"]}
            h={"50%"}
            value={name}
            onChangeText={(newValue) => handleChangeForm("name", newValue)}
            disabled={isMutating}
          />
          <Spacing top={18} />
          <Input
            mode="outlined"
            label={COPY["profile.lastName"]}
            value={last_name}
            onChangeText={(newValue) => handleChangeForm("last_name", newValue)}
            disabled={isMutating}
          />
          <Spacing top={18} />
          <Input
            mode="outlined"
            label={COPY["profile.phone"]}
            value={phone}
            onChangeText={(newValue) => handleChangeForm("phone", newValue)}
            disabled={isMutating}
          />
          <Spacing top={18} />
          <Box>
            <Input
              mode="outlined"
              label={COPY["profile.email"]}
              value={email}
              onChangeText={(newValue) => handleChangeForm("email", newValue)}
              disabled={isMutating}
              error={email.length > 0 ? !validate(email, "email") : false}
            />
            {email.length > 0 && !validate(email, "email") && (
              <Text fontSize={10} color={Colors.error} mt={4}>
                Email no válido
              </Text>
            )}
          </Box>

          <Spacing top={18} />
          <AddressField
            label={COPY["profile.address"]}
            disabled={isMutating}
            onChange={onChangeA}
            value={
              addresses?.length &&
              addresses?.[0]?.latitude &&
              addresses?.[0]?.longitude
                ? addresses[0]
                : undefined
            }
          />
          <Spacing top={18} />
          <Button
            m={4}
            mode="contained"
            onPress={onEnterPress}
            loading={isMutating}
            disabled={hasError || !validate(email, "email")}
          >
            {id ? COPY["profile.btn1"] : COPY["profile.btn2"]}
          </Button>
          <Spacing top={24} />
        </Col>
      </ScrollView>
    </>
  );
};

export default ProfileDataView;
