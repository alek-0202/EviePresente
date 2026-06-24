import type {
  CollisionArea,
  GameAssetKey,
  MapProp,
} from "../../types/game.types";

export function roomEdges(style: CollisionArea["style"]): CollisionArea[] {
  return [
    { x: 0, y: 0, width: 20, height: 1, style },
    { x: 0, y: 13, width: 20, height: 1, style },
    { x: 0, y: 1, width: 1, height: 12, style },
    { x: 19, y: 1, width: 1, height: 12, style },
  ];
}

export function prop(
  assetKey: GameAssetKey,
  frame: number | undefined,
  x: number,
  y: number,
  options: Omit<MapProp, "assetKey" | "frame" | "x" | "y"> = {},
): MapProp {
  return {
    assetKey,
    frame,
    x,
    y,
    ...options,
  };
}

export function repeatProps(
  assetKey: GameAssetKey,
  frame: number,
  positions: Array<[number, number]>,
  options: Omit<MapProp, "assetKey" | "frame" | "x" | "y"> = {},
) {
  return positions.map(([x, y]) => prop(assetKey, frame, x, y, options));
}
