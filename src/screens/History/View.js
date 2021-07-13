import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { Button, Menu } from "react-native-paper";
import { Images } from "@/assets";
import { URLS } from "@/constants";
import { Colors } from "@/theme";
import { 
  Header, 
  Box, 
  HistoryItem, 
  Text, 
  Icon,
  Image,
  Spacing,
  Col,
  Title,
  EmptyState
} from "@/components";

const HistoryView = ({
  orders,
  updateOrder,
  orderBeingUpdated,
  ...props 
}) => {
  const { navigation } = props;
  return (
    <View style={{flex:1}}>
      <Header
        title={"Historial"}
      />
      <EmptyState
        when={!orders.all.length}
        description="No se han encontrado ordenes"
      >
        <FlatList
          ListHeaderComponent={
            <Col justify="center" align="center" paddingHorizontal = {25}>
              <Image
                source = {Images.historyHeader}
                w="100%"
                h={230}
                style={{
                  resizeMode: 'cover'
                }}
              />
              <Spacing top = {10}/>
              <Title bold fontSize={24}>
                HISTORIAL 
              </Title>
              <Text color={Colors.muted} fontSize={12} center>
                Revisa todas tus transacciones pasadas 
                (para ver tus ordenes en proceso ingresa al menu de ordenes)
              </Text>
              <Spacing top = {15}/>
            </Col>
          }
          showsVerticalScrollIndicator={false}
          data={orders.all}
          renderItem={({ item }) => (
            <HistoryItem
              item={item}
              loading={ orderBeingUpdated.id === item.id }
              onPress={() => navigation.navigate(URLS.detailsHistory, item)}
              onUpdate={() => {
                updateOrder(item)
              }}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </EmptyState>
    </View>
  );
};

export default HistoryView;
