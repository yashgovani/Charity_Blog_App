import React from 'react';
import classes from './Login.module.css';
import Input from '../../component/Input/Input';
import Button from '../../component/Button/Button';
//import { userList } from '../../service/constants';
import * as actions from '../../store/action/index';
import { connect } from 'react-redux';
//import { Redirect } from 'react-router';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        email: {
          label: 'Email',
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Mail Address',
          },
          value: '',
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
          touched: false,
        },
        password: {
          label: 'Password',
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password',
          },
          value: '',
          validation: {
            required: true,
            minLength: 8,
            isPassword: true,
          },
          valid: false,
          touched: false,
        },
        userType: {
          label: 'Select user type',
          elementType: 'select',
          elementConfig: {
            options: [
              { value: 'Guest', displayValue: 'Guest' },
              { value: 'Charity', displayValue: 'Charity' },
              { value: 'Admin', displayValue: 'Admin' },
            ],
          },
          value: 'Guest',
          validation: {},
          valid: true,
        },
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userType !== this.props.userType) {
      if (this.props.userType === 'Admin') {
        this.props.history.push('/addpost');
      } else if (this.props.userType === 'Charity') {
        this.props.history.push('/addcharity');
      } else {
        this.props.history.push('/blogs');
      }
    }
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isPassword) {
      const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    console.log(this.state.controls.email.value);
    console.log(this.state.controls.password.value);
    console.log(this.state.controls.userType.value);
    /* for (let key in userList) {
      if (
        this.state.controls.email.value === userList[key].email &&
        this.state.controls.password.value === userList[key].password &&
        this.state.controls.userType.value === userList[key].userType
      ) {
        if (this.state.controls.userType.value === 'Guest') {
          this.props.history.push('/blogs');
        } else if (this.state.controls.userType.value === 'Charity') {
          this.props.history.push('/addcharity');
        } else if (this.state.controls.userType.value === 'Admin') {
          this.props.history.push('/addpost');
        } else {
          alert('you selected wrong user');
        }
      }
      console.log(userList[key].email);
    } */
    this.props.onLogin(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.controls.userType.value
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        isAdmin: !prevState.isAdmin,
      };
    });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementArray.map((formElement) => (
      <Input
        key={formElement.id}
        label={formElement.config.label}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangeHandler(event, formElement.id)}
      />
    ));

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userType: state.userType,
    email: state.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password, userType) =>
      dispatch(actions.login(email, password, userType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
