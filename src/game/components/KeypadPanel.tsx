import { useEffect, useState } from "react";
import {
  getKeypadState,
  revealPuzzleHint,
  submitPuzzleCode,
} from "../systems/storyPuzzleSystem";
import { emitGameEvent } from "../systems/gameEventBus";
import { publishStoryProgress } from "../systems/storyProgressSystem";
import styles from "./KeypadPanel.module.css";

type KeypadPanelProps = {
  puzzleId: string | null;
};

export function KeypadPanel({ puzzleId }: KeypadPanelProps) {
  const [digits, setDigits] = useState("");
  const [error, setError] = useState("");
  const [, setHintRevision] = useState(0);
  const state = puzzleId ? getKeypadState(puzzleId, digits, error) : null;

  useEffect(() => {
    setDigits("");
    setError("");
  }, [puzzleId]);

  useEffect(() => {
    if (!puzzleId) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (/^\d$/.test(event.key)) {
        setDigits((value) => `${value}${event.key}`.slice(0, 3));
      } else if (event.key === "Backspace") {
        setDigits((value) => value.slice(0, -1));
      } else if (event.key === "Escape") {
        emitGameEvent("keypad:close", undefined);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [puzzleId]);

  if (!puzzleId || !state) {
    return null;
  }

  const activePuzzleId = puzzleId;

  function appendDigit(digit: string) {
    setDigits((value) => `${value}${digit}`.slice(0, 3));
    setError("");
  }

  function submit() {
    const result = submitPuzzleCode(activePuzzleId, digits);

    if (result.solved) {
      emitGameEvent("keypad:changed", result.state!);
      publishStoryProgress(result.addedFlags);
      setError("A porta foi destravada.");
      window.setTimeout(() => emitGameEvent("keypad:close", undefined), 650);
      return;
    }

    setError(result.state?.error ?? "Sequência inválida.");
  }

  function revealHint() {
    const nextState = revealPuzzleHint(activePuzzleId, digits);
    if (nextState) {
      emitGameEvent("keypad:changed", nextState);
      setHintRevision((revision) => revision + 1);
    }
  }

  return (
    <section className={styles.panel} aria-label="Teclado do porão">
      <header>
        <div>
          <span>fechadura</span>
          <h2>{state.title}</h2>
        </div>
        <button
          type="button"
          onClick={() => emitGameEvent("keypad:close", undefined)}
          aria-label="Fechar teclado"
          title="Fechar"
        >
          ×
        </button>
      </header>

      <p className={styles.description}>{state.description}</p>
      <output>{digits.padEnd(3, "·")}</output>

      <div className={styles.keys}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
          <button type="button" key={digit} onClick={() => appendDigit(digit)}>
            {digit}
          </button>
        ))}
        <button type="button" onClick={() => setDigits("")}>
          C
        </button>
        <button type="button" onClick={() => appendDigit("0")}>
          0
        </button>
        <button type="button" onClick={submit}>
          OK
        </button>
      </div>

      {state.hints.length > 0 ? (
        <div className={styles.hints}>
          {state.hints.map((hint, index) => (
            <p key={hint}>
              {index + 1}. {hint}
            </p>
          ))}
        </div>
      ) : null}

      {error ? <p className={styles.error}>{error}</p> : null}
      <button type="button" className={styles.hintButton} onClick={revealHint}>
        revelar dica
      </button>
    </section>
  );
}
