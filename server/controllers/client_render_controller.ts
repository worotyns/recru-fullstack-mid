import { Controller } from "./controller.ts";

export class ClientRenderController implements Controller {
  path = ["/", "/index.html", "/main.js"];

  async handle(request: Request): Promise<Response> {
    const url = new URL(request.url);
    let filepath = decodeURIComponent(url.pathname);

    try {
      if (filepath === "/") {
        filepath = "/index.html";
      }
      const file = await Deno.open(Deno.cwd() + "/client" + filepath, {
        read: true,
      });

      return new Response(file.readable, {
        headers: {
          "content-type": filepath.endsWith(".js")
            ? "application/javascript"
            : "text/html",
        },
      });
    } catch {
      return new Response("404 Not Found", { status: 404 });
    }
  }
}
