import type {
  AbilityUnlockViewModel,
  KeypadViewModel,
  ProgressNotificationViewModel,
  RadioViewModel,
  ThoughtViewModel,
} from "../data/story/story.types";
import type {
  DialogueViewModel,
  GameDirection,
  GameStatusViewModel,
} from "../types/game.types";

type GameEventDetailMap = {
  "dialogue:changed": DialogueViewModel;
  "dialogue:closed": undefined;
  "dialogue:advance": undefined;
  "dialogue:choose": string;
  "dialogue:close": undefined;
  "ability:unlocked": AbilityUnlockViewModel;
  "progress:notify": ProgressNotificationViewModel;
  "thought:show": ThoughtViewModel;
  "game:status": GameStatusViewModel;
  "game:reset": undefined;
  "game:interact": undefined;
  "game:move-start": GameDirection;
  "game:move-stop": undefined;
  "map:changed": boolean;
  "radio:open": string;
  "radio:close": undefined;
  "radio:changed": RadioViewModel;
  "keypad:open": string;
  "keypad:close": undefined;
  "keypad:changed": KeypadViewModel;
  "journal:changed": boolean;
  "journal:toggle": undefined;
};

const gameEventTarget = new EventTarget();

export function emitGameEvent<K extends keyof GameEventDetailMap>(
  eventName: K,
  detail: GameEventDetailMap[K],
) {
  gameEventTarget.dispatchEvent(new CustomEvent(eventName, { detail }));
}

export function onGameEvent<K extends keyof GameEventDetailMap>(
  eventName: K,
  listener: (detail: GameEventDetailMap[K]) => void,
) {
  const eventListener = (event: Event) => {
    listener((event as CustomEvent<GameEventDetailMap[K]>).detail);
  };

  gameEventTarget.addEventListener(eventName, eventListener);

  return () => {
    gameEventTarget.removeEventListener(eventName, eventListener);
  };
}
