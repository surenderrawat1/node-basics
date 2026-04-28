# Project Structure

Complete Node.js learning curriculum with step-by-step lessons.

## Directory Layout

```
node-basics/
├── package.json              # Project configuration
├── README.md                 # Learning path overview
├── QUICK-START.md           # How to run lessons
├── CHEAT-SHEET.md          # Quick reference
├── PROJECT-STRUCTURE.md     # This file
│
├── Lesson Files:
├── lesson-1-basics.js       # Node.js Basics & Global Objects
├── lesson-2-modules.js      # Module System
├── lesson-3-callbacks.js    # Callbacks & Async Patterns
├── lesson-4-promises.js     # Promises
├── lesson-5-async-await.js  # async/await
├── lesson-7-file-system.js  # File System Operations
├── lesson-9-events.js       # Event Emitter Pattern
├── lesson-10-http-server.js # HTTP Server
├── lesson-11-rest-api.js    # Building REST APIs
│
└── modules/                 # Custom modules for lessons
    ├── math-utils.js        # Math operations
    ├── calculator-pattern1.js
    ├── greeting-pattern2.js
    ├── counter-pattern3.js
    └── string-utils.js      # String operations
```

## File Descriptions

### Core Files

**package.json**

- Project metadata
- npm scripts for running lessons
- Run: `npm run lesson1`, `npm run lesson2`, etc.

**README.md**

- Overview of curriculum
- What you'll learn in each lesson
- Prerequisites and next steps

**QUICK-START.md**

- Step-by-step instructions
- How to run each lesson
- Learning tips and recommendations
- Troubleshooting guide

**CHEAT-SHEET.md**

- Quick reference for all concepts
- Code snippets and examples
- Useful for review and lookup

### Lesson Files

Each lesson file contains:

- Clear explanations and comments
- Working code examples
- Practice exercises
- Key takeaways

#### Lesson 1: Node.js Basics (30 mins)

Topics:

- Global objects (global, process, Buffer)
- **dirname and **filename
- process.argv and environment variables
- console methods and utilities

Learn: What makes Node.js special

#### Lesson 2: Module System (40 mins)

Topics:

- require() and module.exports
- Built-in modules (fs, path, os)
- Creating custom modules
- Module patterns and caching

Learn: How to organize code with modules

#### Lesson 3: Callbacks (50 mins)

Topics:

- What callbacks are
- Synchronous vs Asynchronous
- File system callbacks
- Callback Hell and how to avoid it
- Error-first callback pattern

Learn: Foundation of async programming

#### Lesson 4: Promises (50 mins)

Topics:

- Promise states and lifecycle
- Creating and consuming promises
- .then(), .catch(), .finally()
- Promise chaining
- Promise.all(), Promise.race()

Learn: Better async pattern than callbacks

#### Lesson 5: async/await (50 mins)

Topics:

- async functions
- await keyword
- Error handling with try/catch
- Sequential vs Parallel operations
- Real-world examples

Learn: Modern, clean async code

#### Lesson 7: File System (60 mins)

Topics:

- Reading/writing files
- Working with directories
- File metadata (stats)
- File watching
- JSON file operations
- Practical examples

Learn: How to work with files

#### Lesson 9: Event Emitter (50 mins)

Topics:

- Event Emitter pattern
- Creating and emitting events
- Multiple listeners
- .once() for single events
- Custom event emitters
- Built-in emitters

Learn: Event-driven architecture

#### Lesson 10: HTTP Server (60 mins)

Topics:

- Creating HTTP servers
- Request and response objects
- Parsing URLs and query parameters
- HTTP methods (GET, POST, PUT, DELETE)
- Request body handling
- Status codes and headers
- Serving static files

Learn: How web servers work

#### Lesson 11: REST API (60 mins)

Topics:

- REST principles
- CRUD operations
- HTTP methods and routes
- JSON data exchange
- Error handling
- Complete working API

Learn: Build production-like APIs

### Module Files

Each module is a small example used in Lesson 2 to teach different export patterns.

**math-utils.js**

- Basic functions: add, subtract, multiply, divide
- Pattern: Exporting object with functions

**calculator-pattern1.js**

- Functions: power, square, cube, sqrt
- Pattern: Multiple related functions

**greeting-pattern2.js**

- Single function export
- Pattern: One main function

**counter-pattern3.js**

- Constructor/class pattern
- Pattern: Stateful module with methods

**string-utils.js**

- Functions: reverse, capitalize, countChars, etc.
- Pattern: String manipulation utilities

## How to Use This Project

### First Time Setup

```bash
cd node-basics
npm install  # No dependencies, but good practice
```

### Running Lessons

```bash
npm run lesson1    # Run first lesson
npm run lesson2    # Run second lesson
# etc.
```

### Or run directly with node

```bash
node lesson-1-basics.js
node lesson-2-modules.js
# etc.
```

## Learning Path

**Recommended Order:**

1. Start with QUICK-START.md (read first!)
2. Run lessons 1-5 in order (fundamentals + async)
3. Run lesson 7 (file system)
4. Run lesson 9 (events)
5. Run lessons 10-11 (servers & APIs)
6. Reference CHEAT-SHEET.md as needed

## Each Lesson Includes

✅ Theory and explanation
✅ Multiple working examples
✅ Practice exercises
✅ Real-world scenarios
✅ Key takeaways
✅ Next steps

## Time Investment

- **Total**: ~6-8 hours for all lessons
- **Per lesson**: 30-60 minutes
- **Best**: Spread over 4 days, 2 hours per day

## What You'll Learn

After completing this curriculum, you'll understand:

✅ Node.js fundamentals
✅ Module system and imports
✅ Callbacks, Promises, async/await
✅ File I/O operations
✅ Event-driven programming
✅ HTTP servers
✅ REST API design and implementation

## Next Steps After Lessons

- **Express.js**: Web framework (highly recommended)
- **npm packages**: Explore popular libraries
- **Databases**: MongoDB, PostgreSQL
- **Testing**: Jest, Mocha
- **Real projects**: Build something!

## Tips for Success

1. **Code Along**: Don't just run, type the code yourself
2. **Experiment**: Modify examples and break things
3. **Take Notes**: Create a personal cheat sheet
4. **Practice**: Complete exercises before moving on
5. **Build**: Create your own projects

## Common Questions

**Q: What if I skip lessons?**
A: Try not to! Each builds on previous concepts. Lesson 5 depends on understanding callbacks (Lesson 3).

**Q: Can I run multiple lessons at once?**
A: Some lessons start servers. Run them one at a time.

**Q: Why are Lessons 6 and 8 missing?**
A: They cover error handling and streams, which are less critical for beginners.

**Q: What Node.js version do I need?**
A: v14 or later recommended. v16+ is ideal.

**Q: Can I use these in Windows?**
A: Yes! All code is platform-independent.

## Troubleshooting

**"Module not found"**

- Make sure you're in the right directory
- Check that `modules/` folder exists

**"Port already in use"**

- Lesson 10 and 11 use port 3000 and 3001
- Kill other processes using these ports

**Code doesn't work**

- Read error messages carefully
- Check Node.js version: `node --version`
- Copy code exactly as shown

## Files Generated During Lessons

Some lessons create temporary files:

- `test-data.txt`
- `test-files/` directory
- `public/` directory
- `async-test.txt`

These are automatically cleaned up when lessons finish.

## Project Statistics

- **Total Lessons**: 9 (covering 11 topics)
- **Code Files**: 10 lesson files + 5 module files
- **Lines of Code**: ~2,000 lines with comments
- **Examples**: 50+ working examples
- **Exercises**: 25+ practice exercises
- **Documentation**: 4 guide files

## Getting the Most from This Project

1. **Read before running**: Check the comments in each file
2. **Run and observe**: Execute and see what happens
3. **Modify and experiment**: Change values, add code
4. **Complete exercises**: Don't skip these!
5. **Build something**: Apply what you learned

---

**You're all set!** 🎉

Start with: `npm run lesson1`

Or read: `cat QUICK-START.md`

Good luck on your Node.js learning journey! 🚀
