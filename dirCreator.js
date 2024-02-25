const path = require("path");
const fs = require("fs");

const dirCreator = () => {
  const directory = path.join(__dirname, "assets");
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  console.log(directory, "and", __dirname);
  return directory;
};

module.exports = dirCreator;
