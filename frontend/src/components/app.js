import React from 'react'; 
import { Route, Switch } from 'react-router-dom'; 
import { AuthRoute, ProtectedRoute } from '../util/route_util'; 

import '../App.scss'

import LandingContainer from './landing/landing_container'; 
import TripShowContainer from './trips/trip_show_container'; 
// import PostcardShowContainer from './postcards/postcard_show_container'; 
import TripCreateContainer from './trips/trip_create_container';
// import TripEditContainer from './trips/trip_edit_container';
// import PostcardCreateContainer from './postcards/postcard_create_container';
// import PostcardEditContainer from './postcards/postcard_edit_container';

import ModalContainer from './util/modal_container';
import HeaderContainer from './headerFooter/header_container'; 
// import Footer from './headerFooter/footer'; 

const App = () => {

  return (
    <>
      <HeaderContainer />
      <ModalContainer />
      <Switch>
        <ProtectedRoute exact path="/trips/new" component={TripCreateContainer} />
        <Route exact path="/trips/:tripId/" component={TripShowContainer} />
        {/* <Route to="/postcards/:postcardId/" component={PostcardShowContainer} /> */}
        {/* <Route to="/trips/edit" component={TripEditContainer} /> */}
        {/* <Route to="/postcards/new" component={PostcardCreateContainer} /> */}
        {/* <Route to="/postcards/edit" component={PostcardEditContainer} /> */}
        {/* <Route to="/login" component={LoginFormContainer} />
        <Route to="/signup" component={SignupFormContainer} /> */}
        <Route path="/" component={LandingContainer} />
      </Switch>
      {/* <Footer /> */}
    </>
  )

}; 

export default App; 