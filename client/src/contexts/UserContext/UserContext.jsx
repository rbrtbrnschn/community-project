import React, { useEffect } from "react";
const UserContext = React.createContext({});

const UserProvider = props => {
  const [state, setState] = React.useState({
    user: {
      oAuth: {}
    },
    player: {
      tasks: [],
      opponents: [],
      sockets: [],
      lastLogin:0,
    },
    matches: [
      {
        scores: [],
        timestamps: []
      }
    ],
    opponents: [
    ],
    ok: false
  });
  const { children } = props;
  const { player } = state;
  const { tasks, lastLogin } = player;

  useEffect(() => {
    let _user, _player, _matches,_opponents;
    // Init
    init();
    async function init() {
      _user = await getUser();
      _player = await getPlayer();
      _matches = await getMatches(_player);
      _opponents = await getOpponents(_player);
      if (_user.ok && _player.ok) {
        setState({ user: _user, player: _player, matches: _matches,opponents:_opponents });
      }
    }

    // Get User
    async function getUser() {
      const response = await fetch("/api/auth");
      const data = await response.json();
      //console.log("User:",data);
      return data;
    }
    // Get Player
    async function getPlayer() {
      const response = await fetch("/api/player");
      const data = await response.json();
      //console.log("Player:",data);
      return data;
    }
    // Get Matches
    async function getMatches(player) {
      const errMessage = { status: 404, msg: "player not found", ok: false };
      if (!player.sockets) {
        console.log(errMessage);
        return errMessage;
      }

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([..._player.sockets])
      };
      const response = await fetch("/api/match", options);
      const data = await response.json();
      //console.log("Matches:",data);
      return data;
    }
    // Get Opponents
    async function getOpponents(player){
      const errMessage = { status: 404, msg: "player not found", ok: false };
      if (!player.sockets) {
        console.log(errMessage);
        return errMessage;
      }
      const { opponents } = player;
      let requests = []
      opponents.forEach(o=>{
      	requests.push(getOpponent(o))
      })
	    // Get Single Opponent
	    async function getOpponent(id){
		    const url = "http://localhost:3000/api/player/find/playerID/"+id;
		    return new Promise((resolve,reject)=>{
		      fetch(url)
		      .then((resp)=> resp.json())
		      .then((data)=> {
		       	resolve(data);
		      })
		    
		    })
	    }
      
      return Promise.all(requests)
      .then(allData=>{return allData})

    }

  }, []);

  useEffect(() => {
    const prior = { ...state };
    if (prior.ok === false) return;
    console.log(state);
  }, [state]);

	//WHY? You ask?
  const x = state.ok;
	//IT WORKS OKAY!
	//LEAVE IT PLEASE!!!

  useEffect(() => {
    function updateTasks(newTasks) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTasks)
      };
      const url = "/api/task/update";
      fetch(url, options);
    }

    if (x) {
      updateTasks(tasks);

      return;
    }
	  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  useEffect(()=> {
	  if(player.newLogin){
	const url = "/api/player/update/lastlogin"
	fetch(url)

	  return;
	  }
	  return
  },[player.newLogin])

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export { UserProvider };
