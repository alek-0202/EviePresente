import type { AbilityUnlockViewModel } from "../data/story/story.types";
import styles from "./AbilityToast.module.css";

type AbilityToastProps = {
  ability: AbilityUnlockViewModel | null;
};

export function AbilityToast({ ability }: AbilityToastProps) {
  if (!ability) {
    return null;
  }

  return (
    <aside className={styles.toast} aria-live="polite">
      <span>habilidade desbloqueada</span>
      <strong>{ability.abilityName}</strong>
      <p>
        {ability.characterName}: {ability.description}
      </p>
    </aside>
  );
}
