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
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});
  const [turnDirection, setTurnDirection] = useState<"next" | "previous">("next");
  const currentPage = useMemo(() => pages[Math.min(pageIndex, pages.length - 1)], [pageIndex, pages]);
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === pages.length - 1;
  const selectedChoiceId = currentPage ? selectedChoices[currentPage.id] : undefined;
  const canAdvance = Boolean(currentPage && (currentPage.choices.length === 0 || selectedChoiceId));

  function goToNextPage() {
    if (!canAdvance) {
      return;
    }

    setTurnDirection("next");
    setPageIndex((current) => Math.min(current + 1, pages.length - 1));
  }

  function goToPreviousPage() {
    setTurnDirection("previous");
    setPageIndex((current) => Math.max(current - 1, 0));
  }

  function selectChoice(choiceId: string) {
    if (!currentPage) {
      return;
    }

    setSelectedChoices((current) => ({
      ...current,
      [currentPage.id]: choiceId,
    }));
  }

  function restartStory() {
    setSelectedChoices({});
    setTurnDirection("previous");
    setPageIndex(0);
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
        <button className="pixel-button pixel-button--secondary" type="button" onClick={restartStory}>
          reiniciar aventura
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
              <StoryPage
                page={currentPage}
                selectedChoiceId={selectedChoiceId}
                onSelectChoice={selectChoice}
              />
            </div>
          ) : (
            <div className={styles.empty}>Adicione cenas em src/data/storyPages.ts.</div>
          )}
        </div>
      </div>

      <nav className={styles.controls} aria-label="Navegação da aventura">
        <button
          className="pixel-button pixel-button--small"
          type="button"
          onClick={goToPreviousPage}
          disabled={isFirstPage || pages.length === 0}
          aria-label="Cena anterior"
          title="Cena anterior"
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
          disabled={isLastPage || pages.length === 0 || !canAdvance}
          aria-label="Próxima cena"
          title={canAdvance ? "Próxima cena" : "Escolha uma resposta para avançar"}
        >
          &gt;
        </button>
      </nav>
    </section>
  );
}
