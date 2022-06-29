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
  accessToken?: string;
  email: string;
  first_name: string;
  last_name: string;
  permissions: unknown;
  is_super: boolean;
  details: unknown;
}

export class endpoints<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  constructor(apiContext: Api<SecurityDataType>) {
    super({ baseUrl: apiContext.baseUrl });
    Object.assign(this, apiContext);
  }
  login = (data: LoginUserRequest, params: RequestParams = {}) =>
    this.request<User, void | GenericErrorModel>({
      path: "/auth/login",
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}

export default endpoints;
