import React from "react";
import Split from "react-split";
import Editor from "./Editor";

let App = () => {
  return (
    <Split
      sizes={[75, 25]}
      direction="vertical"
      className="split-container"
      gutterSize={2}
    >
      <div className="split">
        <Split sizes={[75, 25]} className="split-container" gutterSize={2}>
          <div className="split content split-horizontal">
            <Editor />
          </div>
          <div className="split split-horizontal">
            <div className="content" />
          </div>
        </Split>
      </div>
      <div className="split content" />
    </Split>
  );
};

export default App;
