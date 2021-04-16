import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  userType: null,
  email: null,
  error: null,
  loading: false,
};

const loginStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const loginSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    email: action.email,
    userType: action.userType,
  });
};

const loginFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return loginStart(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL:
      return loginFail(state, action);
    default:
      return state;
  }
};

export default reducer;
