# Quick Start Guide - Node.js Learning Path

## Welcome! 👋

This is your step-by-step guide to learning Node.js fundamentals. Each lesson builds on previous concepts.

## How to Run Lessons

Each lesson has an npm script for easy execution. Choose one:

### Method 1: Using npm scripts (Recommended)

```bash
npm run lesson1    # Node.js Basics & Global Objects
npm run lesson2    # Module System
npm run lesson3    # Callbacks
npm run lesson4    # Promises
npm run lesson5    # async/await
npm run lesson7    # File System
npm run lesson9    # Event Emitter
npm run lesson10   # HTTP Server
npm run lesson11   # REST API
```

### Method 2: Using node directly

```bash
node lesson-1-basics.js
node lesson-2-modules.js
# ... and so on
```

## Lesson Breakdown

### Phase 1: Fundamentals ⚙️

**Lesson 1: Node.js Basics**

- Global objects (global, process, Buffer)
- **dirname and **filename
- process.argv and environment variables
- Console methods

**Lesson 2: Module System**

- require() and module.exports
- Built-in modules (fs, path, os, events)
- Creating custom modules
- Module caching

**Lesson 3: Callbacks**

- What are callbacks?
- Synchronous vs Asynchronous
- Error-first callbacks
- File system callbacks
- Callback Hell

### Phase 2: Async Programming 🔄

**Lesson 4: Promises**

- Promise states (pending, fulfilled, rejected)
- .then(), .catch(), .finally()
- Promise chaining
- Promise.all(), Promise.race()
- Converting callbacks to promises

**Lesson 5: async/await**

- Creating async functions
- Using await
- Error handling with try/catch
- Sequential vs Parallel operations
- Real-world file operations

### Phase 3: Core APIs 🔧

**Lesson 7: File System**

- Reading/writing files
- Working with directories
- File metadata and stats
- Watching files
- Practical JSON file operations

**Lesson 9: Event Emitter**

- Creating event emitters
- on(), once(), emit()
- Multiple listeners
- Custom event emitters
- Built-in emitters (process, fs)

### Phase 4: Servers & APIs 🌐

**Lesson 10: HTTP Server**

- Creating HTTP servers
- Request and response objects
- Parsing URLs and query parameters
- Handling different HTTP methods
- Serving static files

**Lesson 11: REST API**

- REST principles
- CRUD operations
- HTTP methods and status codes
- Error handling
- Complete example API

## Learning Tips

### 1. Code Along

Don't just run the lessons - open them in your editor and read the code carefully. Comments explain everything.

### 2. Modify and Experiment

After running a lesson:

- Change variable values
- Try different operations
- Break things intentionally to understand errors

### 3. Test with curl (for HTTP lessons)

When running HTTP servers, test them with curl:

```bash
# In another terminal
curl http://localhost:3000/
curl http://localhost:3000/api/users
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test"}'
```

### 4. Take Notes

Create your own notes file summarizing key concepts from each lesson.

### 5. Practice Exercises

Each lesson includes practice exercises. Try to complete them without looking at solutions first.

## Recommended Learning Schedule

**Day 1:** Lessons 1-3 (3-4 hours)

- Understand fundamentals
- Learn how Node.js works

**Day 2:** Lessons 4-5 (3-4 hours)

- Master async programming
- Critical for modern Node.js

**Day 3:** Lessons 7, 9 (2-3 hours)

- File operations
- Event-driven architecture

**Day 4:** Lessons 10-11 (2-3 hours)

- Build servers and APIs
- Combine everything

## Prerequisites

- **Node.js** v14 or later installed
- **npm** (comes with Node.js)
- Basic JavaScript knowledge
- A text editor (VS Code recommended)

## What's Covered

✅ Node.js basics and globals
✅ Module system
✅ Callbacks, Promises, async/await
✅ File system operations
✅ Event emitters
✅ HTTP servers
✅ REST APIs

## After These Lessons

Once you master these fundamentals, explore:

- **Express.js** - Web framework (makes HTTP/APIs easier)
- **npm packages** - Popular libraries
- **Databases** - MongoDB, PostgreSQL, etc.
- **Testing** - Jest, Mocha
- **Deployment** - Heroku, AWS, DigitalOcean

## Common Issues

### "Module not found"

The module directory structure assumes you have a `modules/` folder. It should already be created.

### "Port already in use"

If you get this running HTTP lessons, another process is using that port. Wait a minute or change the PORT in the code.

### "EACCES permission denied"

On Mac/Linux, you might need to use `sudo` for certain operations.

## Getting Help

1. Read the comments in the lesson file
2. Check the error message carefully
3. Modify the code to test your understanding
4. Review previous lessons if stuck

## Next Steps

- [ ] Complete Lesson 1
- [ ] Complete Lesson 2
- [ ] Complete Lesson 3
- [ ] Complete Lesson 4
- [ ] Complete Lesson 5
- [ ] Complete Lesson 7
- [ ] Complete Lesson 9
- [ ] Complete Lesson 10
- [ ] Complete Lesson 11
- [ ] Build your own project!

## Resources

- Node.js Official Docs: https://nodejs.org/docs/
- MDN Async Programming: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous
- REST API Guide: https://restfulapi.net/

---

**Ready to start?** Run: `npm run lesson1`

Good luck! 🚀
