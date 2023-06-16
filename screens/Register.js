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

export default function Register({navigation}) {
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
            <TextInput style={{ padding: 5, backgroundColor: "#ddd" }} placeholder="First Name" />
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
            <TextInput style={{ padding: 5, backgroundColor: "#ddd" }} placeholder="Last Name" />
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
            <TextInput style={{ padding: 5, backgroundColor: "#ddd" }} placeholder="Country Code" />
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
            <TextInput style={{ padding: 5, backgroundColor: "#ddd" }} placeholder="Phone Number" />
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
            <TextInput style={{ padding: 5, backgroundColor: "#ddd" }} placeholder="Email" />
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
            <TextInput style={{ padding: 5, backgroundColor: "#ddd" }} placeholder="Address" />
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
            <TextInput style={{ padding: 5, backgroundColor: "#ddd" }} placeholder="Select Preference" />
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
            <TextInput style={{ padding: 5, backgroundColor: "#ddd" }} placeholder="Password" secureTextEntry />
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
            <TextInput style={{ padding: 5, backgroundColor: "#ddd" }} placeholder="Confirm Password" secureTextEntry />
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
            <TouchableOpacity style={{backgroundColor: '#000', paddingHorizontal: 30, paddingVertical: 10}}>
                <Text style={{color: '#fff', textTransform: 'uppercase', fontWeight: '800'}}>REGISTER</Text>
            </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}
