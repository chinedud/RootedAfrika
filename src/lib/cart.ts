/** Free standard delivery when subtotal meets this amount (NGN) */
export const FREE_SHIPPING_THRESHOLD = 50000;

/** Standard delivery fee (NGN) */
export const STANDARD_SHIPPING_COST = 5000;

export function getShippingCost(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
}

export function getOrderTotal(subtotal: number): number {
  return subtotal + getShippingCost(subtotal);
}

export function getFreeShippingRemaining(subtotal: number): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return FREE_SHIPPING_THRESHOLD - subtotal;
}

/** Demo order reference for checkout confirmation */
export function generateOrderId(): string {
  const segment = Date.now().toString(36).toUpperCase().slice(-8);
  return `AFM-${segment}`;
}
