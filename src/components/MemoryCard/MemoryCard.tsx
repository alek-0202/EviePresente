import type { Memory } from "../../data/memories";
import { getClipEmbed } from "../../utils/embed";
import styles from "./MemoryCard.module.css";

type MemoryCardProps = {
  memory: Memory;
};

export function MemoryCard({ memory }: MemoryCardProps) {
  const embed = memory.isEmbeddable === false ? null : getClipEmbed(memory.clipUrl);
  const hasLink = Boolean(memory.clipUrl?.trim());

  return (
    <article className={styles.card}>
      <div className={styles.screen}>
        {embed ? (
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            src={embed.src}
            title={`${embed.title}: ${memory.title}`}
          />
        ) : (
          <div className={styles.placeholder}>
            <span>{memory.optionalEmoji || "CLIP"}</span>
            <p>{hasLink ? "preview indisponível" : "cole um link aqui depois"}</p>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span>{memory.type}</span>
          {memory.optionalDate ? <time>{memory.optionalDate}</time> : null}
        </div>
        <h2>{memory.title}</h2>
        <p>{memory.description}</p>
        {hasLink && !embed ? (
          <a className="pixel-button pixel-button--compact" href={memory.clipUrl} target="_blank" rel="noreferrer">
            abrir clipe
          </a>
        ) : null}
      </div>
    </article>
  );
}
