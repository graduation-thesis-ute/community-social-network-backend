interface ISuccessResponse<T> {
  status: string;
  message: string;
  data?: T;
}

interface IErrorResponse {
  status: string;
  message: string;
  errors: any[];
}

export { ISuccessResponse, IErrorResponse };
