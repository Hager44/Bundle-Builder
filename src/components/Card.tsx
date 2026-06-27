import { IconMinus, IconPlus } from "@tabler/icons-react";
import type { CardProps } from "@app/components/card.types";

export default function Card({
  title,
  icon,
  description,
  badge,
  learnMoreLabel = "Learn More",
  onLearnMore,
  options,
  selectedColor,
  onOptionChange,
  priceBefore,
  priceAfter,
  quantity,
  onQuantityChange,
  isSelected,
}: CardProps) {
  const selected = isSelected ?? quantity > 0;

  return (
    <article
      className={`relative rounded-2xl border-2 bg-white p-4 transition-colors ${
        selected ? "border-brand" : "border-slate-200"
      }`}
    >
      {badge && (
        <span className="absolute -top-2 left-4 rounded-md bg-brand px-2 py-1 text-[11px] font-semibold text-white shadow-sm">
          {badge}
        </span>
      )}

      <div className="flex gap-4 3xl:flex-col 3xl:items-center 3xl:text-center 3xl:gap-2">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center text-slate-700 3xl:h-28 3xl:w-28">
          {icon}
        </div>

        <div className="flex-1 min-w-0 3xl:w-full">
          <h4 className="text-base font-bold text-slate-900">{title}</h4>

          <p className="mt-1 text-sm text-slate-600">
            {description}{" "}
            <button
              type="button"
              onClick={onLearnMore}
              className="font-medium text-brand underline underline-offset-2 hover:opacity-80"
            >
              {learnMoreLabel}
            </button>
          </p>

          {options && options.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 3xl:justify-center">
              {options.map((opt) => {
                const active = opt.color === selectedColor;
                return (
                  <button
                    key={opt.color}
                    type="button"
                    onClick={() => onOptionChange?.(opt.color)}
                    aria-pressed={active}
                    className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors ${
                      active
                        ? "border-success text-slate-900"
                        : "border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {opt.icon}
                    <span>{opt.color}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
            disabled={quantity === 0}
            aria-label="Decrease quantity"
            className="grid h-7 w-7 place-items-center rounded border border-slate-300 text-slate-500 hover:border-slate-400 disabled:opacity-50"
          >
            <IconMinus size={14} />
          </button>
          <span className="min-w-5 text-center text-sm font-medium text-slate-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => onQuantityChange(quantity + 1)}
            aria-label="Increase quantity"
            className="grid h-7 w-7 place-items-center rounded border border-slate-300 text-slate-500 hover:border-slate-400"
          >
            <IconPlus size={14} />
          </button>
        </div>

        <div className="text-right leading-tight">
          {priceBefore && (
            <div className="text-sm text-danger line-through">
              {priceBefore}
            </div>
          )}
          <div className="text-base font-semibold text-slate-900">
            {priceAfter}
          </div>
        </div>
      </div>
    </article>
  );
}
