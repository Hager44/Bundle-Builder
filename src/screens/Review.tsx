import { IconMinus, IconPlus } from "@tabler/icons-react";
import { NO_VARIANT, type BundleApi } from "@app/hooks/useBundle";
import { useBundleReview, type ReviewLine } from "@app/hooks/useBundleReview";

type Props = {
  bundle: BundleApi;
  onCheckout?: () => void;
  onSaveForLater?: () => void;
};

const STEP_HEADINGS: Record<string, string> = {
  cameras: "Cameras",
  sensors: "Sensors",
  extras: "Accessories",
  plan: "Plan",
};

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function Review({ bundle, onCheckout, onSaveForLater }: Props) {
  const { steps, lines, totals, isLoading } = useBundleReview(bundle);
  const linesByStep = groupByStep(lines);
  const hasAnything = lines.length > 0;
  const { before, after, savings } = totals;
  const asLowAs = after / 24;

  return (
    <div>
      <div className="grid gap-6 3xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <aside className="rounded-2xl bg-surface p-5">
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Review
        </div>
        <h2 className="text-lg font-bold text-[#1F1F1F]">
          Your security system
        </h2>
        <hr className="mt-3 border-t border-[#0B0D10]" />
        <p className="mt-1 text-sm text-slate-500">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>

        <div className="mt-5 space-y-5">
          {isLoading && !hasAnything ? (
            <p className="text-sm text-slate-500">Loading your system…</p>
          ) : (
            steps.map((step) => {
              const stepLines = linesByStep[step.id];
              if (!stepLines || stepLines.length === 0) return null;
              return (
                <section key={step.id}>
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {STEP_HEADINGS[step.id] ?? step.stepTitle}
                  </div>
                  <ul className="space-y-3">
                    {stepLines.map((line) => (
                      <LineRow
                        key={`${line.product.id}::${line.variant ?? "_"}`}
                        line={line}
                        bundle={bundle}
                      />
                    ))}
                  </ul>
                </section>
              );
            })
          )}

          {!isLoading && !hasAnything && (
            <p className="text-sm text-slate-500">
              Add products from the steps on the left to start building your
              system.
            </p>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[#0B0D10] pt-4 text-sm">
          <span className="flex items-center gap-2 text-slate-700">
            <img
              src="/shipping.png"
              alt=""
              className="h-8 w-auto object-contain"
            />
            Fast Shipping
          </span>
          <span className="font-semibold text-success">FREE</span>
        </div>
      </aside>

      <aside className="rounded-2xl bg-surface p-5">
        <div className="flex items-start gap-4">
          <SatisfactionBadge />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#1F1F1F]">
              30-day hassle-free returns
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              If you're not totally in love with the product, we will refund
              you 100%.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-white">
            as low as {money(asLowAs)}/mo
          </span>
          <div className="flex items-baseline gap-3">
            {before > after && (
              <span className="text-lg text-slate-400 line-through">
                {money(before)}
              </span>
            )}
            <span className="text-3xl font-semibold text-brand">
              {money(after)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onCheckout}
          disabled={!hasAnything}
          className="mt-4 w-full rounded-lg bg-brand py-3 text-base font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Checkout
        </button>

        {savings > 0 && (
          <p className="mt-3 text-center text-sm text-success">
            Congrats! You're saving {money(savings)} on your security bundle!
          </p>
        )}

        <button
          type="button"
          onClick={onSaveForLater}
          className="mx-auto mt-3 block text-sm text-slate-500 italic underline underline-offset-2 hover:text-slate-700"
        >
          Save my system for later
        </button>
      </aside>
      </div>
    </div>
  );
}

function SatisfactionBadge() {
  return (
    <img
      src="/satisfaction-guarantee.png"
      alt="100% Wyze satisfaction guarantee"
      className="h-20 w-20 shrink-0 object-contain"
    />
  );
}

function LineRow({ line, bundle }: { line: ReviewLine; bundle: BundleApi }) {
  const variantKey = line.variant ?? NO_VARIANT;
  const dec = () =>
    bundle.setQty(line.product.id, variantKey, Math.max(0, line.quantity - 1));
  const inc = () =>
    bundle.setQty(line.product.id, variantKey, line.quantity + 1);

  return (
    <li className="flex items-center gap-3 text-sm">
      <img
        src={line.product.productIcon}
        alt=""
        className="h-9 w-9 shrink-0 rounded object-contain"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-slate-900">
          {line.product.name}
        </p>
        {line.variant && (
          <p className="text-xs text-slate-500">{line.variant}</p>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={dec}
          aria-label="Decrease"
          className="grid h-6 w-6 place-items-center rounded border border-slate-300 text-slate-500 hover:border-slate-400"
        >
          <IconMinus size={12} />
        </button>
        <span className="min-w-4.5 text-center text-sm font-medium">
          {line.quantity}
        </span>
        <button
          type="button"
          onClick={inc}
          aria-label="Increase"
          className="grid h-6 w-6 place-items-center rounded border border-slate-300 text-slate-500 hover:border-slate-400"
        >
          <IconPlus size={12} />
        </button>
      </div>

      <div className="w-20 text-right leading-tight">
        {line.unitPriceBefore && line.unitPriceBefore > line.unitPriceAfter && (
          <div className="text-xs text-danger line-through">
            {money(line.lineBefore)}
          </div>
        )}
        <div
          className={`text-sm font-semibold ${
            line.lineAfter === 0 ? "text-success" : "text-brand"
          }`}
        >
          {line.lineAfter === 0 ? "FREE" : money(line.lineAfter)}
        </div>
      </div>
    </li>
  );
}

function groupByStep(lines: ReviewLine[]) {
  const out: Record<string, ReviewLine[]> = {};
  for (const l of lines) {
    (out[l.step.id] ??= []).push(l);
  }
  return out;
}
