const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const staticFolder = "../dist";

app.use(express.static(path.join(__dirname, staticFolder)));

app.listen(PORT, () => {
  console.log(`Backend is running :${PORT}!`);
});
