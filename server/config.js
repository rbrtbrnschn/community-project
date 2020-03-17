const production = false;
const config = {
	db:{
		uri: "mongodb+srv://dev-root:QaY43yi3zJbVApD@maincluster-uqmqf.mongodb.net/test?retryWrites=true&w=majority",
		names: {
			users: "Users",
			players: "Players",
			matches: "Matches"
		}
	}
}

module.exports = config;
