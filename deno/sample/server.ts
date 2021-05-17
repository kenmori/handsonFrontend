import { serve } from "https://deno.land/std@0.96.0/http/server.ts";
const server = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of server) { // asyncが不要。トップレベルで
  req.respond({ body: "Hello World\n" });
}
