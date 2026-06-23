import { useLofiAmbience } from "../../hooks/useLofiAmbience";
import styles from "./AudioToggle.module.css";

export function AudioToggle() {
  const { isPlaying, status, toggle, youtubeReferenceUrl } = useLofiAmbience();
  const hasMissingAudio = status === "missing";
  const title = hasMissingAudio
    ? "Coloque o arquivo em public/assets/audio/lofi-theme.mp3"
    : isPlaying
      ? "Desligar música lofi"
      : "Ligar música lofi";

  return (
    <button
      className={styles.audioButton}
      type="button"
      aria-pressed={isPlaying}
      data-status={status}
      aria-label={title}
      onClick={toggle}
      title={`${title}. Referência: ${youtubeReferenceUrl}`}
    >
      <span className={styles.icon} aria-hidden="true">
        {isPlaying ? "on" : "off"}
      </span>
      <span>lofi</span>
      {hasMissingAudio ? (
        <span className={styles.status} aria-hidden="true">
          mp3
        </span>
      ) : null}
    </button>
  );
}
