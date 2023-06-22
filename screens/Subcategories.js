import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import Heading from "../components/Heading";

export default function Subcategories({ navigation, route }) {
  const { cat } = route.params;

  const isFocused = useIsFocused();

  const [subcat, setsubcat] = useState(null)

  const fetchSubCategories = () => {
    axios
      .get("https://local-marks.com/api/v1/get-sub-categories/" + cat.id, {
        headers: {
          "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
        },
      })
      .then((res) => {
        setsubcat(res.data.data);
        console.log(res.data.data);
      });
  };

  useEffect(() => {
    fetchSubCategories();
  }, [isFocused]);

  return (
    <ScrollView>
      <Header navigation={navigation} />

      <View style={{ padding: 10 }}>
        <Image
          source={{ uri: cat.category_banner }}
          style={{ height: 200, width: "100%", borderRadius: 10 }}
        />
      </View>

      <Heading title="Select Sub Category" />

      <FlatList
            columnWrapperStyle={{justifyContent: 'flex-start', paddingHorizontal: 10, backgroundColor: '#fff'}}
            data={subcat}
            numColumns={3}
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('VendorList', {"sid": item.id})} style={{paddingVertical: 15}}>
                  <Image source={{uri: item.sub_category_image}} style={{width: (Dimensions.get('screen').width/3) - 10, height: 30}} resizeMode="contain"/>
                  <Text style={{textAlign: 'center', fontWeight: '600', color: 'red', marginTop: 10}}>{item.sub_category_name}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor = {(item) => item.id}
          />

      <View style={{margin: 50}}></View>
    </ScrollView>
  );
}
