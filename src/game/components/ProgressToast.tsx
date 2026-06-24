import type { ProgressNotificationViewModel } from "../data/story/story.types";
import styles from "./ProgressToast.module.css";

type ProgressToastProps = {
  notification: ProgressNotificationViewModel | null;
};

export function ProgressToast({ notification }: ProgressToastProps) {
  if (!notification) {
    return null;
  }

  return (
    <aside
      className={`${styles.toast} ${styles[notification.tone]}`}
      aria-live="polite"
    >
      <span>{notification.label}</span>
      <strong>{notification.title}</strong>
      {notification.detail ? <p>{notification.detail}</p> : null}
    </aside>
  );
}
