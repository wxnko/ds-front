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

export interface UpdateUser {
  id:number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_super: boolean;
}
export interface UserResponse {
  id:number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_super: boolean;
}
export interface AddUser {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_super: boolean;
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
  getUser = (query: {userId: number}, params: RequestParams = {}) =>
    this.request<UserResponse, void | GenericErrorModel>({
      path: `/user/${query.userId}`,
      method: "GET",
      query: query,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    })
  updateUser = (query: UpdateUser, params: RequestParams = {}) =>
    this.request<UserResponse, void | GenericErrorModel>({
      path: `/user/${query.id}`,
      method: "PATCH",
      body: query,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    })
  newUser = (query: UpdateUser, params: RequestParams = {}) =>
    this.request<UserResponse, void | GenericErrorModel>({
      path: `/user/`,
      method: "POST",
      body: query,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    })
}

export default endpoints;
