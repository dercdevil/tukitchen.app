import React, {useState, useMemo} from "react";
import { Dimensions,FlatList } from "react-native";
import { useAuth, useProducts, useSellers, useCart } from "@/hooks";
import { useNavigation } from '@react-navigation/native';
import {
    Box,
    Text,
    Image,
    Spacing,
    IconButton,
    Touchable,
    ProductCard,
    Icon,
    Col
} from "@/components";
import { Colors } from "@/theme";
import { Images } from "@/assets";
import { withApiURL } from "@/utils";
import { URLS } from "@/constants";
import { DateTime, Settings } from "luxon";

const paddingHorizontal = 20
const sliderWidth =  Dimensions.get('window').width;
const itemWidth = 180 + paddingHorizontal * 2;
const itemHeight = 260;

Settings.defaultLocale = "es";

const esDays = {
    "MONDAY":"LUNES",
    "TUESDAY":"MARTES",
    "WEDNESDAY": "MIERCOLES",
    "THURSDAY": "JUEVES",
    "FRIDAY": "VIERNES",
    "SATURDAY": "SABADO",
    "SUNDAY": "DOMINGO"
}

const toEsLocaleDay = day => {
    return esDays[day]
}

const SceneStoreTab = ({ route : { key : seller_id , filters } }) => {

    const products = useProducts({filters});
    const cart = useCart();
    const navigation = useNavigation();

    //const { profile : {products,...restProfile} } = sellers.all.find( seller => seller.id === seller_id );

    return(
        <Col>
             <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor = {item => item.id.toString()}
                renderItem = {({item , ...rest}) => (
                    <Box mt = {15}>
                        <ProductCard.Overlap 
                            item={item}
                            onAdd = {(product) => cart.add(product)}
                            onPress={() => navigation.navigate(URLS.details, item)}
                            navigation={navigation}
                            {...rest} 
                        />
                    </Box>
                )}
                data={
                    //In order to cart to work esch product must cotain its profile insede the object
                    products.all
                }
            />
        </Col>
    )

}

export const Actions = ({navigation}) => {

    const [ activeSlide, setActiveSlide] = useState(0);
    const [ index , setIndex ] = useState(0)
    
    const { logInAsGuest } = useAuth();

    const products = useProducts();
    const sellers = useSellers();
    const cart = useCart();

    const onGuestButtonClick = () => {
        logInAsGuest();
    }

    const featuredProducts = products.getFeaturedProducts();

    const renderFeaturedProducts = ({item}) => {

        const hasImage = item.gallery.length;
        const image = hasImage
            ? withApiURL(item.gallery[0]?.img_product)
            : Images.productPlaceholder 
        const fileType = image.substring(image.lastIndexOf(".") + 1) || "";
        const source = hasImage ? { uri : image } : image;
        return (
            <Touchable key={item.id} onPress={()=>(navigation.navigate(URLS.details, item))}>
                <Box
                    paddingHorizontal = {paddingHorizontal}
                    w = {itemWidth}
                    h = {itemHeight} 
                >
                    <Box 
                        p = {15}
                        bg = {Colors.secondary}
                        roundness = {12}
                        position = "relative"
                        h = "100%"
                    >
                        <Image
                            h={150}
                            w = {130}
                            ml = {-40}
                            resizeMode = "contain"
                            source={source}
                            roundness={fileType !== "png" ? 18 : 0}
                        />
                        <Text color = "#fff">
                            {item.name}
                        </Text>
                        <Spacing top = {15}/>
                        <Touchable
                            onPress = {() => cart.add(item)}
                        >
                            <Box 
                                bg = {Colors.primary} 
                                mr = {-15}
                                paddingHorizontal = {15} 
                                style = {{
                                    borderTopLeftRadius: 8,
                                    borderBottomLeftRadius: 8
                                }}
                                flex={0}
                                direction="row"
                                justify="flex-end"
                                width="auto"
                                self="flex-end"
                                aling="center"
                            >
                                <Icon
                                    mr={8}
                                    fontSize={18}
                                    color="#fff"
                                    icon="shoppingcart" 
                                    provider="ant-design"
                                />
                                <Text 
                                    bold 
                                    color = "#fff"
                                >
                                    $ {item.price}
                                </Text>
                            </Box>
                        </Touchable>
                    </Box>
                </Box>
            </Touchable>
        );
    }

    const carousel = {
        data: featuredProducts,
        renderItem: renderFeaturedProducts,
        sliderWidth,
        itemWidth,
        slideHeight: itemHeight,
        onSnapToItem: (index) => setActiveSlide(index)
    }

    const pagination = {
        vertical: true,
        dotsLength: featuredProducts.length,
        activeDotIndex: activeSlide,
        containerStyle: {} ,
        dotStyle:{
            width: 15,
            height: 15,
            borderRadius: 7.5,
            marginVertical: 4,
            backgroundColor: Colors.secondary
        },
        inactiveDotStyle: {
            backgroundColor: Colors.muted
        },
        inactiveDotOpacity: 0.5,
        inactiveDotScale: 0.6
    }

    const tabs = useMemo(() => {

        /*const scene = sellers.all.reduce( (_scene,currentSeller) => {
            return {
                ..._scene,
                [currentSeller.id]: SceneStoreTab
            }
        } , {});*/

        const scene = {
            1: SceneStoreTab,
            2: SceneStoreTab,
            3: SceneStoreTab,
        }

        const currentDay = DateTime
            .now()
            .setLocale("fr")
            .toFormat("cccc")
            .toUpperCase()

        //it send filters to the tab according to the products we want to fetch
        const tabs = [
            { 
                key: 1 , 
                title: "Actualmente disponible",
                filters: {
                    days: [toEsLocaleDay(currentDay)]
                }
            },
            { 
                key: 2 , 
                title: "Todos los productos" 
            }
        ]

        return {
            tabs,
            scene,
            index,
            setIndex
        }
    },[sellers])
    

    return { 
        onGuestButtonClick, 
        navigation,
        products,
        sellers,
        pagination,
        cart,
        carousel,
        tabs
    };

}