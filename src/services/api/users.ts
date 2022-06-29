import type { Api } from ".";
import {
  ContentType,
  HttpClient,
  type GenericErrorModel,
  type RequestParams,
} from "./HttpClient";

export interface LoginUserRequest {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  permissions: unknown;
  is_super: boolean;
  details: unknown;
}

export interface MultipleUserResponse {
  users: User[];
  total: number;
}

export class endpoints<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  constructor(apiContext: Api<SecurityDataType>) {
    super({ baseUrl: apiContext.baseUrl });
    Object.assign(this, apiContext);
  }
  getUsers = (query: {pageSize?: number, page?: number}, params: RequestParams = {}) =>
    this.request<MultipleUserResponse, void | GenericErrorModel>({
      path: `/user`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    })
}

export default endpoints;
