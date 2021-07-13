import React from "react";
import { View, ImageBackground } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import {
  Col,
  Spacing,
  Text,
  Image,
} from "@/components";
import { Images } from "@/assets";
import { Colors } from "@/theme";
import { useAuth } from "@/hooks";

const slides = [
  {
    key: "one",
    title: " Obtenga su plato favorito en linea",
    text:
      "Puede comprar cualquier plato, desde hamburguesas hasta platos exóticos con unos pocos clicks.",
    image: Images.pizza,
  },
  {
    key: "two",
    title: " Envió a cualquier lugar",
    text:
      "Enviaremos a cualquier parte con una política de envio inmejorable y lo mejor es la rapidez del servicio",
    image: Images.truck,
  },
  {
    key: "three",
    title: " El tiempo de entrega",
    text:
      "Podra verificar el estado actual de su pedido. Garantizandole total confianza en sus transacciones",
    image: Images.box,
  },
];

const renderItem = ({ item }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Col bottom={40} center>
        {item.image === Images.pizza ? (
          <Image w={140} h={140} mv={32} source={item.image} />
        ) : null}
        {item.image === Images.truck ? (
          <Image w={150} h={180} mv={32} source={item.image} />
        ) : null}
        {item.image === Images.box ? (
          <Image w={130} h={140} mv={32} source={item.image} />
        ) : null}
      </Col>
      <Text bold center>
        {item.title}
      </Text>
      <Spacing top={10} />
      <Text color={Colors.gray} center>
        {item.text}
      </Text>
    </View>
  );
};

const renderNextButton = () => {
  return (
    <View
      style={{
        height:40,
        top: 15,
      }}
    >
      <Text bold>Siguiente</Text>
    </View>
  );
};
const renderPrevButton = () => {
  return (
    <View
      style={{
        height:40,
        top: 15,
      }}
    >
      <Text bold>Atrás</Text>
    </View>
  );
};
const renderDoneButton = () => {
  return (
    <View
      style={{
        height:40,
        top: 15,
      }}
    >
      <Text bold>Comenzar</Text>
    </View>
  );
};
const WizardScreen = () => {

  const { hideOnboarding } = useAuth();

  return (
    <ImageBackground source={Images.bg1} style={{ height: "100%", flex: 1 }}>
      <AppIntroSlider
        renderItem={renderItem}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        showPrevButton
        renderPrevButton={renderPrevButton}
        dotStyle={{
          backgroundColor: "#fff",
          borderWidth: 2,
          borderColor: "#000",
          top: -30,
        }}
        activeDotStyle={{
          backgroundColor: "#fc0",
          borderWidth: 2,
          borderColor: "#000",
          top: -30,
        }}
        data={slides}
        onDone={hideOnboarding}
      />
    </ImageBackground>
  );
};

export default WizardScreen;
