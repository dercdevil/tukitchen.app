import React, { useState } from "react";
import { Row, Icon, Text } from "@/components";
import { TouchableOpacity as Touchable, StyleSheet } from "react-native";
import { Colors } from "@/theme";

const PlusButton = (props) => (
  <Icon
    {...props}
    provider="Entypo"
    icon="plus"
    color={"white"}
    fontSize={18}
  />
);

const MinusButton = (props) => (
  <Icon
    {...props}
    provider="Entypo"
    icon="minus"
    color={"white"}
    fontSize={18}
  />
);

const EVENT_TYPES = {
  minus: 'minus',
  plus: 'plus'
}

export const CounterButton = ({ 
  start, 
  min = 1,
  max = Infinity,
  onChange,
  ...rest 
}) => {

  const [counter,setCounter] = useState(start || 0);

  const handleMinusButtonClick = (event) => {
    if(counter > min ){
      setCounter( counter - 1 );
      if(typeof onChange === 'function'){
        onChange(event,counter,EVENT_TYPES.minus)
      }
    }
  }

  const handlePlusButtonClick = (event) => {
    if(counter <= max ){
      setCounter( counter + 1 );
      if(typeof onChange === 'function'){
        onChange(event,counter,EVENT_TYPES.plus)
      }
    }
  }

  return (
    <Row h={30}bg={Colors.primary} roundness={50} {...rest}>
      <Touchable 
        activeOpacity = {0.8}
        style={StyleSheet.compose(styles.button,styles.leftButton)}
        onPress={handleMinusButtonClick}
      >
        <MinusButton  mt={5} self = "center"/>
      </Touchable>
      <Text w = {30} mt={5} color={Colors.white} center>
        {counter}
      </Text>
      <Touchable 
        activeOpacity = {0.8}
        style={StyleSheet.compose(styles.button,styles.rightButton)}
        onPress={handlePlusButtonClick}
      >
        <PlusButton mt={5} self = "center" />
      </Touchable>
    </Row>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 45,
    backgroundColor: Colors.primary
  },

  leftButton: {
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50
  },
  rightButton: {
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50
  }

});