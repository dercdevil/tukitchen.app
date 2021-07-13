import React from "react";
import { Animated, View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { Colors } from "@/theme";
import {
    Box,
    Touchable,
    Icon,
    Row,
  } from "@/components";
  
export const Search = ({ 
  clampedScroll, 
  searchFilterFunction, 
  search, 
  sheetRef,
  onChangeText,
  onClear
}) => {

  const searchBarTranslate = clampedScroll.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -250],
    extrapolate: "clamp",
  });
  const searchBarOpacity = clampedScroll.interpolate({
    inputRange: [0, 10],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: searchBarTranslate,
            },
          ],
          opacity: searchBarOpacity,
        },
      ]}
    >
      <Row width="100%" justify="center">
        <Searchbar
          placeholder="Buscar Productos"
          clearAccessibilityLabel={"search"}
          iconColor={Colors.primary}
          searchIcon={{ size: 24 }}
          style={{
            width: 322,
            backgroundColor: "#fafafa",
            elevation: 0,
            borderRadius: 4,
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
          }}
          onChangeText={onChangeText}
          onClear={onClear}
          value={search}
        />
        <Box
          w={40}
          roundness={4}
          h={50}
          bg={"#fafafa"}
          borderLeftWidth={0}
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
          center
          elevation={0}
        >
          <Touchable onPress={() => sheetRef.current.snapTo(0)}>
            <Icon
              provider="ant-design"
              icon="filter"
              color={Colors.primary}
              fontSize={24}
            />
          </Touchable>
        </Box>
      </Row>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 99,
    paddingLeft: 15,
    paddingRight:15,
    paddingTop:4,
    paddingBottom: 0,
  },
});
