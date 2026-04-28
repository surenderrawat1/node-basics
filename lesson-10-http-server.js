/**
 * LESSON 10: HTTP Server Fundamentals
 *
 * In this lesson, you'll learn:
 * 1. Creating a basic HTTP server
 * 2. Handling HTTP requests
 * 3. Sending HTTP responses
 * 4. Understanding request and response objects
 * 5. Parsing URLs and query parameters
 * 6. Handling different HTTP methods
 * 7. Setting response headers and status codes
 * 8. Serving static files
 */

console.log("=== LESSON 10: HTTP SERVER FUNDAMENTALS ===\\n");

const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

// ============================================
// 1. CREATING A BASIC HTTP SERVER
// ============================================

console.log("1. BASIC HTTP SERVER\n");

// Create server
const server = http.createServer((req, res) => {
  console.log("Request received: " + req.method + " " + req.url);

  // Send response
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from Node.js HTTP Server!");
});

// Start listening
const PORT = 3000;
server.listen(PORT, () => {
  console.log("✓ Server listening on http://localhost:" + PORT);
  console.log("  (will stay running for 30 seconds)");
});

// ============================================
// 2. REQUEST OBJECT
// ============================================

console.log("\n2. REQUEST OBJECT PROPERTIES\n");

const server2 = http.createServer((req, res) => {
  console.log("--- Request Details ---");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Headers:", req.headers);
  console.log("Query string:", req.url.split("?")[1] || "none");

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify(
      {
        method: req.method,
        url: req.url,
        timestamp: new Date().toISOString(),
      },
      null,
      2,
    ),
  );
});

// Don't start this one automatically (we already have server on 3000)

// ============================================
// 3. RESPONSE OBJECT
// ============================================

console.log("\n3. RESPONSE OBJECT METHODS\n");

console.log(`
Common response methods:
  • res.writeHead(statusCode, headers) - Set status and headers
  • res.write(data) - Write data to response body
  • res.end(data) - Write data and end response
  • res.setHeader(name, value) - Set individual header
  • res.statusCode = 200 - Set status code
`);

// ============================================
// 4. PARSING URL AND QUERY PARAMETERS
// ============================================

console.log("\n4. PARSING URLS & QUERY PARAMETERS\n");

const server3 = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  console.log("--- URL Parsing ---");
  console.log("Pathname:", pathname);
  console.log("Query params:", query);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ pathname, query }, null, 2));
});

// Example: http://localhost:3001/api/users?id=123&name=alice
// pathname = /api/users
// query = { id: '123', name: 'alice' }

// ============================================
// 5. HANDLING DIFFERENT HTTP METHODS
// ============================================

console.log("\n5. HANDLING HTTP METHODS\n");

const server4 = http.createServer((req, res) => {
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("GET request received");
  } else if (req.method === "POST") {
    res.writeHead(201, { "Content-Type": "text/plain" });
    res.end("POST request received");
  } else if (req.method === "PUT") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("PUT request received");
  } else if (req.method === "DELETE") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("DELETE request received");
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method not allowed");
  }
});

// ============================================
// 6. HANDLING REQUEST BODY (POST DATA)
// ============================================

console.log("\n6. HANDLING POST BODY DATA\n");

const server5 = http.createServer((req, res) => {
  if (req.method === "POST") {
    let body = "";

    // Collect data chunks
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // When all data is received
    req.on("end", () => {
      console.log("POST body received:", body);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ received: body }, null, 2));
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Send a POST request with body");
  }
});

// ============================================
// 7. RESPONSE STATUS CODES & HEADERS
// ============================================

console.log("\n7. STATUS CODES & HEADERS\n");

const server6 = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;

  if (pathname === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html",
      "X-Custom-Header": "MyValue",
    });
    res.end("<h1>Home Page</h1>");
  } else if (pathname === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>About Page</h1>");
  } else if (pathname === "/not-found") {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  } else if (pathname === "/redirect") {
    res.writeHead(301, { Location: "/" });
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

// ============================================
// 8. SERVING STATIC FILES
// ============================================

console.log("\n8. SERVING STATIC FILES\n");

async function createStaticServer() {
  // Create a test HTML file
  const htmlDir = path.join(__dirname, "public");
  if (!fs.existsSync(htmlDir)) {
    fs.mkdirSync(htmlDir);
  }

  const indexFile = path.join(htmlDir, "index.html");
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Node.js Server</title>
    </head>
    <body>
      <h1>Welcome to Node.js Server</h1>
      <p>This file is served from disk!</p>
    </body>
    </html>
  `;

  fs.writeFileSync(indexFile, htmlContent);

  const server7 = http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;

    let filePath = path.join(
      htmlDir,
      pathname === "/" ? "index.html" : pathname,
    );

    // Security: prevent directory traversal
    if (!filePath.startsWith(htmlDir)) {
      res.writeHead(403, { "Content-Type": "text/plain" });
      res.end("Forbidden");
      return;
    }

    // Try to serve the file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  });

  console.log("Static file server ready (not started)");
}

createStaticServer();

// ============================================
// 9. ROUTING
// ============================================

console.log("\n9. SIMPLE ROUTING\n");

const server8 = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;

  // Simple router
  const routes = {
    "/": () => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Home");
    },
    "/api/users": () => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify([
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
        ]),
      );
    },
    "/api/posts": () => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify([
          { id: 1, title: "Post 1" },
          { id: 2, title: "Post 2" },
        ]),
      );
    },
  };

  if (routes[pathname]) {
    routes[pathname]();
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

// ============================================
// 10. PRACTICE EXERCISES
// ============================================

console.log("\n10. PRACTICE EXERCISES\n");

console.log("Exercise 1 - Simple HTTP server (active):");
console.log("  ✓ Server running on http://localhost:3000");

console.log("\nExercise 2 - Try these requests:");
console.log("  • curl http://localhost:3000/");
console.log("  • curl http://localhost:3000/hello");
console.log("  • curl http://localhost:3000/api");

// ============================================
// 11. PRACTICAL EXAMPLE: TODO API
// ============================================

console.log("\n11. PRACTICAL EXAMPLE: Simple Todo API\n");

let todos = [];
let nextId = 1;

const todoServer = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  res.setHeader("Content-Type", "application/json");

  // GET /todos - List all
  if (pathname === "/todos" && req.method === "GET") {
    res.writeHead(200);
    res.end(JSON.stringify(todos, null, 2));
  }
  // POST /todos - Create new
  else if (pathname === "/todos" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const todo = { id: nextId++, ...data };
        todos.push(todo);
        res.writeHead(201);
        res.end(JSON.stringify(todo));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  }
  // GET /todos/:id - Get one
  else if (pathname.startsWith("/todos/") && req.method === "GET") {
    const id = parseInt(pathname.split("/")[2]);
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      res.writeHead(200);
      res.end(JSON.stringify(todo));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Not found" }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

console.log("Todo API server created (not started)");
console.log("Would handle: GET/POST /todos, GET /todos/:id");

// ============================================
// 12. KEY TAKEAWAYS
// ============================================

setTimeout(() => {
  console.log("\n=== KEY TAKEAWAYS ===");
  console.log("✓ http.createServer() creates an HTTP server");
  console.log("✓ Request object has method, url, headers");
  console.log("✓ Response: writeHead(), write(), end()");
  console.log("✓ Parse URLs with url.parse()");
  console.log("✓ Check req.method for GET, POST, etc.");
  console.log("✓ Handle POST body with data events");
  console.log("✓ Set proper status codes (200, 404, 500, etc.)");

  console.log("\n✓ This is the foundation for web frameworks!");
  console.log("➜ Next: Express.js, REST APIs, and beyond");
  console.log("   (Express builds on these HTTP concepts)");

  console.log("\nServer will stop in 5 seconds...");

  setTimeout(() => {
    server.close();
    console.log("Server closed. Goodbye!\\n");
  }, 5000);
}, 1000);
