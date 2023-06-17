import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import { useIsFocused } from "@react-navigation/native";
import Heading from "../components/Heading";
import axios from "axios";
import { AuthContext } from "../src/AuthProvider";

export default function ProductDetails({ navigation, route }) {
  const { product } = route.params;

  const [price, setprice] = useState(null);

  const isFocused = useIsFocused();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("-----");
    console.log(product);
    fetchPrice();
  }, [isFocused]);

  const fetchPrice = () => {
    setprice(product.variants[0].regular_price);
  };

  const addToCart = () => {
    if (user) {
      axios
        .post(
          "https://local-marks.com/api/v1/add-to-cart",
          {
            user_id: user.id,
            product_id: product.product.id,
            variant_id: product.variants[0].id,
            quantity: 1
          },
          {
            headers: {
              "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
            },
          }
        )
        .then((res) => {
          alert(res.data.message);
        });
    } else {
      navigation.navigate("Login");
    }
  };

  const buyNow = () => {
    if (user) {
      axios
        .post(
          "https://local-marks.com/api/v1/add-to-cart",
          {
            user_id: user.id,
            product_id: product.product.id,
            variant_id: product.variants[0].id,
            quantity: 1
          },
          {
            headers: {
              "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
            },
          }
        )
        .then((res) => {
          navigation.navigate("Cart")
        });
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <>
      <ScrollView>
        <Header navigation={navigation} />

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={{ uri: product.product.product_image }}
            style={{ width: "90%", height: 300 }}
          />
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "800" }}>
            {product.product.product_name}
          </Text>
          {price && <Text>{price}</Text>}
        </View>

        <Heading title="Quantity" />

        <FlatList
          data={product.variants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View style={{ padding: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    borderColor: "red",
                    borderWidth: 1,
                    padding: 10,
                  }}
                >
                  {item.weight}g
                </Text>
              </View>
            );
          }}
          horizontal
        />

        <Heading title="Description" />

        <View style={{ backgroundColor: "#fff", padding: 10 }}>
          {product.product.description && (
            <Text>
              {product.product.description.replace(/<\/?[^>]+(>|$)/g, "")}
            </Text>
          )}
        </View>

        <Heading title="Highlight" />

        <View style={{ backgroundColor: "#fff", padding: 10 }}>
          {product.product.highlights && (
            <Text>
              {product.product.highlights.replace(/<\/?[^>]+(>|$)/g, "")}
            </Text>
          )}
        </View>

        <View style={{ margin: 50 }}></View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          width: "100%",
          flex: 1,
        }}
      >
        <TouchableOpacity onPress={() => addToCart()} style={{ backgroundColor: "red", flex: 0.5, padding: 15 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "800", color: "#fff" }}
          >
            Add to Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => buyNow()} style={{ backgroundColor: "black", flex: 0.5, padding: 15 }}>
          <Text
            style={{ textAlign: "center", fontWeight: "800", color: "#fff" }}
          >
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
