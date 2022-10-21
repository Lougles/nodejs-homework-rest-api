class MyError extends Error {
  constructor(message){
    super(message);
    this.status = 400;
  }
}
class validationError extends MyError {
  constructor(message){
    super(message);
    this.status = 400;
  }
}

module.exports = {
  MyError,
  validationError
}