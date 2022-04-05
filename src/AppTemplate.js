import React from "react";
import lodable from "@loadable/component";

import { Switch, Route } from "./routing/Routing";
import * as Routes from "./routing/routes";

const AsyncDashboard = lodable(() => import("./components/Dashboard"));
const AsyncCreateAnEvent = lodable(() => import("./components/CreateEvent"));
const AsyncSignUp = lodable(() => import("./auth/Signup"));
const AsyncLogin = lodable(() => import("./auth/Login"));
const AsyncEvent = lodable(() => import("./components/Event"));
const AsyncEditEvent = lodable(() => import("./components/EditEvent"));
const AsyncAbout = lodable(() => import("./components/pages/About"));
const AsyncPricing = lodable(() => import("./components/pages/Pricing"));
const AsyncContactUs = lodable(() => import("./components/pages/ContactUs"));
const AsyncWallet = lodable(() => import("./components/pages/Wallet"));
const AsyncMyBookings = lodable(() => import("./components/pages/MyBookings"));
const AsyncMyEvents = lodable(() => import("./components/pages/MyEvents"));
const AsyncEvents = lodable(() => import("./components/Events"));
const AsyncLogout = lodable(() => import("./components/Logout"));

const AppTemplate = () => (
  <React.Fragment>
    <Switch>
      <Route exact path={Routes.Home} component={AsyncDashboard} />
      <Route exact path={Routes.CreateEvent} component={AsyncCreateAnEvent} />
      <Route exact path={Routes.SignUp} component={AsyncSignUp} />
      <Route exact path={Routes.Login} component={AsyncLogin} />
      <Route exact path={Routes.Event} component={AsyncEvent} />
      <Route exact path={Routes.Events} component={AsyncEvents} />
      <Route exact path={Routes.About} component={AsyncAbout} />
      <Route exact path={Routes.Pricing} component={AsyncPricing} />
      <Route exact path={Routes.ContactUs} component={AsyncContactUs} />
      <Route exact path={Routes.Wallet} component={AsyncWallet} />
      <Route exact path={Routes.MyBookings} component={AsyncMyBookings} />
      <Route exact path={Routes.MyEvents} component={AsyncMyEvents} />
      <Route exact path={Routes.EditEvent} component={AsyncEditEvent} />
      <Route exact path={Routes.Logout} component={AsyncLogout} />
    </Switch>
  </React.Fragment>
);

export default AppTemplate;
