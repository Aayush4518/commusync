export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class AppError extends Error{
  statusCode: number
  constructor(message:string, statusCode= 500){
    super(message)
    this.statusCode= statusCode

    Error.captureStackTrace(this, this.constructor) //stack trace means the sequence of function calls that led to the error being thrown. It helps in debugging by showing the path the code took before encountering the error.
  }
}