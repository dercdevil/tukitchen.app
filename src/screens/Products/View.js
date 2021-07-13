import React, { useState, useEffect, useCallback, useRef, Fragment } from "react";
import {
  SafeAreaView,
  FlatList,
  Animated,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { Colors } from "@/theme";
import { URLS } from "@/constants";
import { Checkbox } from "react-native-paper";
import { TimePickerModal } from 'react-native-paper-dates';
import {
  Header,
  Box,
  Text,
  CategoryItems,
  ProductCard,
  EmptyState,
  Icon,
  Row,
  Modal,
  Search,
  Pill,
  Col,
  Button,
  Touchable,
  BottomSheetModal,
  Title,
  Subtitle,
  Spacing,
  SuggestModal,
  IconButton,
} from "@/components";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";

import Carousel from 'react-native-snap-carousel';
import { DateTime } from "luxon";

import moment from 'moment'
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es')

const sliderWidth = Dimensions.get("window").width;
const itemWidth = sliderWidth - 100;

const days = [
  "Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"
]

const ProductView = ({
  products,
  categories,
  cart,
  pagination,
  sellers,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  ...props
}) => {
  const { navigation } = props;
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(products.all);
  }, [products.all]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = products.all.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(products.all);
      setSearch(text);
    }
  };

  const sheetRef = useRef(null);
  const filtersModal = useRef(null);

  const [scrollYValue, setScrollYValue] = useState(new Animated.Value(0));

  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      new Animated.Value(0)
    ),
    0,
    50
  );

  return (
    <Modal sheetRef={sheetRef} filters={filters} swipeLarge={450}>
      <Header {...props} />
      <SafeAreaView style={{ flex: 1 }}>
        <Search
          clampedScroll={clampedScroll}
          searchFilterFunction={searchFilterFunction}
          search={products.filters.word}
          sheetRef={filtersModal}
          onChangeText={(value) => products.filterBy({ word: value })}
          onClear={() => products.filterBy({ word: "" })}
        />
        <Col flex={1}>
          <FlatList
            ListEmptyComponent={
              <EmptyState
                when={true}
                description="Upss parece que no se encuentra disponible el producto."
              />
            }
            showsVerticalScrollIndicator={false}
            data={filteredDataSource}
            contentContainerStyle={{
              justifyContent: "space-between",
            }}
            onEndReached={(info) => {
              if(products.hasNextPage && !products.isFetchingNextPage){
                products.fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.15}
            renderItem={({ item }) => (
              <ProductCard.Overlap
                item={item}
                onPress={() => navigation.navigate(URLS.details, item)}
                onAdd={() => cart.add(item)}
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            extraData={selectedId}
            ListHeaderComponent={
              <>
                {search ? null : (
                    <>
                    <Spacing top={50} />
                    <Carousel
                      lockScrollWhileSnapping
                      activeSlideOffset={30}
                      swipeThreshold={30}
                      lockScrollTimeoutDuration = {200}
                      useScrollView
                      enableMomentum
                      data={categories.all}
                      renderItem={({ item }) => (
                        <CategoryItems
                          item={item}
                          onPress={(category) =>
                            products.filterBy({ category })
                          }
                        />
                      )}
                      sliderWidth={sliderWidth}
                      itemWidth={itemWidth}
                    />
                    <Spacing top={25} />
                    </>
                )}
                <Row paddingHorizontal={28}>
                  {!!products.filters.category && (
                    <>
                      <Pill style={{ width: 300 }} color={Colors.secondary}>
                        categoria actual: {products.filters.category?.name}
                      </Pill>
                      <IconButton
                        onPressed={() => {
                          products.filterBy({ category: "" });
                        }}
                        color={Colors.primary}
                        icon="delete"
                        fontSize={18}
                      />
                    </>
                  )}
                </Row>
              </>
            }
            ListFooterComponent={
              <Box flex={0} mt = {25} mb={25} ml ={120} mr={120}>
                <Button  loading={products.isFetchingNextPage}  disabled = {!products.hasNextPage || products.isFetchingNextPage } onPress = {() => products.fetchNextPage()}>
                  Cargar mas
                </Button>
              </Box>
            }
          />
        </Col>
        <Box w="100%">

        </Box>
      </SafeAreaView>
      <BottomSheetModal height={400} ref={filtersModal}>
        <FiltersContent
          products={products}
          sellers={sellers}
          sheetRef={filtersModal}
        />
      </BottomSheetModal>
      <SuggestModal />
    </Modal>
  );
};

const FiltersContent = ({ products, sellers, sheetRef }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <Box bg="#fff" h="100%">
        {filters.map((item, index) => (
          <Collapse key={index}>
            <CollapseHeader>
              <Box w={"100%"} pl={10} pr={10} pt={5} mv={2} self="center">
                <Box p={10} roundness={20} w={"100%"} bg={"#f6f6f6"}>
                  <Row>
                    <Col mr={20} center>
                      <Icon
                        provider={item.providerIcon}
                        icon={item.icon}
                        color={Colors.primary}
                        fontSize={24}
                      />
                    </Col>
                    <Col w={"auto"}>
                      <Title bold fontSize={18}>
                        {item.title}
                      </Title>
                      <Subtitle fontSize={12}> {item.description}</Subtitle>
                    </Col>
                  </Row>
                </Box>
              </Box>
            </CollapseHeader>
            <CollapseBody>
              <item.content products={products} sellers={sellers} />
            </CollapseBody>
          </Collapse>
        ))}
        <Touchable
          onPress={() => sheetRef.current.snapTo(1)}
          w={"100%"}
          pl={10}
          pr={10}
          pt={5}
          mv={2}
          self="center"
        >
          <Box p={10} roundness={20} w={"100%"} bg={"#f6f6f6"}>
            <Row>
              <Row>
                <Col mr={20} center>
                  <Icon
                    provider="material-icons"
                    icon="close"
                    color={Colors.primary}
                    fontSize={24}
                  />
                </Col>
                <Col w={"auto"}>
                  <Title bold fontSize={18}>
                    Cerrar
                  </Title>
                </Col>
              </Row>
            </Row>
          </Box>
        </Touchable>
      </Box>
    </ScrollView>
  );
};

const filters = [
  {
    title: "Rango de precios",
    description: "Los precios mas altos o bajos que estan disponibles",
    icon: "price-tag",
    providerIcon: "entypo",
    content: ({ products }) => {
      return (
        <Box p={15} mb={15}>
          <Row>
            <Box flex={1} mr={10} style={{
              borderBottomWidth: 1,
              borderBottomColor: "red"
            }}>
              <Col>
                <Subtitle fontSize={12} mb={8}>
                  {" "}
                  Minimo{" "}
                </Subtitle>
                <TextInput
                  placeholder="0"
                  keyboardType="number-pad"
                  onChangeText={(text) => products.filterBy({ minPrice: text })}
                  value={products.filters.minPrice}
                />
              </Col>
            </Box>
            <Box flex={1} ml={10} style={{
              borderBottomWidth: 1,
              borderBottomColor: "red"
            }}>
              <Col>
                <Subtitle fontSize={12} mb={8}>
                  {" "}
                  Maximo{" "}
                </Subtitle>
                <TextInput
                  placeholder="100"
                  onChangeText={(text) => products.filterBy({ maxPrice: text })}
                  keyboardType="number-pad"
                  value={products.filters.maxPrice}
                  defaultValue={"∞"}
                />
              </Col>
            </Box>
          </Row>
        </Box>
      );
    },
  },
  {
    title: "Tienda",
    description: "Pide comida en la tienda de tu preferencia",
    icon: "store",
    providerIcon: "material-icons",
    content: ({ sellers, products }) => {
      return (
        <Box p={15}>
          {sellers.all.map((seller) => (
            <Row p={5} align="center" key={seller.id}>
              <Checkbox
                status={
                  products.filters.sellers.includes(seller.profile.id)
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => {
                  products.filterBy({ seller: seller.profile.id });
                }}
              />
              <Text>{seller.profile.name_store}</Text>
            </Row>
          ))}
        </Box>
      );
    }
  },
  {
    title: "Diariamente",
    description: "Busca comida el dia de tu preferencia",
    icon: "store",
    providerIcon: "material-icons",
    content: ({ sellers, products }) => {

      const [ d , setD ] = useState({});

      useEffect( () => {

        let now = moment();
        let filterDays = {};

        for( let d = 0 ; d < 7 ; d++ ){
          let currentDay = now.format("ddd D MMM YYYY");
          let dayOfWeek = now.format("dddd");
          filterDays[dayOfWeek.toLowerCase()] = currentDay;
          now = moment().add(d + 1,'days');
        }
        setD(filterDays)

      } , [] )

      return (
        <Col>
          <Box p={15}>
            {days.map( day => (
              <Row p={1} align="center" key={day}>
                <Checkbox.Item
                  onPress = {() => products.filterBy({ days: [day.toUpperCase()] })}
                  status={products.filters.days.includes(day.toUpperCase()) ? "checked" : "unchecked" }
                />
                <Text>
                  {d[day.toLowerCase()]}
                </Text>
              </Row>
            ))}
          </Box>
          <Box width="100%" paddingHorizontal = {28} >
            <Row width="100%" justify="space-between">
              <DatePicker
                label = {`Desde ${products.filters.time_init ? `${products.filters.time_init}` : ""}`}
                onChange = {({hours,minutes}) => {
                  products.filterBy({
                    time_init: `${hours}:${minutes}`
                  })
                }}
              />
              <DatePicker
                label = {`Hasta ${products.filters.time_final ? `${products.filters.time_final}` : ""}`}
                onChange = {({hours,minutes}) => {
                  products.filterBy({
                    time_final: `${hours}:${minutes}`
                  })
                }}
              /> 
            </Row>
          </Box>
        </Col>
      );
    }
  }
];

export default ProductView;

const DatePicker = ({
  label,
  children,
  onChange
}) => {

  const [open,setOpen] = useState(false);
  const [date,setDate] = useState({});

  const onDismiss = React.useCallback(() => {
    setOpen(false)
  }, [setOpen])
  const onConfirm = React.useCallback(
    (date) => {
      setOpen(false);
      setDate(date)
      typeof onChange === "function" && 
        onChange(date);
    },
    [setOpen]
  );

  return (
    <Fragment>
      <Button onPress = {() => setOpen(true)}>
        {typeof children === "function" ? children(date) : label }
      </Button>
      <TimePickerModal
        visible={open}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        label="Seleccione hora" // optional, default 'Select time'
        cancelLabel="Cancelar" // optional, default: 'Cancel'
        confirmLabel="Ok" // optional, default: 'Ok'
        animationType="fade" // optional, default is 'none'
        locale="ln" // optional, default is automically detected by your system
      />
    </Fragment>
  )
}