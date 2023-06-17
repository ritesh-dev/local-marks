import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import Header from "../components/Header";
import { WebView } from 'react-native-webview';

export default function PaymentWebview({ navigation, route }) {
  const { p_url } = route.params;

  handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    console.log(url);
    if (!url) return;

    // redirect somewhere else
    if (url.includes('payment-success')) {
        navigation.navigate('PaymentSuccess')
    }
  };

  return (
    <ScrollView>
      <Header navigation={navigation} />

      <WebView onNavigationStateChange={handleWebViewNavigationStateChange} source={{uri: p_url}} style={{height: Dimensions.get('screen').height, width: '100%'}} />
    </ScrollView>
  );
}
