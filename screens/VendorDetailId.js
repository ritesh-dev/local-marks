import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import { Link, useIsFocused } from "@react-navigation/native";
import Heading from "../components/Heading";
import axios from "axios";
import { AuthContext } from "../src/AuthProvider";
import * as Sharing from "expo-sharing";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function VendorDetailId({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showVPL, setShowVPL] = useState(false);
  const [showVP, setShowVP] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const { id } = route.params;

  const [vendor, setVendor] = useState(null);

  const [services, setServices] = useState(null);

  const [slotId, setSlotId] = useState(null);
  const [slots, setslots] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [serviceCost, setServiceCost] = useState(null);
  const [isSlotAvailable, setIsSlotAvailable] = useState(false);

  const [products, setproducts] = useState(null);

  const [viewImg, setViewImg] = useState(null);

  const [comboOffers, setcomboOffers] = useState(null);
  const [onlineService, setonlineService] = useState(null);

  const fetchComboOffers = () => {
    console.log(id);
    axios
      .get("https://local-marks.com/api/v1/get-combo-offers/vendor/" + id, {
        headers: {
          "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
        },
      })
      .then((res) => {
        setcomboOffers(res.data.data);
      });
  };

  const colors = [
    "#00DFA2",
    "#FF0060",
    "#F6FA70",
    "#FF78C4",
    "#E1AEFF",
    "#0079FF",
    "#FFE4A7",
    "#D25380",
    "#7AA874",
    "#EA8FEA",
    "#FADA9D",
    "#FF7F3F",
  ];

  const proceedServiceBooking = () => {
    const booking_date = moment(date).format("YYYY-MM-DD");
    // console.log(serviceId);
    // console.log(slotId);
    // console.log(booking_date);
    if (slotId) {
      axios
        .post(
          "https://local-marks.com/api/v1/check-slot?api_token=" +
            user.api_token,
          {
            service_id: serviceId,
            slot_id: slotId,
            booking_date: booking_date,
          },
          {
            headers: {
              "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
          if (res.data.status == "success") {
            axios
              .post(
                "https://local-marks.com/api/v1/service-booking?api_token=" +
                  user.api_token,
                {
                  service_id: serviceId,
                  slot_id: slotId,
                  booking_date: booking_date,
                  booking_cost: serviceCost,
                  vendor_id: vendor.id,
                  txn_id: "TEST",
                },
                {
                  headers: {
                    "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
                  },
                }
              )
              .then((res) => {
                if (res.data.status == "success") {
                  const p_url = res.data.data.payment_url;
                  navigation.navigate("PaymentWebview", { p_url: p_url });
                  // console.log(res.data);
                } else {
                  alert(res.data.message);
                  setIsSlotAvailable(false);
                  // console.log(res.data);
                }
              });
          } else {
            alert(res.data.message);
          }
        });
    } else {
      alert("Choose a slot first");
    }
  };

  const { user } = useContext(AuthContext);

  const isFocused = useIsFocused();

  const renderGallery = ({ item }) => {
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
    console.log(item);
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
    return (
      <View style={{ padding: 10, backgroundColor: "#fff" }}>
        {item.type == "Image" && (
          <TouchableOpacity
            onPress={() => {
              setViewImg(item.file_name);
            }}
          >
            <Image
              source={{ uri: item.file_name }}
              style={{ width: 100, height: 100, borderRadius: 5 }}
            />
          </TouchableOpacity>
        )}
        {item.type == "Video" && (
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://youtube.com/watch?v=" + item.file_name)
            }
          >
            <Image
              source={{
                uri: "https://img.youtube.com/vi/" + item.file_name + "/1.jpg",
              }}
              style={{ width: 100, height: 100, borderRadius: 5 }}
            />
            <MaterialCommunityIcons
              size={20}
              color="red"
              name="youtube"
              style={{ position: "absolute", left: 40, top: 40 }}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const Images = [
    require("../assets/1_b.jpeg"),
    require("../assets/2_b.jpeg"),
    require("../assets/3_b.jpeg"),
  ];

  const shareVendor = async () => {
    await Share.share({
      message:
        "Checkout this vendor at Local Marks: https://app.local-marks.com/vendor?id=" +
        vendor.id,
    });
  };

  const renderPlan = ({ item, index }) => {
    if (!item.is_vip) {
      return (
        <ImageBackground
          source={Images[index % 3]}
          resizeMode="cover"
          style={{ margin: 10 }}
          imageStyle={{ borderRadius: 10 }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
              width: 250,
              height: 150,
              justifyContent: "space-around",
              borderRadius: 10,
            }}
            onPress={() => {
              buyPlan(item.id);
            }}
          >
            <Text style={{ fontSize: 16, color: "#fff" }}>
              {item.plan_name}
            </Text>
            <Text style={{ fontWeight: "800", fontSize: 18, color: "#fff" }}>
              INR {item.plan_price}
            </Text>
            <Text style={{ color: "#fff" }}>
              Validity: {item.plan_validity}
            </Text>
            <Text style={{ color: "#fff" }}>
              {item.description.replace(/<\/?[^>]+(>|$)/g, "")}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      );
    } else {
      setShowVPL(true);
    }
  };

  const renderVipPlan = ({ item, index }) => {
    if (item.is_vip) {
      return (
        <ImageBackground
          source={Images[index % 3]}
          resizeMode="cover"
          style={{ margin: 10 }}
          imageStyle={{ borderRadius: 10 }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
              width: 250,
              height: 150,
              justifyContent: "space-around",
              borderRadius: 10,
            }}
            onPress={() => {
              buyPlan(item.id);
            }}
          >
            <Text style={{ fontSize: 16, color: "#fff" }}>
              {item.plan_name}
            </Text>
            <Text style={{ fontWeight: "800", fontSize: 18, color: "#fff" }}>
              INR {item.plan_price}
            </Text>
            <Text style={{ color: "#fff" }}>
              Validity: {item.plan_validity}
            </Text>
            <Text style={{ color: "#fff" }}>
              {item.description.replace(/<\/?[^>]+(>|$)/g, "")}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      );
    }
  };

  const renderOffer = ({ item }) => {
    return (
      <View
        style={{
          padding: 5,
          backgroundColor: "#fff",
          margin: 10,
          width: 150,
          justifyContent: "space-around",
          borderRadius: 5,
          justifyContent: "center",
        }}
      >
        <Image
          source={{ uri: item.offer_image }}
          style={{ height: 140, width: 140, borderRadius: 5 }}
        />
        <Text style={{ padding: 10, fontWeight: "700" }}>
          {item.offer_title}
        </Text>
        {item.description && (
          <Text style={{ paddingHorizontal: 10, fontWeight: "700" }}>
            {item.description.replace(/<\/?[^>]+(>|$)/g, "")}
          </Text>
        )}
        {item.offer_price && (
          <Text style={{ paddingHorizontal: 10, fontWeight: "700" }}>
            Offer Price: INR {item.offer_price.replace(/<\/?[^>]+(>|$)/g, "")}
          </Text>
        )}
        {item.expiry_date && (
          <Text style={{ paddingHorizontal: 10, fontWeight: "700" }}>
            Expiry: {moment(item.expiry_date).format("DD MMM YYYY")}
          </Text>
        )}
      </View>
    );
  };

  const renderProduct = ({ item }) => {
    if (!item.product.is_vip) {
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
          onPress={() =>
            navigation.navigate("ProductDetails", { product: item })
          }
        >
          <Image
            source={{ uri: item.product.product_image }}
            style={{ height: 100, width: "100%" }}
          />
          <Text
            numberOfLines={2}
            style={{ padding: 10, textAlign: "left", fontSize: 12 }}
          >
            {item.product.product_name}
          </Text>
        </TouchableOpacity>
      );
    } else {
      setShowVP(true);
    }
  };

  const renderVipProduct = ({ item }) => {
    if (item.product.is_vip) {
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
          onPress={() =>
            navigation.navigate("ProductDetails", { product: item })
          }
        >
          <Image
            source={{ uri: item.product.product_image }}
            style={{ height: 100, width: "100%" }}
          />
          <Text
            numberOfLines={2}
            style={{ padding: 10, textAlign: "left", fontSize: 12 }}
          >
            {item.product.product_name}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const renderServices = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            margin: 10,
            width: 150,
            justifyContent: "flex-start",
            borderRadius: 5,
          }}
          onPress={() => {
            fetchAvailableSlots(item.id);
            setServiceCost(item.service_sale_cost);
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ height: 100, width: "100%", borderRadius: 5 }}
          />
          <View style={{ paddingVertical: 5 }}>
            <Text
              numberOfLines={2}
              style={{
                paddingHorizontal: 10,
                textAlign: "left",
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              {item.service_name}
            </Text>
            <Text
              numberOfLines={2}
              style={{ paddingHorizontal: 10, textAlign: "left", fontSize: 12 }}
            >
              {item.service_description}
            </Text>
            <Text
              numberOfLines={2}
              style={{ paddingHorizontal: 10, textAlign: "left", fontSize: 12 }}
            >
              {item.currency} {item.service_sale_cost}
            </Text>
          </View>
        </TouchableOpacity>
      );
  };

  const fetchVendorProduct = () => {
    axios
      .post(
        "https://local-marks.com/api/v1/get-vendor-product-new",
        {
          vendor_id: id,
        },
        {
          headers: {
            "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
          },
        }
      )
      .then((res) => {
        // console.log(user);
        setproducts(res.data.data);
      });
  };

  const fetchVendorServices = () => {
    axios
      .get("https://local-marks.com/api/v1/get-vendor-services/" + id, {
        headers: {
          "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        // setServices(res.data.data);
        let dataSer = [];
        res.data.data.every((el) => {
          if (el.service_name == "Online" || el.service_name == "online") {
            setonlineService(el);
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log(el);
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          }else{
            dataSer.push(el);
          }
          return true;
        });

        setServices(dataSer);

      });
  };
  const fetchAvailableSlots = (id) => {
    if (user) {
      axios
        .get("https://local-marks.com/api/v1/get-service-slot/" + id, {
          headers: {
            "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
          },
        })
        .then((res) => {
          if (res.data.data && res.data.data.length > 0) {
            // console.log(res.data.data);
            setslots(res.data.data);
            setServiceId(id);
            setIsSlotAvailable(true);
          } else {
            setslots(null);
            setSlotId(null);
            setServiceId(null);
            setIsSlotAvailable(null);
            alert("No Slots Available");
          }
        });
    } else {
      navigation.navigate("Login");
    }
  };

  const fetchVendor = () => {
    axios
      .get("https://local-marks.com/api/v1/get-vendor-by-id?vendor_id=" + id, {
        headers: {
          "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setVendor(res.data.data);
      });
  };

  const buyPlan = (id) => {
    if (user) {
      axios
        .post(
          "https://local-marks.com/api/v1/plan-buy?api_token=" + user.api_token,
          {
            plan_id: id,
          },
          {
            headers: {
              "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
            },
          }
        )
        .then((res) => {
          if (res.data.status == "success") {
            const p_url = res.data.data.payment_url;
            navigation.navigate("PaymentWebview", { p_url: p_url });
          } else {
            // console.log(res.data);
          }
        });
    } else {
      navigation.navigate("Login");
    }
  };

  useEffect(() => {
    fetchVendorProduct();
    fetchVendorServices();
    fetchVendor();
    fetchComboOffers();
  }, [isFocused]);

  if (!vendor) {
    return null;
  }

  return (
    <>
      {isSlotAvailable && (
        <View
          style={{
            position: "absolute",
            backgroundColor: "#000",
            top: 200,
            width: "90%",
            left: "5%",
            padding: 10,
            zIndex: 99,
            color: "#fff",
            borderRadius: 5
          }}
        >
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Booking Details
            </Text>
          </View>
          <View>
            <Text style={{ color: "#fff", marginBottom: 10 }}>
              Booking Date: {moment(date).format("DD-MM-YYYY")}
            </Text>
            <TouchableOpacity
              onPress={showDatepicker}
              style={{ backgroundColor: "#fff", padding: 17, borderRadius: 5 }}
            >
              <Text>Choose Another Booking Date</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: "#fff", marginBottom: 10 }}>Choose Slot</Text>
            <Picker
              style={{ backgroundColor: "#fff", borderRadius: 5 }}
              selectedValue={slotId}
              onValueChange={(itV, itIn) => setSlotId(itV)}
            >
              <Picker.Item value={false} label="Choose available slot" />
              {slots &&
                slots.map((el) => {
                  return (
                    <Picker.Item
                      value={el.id}
                      label={el.slot_start_time + " - " + el.slot_end_time}
                    />
                  );
                })}
            </Picker>
          </View>

          <View style={{ marginTop: 20, borderRadius: 5 }}>
            <Button onPress={() => proceedServiceBooking()} title="Book" />
          </View>
          <View style={{ marginTop: 10 }}>
            <Button
              onPress={() => setIsSlotAvailable(false)}
              title="Close"
              color="red"
            />
          </View>
        </View>
      )}
      <ScrollView>
        <Header navigation={navigation} />

        <View style={{ padding: 10 }}>
          <Image
            source={{ uri: vendor.profile_image }}
            style={{ width: "100%", height: 200, borderRadius: 5 }}
          />
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "800" }}>
            {vendor.f_name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            {vendor.profile.tour_video && (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(vendor.profile.tour_video);
                }}
              >
                <MaterialCommunityIcons
                  name="youtube-subscription"
                  size={28}
                  color="red"
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Gallery", { gallery: vendor.gallery });
              }}
            >
              <MaterialCommunityIcons name="image" size={28} />
            </TouchableOpacity>
          </View>
        </View>

        {onlineService && (
          <View style={{padding: 10}}>
            <TouchableOpacity 
              style={{backgroundColor: 'red', padding: 20, borderRadius: 5}}
              onPress={() => {
                fetchAvailableSlots(onlineService.id);
                setServiceCost(onlineService.service_sale_cost);
              }}
            >
              <Text style={{fontWeight: 'bold', color: '#fff', textAlign: 'center'}}>Book Online Appointment @ {onlineService.service_cost}/- only</Text>
            </TouchableOpacity>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#fff",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {vendor.profile.facebook_link && (
              <TouchableOpacity
                onPress={() => Linking.openURL(vendor.profile.facebook_link)}
              >
                <MaterialCommunityIcons
                  size={32}
                  style={{ paddingVertical: 15, paddingHorizontal: 5 }}
                  color="dodgerblue"
                  name="facebook"
                />
              </TouchableOpacity>
            )}
            {vendor.profile.instagram_link && (
              <TouchableOpacity
                onPress={() => Linking.openURL(vendor.profile.instagram_link)}
              >
                <MaterialCommunityIcons
                  size={32}
                  style={{ paddingVertical: 15, paddingHorizontal: 5 }}
                  name="instagram"
                  color="red"
                />
              </TouchableOpacity>
            )}
            {vendor.profile.twitter_link && (
              <TouchableOpacity
                onPress={() => Linking.openURL(vendor.profile.twitter_link)}
              >
                <MaterialCommunityIcons
                  size={32}
                  style={{ paddingVertical: 15, paddingHorizontal: 5 }}
                  name="twitter"
                  color="facebook"
                />
              </TouchableOpacity>
            )}
            {vendor.profile.youtube_link && (
              <TouchableOpacity
                onPress={() => Linking.openURL(vendor.profile.youtube_link)}
              >
                <MaterialCommunityIcons
                  size={32}
                  style={{ paddingVertical: 15, paddingHorizontal: 5 }}
                  name="youtube"
                  color="red"
                />
              </TouchableOpacity>
            )}
          </View>
          <View>
            {vendor.profile.facebook_link && (
              <TouchableOpacity onPress={() => shareVendor()}>
                <SimpleLineIcons
                  size={24}
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 20,
                    fontWeight: "800",
                  }}
                  name="share"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {vendor.description && (
          <>
            <Heading title="About" />
            <View style={{ padding: 10, backgroundColor: "#fff" }}>
              <Text>{vendor.description.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
            </View>
          </>
        )}

        {vendor.profile.closed_time && (
          <>
            <Heading title="Timing" />

            <View
              style={{
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#fff",
              }}
            >
              <View>
                {JSON.parse(vendor.profile.closed_time).map((el) => {
                  return (
                    <Text
                      style={{ fontWeight: "600", textTransform: "capitalize" }}
                    >
                      {el.day}
                    </Text>
                  );
                })}
              </View>
              <View style={{ flexDirection: "row" }}>
                <View>
                  {JSON.parse(vendor.profile.open_time).map((el) => {
                    if (el.time) {
                      return (
                        <Text
                          style={{
                            fontWeight: "400",
                            textTransform: "uppercase",
                          }}
                        >
                          {el.time}
                        </Text>
                      );
                    } else {
                      return (
                        <Text
                          style={{
                            fontWeight: "400",
                            textTransform: "capitalize",
                            color: "red",
                          }}
                        >
                          Closed
                        </Text>
                      );
                    }
                  })}
                </View>
                <View>
                  {JSON.parse(vendor.profile.closed_time).map((el) => {
                    if (el.time) {
                      return (
                        <Text
                          style={{
                            fontWeight: "400",
                            textTransform: "uppercase",
                          }}
                        >
                          {" "}
                          - {el.time}
                        </Text>
                      );
                    } else {
                      return (
                        <Text
                          style={{
                            fontWeight: "400",
                            textTransform: "uppercase",
                          }}
                        ></Text>
                      );
                    }
                  })}
                </View>
              </View>
            </View>
          </>
        )}

        {vendor.address && (
          <>
            <Heading title="Location" />

            <View
              style={{
                padding: 10,
                backgroundColor: "#fff",
                marginTop: 10,
                flexDirection: "column",
              }}
            >
              <Text numberOfLines={2}>{vendor.address}</Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingVertical: 10,
                }}
                onPress={() =>
                  Linking.openURL(
                    "https://maps.google.com/?q=" + vendor.address
                  )
                }
              >
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color="brown"
                />
                <Text style={{ color: "brown", textTransform: "uppercase" }}>
                  Map & Direction
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {vendor.facility.length > 0 && (
          <>
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
          </>
        )}

        {vendor.gallery && vendor.gallery.length > 0 && (
          <>
            <View
              style={{
                padding: 10,
                backgroundColor: "#fff",
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                Our Gallery
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Gallery", { gallery: vendor.gallery });
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "400", color: "blue" }}
                >
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={vendor.gallery}
              keyExtractor={(item) => item.id}
              renderItem={renderGallery}
              horizontal
            />
          </>
        )}

        {vendor.offer && vendor.offer.length > 0 && (
          <>
            <Heading title="Latest Offers" />

            <FlatList
              data={vendor.offer}
              keyExtractor={(item) => item.id}
              renderItem={renderOffer}
              horizontal
            />
          </>
        )}

        {/* {vendor.vendor_offer && vendor.vendor_offer.length > 0 && (
          <>
            <Heading title="Featured Offers" />

            <FlatList
              data={vendor.vendor_offer}
              keyExtractor={(item) => item.id}
              renderItem={renderOffer}
              horizontal
            />
          </>
        )} */}

        <Heading title="Combo Offers" />

        <FlatList
            data={comboOffers}
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate("ComboDetails", {id: item.id})} style={{padding: 10, backgroundColor: '#fff', marginHorizontal: 0, borderRadius: 5}}>
                  <Image source={{uri: item.image}} style={{width: 150, height: 100, borderTopLeftRadius: 5, borderTopRightRadius: 5}} resizeMode="contain"/>
                  <View style={{flexDirection: 'column', justifyContent: 'space-between', backgroundColor: "rgb(248,248,248)", padding: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, width: 150}}>
                    <Text style={{fontWeight: '600', fontSize: 14}}>{item.name}</Text>
                    <Text style={{fontWeight: '600', fontSize: 11}} color="#333">{item.combo_offer_products.length} Products</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{fontWeight: '600', color: '#ccc', textDecorationLine: 'line-through', marginRight: 5}}>Rs. {item.price}</Text>
                      <Text style={{fontWeight: '600', color: 'red'}}>Rs. {item.discounted_price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor = {(item) => item.id}
            horizontal
          />

        {vendor.vendor_plan && vendor.vendor_plan.length > 0 && (
          <>
            <Heading title="Our Plans" />

            <FlatList
              data={vendor.vendor_plan}
              keyExtractor={(item) => item.id}
              renderItem={renderPlan}
              horizontal
            />
          </>
        )}

        {products && products.length > 0 && (
          <>
            <Heading title="Our Products" />

            <FlatList
              data={products}
              keyExtractor={(item) => item.product.id}
              renderItem={renderProduct}
              horizontal
            />
          </>
        )}
        {products && products.length > 0 && showVP && (
          <>
            <Heading title="VIP Products" />

            <FlatList
              data={products}
              keyExtractor={(item) => item.product.id}
              renderItem={renderVipProduct}
              horizontal
            />
          </>
        )}

        {vendor.vendor_plan && vendor.vendor_plan.length > 0 && showVPL && (
          <>
            <Heading title="VIP Plans" />

            <FlatList
              data={vendor.vendor_plan}
              keyExtractor={(item) => item.id}
              renderItem={renderVipPlan}
              horizontal
            />
          </>
        )}

        {services && services.length > 0 && (
          <>
            <Heading title="Services" />

            <FlatList
              data={services}
              keyExtractor={(item) => item.id}
              renderItem={renderServices}
              horizontal
            />
          </>
        )}

        {isSlotAvailable && <View></View>}

        <View style={{ margin: 50 }}></View>
      </ScrollView>
      {viewImg && (
        <TouchableOpacity
          onPress={() => {
            setViewImg(null);
          }}
          style={{
            backgroundColor: "#fff",
            position: "relative",
            width: "100%",
            height: "100%",
            bottom: 0,
            padding: 20,
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: viewImg }}
            style={{ width: "100%", height: "80%", resizeMode: "contain" }}
          />
        </TouchableOpacity>
      )}
    </>
  );
}
