import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import {
  Text,
  Header,
  Box,
  Row,
  Tabbar,
  SuggestModal
} from "@/components";
import { COPY } from "@/copy";
import { Colors } from "@/theme";
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { TabView, SceneMap } from 'react-native-tab-view';

export const Home = ({
  products,
  sellers,
  carousel,
  pagination,
  tabs,
  cart,
  ...props
}) => {

  return (
    <View style={styles.container}>
      <Header {...props} />
      {!!carousel.data.length && (
        <Fragment>
          <Box h={"auto"} mb = {20} mt = {20}>
            <Text ml={15} bold>
              {COPY["featured.products"]}
            </Text>
          </Box>
          <Box
            position = "relative"
            h = {carousel.slideHeight + 10}
          >
            <Box position = "absolute" leff = {0} zIndex={100} h="100%" justify = "center" >
              <Pagination {...pagination} />
            </Box>
            <Row flex = {1}>
              <Carousel
                {...carousel}
              />
            </Row>
          </Box>
        </Fragment>
      )}
      <TabView
        renderScene = {SceneMap(tabs.scene)}
        renderTabBar = {(props) => (
          <Tabbar {...props}  updateTabIndex = {tabs.setIndex} />
        )}
        navigationState = {{
          index: tabs.index,
          routes: tabs.tabs
        }}
        onIndexChange = {index => tabs.setIndex(index)}
      />
      <SuggestModal/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "#fff",
    borderBottomColor: "#f4f4f4",
    borderBottomWidth: 1,
  },
  tabContainer: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    padding: 15,
    color: "#9e9e9e",
    fontSize: 18,
    fontWeight: "500",
  },
  separator: {
    height: 0.5,
    width: "96%",
    alignSelf: "flex-end",
    backgroundColor: "#eaeaea",
  },
  sectionHeaderContainer: {
    height: 10,
    backgroundColor: "#f6f6f6",
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
    borderBottomColor: "#f4f4f4",
    borderBottomWidth: 1,
  },
  sectionHeaderText: {
    color: "#010101",
    backgroundColor: "#fff",
    fontSize: 23,
    fontWeight: "bold",
    paddingTop: 25,
    paddingBottom: 5,
    paddingHorizontal: 15,
  },
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  itemTitle: {
    flex: 1,
    fontSize: 20,
    color: "#131313",
  },
  itemPrice: {
    fontSize: 18,
    color: "#131313",
  },
  itemDescription: {
    marginTop: 10,
    color: "#b6b6b6",
    fontSize: 16,
  },
  itemRow: {
    flexDirection: "row",
  },
});