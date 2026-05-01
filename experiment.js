console.log("\n === Exercise 3: Environment Check ===\n");
const isProduction = process.env.NODE_ENV === "production";
console.log("Is Production?", isProduction);
