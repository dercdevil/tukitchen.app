import React from "react";
import { COPY } from "@/copy";
import { DEFAULT_API_URL } from "@/constants";
import {
  Button,
  Col,
  Row,
  Spacing,
  Title,
  Touchable,
  Box,
  Avatar,
  Icon,
  Subtitle,
} from "@/components";

const boxShadow =`12px 12px 16px 0 rgba(0, 0, 0, 0.12), -8px -8px 12px 0 rgba(208, 208, 208, 0.30)`

export const ProductItems = ({ item, onPress, onAdd }) => (
  <Touchable 
    onPress={onPress} 
    mr={8}
    w={300} 
    mv={10} 
    self="center"
  >
    <Box 
      p={10} 
      roundness={20} 
      w={300} 
      bg={"#f6f6f6"}
      boxShadow = {boxShadow}
    >
      <Row>
        <Col>
          <Avatar size={100} source={item.gallery?.[0]?.img_product ? DEFAULT_API_URL+item.gallery[0].img_product : null} name={item.name} />
        </Col>
        <Col w={200}>
          <Title fontSize={18} center>
            {item.name}
          </Title>
          <Subtitle fontSize={12} mt={10} center>
            {item.price} $
          </Subtitle>
          <Spacing top={10} />
          <Button w={120} onPress={onAdd} self="center">
            <Icon
              provider="Entypo"
              icon="shopping-cart"
              color={"white"}
              fontSize={14}
              mr={5}
            />
            {COPY["product.btn"]}
          </Button>
        </Col>
      </Row>
    </Box>
  </Touchable>
);
