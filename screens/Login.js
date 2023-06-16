import React from "react";
import {
    Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default function Login({navigation}) {
  return (
    <ScrollView>
      <View
        style={{
          alignItems: 'center'
        }}
      >
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            width: "100%",
            marginTop: Platform.OS === "android" ? getStatusBarHeight() : 20,
            padding: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>Skip</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Image
            source={require("../assets/icon.png")}
            style={{ width: 200, height: 300 }}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 5
          }}
        >
          <View style={{flex: 0.1}}>
            <MaterialCommunityIcons name="email" size={18} style={{alignItems: 'center', justifyContent: 'center'}} />
          </View>
          <View style={{flex: 0.9}}>
            <TextInput style={{ padding: 5, backgroundColor: "#ddd" }} placeholder="Enter Username" />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 5
          }}
        >
          <View style={{flex: 0.1}}>
            <MaterialCommunityIcons name="lock" size={18} style={{alignItems: 'center', justifyContent: 'center'}} />
          </View>
          <View style={{flex: 0.9}}>
            <TextInput style={{ padding: 5, backgroundColor: "#ddd" }} placeholder="Enter Password" secureTextEntry />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 5,
            width: '100%',
            marginTop: 20
          }}
        >
            <TouchableOpacity>
                <Text style={{fontWeight: '800'}}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginTop: 20
          }}
        >
            <TouchableOpacity style={{backgroundColor: '#000', paddingHorizontal: 30, paddingVertical: 10}}>
                <Text style={{color: '#fff', textTransform: 'uppercase', fontWeight: '800'}}>Login</Text>
            </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 5,
            width: '100%',
            marginTop: 20
          }}
        >
            <TouchableOpacity onPress={() => {navigation.navigate('Register')}}>
                <Text style={{fontWeight: '800'}}>Didn't have an account? Register Here.</Text>
            </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}
