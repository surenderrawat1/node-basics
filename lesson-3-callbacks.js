/**
 * LESSON 3: Callbacks and Asynchronous Programming
 *
 * In this lesson, you'll learn:
 * 1. What callbacks are and why they're used
 * 2. Synchronous vs Asynchronous code
 * 3. File system callbacks
 * 4. Common callback patterns
 * 5. Callback pitfalls (Callback Hell)
 * 6. Error handling with callbacks
 */

console.log("=== LESSON 3: CALLBACKS ===\n");

const fs = require("fs");
const path = require("path");

// ============================================
// 1. UNDERSTANDING CALLBACKS
// ============================================

console.log("1. WHAT IS A CALLBACK?\n");

console.log(`
A callback is a function passed to another function,
which is then invoked inside the outer function.

Callbacks are the foundation of asynchronous programming in Node.js!
`);

// Simple callback example
function greetUser(name, callback) {
  const greeting = `Hello, ${name}!`;
  callback(greeting); // Invoke the callback
}

console.log("Example 1 - Simple Callback:");
greetUser("Alice", function (message) {
  console.log("  " + message);
});

// ============================================
// 2. SYNCHRONOUS VS ASYNCHRONOUS
// ============================================

console.log("\n2. SYNCHRONOUS vs ASYNCHRONOUS\n");

// Synchronous code - executes line by line
console.log("--- Synchronous Example ---");
console.log("Line 1");
const content = fs.readFileSync(__filename, "utf-8");
console.log("Line 2 - Read", content.length, "characters");
console.log("Line 3");

// Note: The above blocks until file is read!

// Asynchronous code - doesn't block
console.log("\n--- Asynchronous Example ---");
console.log("Line A");

fs.readFile(__filename, "utf-8", function (err, data) {
  console.log("  (In callback) Read", data.length, "characters");
});

console.log("Line B - This prints before the file is read!");

// ============================================
// 3. FILE SYSTEM CALLBACKS
// ============================================

// Create a test file first
const testFile = path.join(__dirname, "test-data.txt");
fs.writeFileSync(testFile, "Hello, Node.js!");

console.log("\n3. FILE SYSTEM CALLBACKS\n");

// Reading a file asynchronously
fs.readFile(testFile, "utf-8", function (err, data) {
  if (err) {
    console.error("Error reading file:", err.message);
  } else {
    console.log("File contents:", data);
  }
});

// Writing to a file asynchronously
const dataToWrite = "Node.js is awesome!\\n" + new Date().toISOString();

fs.writeFile(testFile, dataToWrite, function (err) {
  if (err) {
    console.error("Error writing file:", err.message);
  } else {
    console.log("File written successfully!");
  }
});

// ============================================
// 4. CALLBACK PATTERNS
// ============================================

console.log("\n4. CALLBACK PATTERNS\n");

// Pattern 1: Error-first callbacks
function readUserData(userId, callback) {
  // Simulate async operation
  setTimeout(function () {
    if (userId > 0) {
      callback(null, { id: userId, name: "John Doe" }); // No error
    } else {
      callback(new Error("Invalid user ID"), null); // Error occurred
    }
  }, 500);
}

console.log("Pattern 1 - Error-first callback:");
readUserData(1, function (err, user) {
  if (err) {
    console.log("  Error:", err.message);
  } else {
    console.log("  User found:", user);
  }
});

// Pattern 2: Multiple callbacks
function downloadFile(url, onProgress, onComplete) {
  console.log("Pattern 2 - Multiple callbacks (downloading...)");

  setTimeout(() => onProgress(50), 300);
  setTimeout(() => onProgress(100), 600);
  setTimeout(() => onComplete(null, "file.zip"), 900);
}

downloadFile(
  "http://example.com/file.zip",
  function (progress) {
    console.log("  Download progress: " + progress + "%");
  },
  function (err, filename) {
    if (!err) {
      console.log("  Download complete:", filename);
    }
  },
);

// ============================================
// 5. CALLBACK HELL (Pyramid of Doom)
// ============================================

console.log("\n5. CALLBACK HELL & HOW TO AVOID IT\n");

// ❌ BAD: Callback Hell
console.log("❌ Problem - Callback Hell:");
console.log(`
fs.readFile('file1.txt', (err, data1) => {
  fs.readFile('file2.txt', (err, data2) => {
    fs.readFile('file3.txt', (err, data3) => {
      fs.readFile('file4.txt', (err, data4) => {
        // Deep nesting!
      });
    });
  });
});
`);

// ✅ GOOD: Named functions
console.log("✅ Solution 1 - Named functions:");
console.log(`
function handleFile1(err, data1) {
  fs.readFile('file2.txt', handleFile2);
}

function handleFile2(err, data2) {
  fs.readFile('file3.txt', handleFile3);
}

// Much more readable!
fs.readFile('file1.txt', handleFile1);
`);

// ✅ BETTER: Use Promises or async/await (next lessons!)
console.log(
  "\n✅ Solution 2 - Promises/async await (we'll learn this in Lesson 4-5!)",
);

// ============================================
// 6. ERROR HANDLING WITH CALLBACKS
// ============================================

console.log("\n6. ERROR HANDLING WITH CALLBACKS\n");

function riskyOperation(shouldFail, callback) {
  setTimeout(function () {
    if (shouldFail) {
      callback(new Error("Operation failed!"), null);
    } else {
      callback(null, "Success!");
    }
  }, 300);
}

console.log("Try operation that fails:");
riskyOperation(true, function (err, result) {
  if (err) {
    console.log("  ✗ Error caught:", err.message);
  } else {
    console.log("  ✓ Result:", result);
  }
});

console.log("\nTry operation that succeeds:");
riskyOperation(false, function (err, result) {
  if (err) {
    console.log("  ✗ Error caught:", err.message);
  } else {
    console.log("  ✓ Result:", result);
  }
});

// ============================================
// 7. PRACTICE EXERCISES
// ============================================

console.log("\n7. PRACTICE EXERCISES\n");

// Exercise 1: Create a callback-based function
console.log("Exercise 1 - Write your own callback function:");

function fetchData(delay, callback) {
  setTimeout(function () {
    const data = { message: "Data fetched!" };
    callback(null, data);
  }, delay);
}

fetchData(500, function (err, data) {
  console.log("  Retrieved:", data.message);
});

// Exercise 2: Error handling
console.log("\nExercise 2 - Implement error handling:");

function validateEmail(email, callback) {
  setTimeout(function () {
    if (email.includes("@")) {
      callback(null, true);
    } else {
      callback(new Error("Invalid email!"), false);
    }
  }, 200);
}

validateEmail("test@example.com", function (err, isValid) {
  console.log("  Email valid:", isValid);
});

// ============================================
// 8. KEY TAKEAWAYS
// ============================================

console.log("\n=== KEY TAKEAWAYS ===");
console.log(`
✓ Callbacks are functions passed as arguments
✓ Callbacks enable asynchronous programming
✓ Always use error-first callbacks: (err, data) => {}
✓ Avoid callback hell with named functions
✓ Promises and async/await are better alternatives

PROBLEMS WITH CALLBACKS:
  - Hard to read (nested deeply)
  - Hard to debug
  - Error handling is manual
  - Flow control is complex

NEXT: Learn Promises (Lesson 4)!
`);

// ============================================
// 9. ASYNC OPERATION TRACKING
// ============================================

// Let these async operations complete
setTimeout(function () {
  console.log("\n=== ALL OPERATIONS COMPLETE ===");
  console.log("✓ You've learned about Callbacks!");
  console.log("➜ Next: Promises (Lesson 4)");
  console.log("   Run: node lesson-4-promises.js\n");
}, 2000);
