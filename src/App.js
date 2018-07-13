import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

// Styles
import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

// Layouts
import Home from './layouts/home/Home';
import Header from './layouts/header/Header';
import GetRecord from './user/layouts/getrecord/GetRecord';
import Search from './user/layouts/search/Search';
import Permission from './user/layouts/permissions/Permissions';

import ProtectedRoute from './ProtectedRoute';

const history = createHistory({
  basename: '',
});

class App extends Component {
  componentDidMount () {
    this.props.authenticate();
  }

  render () {
    const { isAuthenticated, authError } = this.props;

    return (
      <div className='App'>
        <Header history={history} />
        <Router history={history}>
          <Switch>
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              path='/get_record'
              authError={authError}
              component={GetRecord}
            />
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              path='/search'
              authError={authError}
              component={Search}
            />
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              path='/permissions'
              authError={authError}
              component={Permission}
            />
            <Route
              exact
              path='*'
              render={() => <Home authError={authError} />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
