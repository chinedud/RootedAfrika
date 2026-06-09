export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "customer";
  totalOrders: number;
  totalSpent: number;
  joinedAt: string;
  status: "active" | "suspended";
}

export const users: User[] = [
  {
    id: "usr-001",
    name: "Amara Okafor",
    email: "amara.o@example.com",
    avatar: "https://picsum.photos/seed/amara/100/100",
    role: "customer",
    totalOrders: 2,
    totalSpent: 46.43,
    joinedAt: "2026-01-15T10:00:00Z",
    status: "active",
  },
  {
    id: "usr-002",
    name: "Kofi Mensah",
    email: "kofi.m@example.com",
    avatar: "https://picsum.photos/seed/kofi/100/100",
    role: "customer",
    totalOrders: 1,
    totalSpent: 24.96,
    joinedAt: "2026-03-08T14:30:00Z",
    status: "active",
  },
  {
    id: "usr-003",
    name: "Zainab Diallo",
    email: "z.diallo@example.com",
    avatar: "https://picsum.photos/seed/zainab/100/100",
    role: "customer",
    totalOrders: 1,
    totalSpent: 38.93,
    joinedAt: "2026-04-20T09:15:00Z",
    status: "active",
  },
  {
    id: "usr-004",
    name: "Chidi Eze",
    email: "chidi.e@example.com",
    avatar: "https://picsum.photos/seed/chidi/100/100",
    role: "customer",
    totalOrders: 1,
    totalSpent: 27.32,
    joinedAt: "2026-02-12T11:00:00Z",
    status: "suspended",
  },
  {
    id: "usr-005",
    name: "Sade Williams",
    email: "sade.w@example.com",
    avatar: "https://picsum.photos/seed/sade/100/100",
    role: "admin",
    totalOrders: 0,
    totalSpent: 0,
    joinedAt: "2025-12-01T08:00:00Z",
    status: "active",
  },
  {
    id: "usr-006",
    name: "Fatima Adebayo",
    email: "fatima.a@example.com",
    avatar: "https://picsum.photos/seed/fatima/100/100",
    role: "customer",
    totalOrders: 0,
    totalSpent: 0,
    joinedAt: "2026-05-25T16:45:00Z",
    status: "active",
  },
  {
    id: "usr-007",
    name: "Yemi Adewale",
    email: "yemi.a@example.com",
    avatar: "https://picsum.photos/seed/yemi/100/100",
    role: "customer",
    totalOrders: 2,
    totalSpent: 45.73,
    joinedAt: "2026-02-28T12:00:00Z",
    status: "active",
  },
  {
    id: "usr-008",
    name: "Nkechi Obi",
    email: "nkechi.o@example.com",
    avatar: "https://picsum.photos/seed/nkechi/100/100",
    role: "customer",
    totalOrders: 1,
    totalSpent: 15.96,
    joinedAt: "2026-04-05T10:30:00Z",
    status: "active",
  },
  {
    id: "usr-009",
    name: "Tunde Bakare",
    email: "tunde.b@example.com",
    avatar: "https://picsum.photos/seed/tunde/100/100",
    role: "customer",
    totalOrders: 1,
    totalSpent: 44.91,
    joinedAt: "2026-03-15T09:00:00Z",
    status: "active",
  },
  {
    id: "usr-010",
    name: "Aisha Bello",
    email: "aisha.b@example.com",
    avatar: "https://picsum.photos/seed/aisha/100/100",
    role: "customer",
    totalOrders: 1,
    totalSpent: 26.46,
    joinedAt: "2026-05-01T14:00:00Z",
    status: "active",
  },
  {
    id: "usr-011",
    name: "Kwame Asante",
    email: "kwame.a@example.com",
    avatar: "https://picsum.photos/seed/kwame/100/100",
    role: "customer",
    totalOrders: 1,
    totalSpent: 25.13,
    joinedAt: "2026-04-18T11:45:00Z",
    status: "suspended",
  },
  {
    id: "usr-012",
    name: "Chiamaka Nwosu",
    email: "chiamaka.n@example.com",
    avatar: "https://picsum.photos/seed/chiamaka/100/100",
    role: "customer",
    totalOrders: 1,
    totalSpent: 38.94,
    joinedAt: "2026-05-10T08:30:00Z",
    status: "active",
  },
];

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getUserStats() {
  return {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    suspended: users.filter((u) => u.status === "suspended").length,
    admins: users.filter((u) => u.role === "admin").length,
    customers: users.filter((u) => u.role === "customer").length,
  };
}
