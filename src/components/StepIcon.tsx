import {
  IconBroadcast,
  IconCamera,
  IconLayoutGrid,
  IconShield,
  type IconProps,
} from "@tabler/icons-react";
import type { ComponentType } from "react";

const REGISTRY: Record<string, ComponentType<IconProps>> = {
  camera: IconCamera,
  shield: IconShield,
  wave: IconBroadcast,
  grid: IconLayoutGrid,
};

type Props = {
  name: string;
  size?: number;
  stroke?: number;
  className?: string;
};

export default function StepIcon({
  name,
  size = 20,
  stroke = 1.6,
  className,
}: Props) {
  const Icon = REGISTRY[name];
  if (!Icon) return null;
  return <Icon size={size} stroke={stroke} className={className} />;
}
