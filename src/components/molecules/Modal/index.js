import React from "react";
import { View } from "react-native";
import { Portal } from "react-native-paper";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import Dropdown from "react-native-drop-down-item";
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Colors } from "@/theme";
import {
  Box,
  Touchable,
  Icon,
  Row,
  Col,
  Subtitle,
  Title,
  Spacing
} from "@/components";

export const SheetHeader = () => (
  <View
    style={{
      backgroundColor: "#FFFFFF",
      paddingTop: 10,
    }}
  >
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          width: 40,
          height: 4,
          borderRadius: 10,
          backgroundColor: "#d9d7d7",
          marginBottom: 10,
        }}
      />
    </View>
  </View>
);

export const Modal = ({ 
  children, 
  swipeLarge, 
  filters, 
  sheetRef 
}) => {

  const fall = new Animated.Value(1);
  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 15,
        height: 400,
      }}
    >
      {filters.map((item, index) => (
        <Collapse
          key={index}
        >
          <CollapseHeader>
            <Box
              w={"100%"}
              pl={10}
              pr={10}
              pt={5}
              mv={2}
              self="center"
            >
              <Box p={10} roundness={20} w={"100%"} bg={"#f6f6f6"}>
                <Row>
                  <Col mr={20} center>
                    <Icon
                      provider={item.providerIcon}
                      icon={item.icon}
                      color={Colors.primary}
                      fontSize={24}
                    />
                  </Col>
                  <Col w={"auto"}>
                    <Title bold fontSize={18}>
                      {item.title}
                    </Title>
                    <Subtitle fontSize={12}> {item.description}</Subtitle>
                  </Col>
                </Row>
              </Box>
            </Box>
          </CollapseHeader>
          <CollapseBody>
            <Box w = {30} h = {30} bg = "red">

            </Box>
          </CollapseBody>
        </Collapse>
      ))}
      <Touchable
        onPress={() => {
          sheetRef.current.snapTo(1);
        }}
        w={"100%"}
        pl={10}
        pr={10}
        pt={5}
        mv={2}
        self="center"
      >
        <Box p={10} roundness={20} w={"100%"} bg={"#f6f6f6"}>
          <Row>
            <Row>
              <Col mr={20} center>
                <Icon
                  provider="material-icons"
                  icon="close"
                  color={Colors.primary}
                  fontSize={24}
                />
              </Col>
              <Col w={"auto"}>
                <Title bold fontSize={18}>
                  Cerrar
                </Title>
              </Col>
            </Row>
          </Row>
        </Box>
      </Touchable>
    </View>
  );

  const animatedBackgroundOpacity = Animated.add(
    0.4,
    Animated.multiply(fall, 1.0)
  );

  return (
    <>
      <Animated.View
        style={{
          flex:1,
          opacity: animatedBackgroundOpacity,
        }}
      >
        {children}
      </Animated.View>
      <Portal>
        <BottomSheet
          ref={sheetRef}
          snapPoints={[swipeLarge, 0]}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction
          enabledContentGestureInteraction={false}
          enabledBottomInitialAnimation
          enabledInnerScrolling
          renderHeader={SheetHeader}
          renderContent={renderContent}
        />
      </Portal>
    </>
  );
};

export * from "./BottomSheetModal";
