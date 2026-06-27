import type { ReactNode } from "react";

export type CardOption = {
  color: string;
  icon?: ReactNode;
};

export type CardProps = {
  id: string;
  title: ReactNode;
  icon: ReactNode;
  description: ReactNode;
  badge?: ReactNode;
  learnMoreLabel?: string;
  onLearnMore?: () => void;
  options?: CardOption[];
  selectedColor?: string;
  onOptionChange?: (color: string) => void;
  priceBefore?: string;
  priceAfter: string;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  isSelected?: boolean;
};

export type CardState = {
  quantity: number;
  color?: string;
};

export type CardGroupItem = Omit<
  CardProps,
  | "quantity"
  | "onQuantityChange"
  | "selectedColor"
  | "onOptionChange"
  | "isSelected"
> & {
  defaultQuantity?: number;
  defaultColor?: string;
};

export type CardGroupProps = {
  storageKey: string;
  items: CardGroupItem[];
  className?: string;
  onChange?: (state: Record<string, CardState>) => void;
};
