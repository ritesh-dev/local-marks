import React, { useContext, useEffect, useState } from "react";
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
import { useIsFocused } from "@react-navigation/native";
import Heading from "../components/Heading";
import axios from "axios";
import { AuthContext } from "../src/AuthProvider";

export default function VendorDetails({ navigation, route }) {
  const { vendor } = route.params;

  const [products, setproducts] = useState(null)

  const {user} = useContext(AuthContext)

  const isFocused = useIsFocused();

  const renderGallery = ({ item }) => {
    return (
      <View style={{ padding: 10, backgroundColor: "#fff" }}>
        {item.type == "Image" && (
          <Image
            source={{ uri: item.file_name }}
            style={{ width: 100, height: 100 }}
          />
        )}
        {item.type == "Video" && (
          <Image
            source={{ uri: item.video_banner }}
            style={{ width: 100, height: 100 }}
          />
        )}
      </View>
    );
  };

  const renderPlan = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#fff",
          margin: 10,
          padding: 10,
          width: 150,
          height: 150,
          justifyContent: "space-around",
          borderRadius: 5,
        }}

        onPress={() => {buyPlan(item.id)}}
      >
        <Text style={{ fontSize: 16 }}>{item.plan_name}</Text>
        <Text style={{ fontWeight: "800", fontSize: 18 }}>
          {item.plan_price}
        </Text>
        <Text>Validity: {item.plan_validity}</Text>
        <Text>{item.description.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
      </TouchableOpacity>
    );
  };

  const renderOffer = ({ item }) => {
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: "#fff",
          margin: 10,
          padding: 10,
          width: 150,
          height: 150,
          justifyContent: "space-around",
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: item.offer_image }}
          style={{ height: 100, width: 100 }}
        />
      </View>
    );
  };

  const renderProduct = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          margin: 10,
          width: 150,
          height: 150,
          justifyContent: "flex-start",
          borderRadius: 5,
        }}
        onPress={() => navigation.navigate('ProductDetails', {"product": item})}
      >
        <Image
          source={{ uri: item.product.product_image }}
          style={{ height: 100, width: '100%' }}
        />
        <Text numberOfLines={2} style={{padding: 10, textAlign: 'left', fontSize: 12}}>{item.product.product_name}</Text>
       
      </TouchableOpacity>
    );
  };

  const fetchVendorProduct = () => {
    axios.post(
      "https://local-marks.com/api/v1/get-vendor-product-new",
      {
        vendor_id: vendor.id,
      },
      {
        headers: {
          "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
        },
      }
    ).then((res) => {
        setproducts(res.data.data);
    });
  };

  const buyPlan = (id) => {
    if(user){
      axios.post(
        "https://local-marks.com/api/v1/plan-buy?api_token="+user.api_token,
        {
          plan_id: id,
        },
        {
          headers: {
            "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
          },
        }
      ).then((res) => {
          if(res.data.status == 'success'){
            const p_url = res.data.data.payment_url;
            navigation.navigate('PaymentWebview', {p_url: p_url})
          }else{
            console.log(res.data)
          }
      });
    }else{
      navigation.navigate('Login')
    }
  };

  useEffect(() => {
    fetchVendorProduct()
  }, [isFocused]);

  return (
    <ScrollView>
      <Header navigation={navigation} />

      <View style={{ padding: 10 }}>
        <Image
          source={{ uri: vendor.profile_image }}
          style={{ width: "100%", height: 200 }}
        />
      </View>

      <Heading title={vendor.f_name} />

      <Heading title="About" />

    {vendor.description && (
      <View style={{ padding: 10, backgroundColor: "#fff" }}>
        <Text>{vendor.description.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
      </View>
      )}

      <Heading title="Timing" />

      <View style={{ padding: 10, backgroundColor: "#fff" }}>
        <Text>{vendor.address}</Text>
      </View>

      <Heading title="Facilities" />

      <FlatList
        columnWrapperStyle={{
          justifyContent: "flex-start",
          paddingHorizontal: 10,
          backgroundColor: "#fff",
        }}
        data={vendor.facility}
        numColumns={4}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Subcategories", { cat: item });
              }}
              style={{ paddingVertical: 15 }}
            >
              <Image
                source={{ uri: item.facility_image }}
                style={{
                  width: Dimensions.get("screen").width / 4 - 10,
                  height: 30,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  color: "#000",
                  marginTop: 10,
                  fontSize: 11,
                }}
              >
                {item.facility_title}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
      />

      <Heading title="Our Gallery" />

      <FlatList
        data={vendor.gallery}
        keyExtractor={(item) => item.id}
        renderItem={renderGallery}
        horizontal
      />

      <Heading title="Our Offers" />

      <FlatList
        data={vendor.offer}
        keyExtractor={(item) => item.id}
        renderItem={renderOffer}
        horizontal
      />

      <Heading title="Our Plans" />

      <FlatList
        data={vendor.vendor_plan}
        keyExtractor={(item) => item.id}
        renderItem={renderPlan}
        horizontal
      />

      <Heading title="Our Products" />

      <FlatList
        data={products}
        keyExtractor={(item) => item.product.id}
        renderItem={renderProduct}
        horizontal
      />

      <View style={{ margin: 50 }}></View>
    </ScrollView>
  );
}
