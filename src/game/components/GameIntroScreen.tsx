import { useEffect, useState } from "react";
import { gameIntroPages } from "../data/introPages";
import styles from "./GameIntroScreen.module.css";

type GameIntroScreenProps = {
  onStart: () => void;
};

export function GameIntroScreen({ onStart }: GameIntroScreenProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(
    () => new Set(),
  );
  const page = gameIntroPages[pageIndex];
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === gameIntroPages.length - 1;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft" && !isFirstPage) {
        setPageIndex((index) => index - 1);
      } else if (event.key === "ArrowRight" && !isLastPage) {
        setPageIndex((index) => index + 1);
      } else if ((event.key === "Enter" || event.key === " ") && isLastPage) {
        event.preventDefault();
        onStart();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFirstPage, isLastPage, onStart]);

  return (
    <section className={styles.screen} aria-labelledby="game-intro-title">
      <header className={styles.header}>
        <div>
          <p>álbum da viagem</p>
          <h1 id="game-intro-title">A Última Transmissão</h1>
        </div>
        <button type="button" onClick={onStart}>
          pular introdução
        </button>
      </header>

      <article className={styles.book}>
        <div className={styles.photo}>
          {!failedImages.has(page.id) ? (
            <img
              src={page.imagePath}
              alt=""
              onError={() =>
                setFailedImages((current) => new Set(current).add(page.id))
              }
            />
          ) : null}
          <div
            className={`${styles.placeholder} ${
              failedImages.has(page.id) ? styles.visible : ""
            }`}
            aria-hidden="true"
          >
            <span>{String(pageIndex + 1).padStart(2, "0")}</span>
            <i />
            <b />
          </div>
        </div>

        <div className={styles.pageCopy}>
          <span>
            página {pageIndex + 1} / {gameIntroPages.length}
          </span>
          <p>{page.caption}</p>
          {isLastPage ? (
            <strong>Registro observado por: The Viewer</strong>
          ) : null}
        </div>
      </article>

      <footer className={styles.navigation}>
        <button
          type="button"
          disabled={isFirstPage}
          onClick={() => setPageIndex((index) => Math.max(0, index - 1))}
          aria-label="Página anterior"
        >
          ← anterior
        </button>
        <div className={styles.dots} aria-hidden="true">
          {gameIntroPages.map((item, index) => (
            <span
              className={index === pageIndex ? styles.current : ""}
              key={item.id}
            />
          ))}
        </div>
        {isLastPage ? (
          <button className={styles.start} type="button" onClick={onStart}>
            começar
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              setPageIndex((index) =>
                Math.min(gameIntroPages.length - 1, index + 1),
              )
            }
            aria-label="Próxima página"
          >
            próximo →
          </button>
        )}
      </footer>
    </section>
  );
}
