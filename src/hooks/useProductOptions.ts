import { useQuery } from "@tanstack/react-query";
import { fetchOptionsByProduct } from "@app/services/productOptionsService";

export const productOptionsQueryKey = (productId: string) =>
  ["productOptions", productId] as const;

export function useProductOptions(productId: string | undefined) {
  return useQuery({
    queryKey: productOptionsQueryKey(productId ?? ""),
    queryFn: () => fetchOptionsByProduct(productId!),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
}
