import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { States } from "../assets/States";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../src/AuthProvider";
import { useIsFocused } from "@react-navigation/native";
import Heading from "../components/Heading";

export default function ShippingScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  const [name, setname] = useState(user[0].f_name);
  const [email, setemail] = useState(user[0].email);
  const [mobile, setmobile] = useState(user[0].phone);
  const [state_id, setstate_id] = useState("");
  const [city, setcity] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [landmark, setlandmark] = useState("");

  const isFocused = useIsFocused();

  const getShipping = () => {
    axios
      .post(
        "https://local-marks.com/api/v1/get-prev-shipping-details?api_token=" +
          user[0].api_token,
        {
          headers: {
            "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
          },
        }
      )
      .then((res) => {
        if (res.data.status == "success") {
          setname(res.data.data[0].name)
          setemail(res.data.data[0].email)
          setmobile(res.data.data[0].mobile_no)
          setstate_id(parseInt(res.data.data[0].state_id))
          setcity(res.data.data[0].city)
          setaddress(res.data.data[0].address)
          setpincode(res.data.data[0].pincode)
          setlandmark(res.data.data[0].landmark)
        }
      });
  };

  const saveShipping = () => {
    axios
      .post(
        "https://local-marks.com/api/v1/save-shipping?api_token=" +
          user[0].api_token,
          {
            name: name,
            email: email,
            mobile_no: mobile,
            state_id: state_id,
            city: city,
            address: address,
            pincode: pincode,
            landmark: landmark
          },
        {
          headers: {
            "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
          },
        }
      )
      .then((res) => {
        if (res.data.status == "success") {
          console.log(res.data.data);
        }else{
            alert(res.data.message)
        }
      });
  }

  useEffect(() => {
    getShipping();
  }, [isFocused]);

  return (
    <ScrollView>
      <Header navigation={navigation} />

      <Heading title="Shipping Address" />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
      >
        <View style={{ flex: 0.1 }}>
          <MaterialCommunityIcons
            name="account"
            size={18}
            style={{ alignItems: "center", justifyContent: "center" }}
          />
        </View>
        <View style={{ flex: 0.9 }}>
          <TextInput
            style={{ padding: 5, backgroundColor: "#ddd" }}
            placeholder="Name"
            value={name}
            onChangeText={(e) => setname(e)}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
      >
        <View style={{ flex: 0.1 }}>
          <MaterialCommunityIcons
            name="email"
            size={18}
            style={{ alignItems: "center", justifyContent: "center" }}
          />
        </View>
        <View style={{ flex: 0.9 }}>
          <TextInput
            style={{ padding: 5, backgroundColor: "#ddd" }}
            placeholder="Email"
            value={email}
            onChangeText={(e) => setemail(e)}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
      >
        <View style={{ flex: 0.1 }}>
          <MaterialCommunityIcons
            name="phone"
            size={18}
            style={{ alignItems: "center", justifyContent: "center" }}
          />
        </View>
        <View style={{ flex: 0.9 }}>
          <TextInput
            style={{ padding: 5, backgroundColor: "#ddd" }}
            placeholder="Mobile"
            value={mobile}
            onChangeText={(e) => setmobile(e)}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
      >
        <View style={{ flex: 0.1 }}>
          <MaterialCommunityIcons
            name="globe-model"
            size={18}
            style={{ alignItems: "center", justifyContent: "center" }}
          />
        </View>
        <View style={{ flex: 0.9 }}>
          <Picker
            selectedValue={state_id}
            onValueChange={(itemValue) => {
              setstate_id(itemValue);
            }}
          >
            <Picker.Item label="Select State" value="" />
            {States &&
              States.map((el) => {
                return <Picker.Item label={el.name} value={el.id} />;
              })}
          </Picker>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
      >
        <View style={{ flex: 0.1 }}>
          <MaterialCommunityIcons
            name="pin"
            size={18}
            style={{ alignItems: "center", justifyContent: "center" }}
          />
        </View>
        <View style={{ flex: 0.9 }}>
          <TextInput
            style={{ padding: 5, backgroundColor: "#ddd" }}
            placeholder="City"
            value={city}
            onChangeText={(e) => setcity(e)}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
      >
        <View style={{ flex: 0.1 }}>
          <MaterialCommunityIcons
            name="pin"
            size={18}
            style={{ alignItems: "center", justifyContent: "center" }}
          />
        </View>
        <View style={{ flex: 0.9 }}>
          <TextInput
            style={{ padding: 5, backgroundColor: "#ddd" }}
            placeholder="Address"
            value={address}
            onChangeText={(e) => setaddress(e)}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
      >
        <View style={{ flex: 0.1 }}>
          <MaterialCommunityIcons
            name="pin"
            size={18}
            style={{ alignItems: "center", justifyContent: "center" }}
          />
        </View>
        <View style={{ flex: 0.9 }}>
          <TextInput
            style={{ padding: 5, backgroundColor: "#ddd" }}
            placeholder="Pincode"
            value={pincode}
            onChangeText={(e) => setpincode(e)}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
      >
        <View style={{ flex: 0.1 }}>
          <MaterialCommunityIcons
            name="pin"
            size={18}
            style={{ alignItems: "center", justifyContent: "center" }}
          />
        </View>
        <View style={{ flex: 0.9 }}>
          <TextInput
            style={{ padding: 5, backgroundColor: "#ddd" }}
            placeholder="Landmark"
            value={landmark}
            onChangeText={(e) => setlandmark(e)}
          />
        </View>
      </View>

        <View style={{padding: 20}}>
            <TouchableOpacity style={{backgroundColor: 'black', padding: 10}} onPress={() => {saveShipping()}}>
                <Text style={{color: '#fff', fontWeight: '800', textAlign: 'center'}}>Save Address</Text>
            </TouchableOpacity>
        </View>

    </ScrollView>
  );
}
