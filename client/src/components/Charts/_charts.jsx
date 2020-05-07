import React, { useContext } from "react";
import ChartComponent from "./chart";
import UserContext from "../../contexts/UserContext";
import TotalLine from './totalLine'
const Charts = (props) => {
  // * Get Context
  const context = useContext(UserContext);
  const { state, setState } = context;

  return (
    <div className="container is-widescreen">
      <div className="card">
        <div className="card-image"></div>
        <div className="card-content has-text-justified">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">John Smith</p>
              <p className="subtitle is-6">@johnsmith</p>
            </div>
          </div>

          <div className="content">
            {state.player.tasks.map((t, i) => (
              <ChartComponent {...props} key={i + "chart"} task={t} tasks={state.player.tasks} />
            ))}
            <TotalLine {...props} tasks={state.player.tasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
