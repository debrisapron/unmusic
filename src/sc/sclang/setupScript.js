module.exports = `
d = Dictionary.new;

b = { |path|
  if (d.at(path) == nil, {
    d.put(path, Buffer.read(s, path));
  });
  ^d.at(path)
}

p = { |events, bpm|
  var stream = Pseq(events, inf).asStream;
  var player = Task({
    var event;
    while {
      event = stream.next;
      event.notNil
    } {
      if(event.size > 1, {
        s.makeBundle(s.latency, { event[1].play; });
      });
      event[0].yield;
    }
  });
  TempoClock.default.tempo_(bpm / 60);
  player.play(quant: TempoClock.default.beats);
}
`
