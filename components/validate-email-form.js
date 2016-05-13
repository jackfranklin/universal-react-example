// write any logic for your form in one file that can be used on both the client and the server

export default function(email) {
  // IRL you probably want a better check!
  if (email.indexOf('@') > -1) {
    return {
      valid: true,
      email,
      errors: []
    }
  } else {
    return {
      valid: false,
      email,
      errors: [
        `Email address ${email} is not valid`
      ]
    }
  }
}
