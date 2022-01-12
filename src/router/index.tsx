import { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
//import routes from "./config";
import { Styles } from "../styles/styles";
import Home from "../pages/Home";
import Locker from "../pages/Locker";
import Farm from "../pages/Farm";
//import Particles from "react-tsparticles";
//import particlesOptions from "../particles.json";
//import { ISourceOptions } from "tsparticles";

const Router = () => {
  return (
    <Suspense fallback={null}>
      
      <Styles />
      
      <Header />
      
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/Locker/:token/:owner">
          <Locker/>
        </Route>
        <Route path="/Locker/:token">
          <Locker/>
        </Route>
        <Route exact path="/Locker">
          <Locker/>
        </Route>
        <Route exact path="/Farms">
          <Farm/>
        </Route>
      </Switch>
      <Footer />
    </Suspense>
  );
};

export default Router;
