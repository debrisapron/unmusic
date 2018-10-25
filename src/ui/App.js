import _ from "lodash/fp";
import React from "react";
import Split from "react-split";
import Editor from "./Editor";
import Log from "./Log";

class App extends React.Component {
  state = {
    editorWidth: 0,
    editorHeight: 0
  };

  componentDidMount() {
    this.updateEditorDimensions();
  }

  setEditorContainerRef = ref => {
    this._editorContainerRef = ref;
    window.addEventListener("resize", this.updateEditorDimensions);
  };

  updateEditorDimensions = _.debounce(100, () => {
    this.setState({
      editorWidth: this._editorContainerRef.clientWidth,
      editorHeight: this._editorContainerRef.clientHeight
    });
  });

  render() {
    const { editorWidth, editorHeight } = this.state;
    return (
      <Split
        sizes={[75, 25]}
        direction="vertical"
        className="split-container"
        gutterSize={3}
        onDrag={this.updateEditorDimensions}
      >
        <div className="split">
          <Split
            sizes={[75, 25]}
            className="split-container"
            gutterSize={3}
            onDrag={this.updateEditorDimensions}
          >
            <div
              className="split content split-horizontal"
              ref={this.setEditorContainerRef}
            >
              <Editor width={editorWidth} height={editorHeight} />
            </div>
            <div className="split content split-horizontal">
              <Log />
            </div>
          </Split>
        </div>
        <div className="split content" />
      </Split>
    );
  }
}

export default App;
