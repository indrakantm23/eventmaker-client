import React from "react";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import AppTemplate from "./AppTemplate";
import { Router } from "./routing/Routing";
import { Provider } from "react-redux";
// import store from "./redux/store";
import "./App.scss";

const App = () => {
  return (
    // <Provider store={store}>
    <Router>
      <Header />
      <div style={{ minHeight: "calc(100vh - 220px)", paddingTop: 60 }}>
        <AppTemplate />
      </div>
      <Footer />
    </Router>
    // </Provider>
  );
};

export default App;
