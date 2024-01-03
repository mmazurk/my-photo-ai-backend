"use strict";

const { Client } = require("pg");
const { getDatabaseUri } = require("./config");
const os = require("os");

let db;

if (
  os.platform() === "darwin" &&
  (!process.env.NODE_ENV || process.env.NODE_ENV === "test")
) {
  // macOS development environment
  db = new Client({
    connectionString: `postgres://postgres:@localhost:5432/${getDatabaseUri()}`,
  });
} else if (
  os.platform() === "linux" &&
  (!process.env.NODE_ENV || process.env.NODE_ENV === "test")
) {
  // Ubuntu in WSL2 development environment
  db = new Client({
    host: "/var/run/postgresql/",
    database: getDatabaseUri(),
  });
} else if (process.env.NODE_ENV === "production") {
  // production
  db = new Client({
    connectionString: `${getDatabaseUri()}`,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // Handle other platforms or conditions as needed
  throw new Error(
    "Unsupported platform or configuration - check your db.js file."
  );
}

db.connect();

module.exports = db;

// added for MacOs
// -----------------------------
// if (process.env.NODE_ENV === "production") {
//   db = new Client({
//     connectionString: `postgres://postgres:@localhost:5432/${getDatabaseUri()}`,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });
// } else {
//   db = new Client({
//     connectionString: `postgres://postgres:@localhost:5432/${getDatabaseUri()}`
//   });
// }

// added for Ubuntu in WSL2
// -----------------------------
// if (process.env.NODE_ENV === "production") {
//   db = new Client({
//     host: "/var/run/postgresql/",
//     database: getDatabaseUri(),
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   });
// } else {
//   db = new Client({
//     host: "/var/run/postgresql/",
//     database: getDatabaseUri(),
//   });
// }

// db.connect();

// module.exports = db;

// added for deployment
// -----------------------------
// if (process.env.NODE_ENV === "production") {
//   db = new Client({
//     connectionString: `${getDatabaseUri()}`,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });
// } else {
//   db = new Client({
//     connectionString: `postgres://postgres:@localhost:5432/${getDatabaseUri()}`
//   });
// }
