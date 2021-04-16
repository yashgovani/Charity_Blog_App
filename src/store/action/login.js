import * as actionTypes from './actionTypes';
import { userList } from '../../service/constants';

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const loginSuccess = (userType, email) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    userType: userType,
    email: email,
  };
};

export const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error,
  };
};

export const login = (email, password, userType) => {
  return (dispatch) => {
    let dummyVariable = false;
    dispatch(loginStart());
    for (let key in userList) {
      if (
        email === userList[key].email &&
        password === userList[key].password &&
        userType === userList[key].userType
      ) {
        localStorage.setItem('email', email);
        localStorage.setItem('userType', userType);
        dummyVariable = true;
        break;
      } else {
        dummyVariable = false;
      }
    }
    if (dummyVariable === true) {
      dispatch(loginSuccess(userType, email));
    } else {
      dispatch(loginFail('Something Wrong Occurs'));
    }
  };
};
