import { useEffect, useMemo, useState } from "react";
import {
  equipInventoryItem,
  getActiveInventoryItem,
  getInventoryItems,
} from "../systems/inventorySystem";
import { emitGameEvent, onGameEvent } from "../systems/gameEventBus";
import { gameProgress } from "../systems/flagSystem";
import styles from "./InventoryPanel.module.css";

type InventoryPanelProps = {
  isOpen: boolean;
};

export function InventoryPanel({ isOpen }: InventoryPanelProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [revision, setRevision] = useState(0);
  const items = useMemo(() => getInventoryItems(), [revision, isOpen]);
  const activeItem = getActiveInventoryItem();

  useEffect(
    () => onGameEvent("inventory:refresh", () => setRevision((value) => value + 1)),
    [],
  );
  useEffect(
    () => gameProgress.subscribe(() => setRevision((value) => value + 1)),
    [],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      if (["arrowleft", "arrowup", "a", "w"].includes(key)) {
        event.preventDefault();
        setSelectedIndex((index) =>
          items.length > 0 ? (index - 1 + items.length) % items.length : 0,
        );
      } else if (["arrowright", "arrowdown", "d", "s"].includes(key)) {
        event.preventDefault();
        setSelectedIndex((index) =>
          items.length > 0 ? (index + 1) % items.length : 0,
        );
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const item = items[selectedIndex];
        if (item) {
          equipInventoryItem(item.id);
          setRevision((value) => value + 1);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, items, selectedIndex]);

  if (!isOpen) {
    return null;
  }

  return (
    <section className={styles.panel} aria-label="Mochila">
      <header>
        <div>
          <span>inventário de The Viewer</span>
          <h2>Mochila</h2>
        </div>
        <button
          type="button"
          aria-label="Fechar mochila"
          title="Fechar"
          onClick={() => emitGameEvent("inventory:changed", false)}
        >
          ×
        </button>
      </header>

      {items.length > 0 ? (
        <div className={styles.items}>
          {items.map((item, index) => (
            <button
              className={`${styles.item} ${
                selectedIndex === index ? styles.selected : ""
              } ${activeItem?.id === item.id ? styles.active : ""}`}
              type="button"
              key={item.id}
              onClick={() => {
                setSelectedIndex(index);
                equipInventoryItem(item.id);
                setRevision((value) => value + 1);
              }}
            >
              <span className={styles.icon}>
                <img
                  src={item.iconPath}
                  alt=""
                  onError={(event) => {
                    event.currentTarget.hidden = true;
                  }}
                />
                <b aria-hidden="true">+</b>
              </span>
              <span>
                <strong>{item.name}</strong>
                <small>{item.description}</small>
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>A mochila está vazia.</p>
      )}

      <footer>
        <span>WASD / setas: selecionar</span>
        <span>Enter / Espaço: equipar</span>
        <span>B / Esc: fechar</span>
      </footer>
    </section>
  );
}

export function ActiveItemSlot() {
  const [revision, setRevision] = useState(0);
  const activeItem = useMemo(() => getActiveInventoryItem(), [revision]);

  useEffect(
    () => onGameEvent("inventory:refresh", () => setRevision((value) => value + 1)),
    [],
  );
  useEffect(
    () => gameProgress.subscribe(() => setRevision((value) => value + 1)),
    [],
  );

  return (
    <div className={styles.activeSlot} aria-live="polite">
      <span>item ativo</span>
      <strong>{activeItem?.name ?? "Nenhum"}</strong>
      <small>B: mochila</small>
    </div>
  );
}
