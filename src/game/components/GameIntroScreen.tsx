import styles from "./GameIntroScreen.module.css";

type GameIntroScreenProps = {
  onStart: () => void;
};

export function GameIntroScreen({ onStart }: GameIntroScreenProps) {
  return (
    <section className={styles.screen} aria-labelledby="game-intro-title">
      <div className={styles.cabin} aria-hidden="true">
        <span className={styles.window} />
        <span className={styles.fire} />
        <span className={styles.radio} />
        <span className={styles.signalOne} />
        <span className={styles.signalTwo} />
        <span className={styles.signalThree} />
      </div>

      <div className={styles.copy}>
        <p className={styles.kicker}>entre luzes apresenta</p>
        <h1 id="game-intro-title">A Última Transmissão</h1>
        <strong>Uma voz antes do acontecimento</strong>
        <p>
          Você acorda às 3h da manhã em uma cabana silenciosa. A lareira ainda
          respira brasas, as mochilas continuam no chão e os copos estão na pia,
          mas todos desapareceram.
        </p>
        <p>
          No centro da sala, um rádio antigo chia sozinho. Talvez alguém esteja
          tentando falar com você. Talvez alguém já tenha falado.
        </p>
      </div>

      <dl className={styles.controls}>
        <div><dt>WASD / setas</dt><dd>mover</dd></div>
        <div><dt>E / Enter</dt><dd>interagir</dd></div>
        <div><dt>Espaço</dt><dd>avançar diálogo</dd></div>
        <div><dt>J</dt><dd>diário</dd></div>
        <div><dt>Esc</dt><dd>fechar menus</dd></div>
      </dl>

      <button className="pixel-button" type="button" onClick={onStart}>
        começar
      </button>
    </section>
  );
}
