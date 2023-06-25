import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "../screens/Home";

import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Cart from "../screens/Cart";
import Account from "../screens/Account";

const Bottom = createBottomTabNavigator();

export default function AppStack({route}) {

  const {url} = route.params

  return (
    <Bottom.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused
              ? "home"
              : "home-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarLabel: () => {}
      })}
    >
      <Bottom.Screen component={Home} name="Home" initialParams={{'url': url}} />
      <Bottom.Screen component={Cart} name="Cart" />
      <Bottom.Screen component={Account} name="Account" />
    </Bottom.Navigator>
  );
}
