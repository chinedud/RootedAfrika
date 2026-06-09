export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export type PaymentStatus = "paid" | "unpaid";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  shippingAddress: string;
}

export const orders: Order[] = [
  {
    id: "AFM-001",
    orderNumber: "AFM-001",
    customerId: "usr-001",
    customerName: "Amara Okafor",
    customerEmail: "amara.o@example.com",
    items: [
      { productId: "fruit-001", name: "Organic Hass Avocados", price: 4.99, quantity: 2, image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=200&q=60" },
      { productId: "spice-002", name: "Suya Spice Blend", price: 7.49, quantity: 1, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&q=60" },
    ],
    totalAmount: 17.47,
    status: "delivered",
    paymentStatus: "paid",
    createdAt: "2026-05-20T10:30:00Z",
    shippingAddress: "12 Elm Street, Belfast, BT1 1AA, United Kingdom",
  },
  {
    id: "AFM-002",
    orderNumber: "AFM-002",
    customerId: "usr-002",
    customerName: "Kofi Mensah",
    customerEmail: "kofi.m@example.com",
    items: [
      { productId: "veg-004", name: "Ghana Yams", price: 6.99, quantity: 3, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&q=60" },
      { productId: "spice-001", name: "Scotch Bonnet Peppers", price: 3.99, quantity: 1, image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200&q=60" },
    ],
    totalAmount: 24.96,
    status: "shipped",
    paymentStatus: "paid",
    createdAt: "2026-05-22T14:15:00Z",
    shippingAddress: "45 Oak Avenue, London, E1 6AN, United Kingdom",
  },
  {
    id: "AFM-003",
    orderNumber: "AFM-003",
    customerId: "usr-003",
    customerName: "Zainab Diallo",
    customerEmail: "z.diallo@example.com",
    items: [
      { productId: "fruit-003", name: "Kent Mangoes", price: 5.99, quantity: 4, image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=200&q=60" },
      { productId: "veg-001", name: "Fresh Okra", price: 2.99, quantity: 2, image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=200&q=60" },
      { productId: "spice-003", name: "Berbere Seasoning", price: 8.99, quantity: 1, image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=200&q=60" },
    ],
    totalAmount: 38.93,
    status: "processing",
    paymentStatus: "paid",
    createdAt: "2026-05-25T09:45:00Z",
    shippingAddress: "78 King's Road, Manchester, M1 1AA, United Kingdom",
  },
  {
    id: "AFM-004",
    orderNumber: "AFM-004",
    customerId: "usr-001",
    customerName: "Amara Okafor",
    customerEmail: "amara.o@example.com",
    items: [
      { productId: "spice-004", name: "Ground Egusi (Melon Seeds)", price: 9.49, quantity: 2, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&q=60" },
    ],
    totalAmount: 18.98,
    status: "pending",
    paymentStatus: "unpaid",
    createdAt: "2026-05-27T16:20:00Z",
    shippingAddress: "12 Elm Street, Belfast, BT1 1AA, United Kingdom",
  },
  {
    id: "AFM-005",
    orderNumber: "AFM-005",
    customerId: "usr-004",
    customerName: "Chidi Eze",
    customerEmail: "chidi.e@example.com",
    items: [
      { productId: "fruit-002", name: "Sweet Ripe Plantains", price: 3.49, quantity: 5, image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=200&q=60" },
      { productId: "veg-002", name: "African Eggplant", price: 3.29, quantity: 3, image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=200&q=60" },
    ],
    totalAmount: 27.32,
    status: "cancelled",
    paymentStatus: "unpaid",
    createdAt: "2026-05-18T08:00:00Z",
    shippingAddress: "23 Park Lane, Birmingham, B2 4QA, United Kingdom",
  },
  {
    id: "AFM-006",
    orderNumber: "AFM-006",
    customerId: "usr-006",
    customerName: "Fatima Adebayo",
    customerEmail: "fatima.a@example.com",
    items: [
      { productId: "fruit-004", name: "Pink Guavas", price: 4.29, quantity: 3, image: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c64?w=200&q=60" },
      { productId: "spice-002", name: "Suya Spice Blend", price: 7.49, quantity: 2, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&q=60" },
    ],
    totalAmount: 27.85,
    status: "delivered",
    paymentStatus: "paid",
    createdAt: "2026-05-15T11:20:00Z",
    shippingAddress: "56 Victoria Road, Glasgow, G2 1AB, United Kingdom",
  },
  {
    id: "AFM-007",
    orderNumber: "AFM-007",
    customerId: "usr-007",
    customerName: "Yemi Adewale",
    customerEmail: "yemi.a@example.com",
    items: [
      { productId: "veg-003", name: "Bitter Leaf", price: 3.79, quantity: 2, image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=200&q=60" },
      { productId: "spice-004", name: "Ground Egusi (Melon Seeds)", price: 9.49, quantity: 1, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&q=60" },
      { productId: "fruit-001", name: "Organic Hass Avocados", price: 4.99, quantity: 2, image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=200&q=60" },
    ],
    totalAmount: 23.26,
    status: "processing",
    paymentStatus: "paid",
    createdAt: "2026-05-28T08:10:00Z",
    shippingAddress: "8 Cedar Way, Leeds, LS1 3BG, United Kingdom",
  },
  {
    id: "AFM-008",
    orderNumber: "AFM-008",
    customerId: "usr-008",
    customerName: "Nkechi Obi",
    customerEmail: "nkechi.o@example.com",
    items: [
      { productId: "spice-001", name: "Scotch Bonnet Peppers", price: 3.99, quantity: 4, image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200&q=60" },
    ],
    totalAmount: 15.96,
    status: "shipped",
    paymentStatus: "paid",
    createdAt: "2026-05-26T13:40:00Z",
    shippingAddress: "90 High Street, Cardiff, CF1 2DE, United Kingdom",
  },
  {
    id: "AFM-009",
    orderNumber: "AFM-009",
    customerId: "usr-009",
    customerName: "Tunde Bakare",
    customerEmail: "tunde.b@example.com",
    items: [
      { productId: "fruit-003", name: "Kent Mangoes", price: 5.99, quantity: 6, image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=200&q=60" },
      { productId: "veg-001", name: "Fresh Okra", price: 2.99, quantity: 3, image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=200&q=60" },
    ],
    totalAmount: 44.91,
    status: "delivered",
    paymentStatus: "paid",
    createdAt: "2026-05-10T09:00:00Z",
    shippingAddress: "15 Ash Grove, Liverpool, L1 8EF, United Kingdom",
  },
  {
    id: "AFM-010",
    orderNumber: "AFM-010",
    customerId: "usr-010",
    customerName: "Aisha Bello",
    customerEmail: "aisha.b@example.com",
    items: [
      { productId: "fruit-002", name: "Sweet Ripe Plantains", price: 3.49, quantity: 2, image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=200&q=60" },
      { productId: "spice-003", name: "Berbere Seasoning", price: 8.99, quantity: 1, image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=200&q=60" },
      { productId: "veg-004", name: "Ghana Yams", price: 6.99, quantity: 2, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&q=60" },
    ],
    totalAmount: 26.46,
    status: "pending",
    paymentStatus: "unpaid",
    createdAt: "2026-05-29T07:30:00Z",
    shippingAddress: "34 Elm Park, Edinburgh, EH1 2FG, United Kingdom",
  },
  {
    id: "AFM-011",
    orderNumber: "AFM-011",
    customerId: "usr-011",
    customerName: "Kwame Asante",
    customerEmail: "kwame.a@example.com",
    items: [
      { productId: "veg-002", name: "African Eggplant", price: 3.29, quantity: 4, image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=200&q=60" },
      { productId: "spice-001", name: "Scotch Bonnet Peppers", price: 3.99, quantity: 3, image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200&q=60" },
    ],
    totalAmount: 25.13,
    status: "processing",
    paymentStatus: "unpaid",
    createdAt: "2026-05-28T16:55:00Z",
    shippingAddress: "72 Birch Lane, Southampton, SO1 3HJ, United Kingdom",
  },
  {
    id: "AFM-012",
    orderNumber: "AFM-012",
    customerId: "usr-002",
    customerName: "Kofi Mensah",
    customerEmail: "kofi.m@example.com",
    items: [
      { productId: "fruit-004", name: "Pink Guavas", price: 4.29, quantity: 2, image: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c64?w=200&q=60" },
      { productId: "spice-004", name: "Ground Egusi (Melon Seeds)", price: 9.49, quantity: 1, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&q=60" },
    ],
    totalAmount: 18.07,
    status: "cancelled",
    paymentStatus: "unpaid",
    createdAt: "2026-05-12T12:20:00Z",
    shippingAddress: "45 Oak Avenue, London, E1 6AN, United Kingdom",
  },
  {
    id: "AFM-013",
    orderNumber: "AFM-013",
    customerId: "usr-012",
    customerName: "Chiamaka Nwosu",
    customerEmail: "chiamaka.n@example.com",
    items: [
      { productId: "fruit-001", name: "Organic Hass Avocados", price: 4.99, quantity: 3, image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=200&q=60" },
      { productId: "spice-003", name: "Berbere Seasoning", price: 8.99, quantity: 2, image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=200&q=60" },
      { productId: "veg-001", name: "Fresh Okra", price: 2.99, quantity: 2, image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=200&q=60" },
    ],
    totalAmount: 38.94,
    status: "shipped",
    paymentStatus: "paid",
    createdAt: "2026-05-24T15:30:00Z",
    shippingAddress: "5 Maple Drive, Nottingham, NG1 4KL, United Kingdom",
  },
  {
    id: "AFM-014",
    orderNumber: "AFM-014",
    customerId: "usr-007",
    customerName: "Yemi Adewale",
    customerEmail: "yemi.a@example.com",
    items: [
      { productId: "spice-002", name: "Suya Spice Blend", price: 7.49, quantity: 3, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&q=60" },
    ],
    totalAmount: 22.47,
    status: "delivered",
    paymentStatus: "paid",
    createdAt: "2026-05-08T10:15:00Z",
    shippingAddress: "8 Cedar Way, Leeds, LS1 3BG, United Kingdom",
  },
  {
    id: "AFM-015",
    orderNumber: "AFM-015",
    customerId: "usr-006",
    customerName: "Fatima Adebayo",
    customerEmail: "fatima.a@example.com",
    items: [
      { productId: "fruit-002", name: "Sweet Ripe Plantains", price: 3.49, quantity: 4, image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=200&q=60" },
      { productId: "veg-003", name: "Bitter Leaf", price: 3.79, quantity: 2, image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=200&q=60" },
      { productId: "spice-001", name: "Scotch Bonnet Peppers", price: 3.99, quantity: 1, image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200&q=60" },
    ],
    totalAmount: 22.72,
    status: "pending",
    paymentStatus: "unpaid",
    createdAt: "2026-05-29T18:00:00Z",
    shippingAddress: "56 Victoria Road, Glasgow, G2 1AB, United Kingdom",
  },
];

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}

export function getOrdersByStatus(status: OrderStatus): Order[] {
  return orders.filter((o) => o.status === status);
}

export function getRecentOrders(limit = 5): Order[] {
  return [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getOrderStats() {
  return {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
    revenue: orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.totalAmount, 0),
  };
}

export function getTopSellingProducts(limit = 5) {
  const productCounts = new Map<string, { name: string; quantity: number; image: string }>();
  for (const order of orders) {
    for (const item of order.items) {
      const existing = productCounts.get(item.productId);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        productCounts.set(item.productId, { name: item.name, quantity: item.quantity, image: item.image });
      }
    }
  }
  return [...productCounts.entries()]
    .sort((a, b) => b[1].quantity - a[1].quantity)
    .slice(0, limit)
    .map(([id, data]) => ({ id, ...data }));
}

export const statusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const statusColors: Record<OrderStatus, string> = {
  pending: "bg-pink-500/20 text-pink-500",
  processing: "bg-blue-500/20 text-blue-500",
  shipped: "bg-yellow-500/20 text-yellow-500",
  delivered: "bg-emerald-500/20 text-emerald-500",
  cancelled: "bg-red-500/20 text-red-500",
};
