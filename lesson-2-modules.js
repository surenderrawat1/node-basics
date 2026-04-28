/**
 * LESSON 2: Node.js Module System
 *
 * In this lesson, you'll learn:
 * 1. What modules are and why they matter
 * 2. How require() works
 * 3. Creating and exporting modules
 * 4. module.exports vs exports
 * 5. Module caching
 */

console.log("=== LESSON 2: MODULE SYSTEM ===\n");

// ============================================
// 1. BUILT-IN MODULES
// ============================================

console.log("1. USING BUILT-IN MODULES\n");

// Node.js comes with many built-in modules
const fs = require("fs"); // File System
const path = require("path"); // Path utilities
const os = require("os"); // Operating System
const events = require("events"); // Event Emitter

console.log("Loaded modules:");
console.log("  - fs (File System) ✓");
console.log("  - path (Path utilities) ✓");
console.log("  - os (Operating System) ✓");
console.log("  - events (Event Emitter) ✓");

// ============================================
// 2. USING BUILT-IN MODULES
// ============================================

console.log("\n2. USING MODULES IN YOUR CODE\n");

// Example 1: Using the 'os' module
console.log("--- OS Module Examples ---");
console.log("Home directory:", os.homedir());
console.log("Platform:", os.platform());
console.log("CPU count:", os.cpus().length);
console.log(
  "Total memory:",
  Math.round(os.totalmem() / 1024 / 1024 / 1024) + " GB",
);

// Example 2: Using the 'path' module
console.log("\n--- Path Module Examples ---");
const filePath = "/users/john/documents/file.txt";
console.log("Original path:", filePath);
console.log("Directory:", path.dirname(filePath));
console.log("Filename:", path.basename(filePath));
console.log("Extension:", path.extname(filePath));
console.log("Parsed:", path.parse(filePath));

// ============================================
// 3. CREATING YOUR OWN MODULES
// ============================================

console.log("\n3. CREATING AND EXPORTING MODULES\n");

// Create a simple math utility module
const mathUtils = require("./modules/math-utils");

console.log("Using custom math-utils module:");
console.log("  add(5, 3) =", mathUtils.add(5, 3));
console.log("  subtract(10, 4) =", mathUtils.subtract(10, 4));
console.log("  multiply(6, 7) =", mathUtils.multiply(6, 7));
console.log("  divide(20, 4) =", mathUtils.divide(20, 4));

// ============================================
// 4. DIFFERENT EXPORT PATTERNS
// ============================================

console.log("\n4. EXPORT PATTERNS\n");

// Pattern 1: Exporting individual functions (as object)
const calculator = require("./modules/calculator-pattern1");
console.log("Pattern 1 - Object exports:");
console.log("  calculator.power(2, 8) =", calculator.power(2, 8));

// Pattern 2: Exporting a single function
const greet = require("./modules/greeting-pattern2");
console.log("\nPattern 2 - Single function export:");
console.log("  greet('Node.js') =", greet("Node.js"));

// Pattern 3: Exporting an object/class
const Counter = require("./modules/counter-pattern3");
console.log("\nPattern 3 - Class/Constructor export:");
const counter = new Counter(10);
console.log("  counter.increment() =", counter.increment());
console.log("  counter.increment() =", counter.increment());
console.log("  counter.decrement() =", counter.decrement());
console.log("  counter.getCount() =", counter.getCount());

// ============================================
// 5. MODULE CACHING
// ============================================

console.log("\n5. MODULE CACHING\n");

// When you require a module multiple times,
// Node.js returns the same cached copy
const math1 = require("./modules/math-utils");
const math2 = require("./modules/math-utils");

console.log(
  "First require and second require are same object:",
  math1 === math2,
);
console.log("This means modules are cached and only executed once!");

// ============================================
// 6. EXPLORING module OBJECT
// ============================================

console.log("\n6. UNDERSTANDING module.exports\n");

console.log("In this file (lesson-2-modules.js):");
console.log("  module.id:", module.id);
console.log("  module.filename:", module.filename);
console.log("  module.loaded:", module.loaded);

// ============================================
// 7. PACKAGE.JSON AND npm MODULES
// ============================================

console.log("\n7. PACKAGE.JSON & npm MODULES\n");

const packageJson = require("./package.json");
console.log("Package name:", packageJson.name);
console.log("Package version:", packageJson.version);
console.log("Main entry:", packageJson.main);

// ============================================
// 8. PRACTICE EXERCISES
// ============================================

console.log("\n8. PRACTICE EXERCISES\n");

// Exercise 1: Use the 'fs' module to check if a file exists
console.log("Exercise 1 - File System:");
const fileExists = fs.existsSync(__filename);
console.log("  Does this file exist?", fileExists);

// Exercise 2: Create a path and use path utilities
console.log("\nExercise 2 - Path Utilities:");
const newPath = path.join(__dirname, "data", "users", "profile.json");
console.log("  Created path:", newPath);
console.log("  Directory:", path.dirname(newPath));
console.log("  Filename:", path.basename(newPath));

// Exercise 3: Create your own simple module
console.log("\nExercise 3 - Create Your Own Module:");
const stringUtils = require("./modules/string-utils");
console.log("  reverse('hello') =", stringUtils.reverse("hello"));
console.log("  capitalize('node.js') =", stringUtils.capitalize("node.js"));
console.log(
  "  countChars('javascript') =",
  stringUtils.countChars("javascript"),
);

// ============================================
// 9. NEXT STEPS
// ============================================

console.log("\n=== NEXT STEPS ===");
console.log("✓ You've learned the Module System!");
console.log("➜ Next: Callbacks and Asynchronous Programming (Lesson 3)");
console.log("   Run: node lesson-3-callbacks.js\n");
