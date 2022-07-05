import type { Api } from ".";
import {
  ContentType,
  HttpClient,
  type GenericErrorModel,
  type RequestParams,
} from "./HttpClient";

export interface Playlist {
  id: number;
  name: string;
  files: PlaylistFile[];
}

export interface PlaylistFile {
  fileId: number;
  duration: number;
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
  getPlaylist = (query: {playlistId: number}, params: RequestParams = {}) =>
    this.request<Playlist, void | GenericErrorModel>({
      path: `/playlist`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    })
  addFile = (data: {fileId: number, duration: number}, params: RequestParams = {}) =>
    this.request<UserLogin, void | GenericErrorModel>({
      path: "/playlist/addFile",
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  deleteMovie = (data: {fileId: number}, params: RequestParams = {}) =>
    this.request<UserLogin, void | GenericErrorModel>({
      path: "/playlist/deleteFile",
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

}

export default endpoints;
