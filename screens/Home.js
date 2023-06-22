import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Carousel from "react-native-snap-carousel";
import Header from "../components/Header";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import Heading from "../components/Heading";
import { AuthContext } from "../src/AuthProvider";

export default function Home({ navigation }) {
  const [slider, setslider] = useState(null);
  const [categories, setcategories] = useState(null);
  const [featuredVendors, setfeaturedVendors] = useState(null);
  const [latestOffers, setlatestOffers] = useState(null);

  const {user} = useContext(AuthContext)

  const isFocused = useIsFocused()

  const fetchSliders = () => {
    axios.get("https://local-marks.com/api/v1/get-sliders", {
      headers: {
        "custom-token" : "295828be2ad95b95abcfe20ed09d4df8"
      }
    }).then((res) => {
      setslider(res.data.data)
    })
  }

  const fetchCategories = () => {
    axios.get("https://local-marks.com/api/v1/get-categories", {
      headers: {
        "custom-token" : "295828be2ad95b95abcfe20ed09d4df8"
      }
    }).then((res) => {
      setcategories(res.data.data);
    })
  }

  const fetchFeaturedVendors = () => {
    axios.post("https://local-marks.com/api/v1/get-featured-vendor", {
      "latitude": 0,
      "longitude": 0,
      "api_token" : ''
    }, {
      headers: {
        "custom-token" : "295828be2ad95b95abcfe20ed09d4df8"
      }
    }).then((res) => {
      setfeaturedVendors(res.data.data)
    })
  }

  const fetchLatestOffer = () => {
    axios.post("https://local-marks.com/api/v1/get-featured-offer", {
      "latitude": 0,
      "longitude": 0,
      "api_token" : ''
    }, {
      headers: {
        "custom-token" : "295828be2ad95b95abcfe20ed09d4df8"
      }
    }).then((res) => {
      console.log(res.data.data);
      setlatestOffers(res.data.data)
    })
  }

  useEffect(() => {
    fetchSliders()
    fetchCategories()
    fetchFeaturedVendors()
    fetchLatestOffer()
  }, [isFocused])
  

  return (
    <ScrollView>
      <Header navigation={navigation} />

      <View>
        {slider && (
          <Carousel
            data={slider}
            renderItem={({ item }) => {
              return (
                <View style={{ padding: 10 }}>
                  <Image
                    source={{ uri: item.slider_image }}
                    style={{ height: 200, width: "100%", borderRadius: 8 }}
                  />
                </View>
              );
            }}
            sliderWidth={Dimensions.get("screen").width}
            itemWidth={Dimensions.get("screen").width}
            layout="default"
            autoplay={true}
            loop={true}
          />
        )}
          <Heading title="Browse By Popular Categories" />
          
          <FlatList
            columnWrapperStyle={{justifyContent: 'flex-start', paddingHorizontal: 10, backgroundColor: '#fff'}}
            data={categories}
            numColumns={3}
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => {navigation.navigate('Subcategories', {'cat' : item})}} style={{paddingVertical: 15}}>
                  <Image source={{uri: item.category_image}} style={{width: (Dimensions.get('screen').width/3) - 10, height: 30}} resizeMode="contain"/>
                  <Text style={{textAlign: 'center', fontWeight: '600', color: 'red', marginTop: 10}}>{item.category_name}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor = {(item) => item.id}
          />

          <Heading title="Featured Vendors" />

          <FlatList
            data={featuredVendors}
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate("VendorDetails", {vendor: item})} style={{padding: 10, backgroundColor: '#fff', marginHorizontal: 10, alignItems: 'center'}}>
                  <Image source={{uri: item.profile_image}} style={{width: 150, height: 150, borderRadius: 5}} resizeMode="contain"/>
                  <Text style={{fontWeight: '600'}}>{item.f_name}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor = {(item) => item.id}
            horizontal
          />

          <Heading title="Latest Offers" />

          <FlatList
            data={latestOffers}
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate("VendorDetails", {vendor: item})} style={{padding: 10, backgroundColor: '#fff', marginHorizontal: 10}}>
                  <Image source={{uri: item.offer_image}} style={{width: 150, height: 150, borderRadius: 5}} resizeMode="contain"/>
                  <Text style={{fontWeight: '600'}}>{item.offer_title}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor = {(item) => item.id}
            horizontal
          />
          

          <View style={{margin: 50}}></View>
      </View>
    </ScrollView>
  );
}
