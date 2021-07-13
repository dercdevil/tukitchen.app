import React from "react";
import { Header, OrdersItem, EmptyState, Col, Image, Title, Spacing, Text } from "@/components";
import { FlatList, View } from "react-native";
import { COPY } from "@/copy";
import { Images } from "@/assets";
import { Colors } from "@/theme";

const OrdersView = ({ orders }) => {
  return (
    <View style={{ flex: 1 }}>
      <Header
        title={COPY["orders"]}
      />
      <EmptyState
        when={!orders.all.length}
        description="No se han encontrado ordenes completadas"
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
                PEDIDOS
              </Title>
              <Text color={Colors.muted} fontSize={12} center>
                ¡Revisa el status de tus pedidos!
              </Text>
              <Spacing top = {15}/>
            </Col>
          }
          showsVerticalScrollIndicator={false}
          data={orders.all}
          renderItem={({ item }) => (
            <OrdersItem
              item={item}
              onPress={() => {}}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </EmptyState>
    </View>
  );
};

export default OrdersView;
