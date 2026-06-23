import type { CSSProperties } from "react";
import styles from "./FinalPage.module.css";

type FinalPageProps = {
  onOpenMemories: () => void;
  onOpenStory: () => void;
  onRestart: () => void;
};

type FinalStarStyle = CSSProperties & {
  "--delay": string;
  "--x": string;
  "--y": string;
};

export function FinalPage({ onOpenMemories, onOpenStory, onRestart }: FinalPageProps) {
  return (
    <section className={styles.finalPage} aria-label="Página final">
      <div className={styles.sky} aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <span
            className={styles.finalStar}
            key={index}
            style={{
              "--delay": `${index * 90}ms`,
              "--x": `${8 + ((index * 17) % 84)}%`,
              "--y": `${10 + ((index * 23) % 62)}%`,
            } as FinalStarStyle}
          />
        ))}
      </div>

      <div className={styles.seal} aria-hidden="true">
        ok
      </div>
      <p className={styles.kicker}>presente concluído</p>
      <h2>Obrigada por existir, Evie.</h2>
      <p>
        Esse livro não acaba aqui. Ele só guarda um pedacinho do carinho que
        todo mundo tem por você.
      </p>
      <div className={styles.actions}>
        <button className="pixel-button pixel-button--secondary" type="button" onClick={onRestart}>
          reler mensagens
        </button>
        <button className="pixel-button" type="button" onClick={onOpenMemories}>
          ver memórias
        </button>
        <button className="pixel-button pixel-button--secondary" type="button" onClick={onOpenStory}>
          ler aventura da Evie
        </button>
      </div>
      <span className={styles.madeBy}>feito com carinho por Alex</span>
    </section>
  );
}
