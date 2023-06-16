import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import Heading from "../components/Heading";

export default function VendorList({ navigation, route }) {
  const { sid } = route.params;

  const [vendors, setvendors] = useState(null);

  const isFocused = useIsFocused();

  const fetchVendors = () => {
    axios
      .post(
        "https://local-marks.com/api/v1/get-vendor-sub-categories",
        {
          latitude: 0,
          longitude: 0,
          sub_category_id: sid,
        },
        {
          headers: {
            "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
          },
        }
      )
      .then((res) => {
        setvendors(res.data.data);
      });
  };

  const rendervendorList = ({item}) => {

    const closed_timings = JSON.parse(item.profile.closed_time)

    const closing = closed_timings.filter((el) => {
        if(el.day == 'monday')
        return el.time
    })

    console.log(closing);

    return (
        <TouchableOpacity style={{ paddingVertical: 15 }}>
              <Image
                source={{ uri: item.profile_image }}
                style={{
                  width: Dimensions.get("screen").width / 2 - 10,
                  height: 100,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  textAlign: "left",
                  fontWeight: "600",
                  color: "#000",
                  marginTop: 10,
                  paddingLeft: 10,
                }}
              >
                {item.f_name}
              </Text>
              <Text></Text>
            </TouchableOpacity>
    )
  }

  useEffect(() => {
    fetchVendors();
  }, [isFocused]);

  return (
    <ScrollView>
      <Header navigation={navigation} />

      <Heading title="Vendors" />

      <FlatList
        columnWrapperStyle={{
          justifyContent: "flex-start",
          paddingHorizontal: 10,
          backgroundColor: "#fff",
        }}
        data={vendors}
        numColumns={2}
        renderItem={rendervendorList}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
  );
}
