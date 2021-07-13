import React, {useState} from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { DEFAULT_API_URL } from "@/constants";
import {
  Text,
  Image,
} from "@/components";

export const SliderItem = ({ gallery }) => {
  const { width } = Dimensions.get("window");
  const height = width + 26;
  const [active, setActive] = useState(0);
  const change = ({nativeEvent}) =>{
      const slide = Math.ceil( nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if(slide !== active){
          setActive(slide)
      }
  }
  return (
    <View style={{ width, height }}>
      <ScrollView  pagingEnabled showsHorizontalScrollIndicator={false} horizontal onScroll={change} style={{ width, height }}>
        {gallery.map((image, index) => (
          <Image
            key={index}
            source={{ uri: DEFAULT_API_URL+image.img_product }}
            style={{ width, height, resizeMode: "cover" }}
          />
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 25,
          alignSelf: "center",
        }}
      >
        {gallery.map((i, k) => (
          <Text key={k} color={k == active ? "#fff" : "#888"} m={3}>
            ⬤
          </Text>
        ))}
      </View>
    </View>
  );
};
