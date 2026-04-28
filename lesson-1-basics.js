/**
 * LESSON 1: Node.js Basics & Global Objects
 *
 * In this lesson, you'll learn:
 * 1. What makes Node.js special (server-side JavaScript)
 * 2. Global objects available in Node.js
 * 3. The __dirname and __filename variables
 * 4. Basic console methods
 */

// ============================================
// 1. GLOBAL OBJECTS IN NODE.JS
// ============================================

console.log("=== 1. GLOBAL OBJECTS ===\n");

// In browsers, the global object is 'window'
// In Node.js, it's 'global'
console.log("Global object:", typeof global);
console.log("Type of global:", global.constructor.name);

// Common global objects:
console.log("\n--- Available Global Objects ---");
console.log("process:", typeof process); // Information about current process
console.log("Buffer:", typeof Buffer); // For working with binary data
console.log("setTimeout:", typeof setTimeout); // Timer functions
console.log("setInterval:", typeof setInterval);
console.log("console:", typeof console); // Logging

// ============================================
// 2. __dirname AND __filename
// ============================================

console.log("\n=== 2. FILE PATHS ===\n");

// __dirname: absolute path of the current directory
console.log("Current directory:", __dirname);

// __filename: absolute path of the current file
console.log("Current file:", __filename);

// Useful for file operations and paths
const path = require("path");
console.log("Filename only:", path.basename(__filename));
console.log("Directory name only:", path.basename(__dirname));

// ============================================
// 3. THE process OBJECT
// ============================================

console.log("\n=== 3. PROCESS OBJECT ===\n");

// Get command-line arguments passed to the script
console.log("Arguments passed:", process.argv);
// Try running: node lesson-1-basics.js hello world
// You'll see: ['node', 'path/to/lesson-1-basics.js', 'hello', 'world']

// Current Node.js version
console.log("Node version:", process.version);

// Platform (win32, darwin, linux, etc.)
console.log("Platform:", process.platform);

// Process ID
console.log("Process ID:", process.pid);

// Environment variables
console.log("\n--- Environment Variables ---");
console.log("NODE_ENV:", process.env.NODE_ENV || "not set");
console.log(
  "PATH (first 100 chars):",
  process.env.PATH?.substring(0, 100) || "not available",
);

// ============================================
// 4. CONSOLE METHODS
// ============================================

console.log("\n=== 4. CONSOLE METHODS ===\n");

// console.log() - standard output
console.log("This is a regular log");

// console.error() - standard error (usually red)
console.error("This is an error message");

// console.warn() - warning (usually yellow)
console.warn("This is a warning");

// console.table() - display data in table format
console.table({ name: "Node.js", type: "Runtime", year: 2009 });

// console.time() and console.timeEnd() - measure execution time
console.time("Operation");
let sum = 0;
for (let i = 0; i < 1000000; i++) {
  sum += i;
}
console.timeEnd("Operation");

// console.assert() - assertion testing
console.assert(1 + 1 === 2, "Math is broken!");
console.assert(1 + 1 === 3, "This will show an error message");

// ============================================
// 5. PRACTICE EXERCISES
// ============================================

console.log("\n=== PRACTICE EXERCISES ===\n");

// Exercise 1: Print file information
console.log("Exercise 1 - File Information:");
console.log("  File name:", path.basename(__filename));
console.log("  File directory:", path.dirname(__dirname));
console.log("  Full path:", __filename);

// Exercise 2: Extract command-line arguments
console.log("\nExercise 2 - Command Line Arguments:");
const args = process.argv.slice(2); // Skip 'node' and script path
console.log("  Arguments received:", args);
console.log("  Number of arguments:", args.length);

// Exercise 3: Check if running in development
const isProduction = process.env.NODE_ENV === "production";
console.log("\nExercise 3 - Environment Check:");
console.log("  Running in production?", isProduction);

// ============================================
// 6. NEXT STEPS
// ============================================

console.log("\n=== NEXT STEPS ===");
console.log("✓ You've learned about Node.js global objects!");
console.log("➜ Next: Learn about the Module System (Lesson 2)");
console.log("   Run: node lesson-2-modules.js\n");
