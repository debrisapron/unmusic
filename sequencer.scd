d = Dictionary.new;

p = { |events|
	var stream = Pseq(events).asStream;
	var player = Task({
		var event;
		while {
			event = stream.next;
			event.notNil
		} {
			if(event.size > 1, { s.makeBundle(s.latency, { event[1].play; }); });
			event[0].yield;
		}
	});
	player.play(quant: TempoClock.default.beats);
};

TempoClock.default.tempo_(2.0833333333333335);

d.put("buffer1", Buffer.read(s, "/Users/debrisapron/repos/atavistic_leviathan/2-ssri/waves/distKick.wav"));

p.value([
	[0.1],
	[0.25, { PlayBuf.ar(1, d.at("buffer1")); }],
	[0.25, { PlayBuf.ar(1, d.at("buffer1")); }],
	[0.25],
	[0.25, { PlayBuf.ar(1, d.at("buffer1")); }],
	[0.25, { PlayBuf.ar(1, d.at("buffer1")); }]
]);
