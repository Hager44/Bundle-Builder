import { PRODUCTS_DATA, type Product } from "@app/mockData/products";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchProductsByStep(stepId: string): Promise<Product[]> {
  await delay(200);
  return PRODUCTS_DATA.filter((p) => p.stepId === stepId);
}

export async function fetchProductById(
  productId: string,
): Promise<Product | undefined> {
  await delay(120);
  return PRODUCTS_DATA.find((p) => p.id === productId);
}
