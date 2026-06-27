import { useQuery } from "@tanstack/react-query";
import { fetchSteps } from "@app/services/stepsService";

export const stepsQueryKey = ["steps"] as const;

export function useSteps() {
  return useQuery({
    queryKey: stepsQueryKey,
    queryFn: fetchSteps,
    staleTime: 5 * 60 * 1000,
  });
}
