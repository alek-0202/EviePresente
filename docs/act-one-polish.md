# Act One polish

## Album introduction

`GameIntroScreen` shows five navigable album pages before Phaser starts.
The page data lives in:

```txt
src/game/data/introPages.ts
```

Expected images:

```txt
public/assets/game/intro/intro-01.png
public/assets/game/intro/intro-02.png
public/assets/game/intro/intro-03.png
public/assets/game/intro/intro-04.png
public/assets/game/intro/intro-05.png
```

Missing images fall back to a safe pixel-art scene. The introduction is hidden
for the remainder of the browser session after it is completed or skipped.
Resetting the story clears that session marker.

The protagonist is persisted as `the-viewer` and displayed as `The Viewer`.

## Save version

Act One uses save version 3. In addition to flags, items and hints, it stores:

- active inventory item
- seen interaction IDs
- the Act One frequency
- discovered frame digits
- the protagonist ID

Version 1 and 2 saves are migrated by `saveSystem.ts`. Saves that already
completed the old fixed-frequency radio puzzle receive the magnifier and the
legacy `98.5` solution so their progress remains valid.

## Inventory

Inventory item definitions live in:

```txt
src/game/data/inventoryItems.ts
```

Add an item with an ID, name, description, public icon path and optional
`usableOn` categories. World objects grant items through:

```ts
grantsItems: ["magnifying_glass"]
```

Use `hiddenWhenOwnedItemId` when the pickup should disappear after collection.

Controls:

- `B`: open or close the backpack
- arrows or `WASD`: change selection
- `Enter`, `Space` or click: equip
- `Escape` or `B`: close

The active item is always visible in the game status panel. Inventory and the
active item are persisted immediately.

## Magnifying glass clues

The magnifying glass item ID is `magnifying_glass`. An object can expose a
hidden detail with:

```ts
hiddenDetail: {
  requiredItemId: "magnifying_glass",
  discoveryFlag: "discovered_radio_digit_one",
  sequence: 1,
  mark: "I",
}
```

Without the active magnifier, the object uses its normal dialogue. With the
magnifier, `WorldScene` reveals the digit assigned to that sequence, records
the frame ID, adds the flag, updates the journal and publishes feedback.

## Random frequency

Candidate frequencies live in:

```txt
src/game/data/actOneConfig.ts
```

Edit `possibleActOneFrequencies` to add or remove safe values. Each candidate
must use one decimal place, remain inside the radio dial range and produce
exactly three digits after removing the decimal point. The current three-frame
puzzle therefore uses frequencies below `100.0`.

A frequency is chosen when a new save is created and never rerolled for that
save. `transmissionSystem.ts` reads the target from `gameProgress`, so radio
signal quality and puzzle validation use the same persisted value.

## Frame digits

The three frame definitions and their order live in `actOneConfig.ts`.
The frequency decimal point is removed and the remaining three digits are
assigned to marks `I`, `II` and `III`.

Optional digit assets:

```txt
public/assets/game/clues/frames/frame-digit-0.png
...
public/assets/game/clues/frames/frame-digit-9.png
```

When an image is missing, `PreloadScene` generates a neutral framed placeholder.
The puzzle logic does not depend on the PNG.

Large source images are never rendered at native size inside the Phaser world.
Frames use a fixed small world sprite. Interacting opens a compact inspection
panel with the artwork contained inside a hand-held frame.

## Interaction states

`WorldScene` derives interaction markers from persistent progress:

- `new`: bright `!`, never examined
- `seen`: dim `·`, already examined but still usable
- `important`: gold `!`, relevant again because an item or objective changed
- `completed`: marker hidden, interaction remains available

Seen IDs are stored in `seenInteractions`. Hidden-detail objects become
important when their required item is active and completed after their clue
flag is added. Photos and the radio also become important again when their
story phase begins.

## Act boundary

Act One now ends at `rescued_caio`. Finding the hidden tunnel is part of the
separate `last-transmission-act-two-opening` objective chain. No later acts are
implemented by this polish.
