import React from 'react';
import EmailForm from './email-form';

export default class AboutComponent extends React.Component {
  constructor(props) {
    super(props);
    const { success, errors, value } = this.props.location.query;
    if (success) {
      this.emailFormProps = {
        success: success === "true",
        errors: errors && errors.split(',') || [],
        value
      }
    }
  }
  render() {
    return (
      <div>
        <p>A little bit about me.</p>
        <EmailForm {...this.emailFormProps} />
      </div>
    );
  }
}
