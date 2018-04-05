# Introduction

## Getting started

The fundamental idea of um is simple: Build a score by nesting scoring functions, then play the score. Scores are nothing more than plain JS objects, so scoring functions are pure & very easy to write. Unlike traditional music scores, um scores can contain information about both macro structure (parts, bars, notes etc) and micro structure (samples, synths, fx etc).

Let's start by explaining a simple example.

```
um.play(sf.acousticGrandPiano('C E G F'))
```

Firstly we have a call to `um.soundfont.acousticGrandPiano`. This takes a score, which can be either a string of _umscript_ or the return value of another scoring function, and returns a score consisting of four quarter-notes on the middle octave, played on [the built-in soundfont](https://github.com/danigb/soundfont-player) `acousticGrandPiano` instrument.

The returned score object is then played with `um.play`. To stop it you just need to call `um.stop()`.

## Namespaces

There are a number of namespaces within um which expose different functions for different aspects of music-making. Currently these are:

- `core`: These are the fundamental scoring functions used to build up an um composition. `core` includes the umscript parser, and offline functions such as `mix` and `seq`. These are exposed on the root-level `um` object, and `um` itself is actually the `seq` function.
- `midi`: These are functions for sending and receiving MIDI messages, exposed as `um.midi` or in the app as the `midi` global.
- `instruments`: This is a selection of Web Audio API instruments created with [Partch](http://debrisapron.me/partch/). It also exposes an API to create your own instruments. The namespace is exposed as `um.instruments` or in the app as the `ns` global.
- `soundfont`: This is a selection of sampled instruments from the [soundfont-player](https://github.com/danigb/soundfont-player) package. It's exposed as `um.soundfont` or in the app as the `sf` global.
- `effects`: This is a selection of Web Audio API effects created with Partch. It also exposes an API to create your own effects. The namespace is exposed as `um.effects` or in the app as the `fx` global.
- `processors`: This is a collection of real-time processors which can be used to transform an incoming stream of events, such as MIDI input. The namespace is exposed as `um.processors` or in the app as the `pr` global.
