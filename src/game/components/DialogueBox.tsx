import { useEffect, useState } from "react";
import type { DialogueViewModel } from "../types/game.types";
import { emitGameEvent } from "../systems/gameEventBus";
import styles from "./DialogueBox.module.css";

type DialogueBoxProps = {
  dialogue: DialogueViewModel;
};

export function DialogueBox({ dialogue }: DialogueBoxProps) {
  const [portraitFailed, setPortraitFailed] = useState(false);

  useEffect(() => {
    setPortraitFailed(false);
  }, [dialogue.portraitUrl]);

  if (!dialogue.isOpen) {
    return null;
  }

  const hasChoices = dialogue.choices.length > 0;

  return (
    <section className={styles.dialogue} aria-live="polite" aria-label="Diálogo">
      <div className={styles.speakerRow}>
        {dialogue.portraitUrl && !portraitFailed ? (
          <img
            className={styles.portrait}
            src={dialogue.portraitUrl}
            alt=""
            onError={() => setPortraitFailed(true)}
          />
        ) : (
          <span className={styles.portraitFallback} aria-hidden="true">
            <span />
          </span>
        )}
        <div className={styles.copy}>
          <strong>{dialogue.speaker}</strong>
          <p>{dialogue.line}</p>
        </div>
      </div>

      {hasChoices ? (
        <div className={styles.choices}>
          {dialogue.choices.map((choice, index) => (
            <button
              type="button"
              key={choice.id}
              onClick={() => emitGameEvent("dialogue:choose", choice.id)}
            >
              <span>{index + 1}</span>
              {choice.label}
            </button>
          ))}
        </div>
      ) : (
        <button
          className={styles.advance}
          type="button"
          aria-label="Avançar diálogo"
          title="Avançar diálogo"
          onClick={() => emitGameEvent("dialogue:advance", undefined)}
        >
          <span aria-hidden="true">&gt;</span>
        </button>
      )}
    </section>
  );
}
