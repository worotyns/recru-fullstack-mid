import { ApplicationBuilder } from "./application.ts";
import { ClientRenderController } from "./controllers/client_render_controller.ts";
import { StreamController } from "./controllers/stream_controller.ts";

// Run "client" as standalone app
const client = new ApplicationBuilder()
  .addController(new ClientRenderController())
  .bindOnPort(8080)
  .build();

// Run "server" as standalone app
const server = new ApplicationBuilder()
  .addController(new StreamController())
  .bindOnPort(4000)
  .build();

await Promise.all([
  client.run(),
  server.run(),
]);
