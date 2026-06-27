import { useProducts } from "@app/hooks/useProducts";
import { type BundleApi } from "@app/hooks/useBundle";
import Accordion from "@app/components/Accordion";
import StepIcon from "@app/components/StepIcon";
import type { Step } from "@app/mockData/steps";
import ProductCard from "@app/screens/partials/ProductCard";

type Props = {
  step: Step;
  stepIndex: number;
  totalSteps: number;
  bundle: BundleApi;
  open: boolean;
  onToggle: () => void;
  nextStep?: Step;
  onNext?: () => void;
};

export default function StepSection({
  step,
  stepIndex,
  totalSteps,
  bundle,
  open,
  onToggle,
  nextStep,
  onNext,
}: Props) {
  const { data: products = [], isLoading } = useProducts(step.id);

  const selectedCount = products.filter(
    (p) => bundle.productTotalQty(p.id) > 0,
  ).length;

  return (
    <Accordion
      currentStep={stepIndex + 1}
      totalSteps={totalSteps}
      title={
        <span className="flex items-center gap-2">
          <StepIcon name={step.stepIcon} />
          {step.stepTitle}
        </span>
      }
      selectedCount={selectedCount}
      open={open}
      onToggle={onToggle}
    >
      {isLoading ? (
        <p className="text-sm text-slate-500">Loading products…</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 3xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} bundle={bundle} />
          ))}
        </div>
      )}

      {nextStep && onNext && (
        <div className="mt-6 flex justify-center pt-2">
          <button
            type="button"
            onClick={onNext}
            className="rounded-lg border border-brand bg-white px-6 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand-soft"
          >
            Next: {nextStep.stepTitle}
          </button>
        </div>
      )}
    </Accordion>
  );
}
