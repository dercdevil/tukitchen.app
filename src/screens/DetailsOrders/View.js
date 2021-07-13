import React from "react";
import { ScrollView } from "react-native";
import { Images } from "@/assets";
import { DataTable } from "react-native-paper";

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

const DetailsOrdersView = ({ item, categories, ...props }) => {
  const { name, product, price, date, id } = props.route.params;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header title={date} {...props} />
      <Box p={10} roundness={20} w={"100%"}>
        <Spacing top={20} />
        <Row self="center">
          <Col>
            <Avatar size={100} name={name} />
          </Col>
        </Row>
        <Spacing top={22} />
        <Row self="center">
          <Title fontSize={18} center>
            Usted ha pagado {price} $ a {name}
          </Title>
        </Row>
        <Spacing top={30} />
        <DataTable>
          <DataTable.Header>
            <DataTable>
              <Title bold center>
                Detalles de la compra
              </Title>
            </DataTable>
          </DataTable.Header>
          {/* <DataTable.Header>
            <DataTable.Cell >Producto</DataTable.Cell >
            <DataTable.Cell  numeric>Monto</DataTable.Cell >
          </DataTable.Header> */}

          {product.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Title numeric>{item.amount} $</DataTable.Title>
            </DataTable.Row>
          ))}
          <DataTable.Header>
            <DataTable.Title>Importe</DataTable.Title>
            <DataTable.Title numeric>{price} $</DataTable.Title>
          </DataTable.Header>
          <DataTable.Header>
            <DataTable.Title>Envío</DataTable.Title>
            <DataTable.Title numeric>0 $</DataTable.Title>
          </DataTable.Header>
          <DataTable.Header>
            <DataTable.Title>Total de la compra</DataTable.Title>
            <DataTable.Title numeric>{price} $</DataTable.Title>
          </DataTable.Header>
          <DataTable.Header>
            <DataTable.Cell>Total</DataTable.Cell>
            <DataTable.Cell numeric>{price} $</DataTable.Cell>
          </DataTable.Header>
        </DataTable>
        <Spacing top={20} />
        <DataTable>
          <DataTable.Header>
            <DataTable>
              <Title bold center>Transportista Asignado</Title>
            </DataTable>
          </DataTable.Header>
          <DataTable.Header>
            <DataTable.Cell> Nombre</DataTable.Cell>
            <DataTable.Cell numeric>Carlos Montesinos</DataTable.Cell>
          </DataTable.Header>
           <DataTable.Header>
            <DataTable.Cell> Telefono</DataTable.Cell>
            <DataTable.Cell numeric>+569123456789</DataTable.Cell>
          </DataTable.Header>
        </DataTable>
        <Spacing top={20} />
        <DataTable>
          <DataTable.Header>
            <DataTable>
              <Title bold center>Contacto</Title>
            </DataTable>
          </DataTable.Header>
          <DataTable.Header>
            <DataTable.Cell>correo@prueba.com</DataTable.Cell>
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
            <DataTable.Cell numeric>{id}</DataTable.Cell>
          </DataTable.Header>
        </DataTable>
      </Box>
    </ScrollView>
  );
};
export default DetailsOrdersView;
