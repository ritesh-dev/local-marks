import React from 'react'
import { Image, Platform, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default function Header({navigation}) {
  return (
    <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: Platform.OS === "android" ? getStatusBarHeight() : 20,
          backgroundColor: '#fff'
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            style={{ padding: 10 }}
            />
        </TouchableOpacity>
        <Image
          source={require("../assets/icon.png")}
          style={{ height: 70, width: 100 }}
          resizeMode="contain"
        />
        <View></View>
      </View>
  )
}
