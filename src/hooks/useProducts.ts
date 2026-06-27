import { useQuery } from "@tanstack/react-query";
import { fetchProductsByStep } from "@app/services/productsService";

export const productsQueryKey = (stepId: string) =>
  ["products", "byStep", stepId] as const;

export function useProducts(stepId: string | undefined) {
  return useQuery({
    queryKey: productsQueryKey(stepId ?? ""),
    queryFn: () => fetchProductsByStep(stepId!),
    enabled: !!stepId,
    staleTime: 5 * 60 * 1000,
  });
}
