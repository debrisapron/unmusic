# *UNDER CONSTRUCTION*

# unmusic

unmusic (um) is a JS library for composing & live-coding music.

## Why another music library?

I want to

- Use a "real" language rather than a specialized music language
- Describe music declaratively in terms of compositional units like notes and parts, not software constructs like clocks and events
- Move seamlessly between the macro level (musical structure) and the micro level (individual notes/sounds)
- Use a workflow which provides rapid feedback (live coding)
- Easily integrate/build on the best work of the Web Audio API development community
- Use a modern, functional JavaScript style that emphasizes the strengths of ES201x & ditches pointless complexity like prototypal inheritance & `this`

## Example

```
// Plays a repeating four-note sequence on MIDI channel 1
let um = require('unmusic')()
let piano = um.midiOut({ cha: 1 })
um.play(um.part(piano, 'C E G E'))
```

## Installation

If you want to use um to actually compose music your best bet is probably the um-atom(link) plugin for the Atom text editor(link) which provides basic DAW-style functionality around um & eliminates some boilerplate for you. However you can also directly use um as a dependency for your own JS projects by installing it from npm:

```
yarn add unmusic
npm install unmusic --save
```

## Quick start

The fundamental idea of um is simple: Build a score by nesting scoring functions, then play the score. Scores are nothing more than plain JS objects, so composer functions are pure & very easy to write. Unlike traditional music scores, um scores can contain information about both macro structure (parts, bars, notes etc) and micro structure (samples, synths, fx etc).

Let's start by explaining the example we gave at the beginning of this README.

```
let piano = um.midiOut({ cha: 1 })
```

This assigns the variable `piano` to a function which will play on the first available MIDI device, on MIDI channel 1.

```
um.play(um.part(piano, 'C E G E'))
```

This creates a four-note sequence and plays it with the piano function assigned in the previous line.

...TO BE CONTINUED
