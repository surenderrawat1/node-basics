/**
 * LESSON 7: File System Operations
 *
 * In this lesson, you'll learn:
 * 1. Reading files (fs.readFile, fs.readFileSync)
 * 2. Writing files (fs.writeFile, fs.appendFile)
 * 3. Working with directories
 * 4. Checking file/directory existence
 * 5. File metadata and stats
 * 6. Deleting files and directories
 * 7. Using fs.promises for async/await
 */

console.log("=== LESSON 7: FILE SYSTEM OPERATIONS ===\n");

const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

// ============================================
// 1. READING FILES
// ============================================

console.log("1. READING FILES\n");

// Synchronous reading (blocks execution)
console.log("Example 1 - Synchronous read:");
const syncContent = fs.readFileSync(__filename, "utf-8");
console.log("  ✓ Read", syncContent.length, "characters (sync)");

// Asynchronous reading (non-blocking) - callback style
console.log("\nExample 2 - Asynchronous read (callback):");
fs.readFile(__filename, "utf-8", (err, data) => {
  if (err) {
    console.log("  ✗ Error:", err.message);
  } else {
    console.log("  ✓ Read", data.length, "characters (async)");
  }
});

// Asynchronous reading with async/await (fs.promises)
console.log("\nExample 3 - Asynchronous read (async/await):");
async function readWithAsync() {
  try {
    const data = await fsPromises.readFile(__filename, "utf-8");
    console.log("  ✓ Read", data.length, "characters (async/await)");
  } catch (err) {
    console.log("  ✗ Error:", err.message);
  }
}
readWithAsync();

// ============================================
// 2. WRITING FILES
// ============================================

console.log("\n2. WRITING FILES\n");

const testDir = path.join(__dirname, "test-files");

// Create test directory if it doesn't exist
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

// Write file (overwrites if exists)
console.log("Example 1 - Write file:");
fs.writeFileSync(path.join(testDir, "sync-write.txt"), "Hello from sync!");
console.log("  ✓ File written synchronously");

// Async write
console.log("\nExample 2 - Write file (async):");
fs.writeFile(
  path.join(testDir, "async-write.txt"),
  "Hello from async!",
  (err) => {
    if (err) console.log("  ✗ Error:", err.message);
    else console.log("  ✓ File written asynchronously");
  },
);

// Async/await write
console.log("\nExample 3 - Write file (async/await):");
async function writeWithAsync() {
  try {
    await fsPromises.writeFile(
      path.join(testDir, "async-await-write.txt"),
      "Hello from async/await!",
    );
    console.log("  ✓ File written with async/await");
  } catch (err) {
    console.log("  ✗ Error:", err.message);
  }
}
writeWithAsync();

// ============================================
// 3. APPENDING TO FILES
// ============================================

console.log("\n3. APPENDING TO FILES\n");

const logFile = path.join(testDir, "log.txt");

console.log("Appending to file:");
fs.appendFileSync(logFile, "[" + new Date().toISOString() + "] Log entry 1\\n");
console.log("  ✓ Line 1 appended");

fs.appendFile(
  logFile,
  "[" + new Date().toISOString() + "] Log entry 2\\n",
  (err) => {
    if (!err) console.log("  ✓ Line 2 appended");
  },
);

// ============================================
// 4. WORKING WITH DIRECTORIES
// ============================================

console.log("\n4. WORKING WITH DIRECTORIES\n");

// Create directory
console.log("Example 1 - Create directory:");
const newDir = path.join(testDir, "subfolder");
if (!fs.existsSync(newDir)) {
  fs.mkdirSync(newDir, { recursive: true });
  console.log("  ✓ Directory created:", newDir);
}

// Read directory contents
console.log("\nExample 2 - Read directory:");
const files = fs.readdirSync(testDir);
console.log("  ✓ Files in", testDir + ":");
files.forEach((file) => console.log("    -", file));

// Async version
console.log("\nExample 3 - Read directory (async):");
fs.readdir(testDir, { withFileTypes: true }, (err, files) => {
  if (!err) {
    files.forEach((file) => {
      const type = file.isDirectory() ? "[DIR]" : "[FILE]";
      console.log("  ✓", type, file.name);
    });
  }
});

// ============================================
// 5. FILE STATISTICS & METADATA
// ============================================

console.log("\n5. FILE STATISTICS & METADATA\n");

const testFile = path.join(testDir, "async-write.txt");

console.log("Example 1 - Get file stats (sync):");
const stats = fs.statSync(testFile);
console.log("  File size:", stats.size, "bytes");
console.log("  Is file:", stats.isFile());
console.log("  Is directory:", stats.isDirectory());
console.log("  Created:", stats.birthtime);
console.log("  Modified:", stats.mtime);

console.log("\nExample 2 - Get file stats (async):");
fs.stat(testFile, (err, stats) => {
  if (!err) {
    console.log("  ✓ File size:", stats.size, "bytes");
  }
});

// ============================================
// 6. CHECKING FILE/DIRECTORY EXISTENCE
// ============================================

console.log("\n6. CHECKING EXISTENCE\n");

console.log("Example 1 - Using existsSync():");
const exists = fs.existsSync(testFile);
console.log("  File exists:", exists);

console.log("\nExample 2 - Using access():");
fs.access(testFile, fs.constants.F_OK, (err) => {
  if (!err) {
    console.log("  ✓ File is accessible");
  } else {
    console.log("  ✗ File is not accessible");
  }
});

// ============================================
// 7. COPYING FILES
// ============================================

console.log("\n7. COPYING FILES\n");

const sourceFile = path.join(testDir, "async-write.txt");
const destFile = path.join(testDir, "copy-of-async-write.txt");

console.log("Copying file:");
fs.copyFileSync(sourceFile, destFile);
console.log("  ✓ File copied");

// ============================================
// 8. RENAMING/MOVING FILES
// ============================================

console.log("\n8. RENAMING/MOVING FILES\n");

const oldPath = path.join(testDir, "copy-of-async-write.txt");
const newPath = path.join(testDir, "renamed-file.txt");

console.log("Renaming file:");
fs.renameSync(oldPath, newPath);
console.log("  ✓ File renamed");

// ============================================
// 9. DELETING FILES AND DIRECTORIES
// ============================================

console.log("\n9. DELETING FILES\n");

// Delete single file
console.log("Deleting file:");
const fileToDelete = path.join(testDir, "renamed-file.txt");
if (fs.existsSync(fileToDelete)) {
  fs.unlinkSync(fileToDelete);
  console.log("  ✓ File deleted");
}

// ============================================
// 10. WATCHING FILES FOR CHANGES
// ============================================

console.log("\n10. WATCHING FILES FOR CHANGES\n");

const watchFile = path.join(testDir, "watch-test.txt");
fs.writeFileSync(watchFile, "Initial content");

console.log("Watching file for changes:");
const watcher = fs.watch(watchFile, (eventType, filename) => {
  console.log("  ✓ File changed! Event:", eventType);
});

// Modify file after 1 second
setTimeout(() => {
  fs.appendFileSync(watchFile, "\\nModified!");
}, 1000);

// Stop watching after 2 seconds
setTimeout(() => {
  watcher.close();
}, 2000);

// ============================================
// 11. PRACTICAL EXAMPLE: JSON DATA FILE
// ============================================

console.log("\n11. PRACTICAL EXAMPLE - Working with JSON\n");

async function jsonExample() {
  const jsonFile = path.join(testDir, "data.json");

  try {
    // Create JSON data
    const data = {
      users: [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ],
      timestamp: new Date().toISOString(),
    };

    // Write JSON file
    await fsPromises.writeFile(jsonFile, JSON.stringify(data, null, 2));
    console.log("  ✓ JSON file written");

    // Read JSON file
    const content = await fsPromises.readFile(jsonFile, "utf-8");
    const parsed = JSON.parse(content);
    console.log(
      "  ✓ JSON parsed. Users:",
      parsed.users.map((u) => u.name).join(", "),
    );
  } catch (err) {
    console.log("  ✗ Error:", err.message);
  }
}

jsonExample();

// ============================================
// 12. PRACTICE EXERCISES
// ============================================

console.log("\n12. PRACTICE EXERCISES\n");

async function exercises() {
  const exerciseDir = path.join(testDir, "exercises");

  try {
    // Create directory
    if (!fs.existsSync(exerciseDir)) {
      fs.mkdirSync(exerciseDir, { recursive: true });
    }

    // Exercise 1: Create multiple files
    console.log("Exercise 1 - Create multiple files:");
    for (let i = 1; i <= 3; i++) {
      await fsPromises.writeFile(
        path.join(exerciseDir, `file-${i}.txt`),
        `This is file ${i}`,
      );
    }
    console.log("  ✓ Created 3 files");

    // Exercise 2: Read and list all files
    console.log("\nExercise 2 - List all files:");
    const files = await fsPromises.readdir(exerciseDir);
    files.forEach((file) => console.log("  ✓", file));

    // Exercise 3: Get file sizes
    console.log("\nExercise 3 - File sizes:");
    for (const file of files) {
      const stats = await fsPromises.stat(path.join(exerciseDir, file));
      console.log(`  ✓ ${file}: ${stats.size} bytes`);
    }
  } catch (err) {
    console.log("  ✗ Error:", err.message);
  }
}

exercises();

// ============================================
// 13. CLEANUP AND SUMMARY
// ============================================

setTimeout(() => {
  console.log("\n=== KEY TAKEAWAYS ===");
  console.log("✓ Use fs.promises for async/await");
  console.log("✓ readFile/writeFile for file operations");
  console.log("✓ mkdir/readdir for directories");
  console.log("✓ stat() for file metadata");
  console.log("✓ Watch files for changes with fs.watch()");
  console.log("✓ Always handle errors with try/catch");

  // Cleanup
  console.log("\nCleaning up test files...");
  const recursiveDelete = (dir) => {
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach((file) => {
        const current = path.join(dir, file);
        if (fs.lstatSync(current).isDirectory()) {
          recursiveDelete(current);
        } else {
          fs.unlinkSync(current);
        }
      });
      fs.rmdirSync(dir);
    }
  };

  recursiveDelete(testDir);
  console.log("✓ Test files cleaned up");

  console.log("\n✓ You've mastered File System operations!");
  console.log("➜ Next: Event Emitter Pattern (Lesson 9)");
  console.log("   Run: node lesson-9-events.js\\n");
}, 3500);
