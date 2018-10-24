import React from "react";
import MonacoEditor from "react-monaco-editor";

const EDITOR_OPTIONS = {
  selectOnLineNumbers: true,
  wordWrap: "wordWrapColumn",
  formatOnType: true,
  wordWrapColumn: 80,
  rulers: [80],
  lineNumbers: "on"
};

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "// type your code...",
      width: 0,
      height: 0
    };
  }

  editorDidMount(editor, monaco) {
    console.log("editorDidMount", editor);
    editor.focus();
  }

  onChange(newValue, e) {
    console.log("onChange", newValue, e);
  }

  setDimensions = el => {
    const { width, height } = el;
    this.setState({ width, height });
  };

  render() {
    const { code, width, height } = this.state;
    return (
      <div style={{ width: "100%", height: "100%" }} ref={this.setDimensions}>
        <MonacoEditor
          width={width}
          height={height}
          language="javascript"
          theme="vs-dark"
          value={code}
          options={EDITOR_OPTIONS}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
      </div>
    );
  }
}

export default Editor;
