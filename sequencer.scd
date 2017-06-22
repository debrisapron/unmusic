(
var b, pseq, stream;
TempoClock.default.tempo_(2.0);
b = Buffer.read(s, "/Users/debrisapron/Dropbox/projects/audio/samples/clap808.wav");
pseq = Pseq([
	[1,   { PlayBuf.ar(1, b); }],
	[2,   { PlayBuf.ar(1, b); }],
	[0.5, { PlayBuf.ar(1, b); }],
	[0.5, { PlayBuf.ar(1, b); }]
], 4);
stream = pseq.asStream;
Task({
	var t, fn;
	while {
		# t, fn = stream.next;
		t.notNil
	} {
		s.makeBundle(s.latency, { fn.play; });
		t.yield;
	}
}).play(quant: TempoClock.default.beats);
)