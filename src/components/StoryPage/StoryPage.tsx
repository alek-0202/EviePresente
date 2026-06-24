import { useState } from "react";
import type { StoryPageData } from "../../data/storyPages";
import styles from "./StoryPage.module.css";

const iconGlyphs: Record<string, string> = {
  BREAD: "[]",
  BOX: "??",
  DOG: "::",
  MAP: "/\\",
  NAES: "!!",
  QUEST: "??",
  SHOP: "##",
  STOP: "!!",
};

type StoryPageProps = {
  onSelectChoice: (choiceId: string) => void;
  page: StoryPageData;
  selectedChoiceId?: string;
};

export function StoryPage({ onSelectChoice, page, selectedChoiceId }: StoryPageProps) {
  const [avatarFailed, setAvatarFailed] = useState(false);
  const selectedChoice = page.choices.find((choice) => choice.id === selectedChoiceId);
  const hasAvatar = Boolean(page.character.avatarUrl && !avatarFailed);

  return (
    <article className={`${styles.page} ${styles[page.backgroundMood]}`}>
      <header className={styles.header}>
        <div className={styles.icon} aria-hidden="true">
          {iconGlyphs[page.optionalEmoji ?? "QUEST"] ?? "**"}
        </div>
        <div>
          <p className={styles.kicker}>{page.sceneLabel}</p>
          <h2>{page.title}</h2>
        </div>
      </header>

      <div className={styles.dialogue}>
        <div className={styles.portrait}>
          {hasAvatar ? (
            <img
              alt=""
              src={page.character.avatarUrl}
              onError={() => setAvatarFailed(true)}
            />
          ) : (
            <span className={styles.avatarPlaceholder} aria-hidden="true">
              <span />
            </span>
          )}
        </div>
        <div className={styles.speech}>
          <p className={styles.characterName}>{page.character.name}</p>
          <p className={styles.characterRole}>{page.character.role}</p>
          <p>{page.prompt}</p>
        </div>
      </div>

      <p className={styles.text}>{page.narration}</p>

      <div className={styles.choices} aria-label="Escolhas da cena">
        {page.choices.map((choice) => (
          <button
            className={`${styles.choiceButton} ${
              selectedChoiceId === choice.id ? styles.selected : ""
            }`}
            key={choice.id}
            type="button"
            onClick={() => onSelectChoice(choice.id)}
          >
            {choice.label}
          </button>
        ))}
      </div>

      {selectedChoice ? (
        <div className={styles.result}>
          <strong>{selectedChoice.response}</strong>
          <span>{selectedChoice.consequence}</span>
        </div>
      ) : (
        <p className={styles.waiting}>Escolha uma resposta para continuar a jornada.</p>
      )}

      {page.isPunchline && selectedChoice ? (
        <div className={styles.punchline} aria-label="Final da piada">
          <span>Evie: Tem pães?</span>
          <strong>Padeiro: NÃES!!</strong>
        </div>
      ) : null}
    </article>
  );
}
