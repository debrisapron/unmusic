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
      code: "// type your code..."
    };
  }

  editorDidMount(editor, monaco) {
    console.log("editorDidMount", editor);
    editor.focus();
  }

  onChange(newValue, e) {
    console.log("onChange", newValue, e);
  }

  render() {
    const { code } = this.state;
    const { width, height } = this.props;
    return (
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
    );
  }
}

export default Editor;
