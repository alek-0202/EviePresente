import { useState } from "react";
import { avatarAssets } from "../../config/assets";
import type { BirthdayMessage, BirthdayMessageIcon } from "../../data/messages";
import styles from "./BookPage.module.css";

const pixelGlyphs: Record<BirthdayMessageIcon, string> = {
  gift: "[]",
  moon: "()",
  spark: "**",
  sprout: "||",
  star: "<>",
};

type BookPageProps = {
  message: BirthdayMessage;
};

export function BookPage({ message }: BookPageProps) {
  const [avatarState, setAvatarState] = useState<"custom" | "default" | "placeholder">(
    message.avatarUrl ? "custom" : "default",
  );
  const glyph = message.optionalEmoji ? pixelGlyphs[message.optionalEmoji] : "<>";
  const avatarUrl =
    avatarState === "custom" ? message.avatarUrl : avatarState === "default" ? avatarAssets.defaultAvatarPath : null;

  function handleAvatarError() {
    setAvatarState((currentState) => (currentState === "custom" ? "default" : "placeholder"));
  }

  return (
    <article className={styles.page}>
      <div className={styles.avatarFrame}>
        {avatarUrl ? (
          <img alt="" src={avatarUrl} onError={handleAvatarError} />
        ) : (
          <span className={styles.avatarPlaceholder} aria-hidden="true">
            <span />
          </span>
        )}
      </div>
      <div className={styles.pixelBadge} aria-hidden="true">
        {glyph}
      </div>
      <p className={styles.kicker}>{message.author}</p>
      <h2>{message.optionalTitle ?? "Mensagem para Evie"}</h2>
      <p className={styles.message}>{message.message}</p>
      {message.isFinalMessage ? (
        <p className={styles.signature}>feito com carinho por Alex</p>
      ) : null}
    </article>
  );
}
