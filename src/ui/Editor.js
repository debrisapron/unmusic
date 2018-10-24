import React from "react";
import MonacoEditor from "react-monaco-editor";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "// type your code..."
    };
    this.myRef = React.createRef();
  }
  editorDidMount(editor, monaco) {
    console.log("editorDidMount", editor);
    editor.focus();
  }
  onChange(newValue, e) {
    console.log("onChange", newValue, e);
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <div style={{ width: "100%", height: "100%" }} ref={this.myRef}>
        <MonacoEditor
          width={this.myRef.current.width}
          height={this.myRef.current.height}
          language="javascript"
          lineNumbers="on"
          theme="vs-dark"
          wordWrap="wordWrapColumn"
          formatOnType={true}
          wordWrapColumn={80}
          rulers={[80]}
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
      </div>
    );
  }
}

export default Editor;
