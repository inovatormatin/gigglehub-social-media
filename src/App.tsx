import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./configs/apolloClient";
import Router from "./routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      {/* For notifications */}
      <ToastContainer
        position="top-right"
        className="custom-toast-container"
        style={{
          left: "auto",
          top: "15px",
          overflow: "hidden",
          borderRadius: "10px",
        }}
        theme="colored"
      />
      <Router />
    </ApolloProvider>
  );
};

export default App;