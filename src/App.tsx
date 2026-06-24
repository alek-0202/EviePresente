import type { CSSProperties } from "react";
import { useState } from "react";
import { AudioToggle } from "./components/AudioToggle/AudioToggle";
import { IntroScreen } from "./components/IntroScreen/IntroScreen";
import { MemoriesGallery } from "./components/MemoriesGallery/MemoriesGallery";
import { PixelBook } from "./components/PixelBook/PixelBook";
import { StoryBook } from "./components/StoryBook/StoryBook";
import { memories } from "./data/memories";
import { birthdayMessages } from "./data/messages";
import { storyPages } from "./data/storyPages";
import styles from "./App.module.css";

const particles = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  x: `${4 + ((index * 19) % 92)}%`,
  y: `${5 + ((index * 31) % 78)}%`,
  delay: `${(index % 9) * 180}ms`,
  size: `${4 + (index % 3) * 2}px`,
}));

type ParticleStyle = CSSProperties & {
  "--delay": string;
  "--size": string;
  "--x": string;
  "--y": string;
};

type AppView = "intro" | "book" | "memories" | "story";

export default function App() {
  const [view, setView] = useState<AppView>("intro");

  function goToHome() {
    setView("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className={styles.app}>
      <AudioToggle />
      {view !== "intro" ? (
        <button
          className={styles.homeButton}
          type="button"
          aria-label="Voltar para o início"
          title="Voltar para o início"
          onClick={goToHome}
        >
          <span className={styles.homeIcon} aria-hidden="true">
            <span />
          </span>
          <span>início</span>
        </button>
      ) : null}
      <div className={styles.pixelSky} aria-hidden="true">
        {particles.map((particle) => (
          <span
            className={styles.particle}
            key={particle.id}
            style={{
              "--x": particle.x,
              "--y": particle.y,
              "--delay": particle.delay,
              "--size": particle.size,
            } as ParticleStyle}
          />
        ))}
      </div>
      <div className={styles.room} aria-hidden="true">
        <div className={styles.window}>
          <span className={styles.moon} />
          <span className={styles.cloudOne} />
          <span className={styles.cloudTwo} />
        </div>
        <div className={styles.lamp}>
          <span />
        </div>
        <div className={styles.plant}>
          <span />
        </div>
        <div className={styles.shelf}>
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className={`${styles.stage} ${view !== "intro" ? styles.stageWithHome : ""}`}>
        {view === "intro" ? <IntroScreen onOpen={() => setView("book")} /> : null}
        {view === "book" ? (
          <PixelBook
            messages={birthdayMessages}
            onOpenMemories={() => setView("memories")}
            onOpenStory={() => setView("story")}
            onRestart={() => setView("book")}
          />
        ) : null}
        {view === "memories" ? (
          <MemoriesGallery
            memories={memories}
            onBackToBook={() => setView("book")}
            onOpenStory={() => setView("story")}
          />
        ) : null}
        {view === "story" ? (
          <StoryBook
            pages={storyPages}
            onBackToBook={() => setView("book")}
            onOpenMemories={() => setView("memories")}
          />
        ) : null}
      </div>
    </main>
  );
}
