"use strict";
let umScoreFromJs = require("./umScoreFromJs");
let csScoreFromUmScore = require("./csScoreFromUmScore");
let csound = require("./csound");

let isPlaying = false;

let play = js => {
  if (isPlaying) return;
  try {
    let umScore = umScoreFromJs(js);
    console.log(umScore);
    if (!umScore) return;
    let csScore = csScoreFromUmScore(umScore);
    if (!csScore) return;
    isPlaying = true;
    console.info("Compiling to csound score...");
    console.info(csScore);
    csound.play(umScore.orch, csScore);
  } catch (err) {
    isPlaying = false;
    throw err;
  }
};

let stop = () => {
  if (!isPlaying) return;
  isPlaying = false;
  csound.stop();
};

let togglePlayback = js => {
  isPlaying ? stop() : play(js);
};

export { togglePlayback };
