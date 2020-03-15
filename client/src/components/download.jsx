import React, { Component } from "react";
import download from "downloadjs";
class Download extends Component {
  state = {};
  render() {
    return (
      <div>
        <h2>Download</h2>
        <a
          href="#"
          onClick={async () => {
            const response = await fetch("http://localhost:5000/download");
            const data = await response.json();
            console.log(data);
            console.log(JSON.stringify(data));
            download(JSON.stringify(data), "config.js");
          }}
        >
          Config.js
        </a>
      </div>
    );
  }
}

export default Download;
