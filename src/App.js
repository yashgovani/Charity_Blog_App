import React from 'react';
//import Auth from './container/Auth/Auth';
//import { blogListing } from './service/constants';
import Blog from './component/Blog/Blog';
import { Redirect, Route, Switch } from 'react-router';
import Login from './container/Login/Login';
import AddPost from './container/AddPost/AddPost';
import AddCharity from './container/AddCharity/AddCharity';
import { connect } from 'react-redux';
import Layout from './container/Layout/Layout';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/blogs" component={Blog} />
        <Redirect from="/" to="/login" />
      </Switch>
    );
    if (this.props.isAuthenticated && this.props.userType === 'Guest') {
      routes = (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/blogs" component={Blog} />
          <Route path="/addpost" component={AddPost} />
          <Redirect from="/" to="/login" />
        </Switch>
      );
    } else if (
      this.props.isAuthenticated &&
      (this.props.userType === 'Charity' || this.props.userType === 'Admin')
    ) {
      routes = (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/blogs" component={Blog} />
          <Route path="/addpost" component={AddPost} />
          <Route path="/addcharity" component={AddCharity} />
          <Redirect from="/" to="/login" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.email !== null,
    userType: state.userType,
  };
};

export default connect(mapStateToProps)(App);
