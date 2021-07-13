import React from "react";
import { ScrollView } from "react-native";
import { Images } from "@/assets";
import { DataTable } from "react-native-paper";
import { DateTime } from "luxon";
import { useAuth, useProducts, useSellers, useCart } from "@/hooks";
import { nameStore, mapStatusToText, mapStatusToTone, lighten } from "@/utils";
import { Colors } from "@/theme";

import {
  BrandLogo,
  Button,
  Col,
  Input,
  Row,
  Screen,
  Spacing,
  Title,
  Header,
  HeaderContent,
  Text,
  Touchable,
  Box,
  Avatar,
  Image,
  Icon,
  Subtitle,
} from "@/components";
const StatusPill = ({ children, tone, color }) => {
  return (
    <Box
      roundness={2}
      bg={lighten(Colors[tone] || color, 42.5)}
      flex={0}
      w="auto"
      direction="row"
      pb={2}
      paddingHorizontal={5}
      align="center"
      justify="center"
    >
      <Text color={Colors[tone] || color}>{children}</Text>
    </Box>
  );
};
const DetailsHistoryView = ({ item, categories, ...props }) => {
  const {
    createdAt,
    total,
    profile_id,
    status,
    reference,
    orderProducts,
    method,
  } = props.route.params;
  const sellers = useSellers();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header
        title={DateTime.fromISO(createdAt).toLocaleString(DateTime.DATE_FULL)}
        {...props}
      />
      <Box p={10} roundness={20} w={"100%"}>
        <Spacing top={20} />
        <Row self="center">
          <Col>
            <Avatar
              size={100}
              name={nameStore(sellers.all, profile_id).profile.name_store}
            />
          </Col>
        </Row>
        <Spacing top={22} />
        <Row p={10} self="center">
          <Title fontSize={24} center>
            Usted ha pagado {total} $ a{" "}
            {nameStore(sellers.all, profile_id).profile.name_store}
          </Title>
        </Row>
        <Subtitle fontSize={14} center>
          Metodo de pago: {method}
        </Subtitle>
        <Spacing top={10} />
        <Col w={"auto"} center>
        <StatusPill tone={mapStatusToTone(status)}>
          {mapStatusToText(status)}
        </StatusPill>
        </Col>
        
        <Spacing top={30} />
        <DataTable>
          <DataTable.Header>
            <DataTable>
              <Title bold center>
                Detalles de la compra
              </Title>
            </DataTable>
          </DataTable.Header>
          {orderProducts.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.products.name}</DataTable.Cell>
              <DataTable.Title numeric>{item.quantity}</DataTable.Title>
              <DataTable.Title numeric>{item.price} $</DataTable.Title>
            </DataTable.Row>
          ))}
          <DataTable.Header>
            <DataTable.Title>Importe</DataTable.Title>
            <DataTable.Title numeric>{total} $</DataTable.Title>
          </DataTable.Header>
          <DataTable.Header>
            <DataTable.Title>Envío</DataTable.Title>
            <DataTable.Title numeric>0 $</DataTable.Title>
          </DataTable.Header>
          <DataTable.Header>
            <DataTable.Title>Total de la compra</DataTable.Title>
            <DataTable.Title numeric>{total} $</DataTable.Title>
          </DataTable.Header>
          <DataTable.Header>
            <DataTable.Cell>Total</DataTable.Cell>
            <DataTable.Cell numeric>{total} $</DataTable.Cell>
          </DataTable.Header>
        </DataTable>
        <Spacing top={20} />
        <DataTable>
          <DataTable.Header>
            <DataTable>
              <Title bold center>
                Contacto
              </Title>
            </DataTable>
          </DataTable.Header>
          <DataTable.Header>
            <DataTable.Cell>
              {nameStore(sellers.all, profile_id).profile.email}
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Icon
                provider="material-icons"
                icon="attach-email"
                fontSize={25}
              />
            </DataTable.Cell>
          </DataTable.Header>
          <DataTable.Header>
            <DataTable.Cell>ID. de Transaccion</DataTable.Cell>
            <DataTable.Cell numeric>{reference}</DataTable.Cell>
          </DataTable.Header>
        </DataTable>
      </Box>
    </ScrollView>
  );
};
export default DetailsHistoryView;
