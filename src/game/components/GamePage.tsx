import { useEffect, useRef, useState } from "react";
import { gameDebugConfig } from "../config/gameDebugConfig";
import type {
  AbilityUnlockViewModel,
  ProgressNotificationViewModel,
  ThoughtViewModel,
} from "../data/story/story.types";
import {
  emitGameEvent,
  onGameEvent,
} from "../systems/gameEventBus";
import type {
  ClueInspectionViewModel,
  DialogueViewModel,
  GameDirection,
  GameMapId,
  GameStatusViewModel,
} from "../types/game.types";
import { AbilityToast } from "./AbilityToast";
import { ClueInspectionPanel } from "./ClueInspectionPanel";
import { DialogueBox } from "./DialogueBox";
import { GameCanvas } from "./GameCanvas";
import { GameIntroScreen } from "./GameIntroScreen";
import { JournalPanel } from "./JournalPanel";
import { ActiveItemSlot, InventoryPanel } from "./InventoryPanel";
import { KeypadPanel } from "./KeypadPanel";
import { ProgressToast } from "./ProgressToast";
import { RadioPanel } from "./RadioPanel";
import { StoryMapPanel } from "./StoryMapPanel";
import { ThoughtBubble } from "./ThoughtBubble";
import styles from "./GamePage.module.css";

type GamePageProps = {
  onExit: () => void;
};

const INTRO_SESSION_KEY = "evie-last-transmission-intro-seen";

const emptyDialogue: DialogueViewModel = {
  isOpen: false,
  speaker: "",
  line: "",
  lineIndex: 0,
  lineCount: 0,
  choices: [],
};

const initialStatus: GameStatusViewModel = {
  mapId: "bedroom",
  mapTitle: "Carregando cenário...",
  objective: "Acorde e examine o quarto e a sala da cabana.",
  interactionPrompt: "",
};

const directionButtons: Array<{
  direction: GameDirection;
  glyph: string;
  label: string;
}> = [
  { direction: "up", glyph: "↑", label: "Mover para cima" },
  { direction: "left", glyph: "←", label: "Mover para esquerda" },
  { direction: "down", glyph: "↓", label: "Mover para baixo" },
  { direction: "right", glyph: "→", label: "Mover para direita" },
];

export function GamePage({ onExit }: GamePageProps) {
  const [gameStarted, setGameStarted] = useState(
    () => window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1",
  );
  const [dialogue, setDialogue] = useState(emptyDialogue);
  const [status, setStatus] = useState(initialStatus);
  const [radioId, setRadioId] = useState<string | null>(null);
  const [keypadId, setKeypadId] = useState<string | null>(null);
  const [journalOpen, setJournalOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [inspection, setInspection] =
    useState<ClueInspectionViewModel | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [ability, setAbility] = useState<AbilityUnlockViewModel | null>(null);
  const [thought, setThought] = useState<ThoughtViewModel | null>(null);
  const [notification, setNotification] =
    useState<ProgressNotificationViewModel | null>(null);
  const thoughtTimer = useRef<number | null>(null);
  const notificationTimer = useRef<number | null>(null);

  useEffect(() => {
    const removeListeners = [
      onGameEvent("dialogue:changed", setDialogue),
      onGameEvent("dialogue:closed", () => setDialogue(emptyDialogue)),
      onGameEvent("game:status", setStatus),
      onGameEvent("radio:open", (transmissionId) => {
        setJournalOpen(false);
        setInventoryOpen(false);
        setMapOpen(false);
        setKeypadId(null);
        setRadioId(transmissionId);
      }),
      onGameEvent("radio:close", () => setRadioId(null)),
      onGameEvent("keypad:open", (puzzleId) => {
        setJournalOpen(false);
        setInventoryOpen(false);
        setMapOpen(false);
        setRadioId(null);
        setKeypadId(puzzleId);
      }),
      onGameEvent("keypad:close", () => setKeypadId(null)),
      onGameEvent("journal:toggle", () => {
        setInventoryOpen(false);
        setJournalOpen((current) => {
          const next = !current;
          emitGameEvent("journal:changed", next);
          return next;
        });
      }),
      onGameEvent("journal:changed", setJournalOpen),
      onGameEvent("inventory:toggle", () => {
        setInventoryOpen((current) => {
          const next = !current;
          emitGameEvent("inventory:changed", next);
          return next;
        });
      }),
      onGameEvent("inventory:changed", setInventoryOpen),
      onGameEvent("inspection:open", setInspection),
      onGameEvent("inspection:close", () => setInspection(null)),
      onGameEvent("map:changed", setMapOpen),
      onGameEvent("ability:unlocked", (nextAbility) => {
        setAbility(nextAbility);
        window.setTimeout(() => setAbility(null), 5200);
      }),
      onGameEvent("thought:show", (nextThought) => {
        if (thoughtTimer.current) {
          window.clearTimeout(thoughtTimer.current);
        }
        setThought(nextThought);
        thoughtTimer.current = window.setTimeout(
          () => setThought(null),
          nextThought.duration,
        );
      }),
      onGameEvent("progress:notify", (nextNotification) => {
        if (notificationTimer.current) {
          window.clearTimeout(notificationTimer.current);
        }
        setNotification(nextNotification);
        notificationTimer.current = window.setTimeout(
          () => setNotification(null),
          3900,
        );
      }),
    ];

    return () => {
      removeListeners.forEach((removeListener) => removeListener());
      if (thoughtTimer.current) {
        window.clearTimeout(thoughtTimer.current);
      }
      if (notificationTimer.current) {
        window.clearTimeout(notificationTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        !gameStarted ||
        event.repeat ||
        radioId ||
        keypadId ||
        dialogue.isOpen
      ) {
        return;
      }

      if (event.key === "Escape" && inspection) {
        event.preventDefault();
        emitGameEvent("inspection:close", undefined);
        return;
      }

      if (inspection) {
        return;
      }

      const key = event.key.toLowerCase();

      if (key === "0" && gameDebugConfig.enableModeratorMode) {
        event.preventDefault();
        setIsModerator((current) => {
          const next = !current;
          if (!next) {
            emitGameEvent("map:changed", false);
          }
          return next;
        });
        return;
      }

      if (key === "j" && !mapOpen) {
        event.preventDefault();
        emitGameEvent("inventory:changed", false);
        emitGameEvent("journal:toggle", undefined);
        return;
      }

      if (key === "b" && !mapOpen && !journalOpen) {
        event.preventDefault();
        emitGameEvent("inventory:toggle", undefined);
        return;
      }

      if (event.key === "Escape" && inventoryOpen) {
        event.preventDefault();
        emitGameEvent("inventory:changed", false);
        return;
      }

      if (key === "m" && isModerator && !journalOpen && !inventoryOpen) {
        event.preventDefault();
        emitGameEvent("map:changed", !mapOpen);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    dialogue.isOpen,
    gameStarted,
    isModerator,
    inventoryOpen,
    inspection,
    journalOpen,
    keypadId,
    mapOpen,
    radioId,
  ]);

  function beginGame() {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    setGameStarted(true);
  }

  function resetGame() {
    emitGameEvent("game:reset", undefined);
    window.sessionStorage.removeItem(INTRO_SESSION_KEY);
    window.setTimeout(() => {
      setDialogue(emptyDialogue);
      setRadioId(null);
      setKeypadId(null);
      setJournalOpen(false);
      setInventoryOpen(false);
      setInspection(null);
      setMapOpen(false);
      setThought(null);
      setNotification(null);
      setGameStarted(false);
    }, 60);
  }

  function startMove(direction: GameDirection) {
    emitGameEvent("game:move-start", direction);
  }

  function stopMove() {
    emitGameEvent("game:move-stop", undefined);
  }

  if (!gameStarted) {
    return <GameIntroScreen onStart={beginGame} />;
  }

  return (
    <section className={styles.gamePage} aria-labelledby="game-title">
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>minigame 2D</p>
          <h1 id="game-title">A Última Transmissão</h1>
        </div>
        <div className={styles.headerActions}>
          {isModerator ? (
            <>
              <span className={styles.moderatorBadge}>moderador</span>
              <button
                className="pixel-button pixel-button--compact pixel-button--secondary"
                type="button"
                onClick={() => {
                  emitGameEvent("journal:changed", false);
                  emitGameEvent("inventory:changed", false);
                  emitGameEvent("map:changed", !mapOpen);
                }}
              >
                mapa (M)
              </button>
            </>
          ) : null}
          <button
            className="pixel-button pixel-button--compact pixel-button--secondary"
            type="button"
            onClick={() => {
              emitGameEvent("map:changed", false);
              emitGameEvent("journal:toggle", undefined);
            }}
          >
            diário (J)
          </button>
          <button
            className="pixel-button pixel-button--compact pixel-button--secondary"
            type="button"
            onClick={resetGame}
          >
            reiniciar história
          </button>
          <button className="pixel-button pixel-button--compact" type="button" onClick={onExit}>
            sair do jogo
          </button>
        </div>
      </header>

      <div className={styles.gameLayout}>
        <div className={styles.gameFrame}>
          <GameCanvas />
          <DialogueBox dialogue={dialogue} />
          <RadioPanel transmissionId={radioId} />
          <KeypadPanel puzzleId={keypadId} />
          <JournalPanel isOpen={journalOpen} />
          <InventoryPanel isOpen={inventoryOpen} />
          <ClueInspectionPanel inspection={inspection} />
          <StoryMapPanel currentRoomId={status.mapId as GameMapId} isOpen={mapOpen} />
          <ThoughtBubble thought={thought} />
          <ProgressToast notification={notification} />
          <AbilityToast ability={ability} />
          {status.interactionPrompt &&
          !dialogue.isOpen &&
          !radioId &&
          !keypadId &&
          !journalOpen &&
          !inventoryOpen &&
          !inspection &&
          !mapOpen ? (
            <span className={styles.interactionHint}>{status.interactionPrompt}</span>
          ) : null}
        </div>

        <aside className={styles.statusPanel} aria-label="Estado da aventura">
          <div>
            <span>local</span>
            <strong>{status.mapTitle}</strong>
          </div>
          <div>
            <span>objetivo atual</span>
            <p>{status.objective}</p>
          </div>
          <ActiveItemSlot />
          <dl>
            <div><dt>mover</dt><dd>WASD / setas</dd></div>
            <div><dt>interagir</dt><dd>E / Enter</dd></div>
            <div><dt>diálogo</dt><dd>Espaço</dd></div>
            <div><dt>fechar</dt><dd>Esc</dd></div>
            <div><dt>diário</dt><dd>J</dd></div>
            <div><dt>mochila</dt><dd>B</dd></div>
            {isModerator ? (
              <>
                <div><dt>mapa</dt><dd>M</dd></div>
                <div><dt>modo</dt><dd>0</dd></div>
              </>
            ) : null}
          </dl>
        </aside>
      </div>

      <div className={styles.mobileControls} aria-label="Controles de movimento">
        <div className={styles.directionPad}>
          {directionButtons.map((button) => (
            <button
              className={styles[button.direction]}
              key={button.direction}
              type="button"
              aria-label={button.label}
              title={button.label}
              onPointerDown={() => startMove(button.direction)}
              onPointerUp={stopMove}
              onPointerCancel={stopMove}
              onPointerLeave={stopMove}
            >
              {button.glyph}
            </button>
          ))}
        </div>
        <button
          className={styles.interactButton}
          type="button"
          aria-label="Interagir"
          title="Interagir"
          onClick={() => emitGameEvent("game:interact", undefined)}
        >
          E
        </button>
        <button
          className={styles.inventoryButton}
          type="button"
          aria-label="Abrir mochila"
          title="Mochila"
          onClick={() => emitGameEvent("inventory:toggle", undefined)}
        >
          B
        </button>
      </div>
    </section>
  );
}
