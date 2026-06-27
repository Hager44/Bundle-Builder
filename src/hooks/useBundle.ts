import { useCallback, useState } from "react";

export const NO_VARIANT = "__single__";
const STORAGE_KEY = "bundle:v1";

export type BundleState = {
  quantities: Record<string, Record<string, number>>;
  active: Record<string, string>;
};

const INITIAL: BundleState = {
  quantities: {},
  active: {},
};

function load(): BundleState {
  if (typeof window === "undefined") return INITIAL;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL;
    const parsed = JSON.parse(raw) as Partial<BundleState>;
    return {
      quantities: parsed.quantities ?? {},
      active: { ...INITIAL.active, ...(parsed.active ?? {}) },
    };
  } catch {
    return INITIAL;
  }
}

export type BundleApi = ReturnType<typeof useBundle>;

export function useBundle() {
  const [state, setState] = useState<BundleState>(load);

  const save = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage unavailable — ignore
    }
  }, [state]);

  const getActiveVariant = useCallback(
    (productId: string, fallback: string = NO_VARIANT) =>
      state.active[productId] ?? fallback,
    [state.active],
  );

  const getQty = useCallback(
    (productId: string, variant: string) =>
      state.quantities[productId]?.[variant] ?? 0,
    [state.quantities],
  );

  const setQty = useCallback(
    (productId: string, variant: string, n: number) => {
      setState((s) => {
        const productQs = { ...(s.quantities[productId] ?? {}) };
        if (n <= 0) delete productQs[variant];
        else productQs[variant] = n;
        const quantities = { ...s.quantities };
        if (Object.keys(productQs).length === 0) delete quantities[productId];
        else quantities[productId] = productQs;
        return { ...s, quantities };
      });
    },
    [],
  );

  const setActiveVariant = useCallback(
    (productId: string, variant: string) => {
      setState((s) => ({
        ...s,
        active: { ...s.active, [productId]: variant },
      }));
    },
    [],
  );

  const productTotalQty = useCallback(
    (productId: string) => {
      const qs = state.quantities[productId];
      if (!qs) return 0;
      return Object.values(qs).reduce((a, b) => a + b, 0);
    },
    [state.quantities],
  );

  return {
    state,
    getActiveVariant,
    getQty,
    setQty,
    setActiveVariant,
    productTotalQty,
    save,
  };
}
