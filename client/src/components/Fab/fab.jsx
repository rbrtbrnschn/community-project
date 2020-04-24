import React, { useEffect, useState } from "react";
import Background from "./background";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import "./fab.scss";

const FabButton = (props) => {
  const _initalState = {
    isActive: null,
    fab: document.createElement("div"),
    background: document.createElement("div"),
  };
  const [state, setState] = useState(_initalState);

  const handleOnOpen = () => {
    setState({ ...state, isActive: !state.isActive });
  };

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
            //window.location = "/createTask";
            const modal = document.getElementById("create-modal");
            const html = document.querySelector("html");
            modal.classList.add("is-active");
            html.classList.add("is-clipped");
            handleOnOpen();
          }}
          text={"Add"}
        >
          <FontAwesomeIcon icon="plus" />
        </Action>
        <Action style={{ backgroundColor: "#3273dc" }} text={"filter"}>
          <FontAwesomeIcon icon="filter" />
        </Action>
        <Action style={{ backgroundColor: "#3273dc" }} text={"find"}>
          <FontAwesomeIcon icon="search" />
        </Action>
      </Fab>
      {state.isActive ? (
        <Background onClickBackground={handleOnClickBackground} />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
export default FabButton;
