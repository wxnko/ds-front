import type { Api } from ".";
import {
  ContentType,
  HttpClient,
  type GenericErrorModel,
  type RequestParams,
} from "./HttpClient";

export interface File {
  id: number;
  url: string;
  size: string;
  default_time: number;
  created_at: string;
  name: string;
}

export interface MultipleFileResponse {
  files: File[];
  total: number;
}

export class endpoints<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  constructor(apiContext: Api<SecurityDataType>) {
    super({ baseUrl: apiContext.baseUrl });
    Object.assign(this, apiContext);
  }
  getFiles = (query: {pageSize?: number, page?: number}, params: RequestParams = {}) =>
    this.request<MultipleFileResponse, void | GenericErrorModel>({
      path: `/files`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    })
  getFile = (query: {fileId: number}, params: RequestParams = {}) =>
    this.request<MultipleFileResponse, void | GenericErrorModel>({
      path: `/files/${query.fileId}`,
      method: "GET",
      query: query,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    })
}

export default endpoints;
