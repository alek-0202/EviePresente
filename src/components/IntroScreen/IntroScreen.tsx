import styles from "./IntroScreen.module.css";

type IntroScreenProps = {
  onOpen: () => void;
};

export function IntroScreen({ onOpen }: IntroScreenProps) {
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
        <button className="pixel-button" type="button" onClick={onOpen}>
          abrir presente
        </button>
      </div>
    </section>
  );
}
