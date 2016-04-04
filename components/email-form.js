import React from 'react';
import { Link } from 'react-router';
import validateEmailForm from './validate-email-form';

export default class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    const { success, errors, value } = props;
    this.state = {
      success,
      errors,
      value: value || ''
    };
    this.formSubmit = this.formSubmit.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  formSubmittedSuccessfully() {
    return this.state.success === true;
  }

  inputChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  resetForm(e) {
    e.preventDefault();
    this.setState({
      success: undefined,
      errors: [],
      value: ''
    });
  }

  formSubmit(e) {
    e.preventDefault();
    const emailValue = this.state.value;
    // note how this is the same validator we ran on the server!
    const result = validateEmailForm(emailValue);
    this.setState({
      errors: result.errors,
      success: result.valid
    });
  }

  renderErrorsList() {
    return this.state.errors.map((err) => {
      return (
        <li className="form-error" key={err}>
          <p>{err}</p>
        </li>
      );
    });
  }

  renderForm() {
    return (
      <form method="post" action="/submit-email-form" onSubmit={this.formSubmit}>

        <div className="field">
          <label>Your email address</label>
          <input
            onChange={this.inputChange}
            type="text" 
            value={this.state.value} 
            name="email" 
            placeholder="bob@bobscompany.com"
            ref="emailInput" />
        </div>
        <button type="submit">Send</button>
      </form>
    );
  }

  renderSuccess() {
    return (
      <div>
        <p>Thanks, {this.state.value} has been added to our totally cool list.</p>
        <a href="/about" onClick={this.resetForm}>Reset page</a>
      </div>
    )
  }

  renderErrors() {
    if (this.state.errors && this.state.errors.length > 0) {
      return (
        <div>
          <h5>There were errors submitting this form.</h5>
          <ul>{this.renderErrorsList()}</ul>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        { this.renderErrors() }
        { this.formSubmittedSuccessfully() ? this.renderSuccess() : this.renderForm() }
      </div>
    )
  }
}

EmailForm.propTypes = {
  success: React.PropTypes.bool,
  errors: React.PropTypes.arrayOf(React.PropTypes.string)
};
