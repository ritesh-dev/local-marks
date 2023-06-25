import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import Providers from "./src";
import * as Linking from "expo-linking";

export default function App({ navigation }) {
  const url = Linking.useURL();

  const [vendorIdUrl, setvendorIdUrl] = useState(null);

  const handleURL = (url) => {
    const { hostname, path, queryParams } = Linking.parse(url);
    if (path === "vendor") {
      setvendorIdUrl(queryParams.id);
    }
  };

  useEffect(() => {
    if (url) {
      handleURL(url);
    }
  }, [url]);

  return <Providers url={vendorIdUrl} />;
}
