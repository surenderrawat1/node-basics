/**
 * LESSON 5: async/await
 *
 * In this lesson, you'll learn:
 * 1. What async/await is and why it's useful
 * 2. Creating async functions
 * 3. Using await to wait for promises
 * 4. Error handling with try/catch
 * 5. Multiple async operations
 * 6. async/await patterns and best practices
 */

console.log("=== LESSON 5: async/await ===\n");

// ============================================
// 1. ASYNC/AWAIT FUNDAMENTALS
// ============================================

console.log("1. WHAT IS async/await?\n");

console.log(`
async/await is syntactic sugar over Promises!
It allows you to write asynchronous code that looks synchronous.

KEY POINTS:
  • async functions always return a Promise
  • await pauses the function until a Promise settles
  • Makes code more readable than .then() chains
  • Error handling uses standard try/catch
`);

// ============================================
// 2. ASYNC FUNCTIONS
// ============================================

console.log("\n2. ASYNC FUNCTIONS\n");

// Define an async function
async function greet() {
  return "Hello from async function!";
}

// Call async function
console.log("Async function returns a Promise:");
const result = greet();
console.log("  Result is a Promise:", result instanceof Promise);

greet().then((msg) => console.log("  Message:", msg));

// ============================================
// 3. USING AWAIT
// ============================================

console.log("\n3. USING AWAIT\n");

// Helper function that returns a promise
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Example 1: Simple await
async function waitExample() {
  console.log("  Start waiting...");
  await delay(1000);
  console.log("  ✓ Done waiting (1000ms passed)");
}

console.log("Example 1 - Simple await:");
waitExample();

// Example 2: Await with return value
async function fetchData() {
  console.log("  Fetching data...");
  await delay(500);
  return { id: 1, name: "Alice" };
}

console.log("\nExample 2 - Await with return value:");
fetchData().then((data) => console.log("  ✓ Got data:", data));

// ============================================
// 4. ERROR HANDLING WITH TRY/CATCH
// ============================================

console.log("\n4. ERROR HANDLING WITH try/catch\n");

function risky(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Something went wrong!"));
      } else {
        resolve("Success!");
      }
    }, 300);
  });
}

async function handleErrors() {
  console.log("  Attempting risky operation (will fail)...");

  try {
    const result = await risky(true);
    console.log("  ✓ Result:", result);
  } catch (error) {
    console.log("  ✗ Caught error:", error.message);
  } finally {
    console.log("  ✓ Finally block always runs!");
  }
}

console.log("Example - Error handling:");
handleErrors();

// ============================================
// 5. SEQUENTIAL OPERATIONS
// ============================================

console.log("\n5. SEQUENTIAL OPERATIONS\n");

async function step1() {
  await delay(200);
  return "Step 1";
}

async function step2() {
  await delay(200);
  return "Step 2";
}

async function step3() {
  await delay(200);
  return "Step 3";
}

async function sequential() {
  console.log("  Running steps sequentially...");
  console.time("Sequential");

  const res1 = await step1();
  console.log("    ✓", res1);

  const res2 = await step2();
  console.log("    ✓", res2);

  const res3 = await step3();
  console.log("    ✓", res3);

  console.timeEnd("Sequential");
  return [res1, res2, res3];
}

console.log("Sequential execution (slower - ~600ms):");
sequential();

// ============================================
// 6. PARALLEL OPERATIONS WITH Promise.all()
// ============================================

console.log("\n6. PARALLEL OPERATIONS\n");

async function parallel() {
  console.log("  Running steps in parallel...");
  console.time("Parallel");

  // Execute all at once
  const results = await Promise.all([step1(), step2(), step3()]);

  console.log("    ✓", results.join(" | "));
  console.timeEnd("Parallel");
  return results;
}

console.log("Parallel execution (faster - ~200ms):");
parallel();

// ============================================
// 7. MULTIPLE ASYNC PATTERNS
// ============================================

console.log("\n7. ASYNC PATTERNS\n");

// Pattern 1: Race condition (first to complete)
async function raceCondition() {
  const fast = delay(100).then(() => "Fast");
  const slow = delay(500).then(() => "Slow");

  const winner = await Promise.race([fast, slow]);
  console.log("  ✓ Winner:", winner);
}

console.log("Pattern 1 - Promise.race():");
raceCondition();

// Pattern 2: Handle all (even failures)
async function allSettled() {
  const p1 = Promise.resolve("Success 1");
  const p2 = Promise.reject(new Error("Failed!"));
  const p3 = Promise.resolve("Success 2");

  const results = await Promise.allSettled([p1, p2, p3]);

  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(`  ✓ Promise ${i + 1}:`, result.value);
    } else {
      console.log(`  ✗ Promise ${i + 1}:`, result.reason.message);
    }
  });
}

console.log("\nPattern 2 - Promise.allSettled():");
allSettled();

// ============================================
// 8. REAL-WORLD EXAMPLE: FILE OPERATIONS
// ============================================

console.log("\n8. REAL-WORLD EXAMPLE\n");

const fs = require("fs").promises;
const path = require("path");

async function fileOperations() {
  try {
    const testFile = path.join(__dirname, "async-test.txt");

    // Write file
    console.log("  Writing file...");
    await fs.writeFile(testFile, "Hello from async/await!\\n");
    console.log("  ✓ File written");

    // Read file
    console.log("  Reading file...");
    const content = await fs.readFile(testFile, "utf-8");
    console.log("  ✓ Content:", content.trim());

    // Append to file
    console.log("  Appending to file...");
    await fs.appendFile(testFile, new Date().toISOString() + "\\n");
    console.log("  ✓ Content appended");

    // Clean up
    await fs.unlink(testFile);
    console.log("  ✓ File cleaned up");
  } catch (error) {
    console.log("  ✗ Error:", error.message);
  }
}

console.log("File operations with async/await:");
fileOperations();

// ============================================
// 9. PRACTICE EXERCISES
// ============================================

console.log("\n9. PRACTICE EXERCISES\n");

// Exercise 1: Create and use an async function
console.log("Exercise 1 - Async function:");

async function exercise1() {
  await delay(300);
  return "Exercise 1 complete!";
}

exercise1().then((result) => console.log("  ✓", result));

// Exercise 2: Chain multiple async operations
console.log("\nExercise 2 - Multiple operations:");

async function exercise2() {
  try {
    await delay(200);
    console.log("  ✓ Operation 1 done");

    await delay(200);
    console.log("  ✓ Operation 2 done");

    const result = await Promise.all([
      delay(100).then(() => "A"),
      delay(100).then(() => "B"),
      delay(100).then(() => "C"),
    ]);

    console.log("  ✓ Parallel result:", result.join("-"));
  } catch (error) {
    console.log("  ✗ Error:", error.message);
  }
}

exercise2();

// Exercise 3: Error handling
console.log("\nExercise 3 - Error handling:");

async function exercise3() {
  try {
    throw new Error("Intentional error!");
  } catch (error) {
    console.log("  ✓ Caught:", error.message);
  }
}

exercise3();

// ============================================
// 10. COMPARISON: CALLBACKS vs PROMISES vs async/await
// ============================================

console.log("\n10. EVOLUTION OF ASYNC CODE\n");

console.log(`
CALLBACKS (Lesson 3):
  fs.readFile('file.txt', (err, data) => {
    fs.writeFile('out.txt', data, () => {});
  });

PROMISES (Lesson 4):
  fs.promises.readFile('file.txt')
    .then(data => fs.promises.writeFile('out.txt', data))
    .catch(err => console.error(err));

ASYNC/AWAIT (This lesson):
  async function process() {
    try {
      const data = await fs.promises.readFile('file.txt');
      await fs.promises.writeFile('out.txt', data);
    } catch (err) {
      console.error(err);
    }
  }

BENEFITS OF async/await:
  ✓ Most readable
  ✓ Looks like synchronous code
  ✓ Natural error handling with try/catch
  ✓ Standard finally block
`);

// ============================================
// 11. KEY TAKEAWAYS
// ============================================

setTimeout(function () {
  console.log("\n=== KEY TAKEAWAYS ===");
  console.log("✓ async functions always return Promises");
  console.log("✓ await pauses execution until Promise settles");
  console.log("✓ Use try/catch for error handling");
  console.log("✓ Use Promise.all() for parallel operations");
  console.log("✓ Sequential vs Parallel - choose wisely!");
  console.log("✓ async/await is the preferred modern approach");
  console.log("\n✓ You've mastered async programming!");
  console.log("➜ Next: File System & Streams (Lesson 7)");
  console.log("   Run: node lesson-7-file-system.js\n");
}, 4500);
