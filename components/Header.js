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
          source={require("../assets/hicon.webp")}
          style={{ height: 60, width: 100 }}
          resizeMode="contain"
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
            <MaterialCommunityIcons
            name="magnify"
            size={24}
            style={{ padding: 10 }}
            />
          </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
            <MaterialCommunityIcons
            name="home"
            size={24}
            style={{ padding: 10 }}
            />
        </TouchableOpacity>
        </View>
      </View>
  )
}
