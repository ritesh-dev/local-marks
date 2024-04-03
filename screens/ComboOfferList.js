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

export default function ComboOfferList({ navigation }) {
  const [comboOffers, setcomboOffers] = useState(null);

  const isFocused = useIsFocused();

  const fetchComboOffers = () => {
    axios
      .get("https://local-marks.com/api/v1/get-combo-offers", {
        headers: {
          "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
        },
      })
      .then((res) => {
        setcomboOffers(res.data.data);
      });
  };

  const rendervendorList = ({ item }) => {
    let totalPrice = 0;
    item.combo_offer_products.map((product) => {
      console.log(product);
      if (product.product) {
        totalPrice += parseInt(product.product.product_price[0].regular_price);
      } else if (product.service) {
        totalPrice += parseInt(product.service.service_cost);
      } else if (product.plan) {
        totalPrice += parseInt(product.plan.plan_price);
      }
    });
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ComboDetails", { id: item.id })}
        style={{ padding: 10, backgroundColor: "#fff" }}
      >
        <Image
          source={{ uri: item.image }}
          style={{
            width: Dimensions.get("screen").width / 2 - 30,
            height: 100,
            borderRadius: 5,
          }}
          resizeMode="stretch"
        />
        <View>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "600",
            color: "#000",
            marginTop: 10,
            width: Dimensions.get("screen").width / 2 - 30,
          }}
          numberOfLines={2}
        >
          {item.name}
        </Text>
        <Text style={{ fontWeight: "600", fontSize: 11, width: Dimensions.get("screen").width / 2 - 30 }} color="#333">
          {item.combo_offer_products.length} Products
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", width: Dimensions.get("screen").width / 2 - 30 }}>
          <Text
            style={{
              fontWeight: "600",
              color: "#ccc",
              textDecorationLine: "line-through",
              marginRight: 5,
            }}
          >
            Rs. {totalPrice}
          </Text>
          <Text style={{ fontWeight: "600", color: "red" }}>
            Rs. {item.discounted_price}
          </Text>
        </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    fetchComboOffers();
  }, [isFocused]);

  return (
    <ScrollView>
      <Header navigation={navigation} />

      <Heading title="All Combo Offers" />

      <FlatList
        columnWrapperStyle={{
          justifyContent: "flex-start",
          paddingHorizontal: 10,
          backgroundColor: "#fff",
        }}
        data={comboOffers}
        numColumns={2}
        renderItem={rendervendorList}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
  );
}
