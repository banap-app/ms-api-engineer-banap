import { FieldErrors } from '../validators/validator-rules';

export interface ApiResponse<T> {
  data: T;
  metadata?: {};
  statusCode: number;
  message?: string;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  errors?: FieldErrors[];
  timestamp?: string;
  path?: string;
}
