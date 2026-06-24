# Game assets

The sandbox uses the local Sprout Lands files currently stored in `public/assets`.
Their paths and Phaser loading metadata are centralized in
`src/game/config/gameAssets.ts`.

These folders remain reserved for game-specific replacements:

- `characters/`: player spritesheets
- `npcs/`: NPC spritesheets
- `tilesets/`: Tiled-compatible tilesets
- `maps/`: JSON maps exported by Tiled
- `portraits/`: dialogue portraits
- `audio/`: music and sound effects
- `ui/`: dialogue frames, icons, and interface textures

The active player spritesheet metadata lives in `src/game/config/playerConfig.ts`.
Room definitions live in `src/game/data/rooms/`, and future Tiled JSON paths can
still be registered on each map definition.
