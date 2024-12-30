interface SuccessResponse<T> {
  status: string;
  message: string;
  data?: T;
}

interface ErrorResponse {
  status: string;
  message: string;
  errors: any[];
}

export { SuccessResponse, ErrorResponse };
