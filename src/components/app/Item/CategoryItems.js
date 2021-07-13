import React from "react";
import { Title, Touchable } from "@/components";
import { ColorHex } from "@/utils";
import { Dimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const CategoryItems = ({ item , onPress }) => {
  return (
    <Touchable p={1} onPress={()=>onPress(item)}>
      <LinearGradient
        // Button Linear Gradient
        start={{x: 1, y: 0.2}}
        colors={[ColorHex(), ColorHex()]}
        style={styles.button}
      >
        <Title color={"white"} bold center>{item.name}</Title>
      </LinearGradient>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 5,
    height:150,
    width: Dimensions.get("window").width - 100,
  },
});

