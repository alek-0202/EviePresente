import { useMemo, useState } from "react";
import type { StoryPageData } from "../../data/storyPages";
import { StoryPage } from "../StoryPage/StoryPage";
import styles from "./StoryBook.module.css";

type StoryBookProps = {
  pages: StoryPageData[];
  onBackToBook: () => void;
  onOpenMemories: () => void;
};

export function StoryBook({ pages, onBackToBook, onOpenMemories }: StoryBookProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [turnDirection, setTurnDirection] = useState<"next" | "previous">("next");
  const currentPage = useMemo(() => pages[Math.min(pageIndex, pages.length - 1)], [pageIndex, pages]);
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === pages.length - 1;

  function goToNextPage() {
    setTurnDirection("next");
    setPageIndex((current) => Math.min(current + 1, pages.length - 1));
  }

  function goToPreviousPage() {
    setTurnDirection("previous");
    setPageIndex((current) => Math.max(current - 1, 0));
  }

  return (
    <section className={styles.storyArea} aria-label="História fictícia da Evie">
      <div className={styles.topActions}>
        <button className="pixel-button pixel-button--secondary" type="button" onClick={onBackToBook}>
          voltar ao livro
        </button>
        <button className="pixel-button pixel-button--secondary" type="button" onClick={onOpenMemories}>
          memórias
        </button>
      </div>

      <div className={styles.book}>
        <div className={styles.cover} aria-hidden="true">
          <span>A jornada até a panificadora</span>
        </div>
        <div className={styles.pageShell}>
          <div className={styles.pagePixels} aria-hidden="true" />
          {currentPage ? (
            <div className={`${styles.pageTurn} ${styles[turnDirection]}`} key={currentPage.id}>
              <StoryPage page={currentPage} />
            </div>
          ) : (
            <div className={styles.empty}>Adicione capítulos em src/data/storyPages.ts.</div>
          )}
        </div>
      </div>

      <nav className={styles.controls} aria-label="Navegação da história">
        <button
          className="pixel-button pixel-button--small"
          type="button"
          onClick={goToPreviousPage}
          disabled={isFirstPage || pages.length === 0}
          aria-label="Capítulo anterior"
          title="Capítulo anterior"
        >
          &lt;
        </button>
        <span className={styles.pageIndicator}>
          {pages.length === 0 ? "0/0" : `${pageIndex + 1}/${pages.length}`}
        </span>
        <button
          className="pixel-button pixel-button--small"
          type="button"
          onClick={goToNextPage}
          disabled={isLastPage || pages.length === 0}
          aria-label="Próximo capítulo"
          title="Próximo capítulo"
        >
          &gt;
        </button>
      </nav>
    </section>
  );
}
