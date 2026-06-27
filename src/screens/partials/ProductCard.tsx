import Card from "@app/components/Card";
import { NO_VARIANT, type BundleApi } from "@app/hooks/useBundle";
import { useProductOptions } from "@app/hooks/useProductOptions";
import type { Product } from "@app/mockData/products";

type Props = {
  product: Product;
  bundle: BundleApi;
};

export default function ProductCard({ product, bundle }: Props) {
  const { data: options = [], isLoading: optionsLoading } = useProductOptions(
    product.id,
  );

  const hasOptions = options.length > 0;
  const activeColor = hasOptions
    ? bundle.getActiveVariant(product.id, options[0].color)
    : NO_VARIANT;
  const activeQty = bundle.getQty(product.id, activeColor);
  const totalQty = bundle.productTotalQty(product.id);

  return (
    <Card
      id={product.id}
      title={product.name}
      icon={
        <img
          src={product.productIcon}
          alt=""
          className="h-24 w-24 object-contain"
        />
      }
      description={product.description}
      badge={
        product.discountPercent ? `Save ${product.discountPercent}%` : undefined
      }
      options={
        optionsLoading
          ? undefined
          : options.map((o) => ({
              color: o.color,
              icon: (
                <img
                  src={o.icon}
                  alt=""
                  className="h-4 w-4 rounded object-contain"
                />
              ),
            }))
      }
      selectedColor={hasOptions ? activeColor : undefined}
      onOptionChange={(color) => bundle.setActiveVariant(product.id, color)}
      priceBefore={
        product.priceBefore ? `$${product.priceBefore.toFixed(2)}` : undefined
      }
      priceAfter={`$${product.priceAfter.toFixed(2)}`}
      quantity={activeQty}
      onQuantityChange={(q) => bundle.setQty(product.id, activeColor, q)}
      isSelected={totalQty > 0}
      onLearnMore={() => console.log("learn more:", product.id)}
    />
  );
}
