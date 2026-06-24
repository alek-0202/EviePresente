import { useEffect, useState } from "react";
import { buildJournal } from "../systems/journalSystem";
import { emitGameEvent } from "../systems/gameEventBus";
import { gameProgress } from "../systems/flagSystem";
import styles from "./JournalPanel.module.css";

type JournalPanelProps = {
  isOpen: boolean;
};

const sections = [
  ["transmissions", "Transmissões"],
  ["clues", "Pistas"],
  ["friends", "Amigos"],
  ["abilities", "Habilidades"],
] as const;

export function JournalPanel({ isOpen }: JournalPanelProps) {
  const [, setRevision] = useState(0);

  useEffect(
    () => gameProgress.subscribe(() => setRevision((revision) => revision + 1)),
    [],
  );

  if (!isOpen) {
    return null;
  }

  const journal = buildJournal();

  return (
    <section className={styles.panel} aria-label="Diário de pistas">
      <header>
        <div>
          <span>arquivo da investigação</span>
          <h2>Diário</h2>
        </div>
        <button
          type="button"
          onClick={() => emitGameEvent("journal:changed", false)}
          aria-label="Fechar diário"
          title="Fechar"
        >
          ×
        </button>
      </header>

      <div className={styles.currentObjective}>
        <span>objetivo atual</span>
        <strong>{journal.objective}</strong>
      </div>

      <div className={styles.sections}>
        {sections.map(([key, title]) => (
          <section key={key}>
            <h3>{title}</h3>
            {journal[key].length > 0 ? (
              journal[key].map((entry) => (
                <article key={entry.id}>
                  <strong>{entry.title}</strong>
                  <p>{entry.body}</p>
                </article>
              ))
            ) : (
              <p className={styles.empty}>Nenhum registro ainda.</p>
            )}
          </section>
        ))}
        <section>
          <h3>Áreas liberadas</h3>
          <div className={styles.mapList}>
            {journal.unlockedMaps.map((map) => (
              <span key={map.id}>{map.name}</span>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
