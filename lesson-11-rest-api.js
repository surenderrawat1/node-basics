/**
 * LESSON 11: Building a REST API
 *
 * In this lesson, you'll learn:
 * 1. REST principles and conventions
 * 2. Building a complete REST API
 * 3. CRUD operations (Create, Read, Update, Delete)
 * 4. HTTP methods and status codes
 * 5. Handling errors properly
 * 6. Using JSON for data exchange
 */

console.log("=== LESSON 11: BUILDING A REST API ===\\n");

const http = require("http");
const url = require("url");

// ============================================
// 1. REST PRINCIPLES
// ============================================

console.log("1. REST PRINCIPLES\n");

console.log(`
REST (Representational State Transfer) uses:
  
METHODS:
  • GET    - Retrieve data
  • POST   - Create new data
  • PUT    - Update existing data
  • DELETE - Remove data
  
STATUS CODES:
  • 200 OK - Request successful
  • 201 Created - Resource created
  • 400 Bad Request - Invalid input
  • 404 Not Found - Resource doesn't exist
  • 500 Internal Server Error
  
ROUTES:
  • /api/resource - Collection
  • /api/resource/123 - Specific item
`);

// ============================================
// 2. SAMPLE DATA: IN-MEMORY DATABASE
// ============================================

console.log("\n2. IN-MEMORY DATABASE\n");

let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

let nextUserId = 3;

console.log("Sample users:", users);

// ============================================
// 3. BUILDING THE REST API
// ============================================

console.log("\n3. BUILDING A REST API\n");

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Content-Type", "application/json");

  console.log(req.method + " " + pathname);

  // =========================================
  // GET /api/users - Get all users
  // =========================================
  if (pathname === "/api/users" && req.method === "GET") {
    res.writeHead(200);
    res.end(JSON.stringify(users, null, 2));
  }

  // =========================================
  // GET /api/users/:id - Get specific user
  // =========================================
  else if (pathname.match(/^\/api\/users\/\\d+$/) && req.method === "GET") {
    const id = parseInt(pathname.split("/")[3]);
    const user = users.find((u) => u.id === id);

    if (user) {
      res.writeHead(200);
      res.end(JSON.stringify(user, null, 2));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "User not found" }));
    }
  }

  // =========================================
  // POST /api/users - Create new user
  // =========================================
  else if (pathname === "/api/users" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const newUserData = JSON.parse(body);

        // Validation
        if (!newUserData.name || !newUserData.email) {
          res.writeHead(400);
          res.end(
            JSON.stringify({
              error: "name and email are required",
            }),
          );
          return;
        }

        const newUser = {
          id: nextUserId++,
          name: newUserData.name,
          email: newUserData.email,
        };

        users.push(newUser);

        res.writeHead(201, { Location: "/api/users/" + newUser.id });
        res.end(JSON.stringify(newUser, null, 2));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  }

  // =========================================
  // PUT /api/users/:id - Update user
  // =========================================
  else if (pathname.match(/^\/api\/users\/\\d+$/) && req.method === "PUT") {
    const id = parseInt(pathname.split("/")[3]);
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const updateData = JSON.parse(body);
        const user = users.find((u) => u.id === id);

        if (!user) {
          res.writeHead(404);
          res.end(JSON.stringify({ error: "User not found" }));
          return;
        }

        // Update only provided fields
        if (updateData.name) user.name = updateData.name;
        if (updateData.email) user.email = updateData.email;

        res.writeHead(200);
        res.end(JSON.stringify(user, null, 2));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  }

  // =========================================
  // DELETE /api/users/:id - Delete user
  // =========================================
  else if (pathname.match(/^\/api\/users\/\\d+$/) && req.method === "DELETE") {
    const id = parseInt(pathname.split("/")[3]);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "User not found" }));
      return;
    }

    const deleted = users.splice(index, 1);
    res.writeHead(200);
    res.end(
      JSON.stringify(
        {
          message: "User deleted",
          user: deleted[0],
        },
        null,
        2,
      ),
    );
  }

  // =========================================
  // 404 - Route not found
  // =========================================
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

// ============================================
// 4. START SERVER
// ============================================

const PORT = 3001;
server.listen(PORT, () => {
  console.log("\\n✓ REST API Server running on http://localhost:" + PORT);
  console.log("\\nAvailable endpoints:\\n");
  console.log("GET    /api/users        - Get all users");
  console.log("GET    /api/users/:id    - Get specific user");
  console.log("POST   /api/users        - Create new user");
  console.log("PUT    /api/users/:id    - Update user");
  console.log("DELETE /api/users/:id    - Delete user");
  console.log("\\nExample cURL commands:\\n");
  console.log("# List all users");
  console.log("curl http://localhost:" + PORT + "/api/users");
  console.log("\\n# Get user 1");
  console.log("curl http://localhost:" + PORT + "/api/users/1");
  console.log("\\n# Create new user");
  console.log("curl -X POST http://localhost:" + PORT + "/api/users \\\\");
  console.log('  -H "Content-Type: application/json" \\\\');
  console.log('  -d \'{"name":"Charlie","email":"charlie@example.com"}\'');
  console.log("\\n# Update user 1");
  console.log("curl -X PUT http://localhost:" + PORT + "/api/users/1 \\\\");
  console.log('  -H "Content-Type: application/json" \\\\');
  console.log('  -d \'{"name":"Alice Updated\"}\'');
  console.log("\\n# Delete user 2");
  console.log("curl -X DELETE http://localhost:" + PORT + "/api/users/2");
  console.log("\\nServer will stop after 30 seconds...");
});

// ============================================
// 5. AUTO-SHUTDOWN
// ============================================

setTimeout(() => {
  server.close();
  console.log("\\n✓ Server stopped");
}, 30000);

// ============================================
// 6. TESTING THE API
// ============================================

console.log("\\n6. TESTING THE API\\n");

// Simulate some requests
setTimeout(() => {
  console.log("--- Simulated API calls ---\\n");

  // Simulate GET all
  console.log("GET /api/users");
  console.log("Response:", JSON.stringify(users, null, 2));

  // Simulate finding one
  const user = users.find((u) => u.id === 1);
  console.log("\\nGET /api/users/1");
  console.log("Response:", JSON.stringify(user, null, 2));
}, 1000);

// ============================================
// 7. KEY TAKEAWAYS
// ============================================

console.log("\\n\\n=== KEY TAKEAWAYS ===");
console.log("✓ REST uses HTTP methods: GET, POST, PUT, DELETE");
console.log("✓ Use proper status codes: 200, 201, 400, 404, 500");
console.log("✓ Parse request body for POST/PUT");
console.log("✓ Validate input before processing");
console.log("✓ Use meaningful error messages");
console.log("✓ Handle JSON serialization/deserialization");
console.log("\\n✓ You've built a working REST API!");
console.log("➜ Next: Express.js framework (much easier!)");
console.log("   npm install express");
console.log("   (We'll skip to the end of basic lessons now)\\n");
