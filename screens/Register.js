import React, { useContext, useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import MultiSelect from 'react-native-multiple-select';
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../src/AuthProvider";


export default function Register({navigation}) {

  const [f_name, setf_name] = useState(null)
  const [l_name, setl_name] = useState(null)
  const [email, setemail] = useState(null)
  const [phone, setphone] = useState(null)
  const [password, setpassword] = useState(null)
  const [address, setaddress] = useState(null)
  const [interested_category, setinterested_category] = useState([])
  const [confirm_password, setconfirm_password] = useState(null)
  
  const [categories, setcategories] = useState(null)

  const {user, setUser} = useContext(AuthContext)


  const onSelectedItemsChange = selectedItems => {
    setinterested_category(selectedItems)
  };

  const isFocused = useIsFocused()

  const fetchCategories = () => {
    axios.get("https://local-marks.com/api/v1/get-categories", {
      headers: {
        "custom-token" : "295828be2ad95b95abcfe20ed09d4df8"
      }
    }).then((res) => {
      setcategories(res.data.data);
    })
  }

  useEffect(() => {
    fetchCategories()
  }, [isFocused])


  const register = () => {
    
    axios.post("https://local-marks.com/api/v1/register", {
      f_name: f_name,
      l_name: l_name,
      phone: phone,
      email: email,
      address: address,
      interested_category: interested_category,
      password: password,
      confirm_password: confirm_password,
      latitude: 0,
      longitude: 0
    }, {
      headers: {
        "custom-token" : "295828be2ad95b95abcfe20ed09d4df8"
      }
    }).then((res) => {
      if(res.data.status == 'success'){
        storeUser(res.data.data);
      }else{
        alert(res.data.message)
      }
    })
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
  

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View
        style={{
          alignItems: 'center'
        }}
      >
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-start",
            width: "100%",
            marginTop: Platform.OS === "android" ? getStatusBarHeight() : 20,
            padding: 20,
          }}
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 32}}>Sign Up</Text>
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
            <MaterialCommunityIcons name="account" size={18} style={{alignItems: 'center', justifyContent: 'center'}} />
          </View>
          <View style={{flex: 0.9}}>
            <TextInput value={f_name} onChangeText={(e) => setf_name(e)} style={{ padding: 5, backgroundColor: "#ddd" }} placeholder="First Name" />
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
            <MaterialCommunityIcons name="account" size={18} style={{alignItems: 'center', justifyContent: 'center'}} />
          </View>
          <View style={{flex: 0.9}}>
            <TextInput value={l_name} onChangeText={(e) => setl_name(e)} style={{ padding: 5, backgroundColor: "#ddd" }} placeholder="Last Name" />
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
            <MaterialCommunityIcons name="phone" size={18} style={{alignItems: 'center', justifyContent: 'center'}} />
          </View>
          <View style={{flex: 0.9}}>
            <TextInput  value={phone} onChangeText={(e) => setphone(e)} style={{ padding: 5, backgroundColor: "#ddd" }} placeholder="Phone Number" />
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
            <MaterialCommunityIcons name="email" size={18} style={{alignItems: 'center', justifyContent: 'center'}} />
          </View>
          <View style={{flex: 0.9}}>
            <TextInput  value={email} onChangeText={(e) => setemail(e)} style={{ padding: 5, backgroundColor: "#ddd" }} placeholder="Email" />
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
            <MaterialCommunityIcons name="pin" size={18} style={{alignItems: 'center', justifyContent: 'center'}} />
          </View>
          <View style={{flex: 0.9}}>
            <TextInput value={address} onChangeText={(e) => setaddress(e)} style={{ padding: 5, backgroundColor: "#ddd" }} placeholder="Address" />
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
            <MaterialCommunityIcons name="email" size={18} style={{alignItems: 'center', justifyContent: 'center'}} />
          </View>
          <View style={{flex: 0.9}}>
            <MultiSelect
              hideTags
              items={categories}
              uniqueKey="id"
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={interested_category}
              selectText="Selected Category"
              searchInputPlaceholderText="Search Items..."
              onChangeInput={ (text)=> console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="category_name"
              searchInputStyle={{ color: '#CCC' }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
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
            paddingVertical: 5
          }}
        >
          <View style={{flex: 0.1}}>
            <MaterialCommunityIcons name="lock" size={18} style={{alignItems: 'center', justifyContent: 'center'}} />
          </View>
          <View style={{flex: 0.9}}>
            <TextInput value={password} onChangeText={(e) => setpassword(e)} style={{ padding: 5, backgroundColor: "#ddd" }} placeholder="Password" secureTextEntry />
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
            <TextInput  value={confirm_password} onChangeText={(e) => setconfirm_password(e)} style={{ padding: 5, backgroundColor: "#ddd" }} placeholder="Confirm Password" secureTextEntry />
          </View>
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
            <TouchableOpacity onPress={() => register()} style={{backgroundColor: '#000', paddingHorizontal: 30, paddingVertical: 10}}>
                <Text style={{color: '#fff', textTransform: 'uppercase', fontWeight: '800'}}>REGISTER</Text>
            </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}
