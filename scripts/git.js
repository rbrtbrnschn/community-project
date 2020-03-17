const { exec } = require("child_process");
const args = process.argv;
args.splice(0, 2);
const commitMessage = args.join(" ");
if (args.length === 0) {
  console.log("Missing Commit Message");
  return;
}

exec("git pull origin master", (err, a) => {
  if (err) {
    console.log(err);
    return;
  }
  let t = 1;
  exec(`git add . && git commit -m "${commitMessage}"`, (err, a) => {
    if (err) {
      console.log(err);
      return;
    }
    t++;
    exec("git push origin master", (err, a) => {
      if (err) {
        console.log(err);
        return;
      }
      t++;
	  switch (t) {
	    case 3:
	      console.log(`Pushed Commit: ${commitMessage}`);
	      break;
	    case 2:
	      console.log("Added & Comitted Commit.");
	      console.log("Failed To Push.")
	      break;
	    case 1:
	      console.log("Pulled Potential Changes From Repo.");
	      console.log("Failed To Push.")
	    default:
	      break;
	  }
    });
  });
});
