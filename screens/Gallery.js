import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  Linking,
} from "react-native";
import Header from "../components/Header";
import { useIsFocused } from "@react-navigation/native";

export default function Gallery({ navigation, route }) {
  const { gallery } = route.params;

  const isFocused = useIsFocused();

  const [viewImg, setViewImg] = useState(null)

  const [show, setshow] = useState("IMAGE");

  useEffect(() => {
    console.log(gallery);
  }, [isFocused]);

  const renderImage = ({ item }) => {
    if (item.type == "Image") {
      return (
        <TouchableOpacity onPress={() => setViewImg(item.file_name)} style={{ padding: 10 }}>
          <Image
            source={{ uri: item.file_name }}
            style={{
              width: Dimensions.get("screen").width / 2 - 30,
              height: 100,
            }}
          />
        </TouchableOpacity>
      );
    }
  };

  const renderVideo = ({ item }) => {
    if (item.type != "Image") {
      return (
        <TouchableOpacity onPress={() => Linking.openURL(item.file_name)} style={{ padding: 10 }}>
          <Image
            source={{ uri: item.video_banner }}
            style={{
              width: Dimensions.get("screen").width / 2 - 30,
              height: 100,
            }}
          />
        </TouchableOpacity>
      );
    }
  };

  return (
    <>
    <ScrollView>
      <Header navigation={navigation} />

      {show == "IMAGE" && (
        <View
          style={{ backgroundColor: "#fff", flexDirection: "row", flex: 1 }}
        >
          <TouchableOpacity
            onPress={() => setshow("IMAGE")}
            style={{
              flex: 0.5,
              padding: 10,
              borderBottomColor: "red",
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "600", color: "#d44" }}
            >
              Images
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setshow("VIDEO")}
            style={{ flex: 0.5, padding: 10 }}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "600", color: "#d44" }}
            >
              Videos
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {show == "VIDEO" && (
        <View
          style={{ backgroundColor: "#fff", flexDirection: "row", flex: 1 }}
        >
          <TouchableOpacity
            onPress={() => setshow("IMAGE")}
            style={{ flex: 0.5, padding: 10 }}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "600", color: "#d44" }}
            >
              Images
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setshow("VIDEO")}
            style={{
              flex: 0.5,
              padding: 10,
              borderBottomColor: "red",
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "600", color: "#d44" }}
            >
              Videos
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {show == 'IMAGE' && (
        <FlatList
        columnWrapperStyle={{
          justifyContent: "flex-start",
          paddingHorizontal: 10,
          backgroundColor: "#fff",
        }}
        data={gallery}
        numColumns={2}
        renderItem={renderImage}
        keyExtractor={(item) => item.id}
      />
      )}

      {show == 'VIDEO' && (
        <FlatList
        columnWrapperStyle={{
          justifyContent: "flex-start",
          paddingHorizontal: 10,
          backgroundColor: "#fff",
        }}
        data={gallery}
        numColumns={2}
        renderItem={renderVideo}
        keyExtractor={(item) => item.id}
      />
      )}
    </ScrollView>
    {viewImg && (
      <TouchableOpacity onPress={() => {setViewImg(null)}} style={{backgroundColor: '#fff', position: 'relative', width: '100%', height: '100%', bottom: 0, padding: 20, justifyContent: 'center'}}>
        <Image source={{uri: viewImg}} style={{width: '100%', height: '80%', resizeMode: 'contain'}} />
      </TouchableOpacity>
    )}
    </>
  );
}
