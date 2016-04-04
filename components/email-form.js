import React from 'react';

export default class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    const { success, errors, value } = props;
    this.state = {
      success,
      errors,
      value
    };
  }

  formSubmittedSuccessfully() {
    return this.state.success === true;
  }

  renderErrors() {
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
      <form method="post" action="/submit-email-form">

        <div className="field">
          <label>Your email address</label>
          <input type="text" defaultValue={this.state.value} name="email" placeholder="bob@bobscompany.com" />
        </div>
        <button type="submit">Send</button>
      </form>
    );
  }

  renderSuccess() {
    return (
      <div>
        <p>Thanks, {this.state.value} has been added to our totally cool list.</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        { this.state.errors && this.state.errors.length > 0 &&
          <div>
            <h5>There were errors submitting this form.</h5>
            <ul>{this.renderErrors()}</ul>
          </div>
        }
        { !this.formSubmittedSuccessfully() && this.renderForm() }
        { this.formSubmittedSuccessfully() && this.renderSuccess() }
      </div>
    )
  }
}

EmailForm.propTypes = {
  success: React.PropTypes.bool,
  errors: React.PropTypes.arrayOf(React.PropTypes.string)
};
