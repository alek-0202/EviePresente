import styles from "./IntroScreen.module.css";

type IntroScreenProps = {
  onOpen: () => void;
  onOpenGame: () => void;
};

export function IntroScreen({ onOpen, onOpenGame }: IntroScreenProps) {
  return (
    <section className={styles.intro} aria-labelledby="intro-title">
      <div className={styles.closedBook} aria-hidden="true">
        <div className={styles.bookRibbon} />
        <div className={styles.bookPlate}>Evie</div>
      </div>
      <div className={styles.copy}>
        <p className={styles.kicker}>pequeno presente digital</p>
        <h1 id="intro-title">Feliz aniversário, Evie</h1>
        <p>
          Algumas pessoas se juntaram para deixar palavras guardadas neste
          pequeno livro. Que cada página te lembre o quanto você é especial.
        </p>
        <div className={styles.actions}>
          <button className="pixel-button" type="button" onClick={onOpen}>
            abrir presente
          </button>
          <button
            className="pixel-button pixel-button--secondary"
            type="button"
            onClick={onOpenGame}
          >
            minigame
          </button>
        </div>
      </div>
    </section>
  );
}
