import { useCallback, useState } from "react";
import Review from "@app/screens/Review";
import StepSection from "@app/screens/partials/StepSection";
import { useBundle } from "@app/hooks/useBundle";
import { useSteps } from "@app/hooks/useSteps";

export default function Bundle() {
  const bundle = useBundle();
  const { data: steps = [], isLoading } = useSteps();
  const [openSteps, setOpenSteps] = useState<Set<string> | null>(null);

  const handleSaveForLater = useCallback(() => {
    bundle.save();
    alert("Your system has been saved. Come back any time.");
  }, [bundle]);

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 text-slate-500">
        Loading…
      </div>
    );
  }

  const effectiveOpen =
    openSteps ?? new Set<string>(steps.length > 0 ? [steps[0].id] : []);

  const toggleStep = (id: string) => {
    setOpenSteps((cur) => {
      const base =
        cur ?? new Set<string>(steps.length > 0 ? [steps[0].id] : []);
      const next = new Set(base);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openStep = (id: string) => {
    setOpenSteps((cur) => {
      const base =
        cur ?? new Set<string>(steps.length > 0 ? [steps[0].id] : []);
      if (base.has(id)) return base;
      const next = new Set(base);
      next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl font- px-4 py-8 3xl:max-w-[1700px]">
        <h1 className="mb-6 text-3xl font-semibold tracking-tight text-[#1F1F1F] sm:text-4xl">
          Let's get started!
        </h1>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-6 3xl:flex 3xl:flex-col 3xl:gap-8">
          <div className="space-y-3">
            {steps.map((step, i) => {
              const nextStep = steps[i + 1];
              return (
                <StepSection
                  key={step.id}
                  step={step}
                  stepIndex={i}
                  totalSteps={steps.length}
                  bundle={bundle}
                  open={effectiveOpen.has(step.id)}
                  onToggle={() => toggleStep(step.id)}
                  nextStep={nextStep}
                  onNext={nextStep ? () => openStep(nextStep.id) : undefined}
                />
              );
            })}
          </div>

          <div className="mt-6 lg:mt-0 3xl:mt-0 3xl:border-t 3xl:border-[#0B0D10] 3xl:pt-8">
            <div className="lg:sticky lg:top-6 3xl:static">
              <Review
                bundle={bundle}
                onSaveForLater={handleSaveForLater}
                onCheckout={() => alert("Checkout flow goes here.")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
