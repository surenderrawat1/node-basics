/**
 * LESSON 9: Event Emitter Pattern
 *
 * In this lesson, you'll learn:
 * 1. What the Event Emitter pattern is
 * 2. Using the EventEmitter class
 * 3. Emitting and listening to events
 * 4. Event handlers and listeners
 * 5. Removing listeners
 * 6. Creating custom event emitters
 * 7. Built-in event emitters in Node.js
 */

console.log("=== LESSON 9: EVENT EMITTER PATTERN ===\n");

const EventEmitter = require("events");
const fs = require("fs");

// ============================================
// 1. WHAT IS AN EVENT EMITTER?
// ============================================

console.log("1. EVENT EMITTER BASICS\n");

console.log(`
Event Emitter is a core Node.js pattern for:
  • Emitting named events
  • Registering listeners for events
  • Triggering listeners when events occur

Many Node.js objects inherit from EventEmitter:
  • fs.ReadStream
  • http.Server
  • process
  • And more!
`);

// ============================================
// 2. CREATING AN EVENT EMITTER
// ============================================

console.log("\n2. CREATING AN EVENT EMITTER\n");

// Create an event emitter instance
const emitter = new EventEmitter();

console.log("EventEmitter created ✓");

// ============================================
// 3. EMITTING AND LISTENING TO EVENTS
// ============================================

console.log("\n3. EMITTING & LISTENING TO EVENTS\n");

// Register a listener (on or addListener)
console.log("Example 1 - Basic event:");
emitter.on("greet", function (name) {
  console.log("  Listener triggered! Hello,", name);
});

// Emit an event
emitter.emit("greet", "Alice");
emitter.emit("greet", "Bob");

// ============================================
// 4. MULTIPLE LISTENERS
// ============================================

console.log("\n4. MULTIPLE LISTENERS FOR SAME EVENT\n");

const userEmitter = new EventEmitter();

console.log("Example - Multiple listeners:");

// Register multiple listeners for 'login' event
userEmitter.on("login", (user) => {
  console.log("  [Logger]  User logged in:", user);
});

userEmitter.on("login", (user) => {
  console.log("  [Analytics] Recorded login for:", user);
});

userEmitter.on("login", (user) => {
  console.log("  [Notification] Sending email to:", user);
});

// All listeners will be called
userEmitter.emit("login", "john@example.com");

// ============================================
// 5. ONCE - LISTEN ONLY ONCE
// ============================================

console.log("\n5. LISTEN ONLY ONCE\n");

const taskEmitter = new EventEmitter();

console.log("Using .once() - listener fires only once:");

taskEmitter.once("complete", (message) => {
  console.log("  ✓ Task complete:", message);
  console.log("  (This listener will not fire again)");
});

taskEmitter.emit("complete", "First emit");
taskEmitter.emit("complete", "Second emit (listener ignored)");

// ============================================
// 6. REMOVING LISTENERS
// ============================================

console.log("\n6. REMOVING LISTENERS\n");

const counterEmitter = new EventEmitter();

function handler1() {
  console.log("  Handler 1 called");
}

function handler2() {
  console.log("  Handler 2 called");
}

counterEmitter.on("count", handler1);
counterEmitter.on("count", handler2);

console.log("Example 1 - Remove specific listener:");
console.log("Emitting (both handlers):");
counterEmitter.emit("count");

console.log("\nRemoving handler1...");
counterEmitter.removeListener("count", handler1);

console.log("Emitting (only handler2):");
counterEmitter.emit("count");

console.log("\nRemoving all listeners for 'count':");
counterEmitter.removeAllListeners("count");

console.log("Emitting (no handlers):");
counterEmitter.emit("count");

// ============================================
// 7. GETTING LISTENER INFO
// ============================================

console.log("\n7. LISTENER INFORMATION\n");

const infoEmitter = new EventEmitter();

infoEmitter.on("event", () => {});
infoEmitter.on("event", () => {});
infoEmitter.on("other", () => {});

console.log("Listener count for 'event':", infoEmitter.listenerCount("event"));
console.log("Listener count for 'other':", infoEmitter.listenerCount("other"));
console.log("All event names:", infoEmitter.eventNames());
console.log("Listeners for 'event':", infoEmitter.listeners("event").length);

// ============================================
// 8. CREATING CUSTOM EVENT EMITTERS
// ============================================

console.log("\n8. CUSTOM EVENT EMITTERS\n");

// Create a custom class that extends EventEmitter
class Button extends EventEmitter {
  constructor(label) {
    super();
    this.label = label;
    this.clickCount = 0;
  }

  click() {
    this.clickCount++;
    this.emit("click", this.clickCount);
  }

  doubleClick() {
    this.emit("double-click");
  }
}

console.log("Example - Custom Button class:");

const btn = new Button("Submit");

btn.on("click", (count) => {
  console.log("  [UI] Button clicked,", count, "times");
});

btn.on("click", (count) => {
  console.log("  [Analytics] Click event recorded");
});

btn.on("double-click", () => {
  console.log("  [UI] Double click detected!");
});

btn.click();
btn.click();
btn.doubleClick();

// ============================================
// 9. ERROR HANDLING WITH EVENT EMITTERS
// ============================================

console.log("\n9. ERROR HANDLING\n");

const errorEmitter = new EventEmitter();

console.log("Example - Handling errors:");

// Handle error events
errorEmitter.on("error", (error) => {
  console.log("  ✗ Error caught:", error.message);
});

// Emit error
errorEmitter.emit("error", new Error("Something went wrong!"));

// If no error handler, it throws
console.log("(Note: Unhandled 'error' events throw!)");

// ============================================
// 10. BUILT-IN EVENT EMITTERS IN NODE.JS
// ============================================

console.log("\n10. BUILT-IN EVENT EMITTERS\n");

console.log("Example 1 - process object:");

process.on("uncaughtException", (err) => {
  console.log("  ✓ Caught uncaught exception");
});

process.on("exit", () => {
  console.log("  ✓ Process about to exit");
});

console.log("✓ process is an EventEmitter!");

// Example 2: File system events
console.log("\nExample 2 - fs.watch():");

const testFile = __filename;
let watcherClosed = false;

const watcher = fs.watch(testFile, (eventType) => {
  if (!watcherClosed) {
    console.log("  ✓ File event:", eventType);
  }
});

// Stop watching
setTimeout(() => {
  watcherClosed = true;
  watcher.close();
}, 1000);

// ============================================
// 11. PRACTICAL EXAMPLE: EVENT-BASED SYSTEM
// ============================================

console.log("\n11. PRACTICAL EXAMPLE: Event-Based Cache\n");

class Cache extends EventEmitter {
  constructor() {
    super();
    this.data = {};
  }

  set(key, value) {
    const existed = key in this.data;
    this.data[key] = value;

    if (existed) {
      this.emit("update", key, value);
    } else {
      this.emit("create", key, value);
    }
  }

  get(key) {
    this.emit("access", key);
    return this.data[key];
  }

  delete(key) {
    if (key in this.data) {
      delete this.data[key];
      this.emit("delete", key);
    }
  }
}

const cache = new Cache();

cache.on("create", (key, value) => {
  console.log("  [Create] New key:", key);
});

cache.on("update", (key, value) => {
  console.log("  [Update] Modified key:", key);
});

cache.on("access", (key) => {
  console.log("  [Access] Retrieved key:", key);
});

cache.on("delete", (key) => {
  console.log("  [Delete] Removed key:", key);
});

console.log("Cache operations:");
cache.set("user1", "Alice");
cache.set("user2", "Bob");
cache.set("user1", "Alice Updated");
cache.get("user1");
cache.delete("user2");

// ============================================
// 12. PRACTICE EXERCISES
// ============================================

console.log("\n12. PRACTICE EXERCISES\n");

// Exercise 1: Create a simple timer with events
console.log("Exercise 1 - Timer with events:");

class Timer extends EventEmitter {
  constructor(duration) {
    super();
    this.duration = duration;
    this.elapsed = 0;
  }

  start() {
    const interval = setInterval(() => {
      this.elapsed += 100;
      this.emit("tick", this.elapsed);

      if (this.elapsed >= this.duration) {
        this.emit("complete");
        clearInterval(interval);
      }
    }, 100);
  }
}

const timer = new Timer(500);

timer.on("tick", (elapsed) => {
  console.log("  Tick:", elapsed + "ms");
});

timer.on("complete", () => {
  console.log("  ✓ Timer complete!");
});

timer.start();

// ============================================
// 13. COMPARISON: CALLBACKS vs EVENT EMITTERS
// ============================================

setTimeout(() => {
  console.log("\n13. COMPARISON: Callbacks vs Event Emitters\n");

  console.log(`
CALLBACKS:
  ✓ Simple for single operations
  ❌ Hard to handle multiple listeners
  ❌ Not suitable for repeating events

EVENT EMITTERS:
  ✓ Perfect for multiple listeners
  ✓ Great for repeating events
  ✓ Clean separation of concerns
  ✓ Built into Node.js
  ⚠ More setup needed for simple cases
`);

  // ============================================
  // 14. KEY TAKEAWAYS
  // ============================================

  console.log("\n=== KEY TAKEAWAYS ===");
  console.log("✓ EventEmitter is the core of Node.js event system");
  console.log("✓ .on() registers listeners, .emit() triggers them");
  console.log("✓ .once() listens for a single event");
  console.log("✓ Extend EventEmitter for custom classes");
  console.log("✓ Used in fs, http, process, and many more");
  console.log("✓ Great for decoupling components");

  console.log("\n✓ You've mastered Event Emitters!");
  console.log("➜ Next: HTTP Server (Lesson 10)");
  console.log("   Run: node lesson-10-http-server.js\\n");
}, 2500);
