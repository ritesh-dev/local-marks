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

export default function Home({ navigation, route }) {
  const [slider, setslider] = useState(null);
  const [categories, setcategories] = useState(null);
  const [featuredVendors, setfeaturedVendors] = useState(null);
  const [latestOffers, setlatestOffers] = useState(null);
  const [comboOffers, setcomboOffers] = useState(null);

  const {url} = route.params

  const {user} = useContext(AuthContext)

  const isFocused = useIsFocused()

  const fetchComboOffers = () => {
    axios.get("https://local-marks.com/api/v1/get-combo-offers", {
      headers: {
        "custom-token" : "295828be2ad95b95abcfe20ed09d4df8"
      }
    }).then((res) => {
      setcomboOffers(res.data.data)
    })
  }

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
      setlatestOffers(res.data.data)
    })
  }

  useEffect(() => {
    fetchSliders()
    fetchCategories()
    fetchFeaturedVendors()
    fetchLatestOffer()
    fetchComboOffers()

    if(url){
      navigation.navigate("VendorDetailId", {id: url})
    }
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
          
          <View style={{paddingVertical: 15, backgroundColor: '#fff'}}>
          <FlatList
            columnWrapperStyle={{justifyContent: 'flex-start', paddingHorizontal: 10, backgroundColor: '#fff'}}
            data={categories}
            numColumns={3}
            renderItem={({item, index}) => {
              let conSt = null;
              let conSt2 = {}

              if(index%3 == 0){
                conSt = {
                  borderRightColor: '#ccc', 
                  borderRightWidth: 1,
                }
              }else if(index%3 == 1){
                conSt = {
                  borderRightColor: '#ccc', 
                  borderRightWidth: 1,
                }
              }

              if(index/3 != 1){
                conSt2 = {
                  borderBottomColor: '#ccc', 
                  borderBottomWidth: 1,
                }
              }

              return (
                <TouchableOpacity onPress={() => {navigation.navigate('Subcategories', {'cat' : item})}} style={[{paddingVertical: 15}, conSt, conSt2]}>
                  <Image source={{uri: item.category_image}} style={{width: (Dimensions.get('screen').width/3) - 10, height: 30}} resizeMode="contain"/>
                  <Text style={{textAlign: 'center', fontWeight: '600', color: 'black', marginTop: 10}}>{item.category_name}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor = {(item) => item.id}
          />
          </View>

          <View style={{padding: 10, backgroundColor: '#fff', marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>Combo Offers</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ComboOfferList')}>
              <Text style={{fontSize: 14, fontWeight: '400', color: '#dc3545'}}>View All</Text>
            </TouchableOpacity>
        </View>

          <FlatList
            data={comboOffers}
            renderItem={({item}) => {
              let totalPrice = 0;
              item.combo_offer_products.map((product) => {
                console.log(product);
                if(product.product){
                totalPrice += parseInt(product.product.product_price[0].regular_price)
                }else if(product.service){
                  totalPrice += parseInt(product.service.service_cost)
                }else if(product.plan){
                  totalPrice += parseInt(product.plan.plan_price)
                }
              })
              return (
                <TouchableOpacity onPress={() => navigation.navigate("ComboDetails", {id: item.id})} style={{padding: 10, backgroundColor: '#fff', marginHorizontal: 0}}>
                  <Image source={{uri: item.image}} style={{width: 120, height: 100, borderTopLeftRadius: 5, borderTopRightRadius: 5}} resizeMode="contain"/>
                  <View style={{flexDirection: 'column', justifyContent: 'space-between', backgroundColor: "rgb(248,248,248)", padding: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, width: 120}}>
                    <Text style={{fontWeight: '600', fontSize: 14}} numberOfLines={2}>{item.name}</Text>
                    <Text style={{fontWeight: '600', fontSize: 11}} color="#333">{item.combo_offer_products.length} Products</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{fontWeight: '600', color: '#ccc', textDecorationLine: 'line-through', marginRight: 5, fontSize: 12}}>Rs. {totalPrice}</Text>
                      <Text style={{fontWeight: '600', color: 'red', fontSize: 12}}>Rs. {item.discounted_price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor = {(item) => item.id}
            horizontal
          />

          <Heading title="Featured Vendors" />

          <FlatList
            data={featuredVendors}
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate("VendorDetailId", {id: item.id})} style={{padding: 10, backgroundColor: '#fff', marginHorizontal: 0}}>
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
                <TouchableOpacity onPress={() => navigation.navigate("VendorDetailId", {id: item.id})} style={{padding: 10, backgroundColor: '#fff', marginHorizontal: 10}}>
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
