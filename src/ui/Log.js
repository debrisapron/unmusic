import React from "react";
import Inspector from "react-inspector";

class Log extends React.Component {
  state = {
    entries: [{ foo: { bar: { baz: 1 } } }]
  };

  render() {
    const { entries } = this.state;
    return (
      <div className="content">
        {entries.map(entry => (
          <Inspector theme="chromeDark" data={entry} />
        ))}
      </div>
    );
  }
}

export default Log;
