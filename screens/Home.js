import React from "react";
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

export default function Home({ navigation }) {
  const slider = [
    {
      id: 1,
      url: "https://local-marks.com/images/slider/zoom/oUm1sC_1606365523.png",
    },
    {
      id: 2,
      url: "https://local-marks.com/images/slider/zoom/ijY7az_1606365629.png",
    },
    {
      id: 3,
      url: "https://local-marks.com/images/slider/zoom/ZzpnZd_1606365698.png",
    },
  ];

  return (
    <ScrollView>
      
      <Header navigation={navigation} />

      <View>

        <Carousel
          data={slider}
          renderItem={({ item }) => {
            return (
              <View style={{padding: 10}}>
                <Image
                  source={{ uri: item.url }}
                  style={{ height: 200, width: '100%', borderRadius: 8 }}
                />
              </View>
            );
          }}
          sliderWidth={Dimensions.get('screen').width}
          itemWidth={Dimensions.get('screen').width}
          layout="default"
          autoplay={true}
          loop={true}
        />
      </View>

          

    </ScrollView>
  );
}
