Unmusic {
  var dict;
  var srv;

  init { |server|
    dict = Dictionary.new;
    srv = server;
  }

  set { |key, fn|
    if (dict.at(key) == nil, {
      dict.put(key, fn.value);
    });
  }

  get { |key|
    ^dict.at(key)
  }

  resources {
    ^dict
  }

  play { |events, bpm|
  	var stream = Pseq(events, inf).asStream;
  	var player = Task({
  		var event;
  		while {
  			event = stream.next;
  			event.notNil
  		} {
  			if(event.size > 1, {
          srv.makeBundle(srv.latency, { event[1].play; });
        });
  			event[0].yield;
  		}
  	});
    TempoClock.default.tempo_(bpm / 60);
  	player.play(quant: TempoClock.default.beats);
  }

  stop {
    CmdPeriod.run;
  }
}
