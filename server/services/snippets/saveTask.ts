const router = require("express").Router();

async function saveTaskToFile(id, task, payload) {
  const fs = require("fs");
  var content;
  let path = "archive/" + id + ".json";

  //    Read File
  let file = checkForFile(path, async () => {
    const processed = await fs.readFile(path, "utf8", (err, data) => {
      if (err) throw err;
      else {
        content = data;
      }
      content = processFile(path, content, task, payload);
      return content;
    });
    //!   PLEASE FIX | DONT KNOW HOW
    // *  Works till a timeout of 2ms
    setTimeout(() => {
      console.log(content);
    }, 100);
  });
}

function checkForFile(filename, cb) {
  const fs = require("fs");
  fs.exists(filename, function(exists) {
    if (exists) {
      cb();
    } else {
      fs.writeFile(
        filename,
        JSON.stringify({ completed: [], archived: [] }),
        function(err, data) {
          cb();
        }
      );
    }
  });
}

function processFile(path, content, task, payload) {
  const fs = require("fs");
  content = JSON.parse(content);
  switch (payload) {
    case "complete":
      content.completed.push(task);
      break;
    case "archive":
      content.archived.push(task);
    default:
      break;
  }
  fs.writeFile(path, JSON.stringify(content), () => {
    return;
  });
  return content;
}

module.exports = router;
