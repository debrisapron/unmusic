module.exports = `

d = Dictionary.new;

p = { |events|
	var stream = Pseq(events, inf).asStream;
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

`
