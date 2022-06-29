import { Api } from "@/services/api";

export const limit = 10;

export const api = new Api({
  baseUrl: `http://localhost:3001/api`,
});

export function convertPageToOffset(page: number): {
  limit: number;
  offset: number;
} {
  return { limit: limit, offset: (page - 1) * limit };
}
