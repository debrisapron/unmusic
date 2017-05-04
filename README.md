# ∪∩m∪sic

unmusic (um) is a composition-oriented JS library for music & sound design with the Web Audio API.

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
let um = require('unmusic')()
um.playOnce(um.sample({ url: 'http://piano.com' }, 'C E G E'))
```

## Installation

If you want to use um to actually compose music your best bet is probably the um-atom(link) plugin for the Atom text editor(link) which provides basic DAW-style functionality around um & eliminates some boilerplate for you. However you can also directly use um as a dependency for your own JS projects by installing it from npm:

```
npm install unmusic
```

## Quick start

The fundamental idea of um is simple: Build a score by nesting composer functions, then play the score. Scores are nothing more than plain JS objects, so composer functions are pure & very easy to write. Unlike traditional music scores, um scores contain information about both macro structure (parts, bars, notes etc) and micro structure (samples, synths, fx etc).

Let's start by explaining the example we gave at the beginning of this README. (Note that all examples from hereon in will assume that you instantiate um at the beginning of your code. Furthermore, note that um-atom will both fill in this boilerplate for you, *and* destructure the um object so you can use all um functions without preceding them with `um.`.)

```
um.playOnce(um.sample({ url: 'http://piano.com' }, 'C E G E'))
```

`um.sample` is a composer function. It takes a params object and a score, and returns a new score. The returned score will instantiates a sample node for every note action of the passed-in score, or to put it another way, it will play a sample for every note.

Also, `um.sample` is curried(link), so we can simply pass it a params object and it will return a new function that just takes and returns a score, remembering the params we used to create the new function. For example, if we want to make our piano sound more reusable, we could rewrite the example above like this:

```
let piano = um.sample({ url: 'http://piano.com' })
um.playOnce(piano('C E G E'))
```

Now let's say we want to combine this with a simple two-note bassline:

```
let piano = um.sample({ url: 'http://piano.com' })
let bass = um.sample({ url: 'http://bass.com' })
um.playOnce(um.mix(piano('C E G E'), bass('\2 C G')))
```

We've introduced two new ideas here. Firstly, we've used `\2` in our phrase to set the note length to half notes. Secondly, we've used `um.mix` to play the piano and bass together simultaneously.
