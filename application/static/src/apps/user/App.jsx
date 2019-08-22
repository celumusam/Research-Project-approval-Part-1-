import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import AddPage from '../../pages/AddPage';
import AppliedPage from '../../pages/AppliedPage';
import HomePage from '../../pages/HomePage';
import SavedPage from '../../pages/SavedPage';
import SearchPage from '../../pages/SearchPage';
import ProfilePage from '../../pages/ProfilePage';

/**
 * User single-page-application
 */
const App = () => {
  // TODO: Fetch user data and send to corresponding pages

  return (
    <Router>
      <Switch>
        <Route exact path="/user" component={HomePage} />
        <Route path="/user/add" component={AddPage} />
        <Route path="/user/applied" component={AppliedPage} />
        <Route path="/user/saved" component={SavedPage} />
        <Route path="/user/search" component={SearchPage} />
        <Route path="/user/profile" component={ProfilePage} />
      </Switch>
    </Router>
  );
};

export default App;
