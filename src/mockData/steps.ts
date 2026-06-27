export type Step = {
  id: string;
  stepTitle: string;
  stepIcon: string;
};

export const STEPS_DATA: Step[] = [
  { id: "cameras", stepTitle: "Choose your cameras", stepIcon: "camera" },
  { id: "plan", stepTitle: "Choose your plan", stepIcon: "shield" },
  { id: "sensors", stepTitle: "Choose your sensors", stepIcon: "wave" },
  { id: "extras", stepTitle: "Add extra protection", stepIcon: "grid" },
];
