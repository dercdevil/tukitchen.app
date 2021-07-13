import React from "react";
import {
    Text,
    Box,
    Row,
    Col,
    Title,
    Spacing,
    Icon,
    Image,
    Button,
    Touchable,
    Avatar
} from "@/components";
import { Colors } from "@/theme";
import { Images } from "@/assets";
import { COPY } from "@/copy";
import { DEFAULT_API_URL } from "@/constants";
import { withApiURL, humanizeMinutes, withCoin } from "@/utils";


export const ProductCardOverlap = ({
    item : product,
    onPress,
    onAdd
  }) => {

    return (
        
            <Col
                p={15}
                justify = "center"
                flex= {1}
                position="relative"
            >
                <Touchable onPress={onPress}>
                <Box 
                    bg="#fff"
                    position="relative"
                    zIndex={20}
                    h={150}
                    w={150}
                    style={{
                    borderRadius: 75,
                    shadowColor: Colors.primary,
                    elevation: 1
                    }}
                    mb={-60}
                    flex={1}
                    self="center"
                >
                    <Image
                        source={{uri:DEFAULT_API_URL+product.gallery[0]?.img_product}}
                        h={150}
                        w="auto" 
                        roundness={50}
                        style = {{
                            resizeMode: 'contain'
                        }}
                    />
                </Box>
                <Col 
                    p = {8}
                    pt={70}
                    paddingHorizontal={25}
                    pb={25}
                    roundness={16}
                    position="relative"
                    bw={1}
                    bc={Colors.secondary}
                >
                    <Row justify = "space-between">
                        <Title fontSize = {14} bold>
                            {product.name}
                        </Title>
                        <Text>
                            <Icon 
                                color = {Colors.success}  
                                icon = "stopwatch" 
                                provider = "entypo" 
                                fontSize = {20} mr = {4} 
                            /> 
                            <Text color = {Colors.success} >
                                {humanizeMinutes(product.time_for_preparation)}
                            </Text>
                        </Text>
                    </Row>
                    <Spacing top = {8}/>
                    <Row align = "center" justify="space-between" >
                        <Row>
                            <Avatar 
                                size = {24} 
                                circle 
                                source = {withApiURL(product.profile?.img_profile)} 
                            />
                            <Text ml={10}>
                                Por: {product.profile?.name_store}
                            </Text>
                        </Row>
                        <Text ml={10} color={Colors.muted}>
                            {withCoin(product.price)}
                        </Text>
                    </Row>
                    <Spacing top = {8}/>
                    <Button
                        onPress={() => onAdd(product)}
                        flex = {0}
                        width = "auto"
                        paddingHorizontal={15}
                        self="center"
                        icon={            
                            ()=>(
                                <Icon 
                                    fontSize={18}
                                    color ="#fff" 
                                    icon="shoppingcart" 
                                    provider="ant-design"
                                />
                            )
                        }
                    >
                        {COPY["add.to.cart"]}
                    </Button>
                </Col>
                </Touchable>
            </Col>
    )
}