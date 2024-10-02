import { assertEquals } from "jsr:@std/assert";
import { ApplicationBuilder } from "./application.ts";
import { StreamController } from "./controllers/stream_controller.ts";

Deno.test("StreamController should return a streaming response", async () => {
  const app = new ApplicationBuilder()
    .addController(new StreamController())
    .build();

  const port = 4000;
  const stopServer = await app.run(port);
  const response = await fetch(`http://localhost:${port}/stream`);

  assertEquals(response.status, 200);

  assertEquals(response.headers.get("content-type"), "text/plain");

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let result = "";

  if (reader) {
    let streamChunk;

    // Keep reading the stream until `done` is true
    while (!(streamChunk = await reader.read()).done) {
      // Append each chunk to the result
      result += decoder.decode(streamChunk.value, { stream: true });
    }

    // Final flush of the decoder after the stream is fully read
    result += decoder.decode(); // Flush remaining buffered data
  }

  assertEquals(result, "foo\nbar\nbaz\n");

  stopServer();
});
