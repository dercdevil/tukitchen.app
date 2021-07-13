import React from "react";
import { ScrollView } from "react-native";
import {
    TouchableOpacity as Touchable,
    Box,
    Text
} from "@/components";
import {Colors} from "@/theme";

export const Tabbar = ({
  navigationState,
  updateTabIndex
}) => {

  const activeStyles = {
    bc: Colors.secondary,
    style: {
      borderBottomWidth: 1
    }
  }
  
  return(
    <Box>
      <ScrollView
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {navigationState.routes.map( (tab,index) => {
          return (        
            <Touchable key={index} onPress = {() => {
                updateTabIndex(index)
              }}
            >
              <Box 
                p = {15} 
                {...( navigationState.index === index 
                  ? activeStyles
                  : {} 
                )}
              >
                <Text>
                  {tab.title}
                </Text>
              </Box>
            </Touchable>
          )
        })}
      </ScrollView>
    </Box>
  )
}