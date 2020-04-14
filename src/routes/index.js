import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Routes";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import SignOut from "../pages/SignOut";

import LinkSpotify from "../pages/LinkSpotify";

import Friends from "../pages/Friends";

import RateTrack from "../pages/RateTrack";
import Ratings from "../pages/Ratings";

import EditRate from "../pages/EditRate";

import Dashboard from "../pages/Dashboard";

import Profile from "../pages/Profile";
import ViewRate from "../pages/ViewRate";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/logout" component={SignOut} />

      <Route path="/linkspotify" component={LinkSpotify} />

      <Route path="/friends" component={Friends} />
      
      <Route path="/rate/track/:content_id" component={RateTrack}/>
      <Route path="/ratings" component={Ratings} />

      <Route path="/edit/track/:content_id" component={EditRate} />

      <Route path="/dashboard" component={Dashboard} />

      <Route path="/profile/:user_id" component={Profile} />
      <Route path="/view/:user_id/:content_id/:id" component={ViewRate} />

      {/* 404 redirects to SignIn */}
      <Route component={Dashboard} />
    </Switch>
  );
}
