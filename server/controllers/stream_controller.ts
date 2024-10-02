import { Controller } from "./controller.ts";

export class StreamController implements Controller {
  path = "/stream";

  private async delayedGen(value: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return value;
  }

  async handle(_request: Request): Promise<Response> {
    const body: ReadableStreamBYOBReader = new ReadableStream({
      start: async (controller) => {
        const encoder = new TextEncoder();
        for (const value of ["foo", "bar", "baz"]) {
          await this.delayedGen(value);
          controller.enqueue(encoder.encode(value + "\n"));
        }
        controller.close();
      },
    });
    return new Response(body, { headers: { "content-type": "text/plain" } });
  }
}
