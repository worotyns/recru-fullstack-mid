export interface CorsStrategy {
  handle(request: Request): Response;
  wrap(response: Response): Response;
}
