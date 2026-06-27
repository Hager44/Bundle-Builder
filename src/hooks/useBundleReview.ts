import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { useSteps } from "@app/hooks/useSteps";
import {
  NO_VARIANT,
  type BundleApi,
  type BundleState,
} from "@app/hooks/useBundle";
import { fetchProductsByStep } from "@app/services/productsService";
import { productsQueryKey } from "@app/hooks/useProducts";
import type { Step } from "@app/mockData/steps";
import type { Product } from "@app/mockData/products";

export type ReviewLine = {
  step: Step;
  product: Product;
  variant?: string;
  quantity: number;
  unitPriceBefore?: number;
  unitPriceAfter: number;
  lineBefore: number;
  lineAfter: number;
};

export type ReviewTotals = {
  before: number;
  after: number;
  savings: number;
};

export function useBundleReview(bundle: BundleApi) {
  const stepsQuery = useSteps();
  const steps = useMemo(() => stepsQuery.data ?? [], [stepsQuery.data]);

  const productQueries = useQueries({
    queries: steps.map((s) => ({
      queryKey: productsQueryKey(s.id),
      queryFn: () => fetchProductsByStep(s.id),
      staleTime: 5 * 60 * 1000,
    })),
  });

  const productsByStep = useMemo(() => {
    const out: Record<string, Product[]> = {};
    steps.forEach((s, i) => {
      out[s.id] = productQueries[i]?.data ?? [];
    });
    return out;
  }, [steps, productQueries]);

  const lines = useMemo<ReviewLine[]>(
    () => computeLines(steps, productsByStep, bundle.state),
    [steps, productsByStep, bundle.state],
  );

  const totals = useMemo<ReviewTotals>(() => computeTotals(lines), [lines]);

  const isLoading =
    stepsQuery.isLoading || productQueries.some((q) => q.isLoading);

  return { steps, productsByStep, lines, totals, isLoading };
}

function computeLines(
  steps: Step[],
  productsByStep: Record<string, Product[]>,
  state: BundleState,
): ReviewLine[] {
  const out: ReviewLine[] = [];
  for (const step of steps) {
    const products = productsByStep[step.id] ?? [];
    for (const product of products) {
      const qs = state.quantities[product.id];
      if (!qs) continue;
      for (const [variant, qty] of Object.entries(qs)) {
        if (qty <= 0) continue;
        const before = product.priceBefore ?? product.priceAfter;
        out.push({
          step,
          product,
          variant: variant === NO_VARIANT ? undefined : variant,
          quantity: qty,
          unitPriceBefore: product.priceBefore,
          unitPriceAfter: product.priceAfter,
          lineBefore: before * qty,
          lineAfter: product.priceAfter * qty,
        });
      }
    }
  }
  return out;
}

function computeTotals(lines: ReviewLine[]): ReviewTotals {
  const before = lines.reduce((a, l) => a + l.lineBefore, 0);
  const after = lines.reduce((a, l) => a + l.lineAfter, 0);
  return { before, after, savings: Math.max(0, before - after) };
}
