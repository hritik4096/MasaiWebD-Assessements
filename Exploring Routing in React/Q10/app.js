import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Users from './components/Users';
import UserDetails from './components/UserDetails';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Users} />
          <Route path="/users/:id" component={UserDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;