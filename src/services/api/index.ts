import { HttpClient } from "@/services/api/HttpClient";
import { endpoints as authEndpoints } from "@/services/api/auth";
import { endpoints as usersEndpoints } from "@/services/api/users";
import { endpoints as filesEndpoints } from "@/services/api/files";
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  auth = new authEndpoints(this);
  users = new usersEndpoints(this);
  files = new filesEndpoints(this);
}
