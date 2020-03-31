const fs = require("fs");
const setup = {
  archived: [],
  completed: [],
  createdBy: "server/services/snippets/fsHelpers"
};
// check if file(@pathname) exists
function exists(pathname, cb) {
  fs.exists(pathname, exists => {
    if (exists) cb();
    else {
      fs.writeFile(pathname, JSON.stringify(setup), async (err, data) => {
        if (cb) cb(data);
      });
    }
  });
}

// read file
function read(pathname, cb) {
  fs.readFile(pathname, "utf8", (err, data) => {
    if (err) throw err;
    else {
      if (cb) cb(data);
      // If you want to access data
      // use cb here
    }
  });
}

// write to file

function write(pathname, content, cb) {
  fs.writeFile(pathname, JSON.stringify(content), (err, data) => {
    if (cb) cb(data);
    // do something after written to file
  });
}

export { exists, read, write };
