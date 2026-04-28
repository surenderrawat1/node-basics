/**
 * LESSON 4: Promises
 *
 * In this lesson, you'll learn:
 * 1. Promise fundamentals (states and lifecycle)
 * 2. Creating promises
 * 3. Consuming promises (.then(), .catch())
 * 4. Promise chaining
 * 5. Promise.all() and Promise.race()
 * 6. Error handling with promises
 */

console.log("=== LESSON 4: PROMISES ===\n");

// ============================================
// 1. PROMISE FUNDAMENTALS
// ============================================

console.log("1. PROMISE BASICS\n");

console.log(`
A Promise is an object representing the eventual completion
(or failure) of an asynchronous operation and its resulting value.

STATES:
  • Pending: Initial state, operation hasn't completed yet
  • Fulfilled: Operation completed successfully
  • Rejected: Operation failed

Once a promise settles (fulfilled or rejected), it cannot change!
`);

// ============================================
// 2. CREATING PROMISES
// ============================================

console.log("\n2. CREATING PROMISES\n");

// Create a simple promise
const promise1 = new Promise(function (resolve, reject) {
  console.log("Promise 1: Resolving...");
  resolve("Promise 1 fulfilled!");
});

const promise2 = new Promise(function (resolve, reject) {
  console.log("Promise 2: Rejecting...");
  reject(new Error("Promise 2 failed!"));
});

// Promises execute immediately (synchronous executor)
console.log("(Promises above were created and executed immediately)\n");

// ============================================
// 3. CONSUMING PROMISES WITH .then() AND .catch()
// ============================================

console.log("3. CONSUMING PROMISES\n");

// .then() - handles fulfilled state
promise1.then(function (value) {
  console.log("✓ Promise 1 result:", value);
});

// .catch() - handles rejected state
promise2.catch(function (error) {
  console.log("✗ Promise 2 error:", error.message);
});

// .finally() - runs regardless of outcome (optional)
new Promise(function (resolve) {
  resolve("done");
}).finally(function () {
  console.log("✓ Finally block always runs!");
});

// ============================================
// 4. PROMISE CHAINING
// ============================================

console.log("\n4. PROMISE CHAINING\n");

console.log("Chaining multiple .then() calls:");

function fetchUser(userId) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({ id: userId, name: "Alice" });
    }, 300);
  });
}

function fetchUserPosts(userId) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve([
        { id: 1, title: "Post 1" },
        { id: 2, title: "Post 2" },
      ]);
    }, 300);
  });
}

fetchUser(1)
  .then(function (user) {
    console.log("  Step 1: Got user:", user.name);
    return fetchUserPosts(user.id);
  })
  .then(function (posts) {
    console.log("  Step 2: Got", posts.length, "posts");
    return posts;
  })
  .then(function (posts) {
    console.log("  Step 3: Post titles:", posts.map((p) => p.title).join(", "));
  })
  .catch(function (error) {
    console.log("  Error:", error.message);
  });

// ============================================
// 5. ERROR HANDLING IN PROMISE CHAINS
// ============================================

console.log("\n5. ERROR HANDLING IN CHAINS\n");

function mightFail(shouldFail) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (shouldFail) {
        reject(new Error("Operation failed!"));
      } else {
        resolve("Success!");
      }
    }, 200);
  });
}

console.log("Error handling in promise chain:");

mightFail(true)
  .then(function (result) {
    console.log("  This won't run");
  })
  .catch(function (error) {
    console.log("  ✓ Caught error:", error.message);
    return "recovered";
  })
  .then(function (result) {
    console.log("  ✓ Recovered and got:", result);
  });

// ============================================
// 6. PROMISE.ALL() - WAIT FOR ALL PROMISES
// ============================================

console.log("\n6. PROMISE.ALL() - Run Multiple Promises\n");

const promise_a = new Promise((r) => setTimeout(() => r("A"), 200));
const promise_b = new Promise((r) => setTimeout(() => r("B"), 300));
const promise_c = new Promise((r) => setTimeout(() => r("C"), 100));

console.log("Running 3 promises in parallel:");

Promise.all([promise_a, promise_b, promise_c]).then(function (results) {
  console.log("  ✓ All done! Results:", results);
  console.log("  ✓ Took ~300ms (longest promise)");
});

// ============================================
// 7. PROMISE.RACE() - FIRST PROMISE WINS
// ============================================

console.log("\n7. PROMISE.RACE() - First Promise Wins\n");

const fast = new Promise((r) => setTimeout(() => r("Fast!"), 100));
const slow = new Promise((r) => setTimeout(() => r("Slow!"), 500));

console.log("Racing 2 promises:");

Promise.race([fast, slow]).then(function (result) {
  console.log("  ✓ Winner:", result);
});

// ============================================
// 8. PROMISE.ALLSETTLED() - ALL RESULTS
// ============================================

console.log("\n8. PROMISE.ALLSETTLED() - Wait for All\n");

const p1 = Promise.resolve("Success 1");
const p2 = Promise.reject(new Error("Failed!"));
const p3 = Promise.resolve("Success 2");

console.log("Using allSettled (includes failures):");

Promise.allSettled([p1, p2, p3]).then(function (results) {
  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(`  ✓ Promise ${i + 1}:`, result.value);
    } else {
      console.log(`  ✗ Promise ${i + 1}:`, result.reason.message);
    }
  });
});

// ============================================
// 9. CONVERTING CALLBACKS TO PROMISES
// ============================================

console.log("\n9. PROMISIFYING CALLBACKS\n");

const fs = require("fs");

// Traditional callback style
function readFileCallback(filename, callback) {
  fs.readFile(filename, "utf-8", callback);
}

// Promise style
function readFilePromise(filename) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, "utf-8", function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

console.log("Reading file with promises:");

readFilePromise(__filename)
  .then(function (data) {
    console.log("  ✓ Read", data.length, "characters");
  })
  .catch(function (err) {
    console.log("  ✗ Error:", err.message);
  });

// ============================================
// 10. PRACTICE EXERCISES
// ============================================

console.log("\n10. PRACTICE EXERCISES\n");

// Exercise 1: Create a simple promise
console.log("Exercise 1 - Create and resolve a promise:");

const exercise1 = new Promise(function (resolve) {
  setTimeout(function () {
    resolve("Exercise 1 complete!");
  }, 300);
});

exercise1.then((result) => console.log("  ✓", result));

// Exercise 2: Chain multiple promises
console.log("\nExercise 2 - Chain multiple promises:");

function step1() {
  return new Promise((r) => setTimeout(() => r("Step 1"), 100));
}

function step2() {
  return new Promise((r) => setTimeout(() => r("Step 2"), 100));
}

function step3() {
  return new Promise((r) => setTimeout(() => r("Step 3"), 100));
}

step1()
  .then((r) => {
    console.log("  ✓", r);
    return step2();
  })
  .then((r) => {
    console.log("  ✓", r);
    return step3();
  })
  .then((r) => {
    console.log("  ✓", r);
  });

// ============================================
// 11. COMPARISON: CALLBACKS vs PROMISES
// ============================================

console.log("\n11. CALLBACKS vs PROMISES\n");

console.log(`
CALLBACKS:
  ❌ Callback Hell (pyramid of doom)
  ❌ Hard to read and maintain
  ❌ Manual error handling
  ✓ Simple for basic operations

PROMISES:
  ✓ Readable chains
  ✓ Better error handling
  ✓ Composable (Promise.all, etc.)
  ⚠ Need to understand promise states
  
NEXT: async/await (even better!) - Lesson 5
`);

// ============================================
// 12. NEXT STEPS
// ============================================

setTimeout(function () {
  console.log("\n=== KEY TAKEAWAYS ===");
  console.log("✓ Promises have 3 states: pending, fulfilled, rejected");
  console.log("✓ Use .then() to handle success, .catch() for errors");
  console.log("✓ Promise.all() waits for all, Promise.race() for first");
  console.log("✓ Promises are chainable and composable");
  console.log("➜ Next: async/await (Lesson 5)");
  console.log("   Run: node lesson-5-async-await.js\n");
}, 3500);
