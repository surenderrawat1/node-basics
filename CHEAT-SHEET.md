# Node.js Concepts Cheat Sheet

Quick reference for key Node.js concepts covered in the lessons.

## 1. GLOBALS

```javascript
// Global object (like window in browser)
global;

// Current directory and file
__dirname;
__filename;

// Process information
process.argv; // Command line arguments
process.env; // Environment variables
process.version; // Node.js version
process.platform; // OS platform (win32, linux, darwin)
process.pid; // Process ID

// Timers
setTimeout(fn, ms);
setInterval(fn, ms);
```

## 2. MODULES

```javascript
// Import a module
const module = require('./path/to/module');
const fs = require('fs');

// Export from a module
module.exports = { function1, function2 };
module.exports = MyClass;
module.exports = function() { ... };

// Built-in modules
require('fs')        // File system
require('path')      // Path utilities
require('os')        // Operating system
require('events')    // Event emitter
require('http')      // HTTP server
```

## 3. CALLBACKS

```javascript
// Callback pattern (old style)
function fetchData(id, callback) {
  setTimeout(() => {
    callback(null, { id: id, name: "Alice" });
  }, 100);
}

// Error-first callback
fetchData(1, (err, data) => {
  if (err) console.log("Error:", err);
  else console.log("Data:", data);
});
```

## 4. PROMISES

```javascript
// Create a promise
const promise = new Promise((resolve, reject) => {
  if (success) {
    resolve(value);
  } else {
    reject(error);
  }
});

// Consume a promise
promise
  .then(value => { ... })
  .catch(error => { ... })
  .finally(() => { ... });

// Multiple promises
Promise.all([p1, p2, p3])      // Wait for all
Promise.race([p1, p2, p3])     // First one wins
Promise.allSettled([p1, p2])   // Get all results
```

## 5. ASYNC/AWAIT

```javascript
// Async function (returns Promise)
async function fetchUser(id) {
  try {
    const user = await getUser(id);
    return user;
  } catch (error) {
    console.log('Error:', error);
  }
}

// Call async function
await fetchUser(1);
fetchUser(1).then(user => { ... });

// Parallel operations
const [user, posts] = await Promise.all([
  getUser(id),
  getPosts(id)
]);

// Sequential operations
const user = await getUser(1);
const posts = await getPosts(user.id);
```

## 6. FILE SYSTEM

```javascript
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

// Sync (blocks execution)
const content = fs.readFileSync('file.txt', 'utf-8');
fs.writeFileSync('file.txt', 'Hello');

// Async callbacks
fs.readFile('file.txt', 'utf-8', (err, data) => { ... });
fs.writeFile('file.txt', 'Hello', (err) => { ... });

// Async/await (recommended)
const content = await fsPromises.readFile('file.txt', 'utf-8');
await fsPromises.writeFile('file.txt', 'Hello');

// Directories
fs.mkdirSync(dir);
const files = fs.readdirSync(dir);
fs.existsSync(path);

// File stats
const stats = fs.statSync(file);
stats.isFile()
stats.isDirectory()
stats.size
stats.mtime

// Utilities
path.join(dir, file)
path.dirname(filepath)
path.basename(filepath)
path.extname(filepath)
```

## 7. EVENT EMITTER

```javascript
const EventEmitter = require('events');

// Create emitter
const emitter = new EventEmitter();

// Listen for event
emitter.on('event', (arg) => { ... });
emitter.once('event', (arg) => { ... });

// Emit event
emitter.emit('event', arg);

// Remove listeners
emitter.removeListener('event', handler);
emitter.removeAllListeners('event');

// Custom emitter
class MyEmitter extends EventEmitter {
  doSomething() {
    this.emit('event', 'data');
  }
}
```

## 8. HTTP SERVER

```javascript
const http = require('http');
const url = require('url');

// Create server
const server = http.createServer((req, res) => {
  // req: request object
  // res: response object

  console.log(req.method);      // GET, POST, etc.
  console.log(req.url);         // /path?query=value
  console.log(req.headers);     // Request headers

  // Send response
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello');
  res.end();
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

// Parse URL
const { pathname, query } = url.parse(req.url, true);
// pathname: /api/users
// query: { id: '123' }

// Handle different methods
if (req.method === 'GET') { ... }
else if (req.method === 'POST') { ... }
else if (req.method === 'PUT') { ... }
else if (req.method === 'DELETE') { ... }

// Read POST body
let body = '';
req.on('data', chunk => body += chunk);
req.on('end', () => {
  const data = JSON.parse(body);
});

// Send JSON
res.writeHead(200, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({ key: 'value' }));
```

## 9. REST API PATTERNS

```javascript
// CRUD operations
GET    /api/items           // List all
GET    /api/items/:id       // Get one
POST   /api/items           // Create
PUT    /api/items/:id       // Update
DELETE /api/items/:id       // Delete

// Status codes
200 - OK (successful GET, PUT, DELETE)
201 - Created (successful POST)
400 - Bad Request (invalid input)
404 - Not Found (resource doesn't exist)
500 - Internal Server Error

// Request/Response
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com"
}
```

## 10. PROCESS OBJECT

```javascript
process.env.NODE_ENV; // 'development' or 'production'
process.env.HOME; // Home directory
process.exit(code); // Exit process
process.on("exit", () => {});
process.cwd(); // Current working directory
process.stdout.write(); // Write to console
process.stderr.write(); // Write to error
```

## 11. ERROR HANDLING

```javascript
// Try/catch for async operations
try {
  const data = await fetchData();
} catch (error) {
  console.log("Error:", error.message);
} finally {
  // Cleanup code
}

// Callback error-first pattern
function operation(callback) {
  callback(error, result);
}

operation((err, result) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Success:", result);
  }
});

// Promise error handling
promise.catch((error) => {
  console.log("Error:", error.message);
});
```

## 12. COMMON PATTERNS

### Reading a JSON file

```javascript
const data = JSON.parse(fs.readFileSync("file.json", "utf-8"));
```

### Writing a JSON file

```javascript
fs.writeFileSync("file.json", JSON.stringify(data, null, 2));
```

### Async file operations with async/await

```javascript
const fsPromises = fs.promises;
const content = await fsPromises.readFile("file.txt", "utf-8");
await fsPromises.writeFile("file.txt", "new content");
```

### Creating a simple HTTP server

```javascript
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Home");
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});
server.listen(3000);
```

### Environment variables

```javascript
const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== "production";
```

---

## Quick Comparison: Evolution of Async Code

### Callbacks (Lesson 3)

```javascript
fs.readFile("file.txt", (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### Promises (Lesson 4)

```javascript
fs.promises
  .readFile("file.txt")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

### async/await (Lesson 5) ⭐ Recommended

```javascript
async function read() {
  try {
    const data = await fs.promises.readFile("file.txt");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

---

Keep this handy while learning and coding! 🚀
