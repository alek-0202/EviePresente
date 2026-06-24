import { useEffect, useState } from "react";
import { gameProgress } from "../systems/flagSystem";
import { emitGameEvent } from "../systems/gameEventBus";
import { buildStoryMap } from "../systems/storyMapSystem";
import type { GameMapId } from "../types/game.types";
import styles from "./StoryMapPanel.module.css";

type StoryMapPanelProps = {
  currentRoomId: GameMapId;
  isOpen: boolean;
};

export function StoryMapPanel({ currentRoomId, isOpen }: StoryMapPanelProps) {
  const [, setRevision] = useState(0);

  useEffect(
    () => gameProgress.subscribe(() => setRevision((revision) => revision + 1)),
    [],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        emitGameEvent("map:changed", false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const map = buildStoryMap(currentRoomId);
  const nodesById = new Map(map.nodes.map((node) => [node.id, node]));

  return (
    <section className={styles.panel} aria-label="Mapa de conexões" aria-modal="true">
      <header>
        <div>
          <span>modo moderador · somente leitura</span>
          <h2>Mapa de áreas</h2>
        </div>
        <button
          type="button"
          aria-label="Fechar mapa"
          title="Fechar"
          onClick={() => emitGameEvent("map:changed", false)}
        >
          ×
        </button>
      </header>

      <div className={styles.map}>
        <div className={styles.mapCanvas}>
          <svg
            className={styles.connections}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {map.connections.map((connection) => {
              const from = nodesById.get(connection.from);
              const to = nodesById.get(connection.to);

              if (!from || !to) {
                return null;
              }

              return (
                <line
                  key={connection.id}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          {map.nodes.map((node) => (
            <div
              className={`${styles.node} ${styles[node.status]}`}
              key={node.id}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              aria-current={node.status === "current" ? "location" : undefined}
            >
              <i aria-hidden="true" />
              <strong>{node.name}</strong>
              <small>
                {node.status === "current"
                  ? "posição atual"
                  : node.status === "locked"
                    ? "bloqueada"
                    : "liberada"}
              </small>
            </div>
          ))}
        </div>
      </div>

      <footer>
        <span><i className={styles.currentKey} /> atual</span>
        <span><i className={styles.openKey} /> liberada</span>
        <span><i className={styles.lockedKey} /> bloqueada</span>
        <strong>M ou Esc para fechar</strong>
      </footer>
    </section>
  );
}
