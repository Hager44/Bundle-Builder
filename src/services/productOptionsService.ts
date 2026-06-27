import {
  PRODUCT_OPTIONS_DATA,
  type ProductOption,
} from "@app/mockData/productOptions";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchOptionsByProduct(
  productId: string,
): Promise<ProductOption[]> {
  await delay(150);
  return PRODUCT_OPTIONS_DATA.filter((o) => o.productId === productId);
}
