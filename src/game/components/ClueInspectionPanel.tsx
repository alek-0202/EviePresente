import type { ClueInspectionViewModel } from "../types/game.types";
import { emitGameEvent } from "../systems/gameEventBus";
import styles from "./ClueInspectionPanel.module.css";

type ClueInspectionPanelProps = {
  inspection: ClueInspectionViewModel | null;
};

export function ClueInspectionPanel({
  inspection,
}: ClueInspectionPanelProps) {
  if (!inspection) {
    return null;
  }

  return (
    <section className={styles.backdrop} aria-label={`Inspeção: ${inspection.title}`}>
      <article className={styles.panel}>
        <header>
          <span>objeto em mãos</span>
          <button
            type="button"
            aria-label="Fechar inspeção"
            title="Fechar"
            onClick={() => emitGameEvent("inspection:close", undefined)}
          >
            ×
          </button>
        </header>

        <div className={styles.frame}>
          <img src={inspection.imageUrl} alt={inspection.title} />
        </div>

        <div className={styles.copy}>
          <h2>{inspection.title}</h2>
          <p>{inspection.detail}</p>
          {inspection.digit && inspection.mark ? (
            <strong>
              {inspection.mark} · {inspection.digit}
            </strong>
          ) : null}
        </div>
      </article>
    </section>
  );
}
