export interface Controller {
  path: string | string[];
  handle(request: Request): Promise<Response>;
}
