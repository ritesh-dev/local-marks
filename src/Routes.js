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

const Stack = createStackNavigator();

const Routes = () => {
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
            <Stack.Screen component={AppStack} name="Dashboard" />
            <Stack.Screen component={Subcategories} name="Subcategories" />
            <Stack.Screen component={VendorList} name="VendorList" />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
