import { CorsStrategy } from "./cors.ts";

export class AllowCorsStrategy implements CorsStrategy {
  handle(_request: Request): Response {
    return new Response("CORS policy: allowed", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  wrap(response: Response): Response {
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
  }
}
