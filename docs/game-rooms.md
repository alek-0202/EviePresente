# Game rooms

The current room sandbox is data-driven and uses the same `WorldScene` for every
environment.

## Room registry

Room maps are split by purpose:

- `src/game/data/rooms/indoorRooms.ts`
- `src/game/data/rooms/outdoorRooms.ts`
- `src/game/data/rooms/testRooms.ts`

`src/game/data/maps.ts` merges those definitions. The room registry order is
kept in `src/game/data/rooms.ts`.

To add a room:

1. Add its ID to `GameMapId` in `src/game/types/game.types.ts`.
2. Add a `GameMapDefinition` to one of the room files.
3. Add the ID to `roomOrder` in `src/game/data/rooms.ts`.

The room `title`, `description`, and `startPosition` control the map label,
status panel, and player spawn.

## Visual assets

Local asset paths and Phaser loading settings are centralized in
`src/game/config/gameAssets.ts`.

Room props use `assetKey`, optional `frame`, tile position, scale, and depth:

```ts
prop("furniture", 30, 9, 7, { scale: 2.4, depth: 4 })
```

Add a new image or spritesheet to the catalog before referencing it in a room.
All public paths use Vite's base URL helper, so they work on GitHub Pages.

## Collisions

Each room defines rectangular collision areas in tile coordinates:

```ts
{ x: 4, y: 3, width: 3, height: 2, style: "wood" }
```

Use `roomEdges(style)` for map boundaries. Keep decorative props aligned with
their collision rectangles when they represent solid furniture, trees, water,
or walls.

## Interactive objects

Add room objects to `src/game/data/objects.ts`. Define their map, position,
sprite, prompt, and optional dialogue. NPCs live in `src/game/data/npcs.ts`,
while dialogue text lives in `src/game/data/dialogues.ts`.

Normal sandbox interactions should not set flags or require items.

`WorldScene` automatically adds a pulsing `!` and floor glow to every visible
interactive object and NPC. Doors and portals also receive a destination label
derived from the target map title, so new transitions do not need duplicated
label text.

Indoor floors are currently rendered as procedural wooden planks, while
mystery rooms use staggered stone slabs. Decorative `spark` entries render as
small dust fragments; they must not be used as interaction markers.

## Progression gates

Story access rules live in `src/game/data/story/progression.ts`. Add a
`roomAccessRules` entry only when a room must be unlocked by story progress.
Rooms without a rule are always accessible.

Puzzle prerequisites live beside each puzzle in
`src/game/data/story/puzzles.ts`. `WorldScene`, the radio, and keypad all use
the same progression system, so a puzzle cannot be solved by bypassing its UI.

The game validates act prerequisites, puzzle references, map nodes, and map
connections during boot.

## Controls

- `J`: journal.
- `0`: toggle moderator mode.
- `M`: read-only connection map, available only in moderator mode.

The moderator map never changes rooms. Add map nodes and visual connections in
`src/game/data/story/progression.ts`; actual travel must remain implemented as
an interactive door or portal with its progression requirement.
