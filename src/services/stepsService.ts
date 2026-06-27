import { STEPS_DATA, type Step } from "@app/mockData/steps";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchSteps(): Promise<Step[]> {
  await delay(150);
  return STEPS_DATA;
}
