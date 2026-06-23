import { useMemo, useState } from "react";
import { characterAssets } from "../../config/assets";
import type { BirthdayMessage } from "../../data/messages";
import { BookPage } from "../BookPage/BookPage";
import { FinalPage } from "../FinalPage/FinalPage";
import styles from "./PixelBook.module.css";

type PixelBookProps = {
  messages: BirthdayMessage[];
  onOpenMemories: () => void;
  onOpenStory: () => void;
  onRestart: () => void;
};

export function PixelBook({ messages, onOpenMemories, onOpenStory, onRestart }: PixelBookProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [characterImageFailed, setCharacterImageFailed] = useState(false);
  const [turnDirection, setTurnDirection] = useState<"next" | "previous">("next");
  const totalPages = messages.length + 1;
  const isFinalPage = pageIndex === totalPages - 1;

  const currentMessage = useMemo(
    () => messages[Math.min(pageIndex, messages.length - 1)],
    [messages, pageIndex],
  );

  function goToNextPage() {
    setTurnDirection("next");
    setPageIndex((currentPage) => Math.min(currentPage + 1, totalPages - 1));
  }

  function goToPreviousPage() {
    setTurnDirection("previous");
    setPageIndex((currentPage) => Math.max(currentPage - 1, 0));
  }

  function restart() {
    setTurnDirection("previous");
    setPageIndex(0);
    onRestart();
  }

  return (
    <section className={styles.bookArea} aria-label="Livro de mensagens">
      <div className={styles.bookShadow} aria-hidden="true" />
      <div className={styles.book}>
        <div className={styles.leftCover} aria-hidden="true">
          <span className={styles.cornerSpark} />
          <div className={styles.characterFrame}>
            {!characterImageFailed ? (
              <img
                alt=""
                src={characterAssets.eviePixelPath}
                onError={() => setCharacterImageFailed(true)}
              />
            ) : (
              <span className={styles.characterPlaceholder}>
                <span className={styles.characterHead} />
                <span className={styles.characterBody} />
              </span>
            )}
          </div>
        </div>

        <div className={styles.pageShell}>
          <div className={styles.pagePixels} aria-hidden="true" />
          <div
            className={`${styles.pageTurn} ${styles[turnDirection]}`}
            key={isFinalPage ? "final" : currentMessage?.id}
          >
            {isFinalPage || !currentMessage ? (
              <FinalPage
                onOpenMemories={onOpenMemories}
                onOpenStory={onOpenStory}
                onRestart={restart}
              />
            ) : (
              <BookPage message={currentMessage} />
            )}
          </div>
        </div>
      </div>

      <nav className={styles.controls} aria-label="Navegação do livro">
        <button
          className="pixel-button pixel-button--small"
          type="button"
          onClick={goToPreviousPage}
          disabled={pageIndex === 0}
          aria-label="Página anterior"
          title="Página anterior"
        >
          &lt;
        </button>
        <span className={styles.pageIndicator}>
          {pageIndex + 1}/{totalPages}
        </span>
        <button
          className="pixel-button pixel-button--small"
          type="button"
          onClick={goToNextPage}
          disabled={isFinalPage}
          aria-label="Próxima página"
          title="Próxima página"
        >
          &gt;
        </button>
      </nav>
    </section>
  );
}
