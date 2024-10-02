import { CorsStrategy } from "./cors.ts";

export class DennyCorsStrategy implements CorsStrategy {
  handle(_request: Request): Response {
    return new Response("CORS policy: denied", { status: 403 });
  }

  wrap(response: Response): Response {
    return response;
  }
}
