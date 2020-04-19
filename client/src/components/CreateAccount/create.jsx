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
      username: false,
      email: false,
      password: false,
    },
    errMsg: {
      username: "",
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    //
  }, []);

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
                ref={fullNameRef}
              ></input>
              <span className="icon is-left">
                <FontAwesomeIcon icon="user" />
              </span>
            </div>
          </div>
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input"
                type="username"
                placeholder="username"
                ref={usernameRef}
              ></input>
              <span className="icon is-left">
                <FontAwesomeIcon icon="user" />
              </span>
            </div>
            {state.errs.username ? (
              <p class="help is-success is-pulled-left">
                This username is available
              </p>
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
                ref={emailRef}
              ></input>
              <span className="icon is-left">
                <FontAwesomeIcon icon="envelope" />
              </span>
            </div>
            {state.errs.email ? (
              <p class="help is-success is-pulled-left">
                This email is available
              </p>
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
                ref={passwordRef}
              ></input>
              <span className="icon is-left">
                <FontAwesomeIcon icon="lock" />
              </span>
            </div>
            {state.errs.password ? (
              <p class="help is-success is-pulled-left">
                This password is available
              </p>
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
