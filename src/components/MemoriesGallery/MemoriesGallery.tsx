import type { Memory } from "../../data/memories";
import { MemoryCard } from "../MemoryCard/MemoryCard";
import styles from "./MemoriesGallery.module.css";

type MemoriesGalleryProps = {
  memories: Memory[];
  onBackToBook: () => void;
  onOpenStory: () => void;
};

export function MemoriesGallery({ memories, onBackToBook, onOpenStory }: MemoriesGalleryProps) {
  return (
    <section className={styles.gallery} aria-labelledby="memories-title">
      <header className={styles.header}>
        <p className={styles.kicker}>arquivo da stream</p>
        <h1 id="memories-title">Memórias da Evie</h1>
        <p>
          Alguns momentos merecem ficar salvos fora da live também. Cole aqui
          clipes, lembranças e pequenas cenas que tenham a cara dela.
        </p>
        <div className={styles.actions}>
          <button className="pixel-button pixel-button--secondary" type="button" onClick={onBackToBook}>
            voltar ao livro
          </button>
          <button className="pixel-button" type="button" onClick={onOpenStory}>
            ler aventura da Evie
          </button>
        </div>
      </header>

      <div className={styles.grid}>
        {memories.length > 0 ? (
          memories.map((memory) => <MemoryCard key={memory.id} memory={memory} />)
        ) : (
          <div className={styles.empty}>
            <span>REC</span>
            <p>Adicione memórias em src/data/memories.ts.</p>
          </div>
        )}
      </div>
    </section>
  );
}
