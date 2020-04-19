import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "../../config";
const { uri } = config;
const Create = () => {
  const fullNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [state, setState] = useState({
    errs: {
      fullname: false,
      username: false,
      email: false,
      password: false,
    },
    msg: {
      fullname: "",
      username: "",
      email: "",
      password: "",
    },
  });
  const { errs, msg } = state;
  function onFocus(input) {
    setState({ ...state, errs: { ...errs, [input]: true } });
  }
  function onBlur(input) {
    setState({ ...state, errs: { ...errs, [input]: false } });
  }

  const onChangeFullname = (e) => {
    const { value } = e.target;
    let message = "";
    if (value.split("").length === 0) message = "Too Short";
    else if (!value.includes(" ")) message = "Missing Lastname";
    else if (value[value.length - 1] === " ") message = "Missing Lastname";
    setState({ ...state, msg: { ...msg, fullname: message } });
  };
  const onChangeUsername = (e) => {
    const { value } = e.target;
    let message = "";
    if (value.split("").length === 0) message = "Too Short";
    if (value.includes(" ")) message = "No Spaces";
    if (value.split("").length < 6) message = "Too Short";

    setState({ ...state, msg: { ...msg, username: message } });
  };
  const onChangeEmail = (e) => {
    const { value } = e.target;
    let message = "";
    if (value.includes(" ")) message = "No Spaces";
    if (value.split("").length < 4) message = "Too Short";
    if (!value.includes("@")) message = "Not A Valid Email Adress";
    else if (!value.includes(".")) message = "Missing '.'";
    if (value[value.length - 1] === ".") message = "Not A Valid Email Adress";

    setState({ ...state, msg: { ...msg, email: message } });
  };
  const onChangePassword = (e) => {
    const { value } = e.target;
    let message = "";
    if (value.split("").length === 0) message = "Too Short";
    else if (value.split("").length < 6) message = "Too Short";
    if (value.includes(" ")) message = "No Spaces";

    setState({ ...state, msg: { ...msg, password: message } });
  };

  const handleOnSubmit = () => {
    // Refs
    const fullName = fullNameRef.current.value;
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let errs = [];

    check(username, email, password);
    //checkUsername(username);
    //checkEmail(email);
    //checkPassword(password);
    async function check(username, email, password) {
      try {
        const validUsername = await checkUsername(username);
        const validEmail = await checkEmail(email);
        const validPassword = checkPassword(password);
        const user = {
          fullName: fullName,
          username: validUsername,
          email: validEmail,
          password: validPassword,
        };
        createUser(user);
      } catch (err) {
        if (err) throw new Error(err);
      }
    }
    async function checkUsername(username) {
      try {
        if (!username) {
          errs.push("No username.");
        }
        if (username.length < 6) {
          errs.push("Username not long enough.");
        }
        if (username.includes(" ")) {
          errs.push("Username cannot have spaces.");
        }
        if (errs.length > 0) return;
        const url = uri.domain + "/api/player/find/username/" + username;
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 404) {
          return username;
        } else {
          errs.push("username is taken.");
          return;
        }
      } catch (err) {
        throw new Error(err);
      } finally {
        errs.forEach(console.log);
        //if(errs.length>0)throw new Error("Invalid Username");
      }
    }
    async function checkEmail(email) {
      let errs = [];
      try {
        if (!email.includes("@")) {
          errs.push("Missing '@'");
        }
        if (!email.includes(".")) {
          errs.push("Missing '.'");
        }
        if (email.endsWith(".")) {
          errs.push("Missing com/de/etc.");
        }
        if (email.length < 4) {
          errs.push("Too short.");
        }
        if (errs.length > 0) return;
        const url = uri.domain + "/api/user/find/email/" + email.toLowerCase();
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 404) {
          return email;
        }
      } catch (err) {
        throw new Error(err);
      } finally {
        errs.forEach(console.log);
        //if(errs.length>0)throw new Error("Invalid Email")
      }
    }
    function checkPassword(password) {
      let errs = [];
      try {
        if (password.length < 6)
          errs.push("Password must be longer than 6 characters.");
        if (errs.length > 0) return;
        return password;
      } catch (err) {
        if (err) throw new Error(err);
      } finally {
        errs.forEach(console.log);
        //if(errs.length>0)throw new Error("Invalid Password");
      }
    }
    async function createUser(user) {
      let err = false;
      Object.values(user).forEach((stuff) => {
        if (stuff === undefined) {
          err = true;
        }
      });
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
      if (err) {
        console.log("Input was wrong");
        return;
      }
      const url = uri.domain + "/api/user/new";
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    }
  };

  return (
    <div>
      <h2 className="title is-3">Create Account</h2>
      <div className="columns">
        <div className="column is-third"></div>
        <div className="column is-third">
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="full name"
                onChange={onChangeFullname}
                id="fullname-input"
                onBlur={() => {
                  onBlur("fullname");
                }}
                onFocus={() => {
                  onFocus("fullname");
                }}
              ></input>
              <span className="icon is-left">
                <FontAwesomeIcon icon="user" />
              </span>
            </div>
            {state.errs.fullname ? (
              <p class="help is-success is-pulled-left">{state.msg.fullname}</p>
            ) : (
              ""
            )}
          </div>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="username"
                placeholder="username"
                onChange={onChangeUsername}
                id="username-input"
                onBlur={() => {
                  onBlur("username");
                }}
                onFocus={() => {
                  onFocus("username");
                }}
              ></input>
              <span className="icon is-left">
                <FontAwesomeIcon icon="user" />
              </span>
            </div>
            {state.errs.username ? (
              <p class="help is-success is-pulled-left">{state.msg.username}</p>
            ) : (
              ""
            )}
          </div>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="email"
                placeholder="email"
                onChange={onChangeEmail}
                id="email-input"
                onBlur={() => {
                  onBlur("email");
                }}
                onFocus={() => {
                  onFocus("email");
                }}
              ></input>
              <span className="icon is-left">
                <FontAwesomeIcon icon="envelope" />
              </span>
            </div>
            {state.errs.email ? (
              <p class="help is-success is-pulled-left">{state.msg.email}</p>
            ) : (
              ""
            )}
          </div>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="password"
                onChange={onChangePassword}
                id="password-input"
                onBlur={() => {
                  onBlur("password");
                }}
                onFocus={() => {
                  onFocus("password");
                }}
              ></input>
              <span className="icon is-left">
                <FontAwesomeIcon icon="lock" />
              </span>
            </div>
            {state.errs.password ? (
              <p class="help is-success is-pulled-left">{state.msg.password}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="column is-third"></div>
      </div>

      <input
        className="button is-danger"
        type="submit"
        onClick={handleOnSubmit}
      ></input>
    </div>
  );
};

export default Create;
