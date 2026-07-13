const bcrypt = require("bcrypt");

bcrypt.hash("admin123", 10).then((hash) => {
  console.log("Admin Hash:", hash);
});

bcrypt.hash("demo123", 10).then((hash) => {
  console.log("Demo Hash:", hash);
});