import React from 'react'; 
import { Route, Switch } from 'react-router-dom'; 
import { AuthRoute, ProtectedRoute } from '../util/route_util'; 

import '../App.scss'

import LandingContainer from './landing/landing_container'; 
import TripShowContainer from './trips/trip_show_container'; 
import PostcardShowContainer from './postcards/postcard_show_container'; 
import TripCreateContainer from './trips/trip_create_container';
import TripEditContainer from './trips/trip_edit_container';
import PostcardCreateContainer from './postcards/postcard_create_container';
import PostcardEditContainer from './postcards/postcard_edit_container';
import UserShowContainer from './users/user_show_container'; 
// import TripEditContainer from './trips/trip_edit_container';
import PingPage from './util/ping_page'; 

import ModalContainer from './util/modal_container';
import HeaderContainer from './headerFooter/header_container'; 
// import Footer from './headerFooter/footer'; 

const App = () => {

  return (
    <>
      <HeaderContainer />
      <ModalContainer />
      <Switch>
        <Route exact path="/dGVtcG9yYXJ5" component={PingPage}/>
        <Route path="/users/:userId/trips" component={UserShowContainer}/>
        <ProtectedRoute exact path="/trips/new" component={TripCreateContainer} />
        <ProtectedRoute exact path="/trips/:tripId/edit" component={TripEditContainer} />
        <ProtectedRoute exact path="/trips/:tripId/postcards/new" component={PostcardCreateContainer} />
        <ProtectedRoute exact path="/postcards/:postcardId/edit" component={PostcardEditContainer} />
        <Route exact path="/trips/:tripId/" component={TripShowContainer} />
        <Route exact path="/postcards/:postcardId/" component={PostcardShowContainer} />
        <Route path="/" component={LandingContainer} />
      </Switch>
    </>
  )

}; 

export default App; 