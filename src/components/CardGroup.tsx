import { useEffect, useState } from "react";
import Card from "@app/components/Card";
import type { CardGroupProps, CardState } from "@app/components/card.types";

function loadState(
  storageKey: string,
  fallback: Record<string, CardState>,
): Record<string, CardState> {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Record<string, CardState>;
    return { ...fallback, ...parsed };
  } catch {
    return fallback;
  }
}

export default function CardGroup({
  storageKey,
  items,
  className,
  onChange,
}: CardGroupProps) {
  const [state, setState] = useState<Record<string, CardState>>(() => {
    const fallback = Object.fromEntries(
      items.map((i) => [
        i.id,
        { quantity: i.defaultQuantity ?? 0, color: i.defaultColor },
      ]),
    );
    return loadState(storageKey, fallback);
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // storage unavailable — ignore
    }
    onChange?.(state);
  }, [state, storageKey, onChange]);

  const update = (id: string, patch: Partial<CardState>) =>
    setState((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));

  return (
    <div className={className ?? "grid gap-4 sm:grid-cols-2"}>
      {items.map((item) => {
        const cs = state[item.id] ?? { quantity: 0 };
        return (
          <Card
            key={item.id}
            {...item}
            quantity={cs.quantity}
            selectedColor={cs.color}
            isSelected={cs.quantity > 0}
            onQuantityChange={(q) => update(item.id, { quantity: q })}
            onOptionChange={(color) => update(item.id, { color })}
          />
        );
      })}
    </div>
  );
}
