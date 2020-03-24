const fetch = require("node-fetch");
module.exports = async () => {
	const response = await fetch("http://localhost:3000/api/auth");
	const data = await response.json();
	return data;
}
