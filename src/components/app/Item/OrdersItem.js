import React from "react";
import { COPY } from "@/copy";
import { DEFAULT_API_URL } from "@/constants";
import { DateTime } from "luxon";
import { useSellers} from "@/hooks";
import { nameStore } from "@/utils";
import { Colors } from "@/theme";
import {
  Button,
  Col,
  Row,
  Spacing,
  Title,
  Text,
  Touchable,
  Box,
  Avatar,
  Icon,
  StatusPill,
  Subtitle,
  Pill,
} from "@/components";

const boxShadow = `12px 12px 16px 0 rgba(0, 0, 0, 0.12), -8px -8px 12px 0 rgba(208, 208, 208, 0.30)`;
const statusToToneMap = {
  "IN-PROGRESS": {
    color: "warning",
    text: "Preparando pedido",
  },
  CREATED: {
    color: "#f15a22",
    text: "Pedido preparado",
  },
  "IN-DELIVERY": {
    color: "success",
    text: "En via para entregar",
  },
  RECEIVED: {
    color: "success",
    text: "Pedido entregado",
  },
};
const mapStatusToTone = (status) => statusToToneMap[status]?.color;
const mapStatusToText = (status) => statusToToneMap[status]?.text;
export const OrdersItem = ({ item, onPress }) => {
  const sellers = useSellers();
  return (
    <Touchable
      onPress={onPress}
      w={"100%"}
      pl={10}
      pr={10}
      pt={5}
      mv={2}
      self="center"
    >
      <Box
        p={10}
        roundness={20}
        w={"100%"}
        bg={"#f6f6f6"}
        boxShadow={boxShadow}
      >
        <Row justify="space-between" align="center">
          <Row>
            <Col center ml={5}>
              <Avatar
                size={40}
                source={
                  item.profile
                    ? DEFAULT_API_URL + item.profile?.img_profile
                    : null
                }
                name={nameStore(sellers.all, item.profile_id).profile.name_store}
              />
            </Col>
            <Col pl={25}>
              <StatusPill
                tone={mapStatusToTone(item.stage)}
                color={mapStatusToTone(item.stage)}
              >
                {mapStatusToText(item.stage)}
              </StatusPill>
              <Spacing top = {4}/>
              <Title fontSize={14} bold>
                {nameStore(sellers.all, item.profile_id).profile.name_store}
              </Title>
              <Spacing top = {4}/>
              <Row>
                <Text fontSize={10} color = {Colors.gray}>
                  {DateTime.fromISO(item.createdAt).toLocaleString(DateTime.DATE_FULL)}
                </Text>
                <Text ml={10} bold fontSize={10}>
                  {item.total} $
                </Text>
              </Row>
            </Col>
          </Row>
          {item.status === "IN-PROGRESSS" ? 
            <Button 
              type="secondary" 
              onPress = {onUpdate}
              loading = {loading}
              justify="center"
            >
              <Text>
                { loading ? "" : "Actualizar" }
              </Text>
            </Button> : null
          }
        </Row>
      </Box>
    </Touchable>
  );
};
