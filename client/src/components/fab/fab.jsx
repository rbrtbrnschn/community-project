import React, { useEffect, useState } from "react";
import CreateModal from "../CreateModal";
import Background from "./background";
import Search from "./search";
import Filter from "./filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import "./fab.scss";

const FabButton = (props) => {
  const { onFilter, onAdd } = props;

  const _initalState = {
    isActive: null, //! DO NOT CHANGE TO FALSE
    fab: document.createElement("div"),
    action1: false,
    action2: false,
    action3: false,
  };
  const [state, setState] = useState(_initalState);

  const handleOnOpen = () => {
    setState({ ...state, isActive: !state.isActive });
  };
  const handleAction1 = (helpers) => {
    const newState = {
      ...state,
      action1: !state.action1,
      action2: false,
      action3: false,
    };
    if (helpers) {
      helpers(newState);
    }
    return newState;
  };
  const handleAction2 = (helpers) => {
    const newState = {
      ...state,
      action2: !state.action2,
      action1: false,
      action3: false,
    };
    if (helpers) {
      helpers(newState);
    }
    return newState;
  };
  const handleAction3 = (helpers) => {
    const newState = {
      ...state,
      action3: !state.action3,
      action1: false,
      action2: false,
    };
    if (helpers) {
      helpers(newState);
    }
    return newState;
  };

  // * Helper For <Background />
  const handleOnClickBackground = () => {
    setState({ ...state, isActive: !state.isActive });
  };

  // * Get DOM Element On Mount
  useEffect(() => {
    const fab = document.querySelector("ul.rtf.closed");
    setState({ ...state, fab: fab });
  }, []);

  // * Switch isActive onClick
  useEffect(() => {
    const { fab, isActive } = state;
    let add, remove;
    switch (isActive) {
      case true:
        add = "open";
        remove = "closed";
        //      handleOpenBackground();
        break;
      case false:
        add = "closed";
        remove = "open";
        //    handleCloseBackground();
        break;

      default:
        break;
    }
    fab.classList.remove(remove);
    fab.classList.add(add);
  }, [state.isActive]);

  // * Listener Action1
  useEffect(() => {
    const html = document.querySelector("html");
    if (state.action1) {
      const modal = document.getElementById("create-modal");
      modal.classList.add("is-active");
      html.classList.add("is-clipped");
    } else {
      html.classList.remove("is-clipped");
    }
  }, [state.action1]);
  // * Listener Action2
  useEffect(() => {
    const html = document.querySelector("html");
    if (state.action2) {
      const modal = document.getElementById("filter-modal");
      modal.classList.add("is-active");
      html.classList.add("is-clipped");
    } else {
      html.classList.remove("is-clipped");
    }
  }, [state.action2]);
  // * Listener Action3
  useEffect(() => {
    const html = document.querySelector("html");
    if (state.action3) {
      const modal = document.getElementById("search-modal");
      modal.classList.add("is-active");
      html.classList.add("is-clipped");
    } else {
      html.classList.remove("is-clipped");
    }
  }, [state.action3]);
  return (
    <React.Fragment>
      <Fab
        className={"fab"}
        mainButtonStyles={{
          backgroundColor: "#3273dc",
        }}
        event={"hover"}
        icon={<FontAwesomeIcon icon="plus" />}
        onClick={handleOnOpen}
      >
        <Action
          style={{ backgroundColor: "#3273dc" }}
          onClick={() => {
            const _state = handleAction1();
            _state.isActive = !_state.isActive;
            setState(_state);
          }}
          text={"Add"}
        >
          <FontAwesomeIcon icon="plus" />
        </Action>
        <Action
          style={{ backgroundColor: "#3273dc" }}
          text={"filter"}
          onClick={() => {
            const _state = handleAction2();
            _state.isActive = !_state.isActive;
            setState(_state);
          }}
        >
          <FontAwesomeIcon icon="filter" />
        </Action>
        <Action
          style={{ backgroundColor: "#3273dc" }}
          text={"find"}
          onClick={() => {
            const _state = handleAction3();
            _state.isActive = !_state.isActive;
            setState(_state);
          }}
        >
          <FontAwesomeIcon icon="search" />
        </Action>
      </Fab>
      {state.isActive ? (
        <Background onClickBackground={handleOnClickBackground} />
      ) : (
        ""
      )}
      {state.action1 ? (
        <CreateModal
          className="modal is-active"
          onCancle={() => {
            handleAction1(setState);
          }}
          onAdd={onAdd}
        />
      ) : (
        ""
      )}{" "}
      {state.action2 ? (
        <Filter
          className="is-active"
          onCancle={() => {
            handleAction2(setState);
          }}
          onFilter={onFilter}
        />
      ) : (
        <Filter
          className=""
          onCancle={() => {
            handleAction2(setState);
          }}
          onFilter={onFilter}
        />
      )}
      {state.action3 ? (
        <Search
          onCancle={() => {
            handleAction3(setState);
          }}
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
export default FabButton;
