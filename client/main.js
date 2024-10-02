globalThis.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Ready");
  document.getElementById("fetch-btn")?.addEventListener(
    "click",
    async () => {
      const response = await fetch("http://localhost:4000/stream");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        document.getElementById("output").value += decoder.decode(value, {
          stream: true,
        });
      }
    },
  );
});
