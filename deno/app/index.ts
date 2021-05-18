import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const port = 8001
console.log(`server running on port ${port}`)
app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port });