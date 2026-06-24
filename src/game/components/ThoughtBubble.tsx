import type { ThoughtViewModel } from "../data/story/story.types";
import styles from "./ThoughtBubble.module.css";

type ThoughtBubbleProps = {
  thought: ThoughtViewModel | null;
};

export function ThoughtBubble({ thought }: ThoughtBubbleProps) {
  if (!thought) {
    return null;
  }

  return (
    <aside className={styles.bubble} aria-live="polite">
      <span aria-hidden="true">...</span>
      <p>{thought.text}</p>
    </aside>
  );
}
