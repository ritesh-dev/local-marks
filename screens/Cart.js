import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import axios from "axios";
import { AuthContext } from "../src/AuthProvider";
import { useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function Cart({ navigation }) {
  const { user } = useContext(AuthContext);

  const [cart, setcart] = useState(null);
  const [address, setaddress] = useState(null);
  const [total, settotal] = useState(0);

  

  const isFocused = useIsFocused();

  const getCart = () => {
    axios
      .post(
        "https://local-marks.com/api/v1/get-cart-details",
        {
          user_id: user ? user.id : '',
        },
        {
          headers: {
            "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
          },
        }
      )
      .then((res) => {
        setcart(res.data.data);
        let tot = 0;
        res.data.data.every((item) => {
          tot += (parseInt(item.variant_details.variant.regular_price) - (parseInt(item.variant_details.variant.regular_price) * parseInt(item.variant_details.variant.discount) * 0.01)) * item.cart.quantity
          return true
        })
        settotal(tot)
      });
  };

  const updateCart = (id, qty) => {
    axios
      .post(
        "https://local-marks.com/api/v1/update-cart",
        {
          id: id,
          quantity: qty
        },
        {
          headers: {
            "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
          },
        }
      )
      .then((res) => {
        getCart()
      });
  };

  const removeCart = (id) => {
    axios
      .post(
        "https://local-marks.com/api/v1/remove-cart",
        {
          id: id
        },
        {
          headers: {
            "custom-token": "295828be2ad95b95abcfe20ed09d4df8",
          },
        }
      )
      .then((res) => {
        getCart()
      });
  };

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
        }

      });
    }
  };

  const placeOrder = () => {
    if(user){
      axios
      .post(
        "https://local-marks.com/api/v1/checkout?api_token="+user.api_token,
        {
          payment: 'online',
          shipping_id: address.id
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
          console.log("----------");
          console.log(res.data);
        }

      });
    }
  }

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
    setaddress(null)
    getCart();
    getShipping()
  }, [isFocused]);

  return (
    <ScrollView>
      <Header navigation={navigation} />

      <FlatList
        data={cart}
        keyExtractor={(item) => item.cart.id}
        renderItem={({ item }) => {
          return (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  marginTop: 10,
                }}
              >
                <View style={{ padding: 10 }}>
                  <Image
                    source={{ uri: item.product_details.product_image }}
                    style={{ width: 80, height: 80 }}
                  />
                </View>
                <View style={{ justifyContent: "space-around", padding: 10 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {item.product_details.product_name}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        textDecorationStyle: "solid",
                        textDecorationLine: "line-through",
                      }}
                    >
                      {item.variant_details.variant.regular_price}
                    </Text>
                    <Text style={{ marginLeft: 10 }}>
                      {item.variant_details.variant.regular_price -
                        item.variant_details.variant.regular_price *
                          item.variant_details.variant.discount *
                          0.01}
                    </Text>
                    <Text style={{ marginLeft: 10 }}>
                      / {item.variant_details.variant.weight}g
                    </Text>
                  </View>
                  <Text style={{ color: "red" }}>Shipping: Free Shipping</Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{width:'40%'}}>
                  <Picker
                    selectedValue={item.cart.quantity}
                    onValueChange={(itemValue) => {
                      updateCart(item.cart.id, itemValue)
                    }}
                  >
                    <Picker.Item label="1" value={1} />
                    <Picker.Item label="2" value={2} />
                    <Picker.Item label="3" value={3} />
                    <Picker.Item label="4" value={4} />
                    <Picker.Item label="5" value={5} />
                    <Picker.Item label="6" value={6} />
                    <Picker.Item label="7" value={7} />
                    <Picker.Item label="8" value={8} />
                    <Picker.Item label="9" value={9} />
                    <Picker.Item label="10" value={10} />
                  </Picker>
                </View>
                <View style={{padding: 10}}>
                  <TouchableOpacity onPress={() => removeCart(item.cart.id)}>
                    <MaterialCommunityIcons color="red" size={18} name="trash-can" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />

      <View style={{backgroundColor: '#fff', padding: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontWeight: '800'}}>Delivery Address</Text>
          {address && (
            <TouchableOpacity>
              <Text style={{fontWeight: '800', color: 'green'}}>Change</Text>
            </TouchableOpacity>
          )}

          {!address && (
            <TouchableOpacity onPress={() => navigation.navigate('ShippingScreen')}>
              <Text style={{fontWeight: '800', color: 'green'}}>Add</Text>
            </TouchableOpacity>
          )}
        </View>

        {address && (
          <View>
            <Text>{address.email}</Text>
            <Text>{address.mobile_no}</Text>
            <Text>{address.address}</Text>
          </View>
        )}
      </View>

      <View style={{backgroundColor: '#fff', padding: 10, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
        <Text style={{fontWeight: '800', fontSize: 18}}>Total: </Text>
        <Text style={{fontSize: 16}}>{total}</Text>
      </View>

      {address && (
        <View style={{padding: 10, marginTop: 10}}>
          <TouchableOpacity style={{backgroundColor: '#000', padding: 10}} onPress={() => placeOrder()}>
            <Text style={{color: '#fff', textAlign: 'center', fontWeight: '800'}}>Proceed to Buy</Text>
          </TouchableOpacity>
        </View>
      )}

    </ScrollView>
  );
}
