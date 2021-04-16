import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/blogs">Blogs</NavigationItem>
    {!props.isAuthenticated ? (
      <NavigationItem link="/login">Login</NavigationItem>
    ) : null}
    {props.isAuthenticated &&
    (props.user === 'Admin' || props.user === 'Charity') ? (
      <NavigationItem link="/addcharity">Charity</NavigationItem>
    ) : null}

    {props.isAuthenticated ? (
      <NavigationItem link="/addpost">Add Post</NavigationItem>
    ) : null}
  </ul>
);

export default NavigationItems;
