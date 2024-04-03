import React, { useContext, useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../src/AuthProvider";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";

export default function Login({navigation}) {

  const {user, setUser} = useContext(AuthContext)

  const [username, setusername] = useState(null)
  const [password, setpassword] = useState(null)
  const [loading, setloading] = useState(true)

  const isFocused = useIsFocused()


  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@user')
      if(value !== null) {
        setUser(JSON.parse(value))
        navigation.navigate("Dashboard")
      }else{
        setloading(false)
      }
    } catch(e) {
      console.log(e);
    }
  }

  const storeUser = async (usr) => {
    try {
      setUser(usr)
      const jsonValue = JSON.stringify(usr)
      await AsyncStorage.setItem('@user', jsonValue)
      navigation.navigate("Dashboard")
    } catch (e) {
      console.log(e);
    }
  }

  const login = () => {
    axios.post("https://local-marks.com/api/v1/login", {
      "email": username,
      "password": password
    }, {
      headers: {
        "custom-token" : "295828be2ad95b95abcfe20ed09d4df8"
      }
    }).then((res) => {
      if(res.data.status == 'success'){
        storeUser(res.data.data[0])
      }else{
        alert(res.data.message)
      }
    })
  }

  useEffect(() => {
    getUser()
  }, [isFocused])
  

  
  if(loading){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: "#fff",
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
            <TextInput onChangeText={(e) => setusername(e)} style={{ padding: 5, backgroundColor: "#ddd", borderRadius: 5 }} placeholder="Enter Username" />
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
            <TextInput onChangeText={(e) => setpassword(e)} style={{ padding: 5, backgroundColor: "#ddd", borderRadius: 5 }} placeholder="Enter Password" secureTextEntry />
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
            <TouchableOpacity onPress={() => login()} style={{backgroundColor: '#000', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 5}}>
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
            <TouchableOpacity onPress={() => {navigation.navigate('Register')}} style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: '800'}}>New To Local Marks?</Text>
                <Text style={{fontWeight: '800', color: '#f22', marginLeft: 5}}>Join Now</Text>
            </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}
