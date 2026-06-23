import type { StoryPageData } from "../../data/storyPages";
import styles from "./StoryPage.module.css";

const iconGlyphs: Record<string, string> = {
  BREAD: "[]",
  BOX: "??",
  DOG: "::",
  MAP: "/\\",
  NAES: "!!",
  QUEST: "??",
  SHOP: "##",
  STOP: "!!",
};

type StoryPageProps = {
  page: StoryPageData;
};

export function StoryPage({ page }: StoryPageProps) {
  return (
    <article className={`${styles.page} ${styles[page.backgroundMood]}`}>
      <div className={styles.icon} aria-hidden="true">
        {iconGlyphs[page.optionalEmoji ?? "QUEST"] ?? "**"}
      </div>
      <p className={styles.kicker}>aventura da Evie</p>
      <h2>{page.title}</h2>
      <p className={styles.text}>{page.text}</p>
      {page.isPunchline ? (
        <div className={styles.punchline} aria-label="Final da piada">
          <span>Evie: Tem pães?</span>
          <strong>Padeiro: NÃES!!</strong>
        </div>
      ) : null}
    </article>
  );
}
