import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import type { AccordionProps } from "@app/components/accordion.types";

export default function Accordion({
  currentStep,
  totalSteps,
  title,
  selectedCount,
  open,
  onToggle,
  children,
}: AccordionProps) {
  return (
    <section
      className={
        open
          ? "rounded-xl bg-surface"
          : "border-t border-[#0B0D10] bg-white"
      }
    >
      <div className="px-5 pt-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        Step {currentStep} of {totalSteps}
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 pb-4 text-left"
      >
        <h3 className="flex items-center gap-2 text-lg font-bold text-[#1F1F1F]">
          {title}
        </h3>

        <span className="flex items-center gap-1 text-sm text-brand">
          {selectedCount > 0 && <span>{selectedCount} selected</span>}
          {open ? (
            <IconChevronUp size={16} stroke={2} />
          ) : (
            <IconChevronDown size={16} stroke={2} />
          )}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5">
          <hr className="mb-5 border-t border-[#0B0D10]" />
          {children}
        </div>
      )}
    </section>
  );
}
