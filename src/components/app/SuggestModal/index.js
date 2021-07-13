import React from "react";
import {
  Text,
  Box,
  Row,
  Button,
  Col,
  IconButton,
  Hr,
  Title
} from "@/components";
import { URLS } from "@/constants";
import { Colors } from "@/theme";

import { Dialog, Portal } from 'react-native-paper';
import { useCart } from "@/hooks";
import { useNavigation } from '@react-navigation/native';


//a modal that suggests users to buy on the same 
//store or empty their cart
export const SuggestModal = () => {

  const cart = useCart();
  const navigation = useNavigation();

  const product = cart.products?.[0];
  const currentStoreID = product?.profile?.id || ""
  const currentStore = product?.profile?.name_store || "";

  return(
      <Portal>  
        <Dialog 
          visible={cart.hasProductsFromDifferentStores} 
          onDismiss={() => {
            cart.restore()
          }}
        >
          <Row
            paddingHorizontal = {24}
            paddingVertical = {36}
          >
            <Title bold flex={1} >
              Parece que ya elegiste productos 
              de otra tienda
            </Title>
            <Box flex={0}>
              <IconButton
                icon="close"
                provider="ant-design"
                fontSize = {24}
                onPress ={() => cart.restore()}
              />
            </Box>
          </Row>
          <Dialog.Content>
            <Text color = {Colors.muted}>
              Hemos detectado que tienes productos 
              de {currentStore} , te recomendamos completar
              la compra con esta tienda, al hacer esto 
              reduces el costo total de tu orden.
            </Text>
          </Dialog.Content>
          <Dialog.Actions style ={{
            margin: 0,
            alignContent: 'center',
            justifyContent: 'center'
          }}>
            <Col pb={24} justify="center">
              <Button 
                type="tertiary"
                onPress={() => {
                  cart.empty()
                }}
              >
                Vaciar carrito
              </Button>
              <Hr/>
              <Button 
                onPress={() => {
                  navigation.navigate(
                    URLS.product,
                    {
                      sellers: currentStoreID
                    }
                  );
                  cart.restore()
                }}
                type="tertiary"
                color = {Colors.primary}
              >
                Ver mas productos de {currentStore}
              </Button>
            </Col>
          </Dialog.Actions>
        </Dialog>
      </Portal>
  )
}
