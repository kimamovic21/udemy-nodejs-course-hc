class ApiError extends Error {
  statusCode: number;
  data: null;
  success: false;
  errors: string[];

  constructor(
    statusCode: number,
    message: string,
    errors: string[] = [],
    stack: string = '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    };

    Object.setPrototypeOf(this, ApiError.prototype);
  };
};

export default ApiError;