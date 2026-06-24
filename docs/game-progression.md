# Game progression

## Introduction

`GamePage` renders `GameIntroScreen` before mounting `GameCanvas`. Phaser,
physics, saves, and scenes do not start until the player presses `começar`.

The introduction is hidden for the rest of the browser session through
`sessionStorage`. The `reiniciar história` button clears the save and the
session marker, so the introduction appears again.

## Objectives

The current objective is calculated by `getCurrentObjective()` from the ordered
steps in `src/game/data/puzzles.ts`.

Each step points to a typed `GameFlag`. When that flag is added, the next
incomplete step becomes the current objective. `WorldScene` publishes the
objective to the status panel and emits an objective notification when it
changes.

## Protagonist thoughts

Reusable thoughts live in `src/game/data/story/thoughts.ts`.

Use `showStoryThought(id)` for registered thoughts or:

```ts
showThought("Short contextual thought.", {
  duration: 3200,
  onceFlag: "thought_example",
});
```

Persistent one-time thoughts require a typed flag in `GameFlag`. Room-entry
thoughts can define `mapId`, `requiredFlags`, `excludedFlags`, and `delayMs`.

## Automatic doors

Every interactive object with:

- `type: "door"` or `type: "portal"`
- `targetMapId`
- `targetPosition`

is treated as an automatic transition zone by `WorldScene`.

`triggerRadius` controls the zone size. The default is 46 world pixels. A
transition passes the source room to the next scene, preventing the return door
from immediately sending the player back.

Locked automatic doors use `blockedThought`. Keypad doors open their puzzle
automatically after its prerequisite flags are complete.

## Room access

Story room locks live in:

```txt
src/game/data/story/progression.ts
```

Rooms without a `roomAccessRules` entry are normal rooms and remain open.
Locked rooms use the same rules for automatic doors, save recovery, the
moderator map, and the journal.

Puzzle prerequisites stay beside each puzzle in
`src/game/data/story/puzzles.ts`.

## Progress feedback

Flag-based notifications live in:

```txt
src/game/data/story/progressNotifications.ts
```

`publishStoryProgress()` is called by dialogues, radio puzzles, and keypad
puzzles. It publishes clue, transmission, rescue, area, and ability feedback.

## Journal

The journal is built from current flags. It includes:

- current objective
- transmissions
- clues
- rescued friends
- unlocked abilities
- unlocked areas

Add narrative entries in `src/game/data/story/journal.ts`.

## Moderator controls

- `J`: journal.
- `0`: toggle moderator mode.
- `M`: read-only connection map while moderator mode is active.

The moderator map never teleports the player and never bypasses story locks.
Travel must happen through a configured door or portal.
