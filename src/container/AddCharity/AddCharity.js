import React from 'react';
import { connect } from 'react-redux';
import Button from '../../component/Button/Button';
import Input from '../../component/Input/Input';
import { charityList } from '../../service/constants';

class AddCharity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        userName: {
          label: 'User Name',
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'USER NAME',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        email: {
          label: 'email',
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Enter Email',
            disabled: true,
          },
          value: this.props.email,
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
          touched: false,
        },
        amount: {
          label: 'Amount',
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Enter Amount',
          },
          value: '',
          validation: {
            required: true,
            isNumeric: true,
          },
          valid: false,
          touched: false,
        },
        paymentMethod: {
          label: 'Payment Method',
          elementType: 'select',
          elementConfig: {
            options: [
              { value: 'Card', displayValue: 'Card' },
              { value: 'Net Banking', displayValue: 'Net Banking' },
              { value: 'UPI', displayValue: 'UPI' },
            ],
          },
          value: 'Card',
          validation: {},
          valid: true,
        },
        country: {
          label: 'Country',
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Country',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
      },
      formIsValid: false,
    };
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
    const updatedPost = {
      ...this.state.form,
      [controlName]: {
        ...this.state.form[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.form[controlName].validation
        ),
        touched: true,
      },
    };
    let formIsValid = true;
    for (let controlName in updatedPost) {
      formIsValid = updatedPost[controlName].valid && formIsValid;
    }
    this.setState({ form: updatedPost, formIsValid: formIsValid });
  };

  formSubmitHandler = (event) => {
    event.preventDefault();
    let dummyVariable = false;
    console.log(this.state.form.userName.value);
    console.log(this.state.form.email.value);
    console.log(this.state.form.amount.value);
    console.log(this.state.form.paymentMethod.value);
    console.log(this.state.form.country.value);
    for (let key in charityList) {
      if (this.state.form.email.value === charityList[key].email) {
        dummyVariable = true;
        break;
      } else {
        dummyVariable = false;
      }
    }
    if (dummyVariable === true) {
      alert('Your Charity is Already Created');
    } else {
      alert('Accepted');
    }
    //    this.props.history.push('/blogs');
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key],
      });
    }
    let form = (
      <form onSubmit={this.formSubmitHandler}>
        {formElementsArray.map((formElement) => (
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
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          SUBMIT
        </Button>
      </form>
    );
    return (
      <div>
        <h3 style={{ textAlign: 'center' }}>Donate Amount</h3>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
  };
};

export default connect(mapStateToProps)(AddCharity);
