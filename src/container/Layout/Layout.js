import classes from './Layout.module.css';
import React from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../component/navigation/Toolbar/Toolbar';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Toolbar
          isAuth={this.props.isAuthenicated}
          user={this.props.userType}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenicated: state.email !== null,
    userType: state.userType,
  };
};

export default connect(mapStateToProps)(Layout);
