/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, renderToString } from "https://deno.land/x/jsx/mod.ts";
import { listenAndServe } from "https://deno.land/std@0.111.0/http/mod.ts";

// Create a pattern that matches paths starting with /books/, followed by an integer.
const pattern = new URLPattern({ pathname: "/books/:id(\\d+)" });

function handler(req: Request): Response {
    const url = req.url;

    const match = pattern.exec(url);
    if (match) {
        console.log(match.pathname);
        const bookId = match.pathname.groups.id;
        return new Response(`Book: ${bookId}`)
    }

    return new Response(<h1>{"Not Found\nTry /books/123"}</h1>, { status: 404 });
}

await listenAndServe(":8080", handler);