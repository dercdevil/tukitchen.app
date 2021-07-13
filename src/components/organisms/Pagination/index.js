import React, { useRef } from "react";
import {
  ScrollView,
} from "react-native";
import { Colors } from "@/theme";
import { lighten } from "@/utils";
import {
  Box,
  Text,
  Icon,
  Row,
  Button,
  TouchableOpacity,
  BottomSheetModal,
} from "@/components";

export const Pagination = ({
    pages = 1,
    currentPage,
    goto: goToPage,
    nextPage,
    previousPage,
    canGoNext,
    canGoBack,
  }) => {
    const sheet = useRef();
    return (
      <>
        <Row mb={10} paddingHorizontal={25} paddingVertical={15}>
          <Box flex={1}>
            <Button
              disabled={!canGoBack}
              onPress={() => {
                previousPage();
              }}
              type="secondary"
            >
              anterior
            </Button>
          </Box>
          <Box paddingHorizontal={10} flex={1}>
            <TouchableOpacity
              bw={1}
              bc={Colors.secondary}
              h={38}
              p={10}
              pt={2}
              pb={2}
              roundness={50}
              direction="row"
              align="center"
              justify="space-between"
              onPress={() => {
                sheet.current.snapTo(0);
              }}
            >
              <Text>{currentPage}</Text>
              <Icon
                color={Colors.secondary}
                fontSize={18}
                icon="downcircle"
                provider="ant-design"
              />
            </TouchableOpacity>
          </Box>
          <Box flex={1}>
            <Button
              disabled={!canGoNext}
              onPress={() => {
                nextPage();
              }}
              type="secondary"
            >
              siguiente
            </Button>
          </Box>
        </Row>
        <BottomSheetModal ref={sheet}>
          <Box paddingVertical={15} flex={1} bg="#fff" h={400}>
            <Row
              justify="space-between"
              align="center"
              bg={lighten(Colors.secondary, 25)}
              p={15}
            >
              <Text color={Colors.secondary}>Seleccione pagina</Text>
              <Button
                type="secondary"
                bc={Colors.secondary}
                color={Colors.secondary}
                onPress={() => {
                  sheet.current.snapTo(1);
                }}
              >
                Listo
              </Button>
            </Row>
            <ScrollView horizontal={true}>
              <Row p={20} h="100%" align="center" justify="center">
                {Array.from({ length: pages }, (_, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      goToPage(index + 1);
                    }}
                  >
                    <Box
                      size={70}
                      roundness={35}
                      ml={20}
                      justify="center"
                      align="center"
                      bg={currentPage === index + 1 ? Colors.secondary : "#fff"}
                      bc={Colors.secondary}
                      bw={1}
                    >
                      <Text
                        fontSize={18}
                        color={
                          currentPage === index + 1 ? "#fff" : Colors.secondary
                        }
                      >
                        {index + 1}
                      </Text>
                    </Box>
                  </TouchableOpacity>
                ))}
              </Row>
            </ScrollView>
          </Box>
        </BottomSheetModal>
      </>
    );
};