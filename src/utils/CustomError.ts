class CustomError extends Error {
    public statusCode;
    constructor(message:string, statusCode:number) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default CustomError;