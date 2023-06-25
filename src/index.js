import React from "react";
import { AuthProvider } from "./AuthProvider";
import Routes from "./Routes";

const Providers = ({url}) => {
  return (
    <AuthProvider>
      <Routes url={url} />
    </AuthProvider>
  );
};

export default Providers;
