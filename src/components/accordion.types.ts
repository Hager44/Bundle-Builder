import type { ReactNode } from "react";

export type AccordionProps = {
  currentStep: number;
  totalSteps: number;
  title: ReactNode;
  selectedCount: number;
  open: boolean;
  onToggle: () => void;
  children?: ReactNode;
};
