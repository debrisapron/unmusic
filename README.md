# *UNDER CONSTRUCTION*

# unmusic

unmusic (um) is an electron app, web app & JS library for composing & live-coding music.

## Example

```
// Plays a repeating four-note piano sequence
import Unmusic from 'unmusic'
let um = Unmusic()
um.play(um.soundfont.acousticGrandPiano('C E G F'))
```

## Why another music library?

I want to

- Use a "real" language rather than a specialized music language.
- Describe music declaratively in terms of compositional units like notes and parts, not software constructs like clocks and events.
- Move seamlessly between the macro level (musical structure) and the micro level (individual notes/sounds).
- Use a workflow which provides rapid feedback (live coding).
- Integrate and build on the best work of the Web Audio API development community.
- Use a modern, functional JavaScript style that emphasizes the strengths of ES201x & ditches pointless complexity like prototypal inheritance & `this`.

## Quick start

The fundamental idea of um is simple: Build a score by nesting scoring functions, then play the score. Scores are nothing more than plain JS objects, so scoring functions are pure & very easy to write. Unlike traditional music scores, um scores can contain information about both macro structure (parts, bars, notes etc) and micro structure (samples, synths, fx etc).

Let's start by explaining the example we gave at the beginning of this README.

```
um.play(um.soundfont.acousticGrandPiano('C E G F'))
```

Firstly we have a call to `um.soundfont.acousticGrandPiano`. This takes a score, which can be either a string of _umscript_ or the return value of another scoring function, and returns a score consisting of four quarter-notes on the middle octave, played on [the built-in soundfont](https://github.com/danigb/soundfont-player) `acousticGrandPiano` instrument.

The returned score object is then played with `um.play`. To stop it you just need to call `um.stop()`.

...TO BE CONTINUED
