import React, { useContext } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../src/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Account({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  if (!user) {
    navigation.navigate("Login");
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@user");
      const u = await AsyncStorage.getItem("@user");
      console.log(u);
      setUser(null);
    } catch (e) {
      // saving error
    }
  };

  const deleteAccount = async () => {
    console.log("https://local-marks.com/api/v1/account_deactivate/" +
    user.id +
    "?api_token=" +
    user.api_token);
    try {
      axios
        .get(
          "https://local-marks.com/api/v1/account_deactivate/" +
            user.id +
            "?api_token=" +
            user.api_token,
          {
            headers: {
              "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.status == "success") {
            AsyncStorage.removeItem("@user");
            const u = AsyncStorage.getItem("@user");
            console.log(u);
            setUser(null);
          } else {
            console.log(res.data);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView>
      <Header navigation={navigation} />

      {user && (
        <View
          style={{
            backgroundColor: "#fff",
            padding: 10,
            margin: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="account-circle" size={32} />
          </View>
          <View>
            <Text style={{ fontWeight: "800", fontSize: 16 }}>
              {user.f_name} {user.l_name}
            </Text>
            <Text>{user.email}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("MyOrders")}
        style={{
          backgroundColor: "#fff",
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "800" }}>Order History</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={16}
          style={{ fontWeight: "800" }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => navigation.navigate("MyPlans")}
      >
        <Text style={{ fontWeight: "800" }}>My Plans</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={16}
          style={{ fontWeight: "800" }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => navigation.navigate("MyBookings")}
      >
        <Text style={{ fontWeight: "800" }}>My Bookings</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={16}
          style={{ fontWeight: "800" }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => navigation.navigate("ShippingScreen")}
      >
        <Text style={{ fontWeight: "800" }}>Address</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={16}
          style={{ fontWeight: "800" }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => logout()}
        style={{
          backgroundColor: "#fff",
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "800" }}>Logout</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={16}
          style={{ fontWeight: "800" }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => deleteAccount()}
        style={{
          backgroundColor: "#fff",
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "800", color: "red" }}>
          Delete My Account
        </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={16}
          style={{ fontWeight: "800" }}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}
