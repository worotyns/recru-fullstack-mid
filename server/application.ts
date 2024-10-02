import { Controller } from "./controllers/controller.ts";
import { AllowCorsStrategy } from "./cors/allow.ts";
import { CorsStrategy } from "./cors/cors.ts";
import { DennyCorsStrategy } from "./cors/denny.ts";

export type StopServer = () => Promise<void>;

export class ApplicationBuilder {
  private corsStrategy: CorsStrategy;
  private controllers: Controller[] = [];
  private port: number = 3000;

  constructor() {
    this.corsStrategy = new DennyCorsStrategy();
  }

  private useCorsStrategy(strategy: CorsStrategy): this {
    this.corsStrategy = strategy;
    return this;
  }

  withAllowCors(): this {
    this.useCorsStrategy(new AllowCorsStrategy());
    return this;
  }

  addController(controller: Controller): this {
    this.controllers.push(controller);
    return this;
  }

  bindOnPort(port: number): this {
    this.port = port;
    return this;
  }

  build() {
    return new Application(this.corsStrategy, this.controllers, this.port);
  }
}

class Application {
  private corsStrategy: CorsStrategy;
  private controllers: Controller[];

  constructor(corsStrategy: CorsStrategy, controllers: Controller[], public readonly port: number) {
    this.corsStrategy = corsStrategy;
    this.controllers = controllers;

    if (!port) {
      throw new Error('port is required')
    }
  }

  async handler(request: Request): Promise<Response> {
    if (request.method === "OPTIONS") {
      return this.corsStrategy.handle(request);
    }

    const url = new URL(request.url);

    const controller = this.controllers.find((ctrl) => {
      const paths = Array.isArray(ctrl.path) ? ctrl.path : [ctrl.path];
      return paths.includes(url.pathname);
    });

    if (controller) {
      return this.corsStrategy.wrap(
        await controller.handle(request),
      );
    }

    return new Response("Not found", { status: 404 });
  }

  async run(
    abortController: AbortController = new AbortController(),
  ): Promise<StopServer> {
    return new Promise((resolve, reject) => {
      try {
        Deno.serve({
          port: this.port,
          signal: abortController?.signal,
          onListen({ port, hostname }) {
            console.log(`Listening on http://${hostname}:${port}`);
            resolve(async () => {
              if (!abortController) {
                throw new Error("abortController is not defined");
              }
              abortController.abort();
            });
          },
        }, (req) => this.handler(req));
      } catch (error) {
        reject(error);
      }
    });
  }
}
