import { useEffect, useState } from "react";
import {
  getRadioState,
  revealTransmissionHint,
  tuneTransmission,
} from "../systems/transmissionSystem";
import { emitGameEvent } from "../systems/gameEventBus";
import { publishStoryProgress } from "../systems/storyProgressSystem";
import { showStoryThought } from "../systems/thoughtSystem";
import { saveProgressSnapshot } from "../systems/saveSystem";
import styles from "./RadioPanel.module.css";

type RadioPanelProps = {
  transmissionId: string | null;
};

export function RadioPanel({ transmissionId }: RadioPanelProps) {
  const [frequency, setFrequency] = useState(92.3);
  const [feedback, setFeedback] = useState("");
  const state = transmissionId ? getRadioState(transmissionId, frequency) : null;

  useEffect(() => {
    if (transmissionId) {
      setFrequency(92.3);
      setFeedback("");
    }
  }, [transmissionId]);

  if (!transmissionId || !state) {
    return null;
  }

  const activeTransmissionId = transmissionId;
  const currentState = state;

  function close() {
    if (currentState.solved) {
      showStoryThought("signal-solved");
    }
    emitGameEvent("radio:close", undefined);
  }

  function tune() {
    const result = tuneTransmission(activeTransmissionId, frequency);

    if (result.solved && result.state) {
      setFrequency(result.state.frequency);
      setFeedback("Sinal estabilizado. Transmissão registrada no diário.");
      emitGameEvent("radio:changed", result.state);
      publishStoryProgress(result.addedFlags);
      saveProgressSnapshot();
      return;
    }

    setFeedback(
      currentState.signalQuality > 0.55
        ? "A voz está próxima, mas a frequência ainda oscila."
        : "A estática encobre quase toda a mensagem.",
    );
  }

  function revealHint() {
    const nextState = revealTransmissionHint(activeTransmissionId, frequency);
    if (nextState) {
      emitGameEvent("radio:changed", nextState);
      setFeedback("Uma nova observação foi anotada.");
    }
  }

  return (
    <section className={styles.panel} aria-label="Rádio de frequências">
      <header>
        <div>
          <span>equipamento</span>
          <h2>Rádio de ondas curtas</h2>
        </div>
        <button type="button" onClick={close} aria-label="Fechar rádio" title="Fechar">
          ×
        </button>
      </header>

      <div className={styles.receiver}>
        <div className={styles.frequency}>
          <span>FM</span>
          <strong>{frequency.toFixed(1)}</strong>
          <small>MHz</small>
        </div>
        <div className={styles.signal}>
          <span>sinal</span>
          <div>
            <i style={{ width: `${Math.round(state.signalQuality * 100)}%` }} />
          </div>
        </div>
        <p>{state.displayText}</p>
      </div>

      <label className={styles.dial}>
        <span>Ajuste fino</span>
        <input
          type="range"
          min="87.5"
          max="108"
          step="0.1"
          value={frequency}
          onChange={(event) => {
            setFrequency(Number(event.target.value));
            setFeedback("");
          }}
        />
      </label>

      {state.hints.length > 0 ? (
        <div className={styles.hints}>
          {state.hints.map((hint, index) => (
            <p key={hint}>
              <span>{index + 1}</span>
              {hint}
            </p>
          ))}
        </div>
      ) : null}

      {feedback ? <p className={styles.feedback}>{feedback}</p> : null}

      <footer>
        <button type="button" className={styles.hintButton} onClick={revealHint}>
          revelar dica
        </button>
        <button type="button" className={styles.tuneButton} onClick={tune}>
          sintonizar
        </button>
      </footer>
    </section>
  );
}
