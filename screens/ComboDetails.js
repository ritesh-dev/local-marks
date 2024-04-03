import React, { useContext, useEffect, useState } from "react";
import {
  Button,
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
import axios from "axios";
import { AuthContext } from "../src/AuthProvider";

import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";

export default function ComboDetails({ navigation, route }) {

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showVPL, setShowVPL] = useState(false);
  const [showVP, setShowVP] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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

  const [comboOffers, setcomboOffers] = useState(null);
  const [isService, setisService] = useState(null);
  const [bookingDate, setbookingDate] = useState(null);

  const [slotId, setSlotId] = useState(null);
  const [slots, setslots] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [isSlotAvailable, setIsSlotAvailable] = useState(false);

  const { user } = useContext(AuthContext);

  const fetchComboOffers = () => {
    axios
      .get("https://local-marks.com/api/v1/get-combo-offers/" + id, {
        headers: {
          "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
        },
      })
      .then((res) => {
        setcomboOffers(res.data.data);
      });

    setIsLoading(false);
  };

  const screenHeight = Math.round(Dimensions.get("window").height);

  const [address, setaddress] = useState(null);

  const isFocused = useIsFocused();

  const proceedServiceBooking = () => {
    const booking_date = moment(date).format("YYYY-MM-DD");
    setbookingDate(booking_date);
    setIsLoading(true);
    
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
          if (res.data.status == "success") {
            setIsSlotAvailable(false);
            proceedToPay()
          } else {
            alert("Slot not available");
            setIsSlotAvailable(false);
          }

          setIsLoading(false);
        });
    } else {
      alert("Choose a slot first");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getShipping();
    fetchComboOffers();
  }, [isFocused]);

  const getShipping = () => {
    if(user){
      axios
      .post(
        "https://local-marks.com/api/v1/get-prev-shipping-details?api_token="+user.api_token,
        {
          headers: {
            "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
          },
        }
      )
      .then((res) => {
        if(res.data.status == 'success'){
          setaddress(res.data.data[0]);
          // console.log(res.data.data[0]);
        }

        setIsLoading(false);

      });
    }
  };

  const fetchAvailableSlots = (id) => {
    setIsLoading(true);
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

          setIsLoading(false);
        });
    } else {
      navigation.navigate("Login");
    }
  };

  const proceedToBuy = () => {
    if (user) {
      if(isService){
        fetchAvailableSlots(isService.id)
      }else{
        proceedToPay()
      }
    } else {
      navigation.navigate("Login");
    }
  }


  const proceedToPay = () => {
    if(address){
      setIsLoading(true);
      const shipping_id = address.id;
      const service_id = 0;
      const slot_id = 0;
      const booking_date = moment(date).format("YYYY-MM-DD");

      console.log({
        shipping_id: shipping_id,
        service_id: service_id,
        slot_id: slot_id,
        booking_date: booking_date,
        combo_offer_id: id
      }, user.api_token);

      if(user){
        axios
        .post(
          "https://local-marks.com/api/v1/combo-offer-cart?api_token="+user.api_token,
          {
            shipping_id: shipping_id,
            service_id: service_id,
            slot_id: slot_id,
            booking_date: booking_date,
            combo_offer_id: id
          },
          {
            headers: {
              "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
            },
          }
        )
        .then((res) => {
          if(res.data.status == 'success'){
            const p_url = res.data.data.payment_url;
            navigation.navigate('PaymentWebview', {p_url: p_url})
          }else{
            // console.log("----------");
            // console.log(res.data);
          }
  
        });
      }
    }else{
      navigation.navigate('ShippingScreen')
    }
  }

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
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

          <View style={{ marginTop: 20 }}>
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
    <ScrollView
      contentContainerStyle={{
        flexDirection: "column",
        minHeight: screenHeight - 30,
        justifyContent: "space-between",
      }}
    >
      <View>
        <Header navigation={navigation} title="Combo Details" />

        <Image
          source={{ uri: comboOffers && comboOffers.image }}
          style={{ width: "100%", height: 200 }}
        />

        {comboOffers && (<Heading title={comboOffers.name} />) }

        {comboOffers && (
          <View style={{ padding: 10, backgroundColor: "#fff", flexDirection: 'row' }}>
            <Text style={{ fontWeight: "600", fontSize: 16, color: '#a00', textDecorationStyle: 'solid', textDecorationLine: 'line-through', textDecorationColor: 'red' }}>
              INR {comboOffers.price}
            </Text>
            <Text style={{ fontWeight: "600", fontSize: 16, color: '#000', marginLeft: 10 }}>
              INR {comboOffers.discounted_price}
            </Text>
          </View>
        )}

        <View style={{ padding: 10 }}>
          {comboOffers && (
            <FlatList
              data={comboOffers.combo_offer_products}
              renderItem={({ item }) => {
                // console.log(item);
                if(item.service){
                  setisService(item.service);
                }
                return (
                  <View style={{ padding: 5 }}>
                    {item.product && (
                      <View>
                        <Image
                          source={{ uri: item.product.product_image }}
                          style={{
                            width: 150,
                            height: 100,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                          }}
                        />
                        <View
                          style={{
                            paddingHorizontal: 5,
                            backgroundColor: "#fff",
                            paddingVertical: 10,
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                            width: 150,
                          }}
                        >
                          <Text style={{ fontSize: 14, fontWeight: 600 }}>
                            {item.product.product_name}
                          </Text>
                          <Text style={{ fontSize: 11, fontWeight: 600 }}>
                            {item.product.user.f_name}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("VendorDetailId", {
                                id: item.product.user.id,
                              })
                            }
                          >
                            <Text
                              style={{
                                alignSelf: "flex-end",
                                backgroundColor: "red",
                                paddingVertical: 2,
                                paddingHorizontal: 7,
                                fontSize: 10,
                                borderRadius: 10,
                                color: "#fff",
                              }}
                            >
                              View
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    {item.plan && (
                      <View>
                        <View
                          style={{
                            width: 150,
                            height: 100,
                            backgroundColor: "purple",
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ fontSize: 10, color: "#fff" }}>
                            {item.plan.plan_name}
                          </Text>
                        </View>

                        <View
                          style={{
                            paddingHorizontal: 5,
                            backgroundColor: "#fff",
                            paddingVertical: 10,
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                            width: 150,
                          }}
                        >
                          <Text style={{ fontSize: 14, fontWeight: 600 }}>
                            {item.plan.plan_name}
                          </Text>
                          <Text style={{ fontSize: 11, fontWeight: 600 }}>
                            {item.plan.user.f_name}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("VendorDetailId", {
                                id: item.plan.user.id,
                              })
                            }
                          >
                            <Text
                              style={{
                                alignSelf: "flex-end",
                                backgroundColor: "red",
                                paddingVertical: 2,
                                paddingHorizontal: 7,
                                fontSize: 10,
                                borderRadius: 10,
                                color: "#fff",
                              }}
                            >
                              View
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    {item.service && (
                      <View>
                        <Image
                          source={{ uri: item.service.image }}
                          style={{
                            width: 150,
                            height: 100,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                          }}
                        />

                        <View
                          style={{
                            paddingHorizontal: 5,
                            backgroundColor: "#fff",
                            paddingVertical: 10,
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                            width: 150,
                          }}
                        >
                          <Text style={{ fontSize: 14, fontWeight: 600 }}>
                            {item.service.service_name}
                          </Text>
                          <Text style={{ fontSize: 11, fontWeight: 600 }}>
                            {item.service.user.f_name}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("VendorDetailId", {
                                id: item.service.user.id,
                              })
                            }
                          >
                            <Text
                              style={{
                                alignSelf: "flex-end",
                                backgroundColor: "red",
                                paddingVertical: 2,
                                paddingHorizontal: 7,
                                fontSize: 10,
                                borderRadius: 10,
                                color: "#fff",
                              }}
                            >
                              View
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        <Heading title="About Combo" />

        <View style={{ padding: 10, backgroundColor: "#fff" }}>
          <Text style={{ fontWeight: "400", fontSize: 12 }}>
            {comboOffers && comboOffers.description}
          </Text>
        </View>
      </View>

        {address ? (<TouchableOpacity style={{ backgroundColor: "red", padding: 15 }} onPress={() => proceedToBuy()}>
          <Text
            style={{ color: "#fff", fontWeight: "800", textAlign: "center" }}
          >
            Buy Now
          </Text>
        </TouchableOpacity>) : (<TouchableOpacity style={{ backgroundColor: "red", padding: 15 }} onPress={() => proceedToBuy()}>
          <Text
            style={{ color: "#fff", fontWeight: "800", textAlign: "center" }}
          >
            Proceed to Buy
          </Text>
        </TouchableOpacity>)}
    </ScrollView>
    </>
  );
}
