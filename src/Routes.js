import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, ActivityIndicator, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./AuthProvider";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import AppStack from "./AppStack";
import Subcategories from "../screens/Subcategories";
import VendorList from "../screens/VendorList";
import VendorDetails from "../screens/VendorDetails";
import ProductDetails from "../screens/ProductDetails";
import ComboDetails from "../screens/ComboDetails";
import ShippingScreen from "../screens/ShippingScreen";
import PaymentWebview from "../screens/PaymentWebview";
import PaymentSuccess from "../screens/PaymentSuccess";
import MyOrders from "../screens/MyOrders";
import MyPlans from "../screens/MyPlans";
import Gallery from "../screens/Gallery";
import VendorDetailId from "../screens/VendorDetailId";
import MyBookings from "../screens/MyBookings";
import ComboOfferList from "../screens/ComboOfferList";
import SearchScreen from "../screens/SearchScreen";

const Stack = createStackNavigator();

const Routes = ({url}) => {
  const { user, setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('user').then((value) => {
      if (value) {
        setUser(JSON.parse(value));
      }
      setLoading(false)
    });
  }, []);

  if (loading) {
    return (
      <SafeAreaView>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Loading</Text>
        </View>
      </SafeAreaView>
    );
  } 

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen component={Login} name="Login" />
            <Stack.Screen component={Register} name="Register" />
            <Stack.Screen component={AppStack} name="Dashboard" initialParams={{'url':url}}/>
            <Stack.Screen component={Subcategories} name="Subcategories" />
            <Stack.Screen component={VendorList} name="VendorList" />
            <Stack.Screen component={VendorDetails} name="VendorDetails" />
            <Stack.Screen component={ComboOfferList} name="ComboOfferList" />
            <Stack.Screen component={ProductDetails} name="ProductDetails" />
            <Stack.Screen component={ComboDetails} name="ComboDetails" />
            <Stack.Screen component={ShippingScreen} name="ShippingScreen" />
            <Stack.Screen component={PaymentWebview} name="PaymentWebview" />
            <Stack.Screen component={PaymentSuccess} name="PaymentSuccess" />
            <Stack.Screen component={MyOrders} name="MyOrders" />
            <Stack.Screen component={MyPlans} name="MyPlans" />
            <Stack.Screen component={Gallery} name="Gallery" />
            <Stack.Screen component={VendorDetailId} name="VendorDetailId" />
            <Stack.Screen component={MyBookings} name="MyBookings" />
            <Stack.Screen component={SearchScreen} name="SearchScreen" />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
