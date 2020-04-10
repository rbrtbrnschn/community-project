import React, { useEffect } from "react";
import { config } from "../../config"
const UserContext = React.createContext({});
const { uri } = config;

const UserProvider = (props) => {
  const [state, setState] = React.useState({
    user: {
      oAuth: {},
    },
    player: {
      tasks: [],
      opponents: [],
      sockets: [],
      lastLogin: 0,
    },
    matches: [
      {
        scores: [],
        timestamps: [],
      },
    ],
    opponents: [],
    newLogin: false,
    ok: false,
  });
  const { children } = props;
  const { player } = state;
  const { tasks } = player;

  useEffect(() => {
    let _user, _player, _matches, _opponents;
    // Init
    init();
    async function init() {
      _user = await getUser();
      _player = await getPlayer();
      _matches = await getMatches(_player);
      _opponents = await getOpponents(_player);
      if (_user.ok && _player.ok) {
        setState({
          user: _user,
          player: _player,
          matches: _matches,
          opponents: _opponents,
        });
      }
    }

    // Get User
    async function getUser() {
      const options = {
        method: "GET",
	credentials: "include",
	"Access-Control-Allow-Credentials": true,
	"Access-Control-Allow-Origin": "http://localhost:3000"
      }
      const response = await fetch(`${uri.domain}/api/auth`);
      const data = await response.json();
      //console.log("User:",data);
      if (!data) return { ok: false };
      return data;
    }
    // Get Player
    async function getPlayer() {
      const response = await fetch(`${uri.domain}/api/player`);
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify([..._player.sockets]),
      };
      const response = await fetch(`${uri.domain}/api/match`, options);
      const data = await response.json();
      //console.log("Matches:",data);
      return data;
    }
    // Get Opponents
    async function getOpponents(player) {
      const errMessage = { status: 404, msg: "player not found", ok: false };
      if (!player.sockets) {
        console.log(errMessage);
        return errMessage;
      }
      const { opponents } = player;
      let requests = [];
      opponents.forEach((o) => {
        requests.push(getOpponent(o));
      });
      // Get Single Opponent
      async function getOpponent(id) {
        const url = `${uri.domain}/api/player/find/playerID/` + id;
        return new Promise((resolve, reject) => {
          fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
              resolve(data);
            });
        });
      }

      return Promise.all(requests).then((allData) => {
        return allData;
      });
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

    function updateTasks(newTasks) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTasks),
      };
      const url = `${uri.domain}/api/task/update`;
      fetch(url, options);
    }

  useEffect(() => {

    if (x) {
      updateTasks(tasks);

      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  useEffect(() => {
    if (state.newLogin === true) {
      const url = `${uri.domain}/api/player/update/lastlogin`;
      fetch(url)
      .then(res=>res.json())
      .then(something => updateTasks(tasks))

      return;
    }
    return;
  }, [state.newLogin]);

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export { UserProvider };
