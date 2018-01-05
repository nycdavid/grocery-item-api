class ErrorSerializer {
  constructor(error) {
    this.errorsObj = error;
    this.body = populateKeys(this.errorsObj);
  }

  statusCode() {
    return mapErrorToStatus(this.body[0].error);
  }
}

function populateKeys(errorsObj) {
  const errorKeys = Object.keys(errorsObj.errors);
  let body = [];
  errorKeys.forEach(key => {
    let err = errorsObj.errors[key];
    body.push({ attribute: key, error: err });
  });
  return body;
}

function mapErrorToStatus(errorObj) {
  switch (errorObj.name) {
    case 'ValidatorError':
      return 400;
    default:
      return 500;
  }
}

module.exports = ErrorSerializer;
