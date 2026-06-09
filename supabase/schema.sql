-- =============================================================
-- AfriFresh Market — Supabase Database Schema
-- Run this in the Supabase SQL Editor to bootstrap all tables
-- and Row Level Security policies.
-- =============================================================

-- 0. Extensions
create extension if not exists "pgcrypto";

-- 1. Profiles
create table if not exists public.profiles (
  id          uuid        primary key references auth.users(id) on delete cascade,
  full_name   text,
  avatar_url  text,
  role        text        not null default 'customer' check (role in ('customer', 'admin')),
  status      text        not null default 'active' check (status in ('active', 'suspended')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 2. Products
create table if not exists public.products (
  id             uuid        primary key default gen_random_uuid(),
  name           text        not null,
  description    text,
  price          numeric     not null check (price >= 0),
  category       text,
  image_url      text,
  stock_quantity integer     not null default 0,
  is_in_stock    boolean     not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- 3. Orders
create table if not exists public.orders (
  id               uuid        primary key default gen_random_uuid(),
  user_id          uuid        not null references public.profiles(id) on delete cascade,
  status           text        not null default 'pending' check (status in ('pending','processing','shipped','delivered','cancelled')),
  payment_status   text        not null default 'unpaid' check (payment_status in ('paid','unpaid','refunded')),
  total_amount     numeric     not null check (total_amount >= 0),
  shipping_address jsonb,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- 4. Order Items
create table if not exists public.order_items (
  id         uuid        primary key default gen_random_uuid(),
  order_id   uuid        not null references public.orders(id) on delete cascade,
  product_id uuid        not null references public.products(id) on delete cascade,
  quantity   integer     not null check (quantity > 0),
  unit_price numeric     not null check (unit_price >= 0)
);

-- 5. Cart Items
create table if not exists public.cart_items (
  id         uuid        primary key default gen_random_uuid(),
  user_id    uuid        not null references public.profiles(id) on delete cascade,
  product_id uuid        not null references public.products(id) on delete cascade,
  quantity   integer     not null default 1 check (quantity > 0),
  created_at timestamptz not null default now(),
  unique(user_id, product_id)
);

-- =============================================================
-- Indexes
-- =============================================================
create index if not exists idx_orders_user_id   on public.orders(user_id);
create index if not exists idx_order_items_order on public.order_items(order_id);
create index if not exists idx_cart_items_user   on public.cart_items(user_id);
create index if not exists idx_products_category on public.products(category);

-- =============================================================
-- Row Level Security
-- =============================================================
alter table public.profiles     enable row level security;
alter table public.products     enable row level security;
alter table public.orders       enable row level security;
alter table public.order_items  enable row level security;
alter table public.cart_items   enable row level security;

-- Helper: current user is admin
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

-- Profiles: users see own, admins see all
drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "Admins read all profiles" on public.profiles;
create policy "Admins read all profiles" on public.profiles
  for select using (public.is_admin());

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "Admins update all profiles" on public.profiles;
create policy "Admins update all profiles" on public.profiles
  for update using (public.is_admin());

drop policy if exists "Admins insert profiles" on public.profiles;
create policy "Admins insert profiles" on public.profiles
  for insert with check (public.is_admin());

-- Products: public read, admin write
drop policy if exists "Products public read" on public.products;
create policy "Products public read" on public.products
  for select using (true);

drop policy if exists "Products admin insert" on public.products;
create policy "Products admin insert" on public.products
  for insert with check (public.is_admin());

drop policy if exists "Products admin update" on public.products;
create policy "Products admin update" on public.products
  for update using (public.is_admin());

drop policy if exists "Products admin delete" on public.products;
create policy "Products admin delete" on public.products
  for delete using (public.is_admin());

-- Orders: users see own, admins see all
drop policy if exists "Users read own orders" on public.orders;
create policy "Users read own orders" on public.orders
  for select using (auth.uid() = user_id);

drop policy if exists "Admins read all orders" on public.orders;
create policy "Admins read all orders" on public.orders
  for select using (public.is_admin());

drop policy if exists "Users insert own orders" on public.orders;
create policy "Users insert own orders" on public.orders
  for insert with check (auth.uid() = user_id);

drop policy if exists "Admins update orders" on public.orders;
create policy "Admins update orders" on public.orders
  for update using (public.is_admin());

-- Order Items: via order ownership
drop policy if exists "Users read own order items" on public.order_items;
create policy "Users read own order items" on public.order_items
  for select using (
    exists (select 1 from public.orders where id = order_id and user_id = auth.uid())
  );

drop policy if exists "Admins read all order items" on public.order_items;
create policy "Admins read all order items" on public.order_items
  for select using (public.is_admin());

drop policy if exists "Users insert own order items" on public.order_items;
create policy "Users insert own order items" on public.order_items
  for insert with check (
    exists (select 1 from public.orders where id = order_id and user_id = auth.uid())
  );

drop policy if exists "Admins update order items" on public.order_items;
create policy "Admins update order items" on public.order_items
  for update using (public.is_admin());

-- Cart Items: users manage own
drop policy if exists "Users read own cart" on public.cart_items;
create policy "Users read own cart" on public.cart_items
  for select using (auth.uid() = user_id);

drop policy if exists "Users insert own cart" on public.cart_items;
create policy "Users insert own cart" on public.cart_items
  for insert with check (auth.uid() = user_id);

drop policy if exists "Users update own cart" on public.cart_items;
create policy "Users update own cart" on public.cart_items
  for update using (auth.uid() = user_id);

drop policy if exists "Users delete own cart" on public.cart_items;
create policy "Users delete own cart" on public.cart_items
  for delete using (auth.uid() = user_id);

-- =============================================================
-- Auto-update updated_at
-- =============================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  t text;
begin
  foreach t in array array['profiles','products','orders']
  loop
    execute format(
      'drop trigger if exists trg_set_updated_at on public.%I;', t
    );
    execute format(
      'create trigger trg_set_updated_at before update on public.%I
       for each row execute function public.set_updated_at();', t
    );
  end loop;
end;
$$;

-- 8. Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role, status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
    'customer',
    'active'
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- 9. Storage bucket for product images
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Admins upload product images" on storage.objects;
create policy "Admins upload product images" on storage.objects
  for insert with check (
    bucket_id = 'product-images' and public.is_admin()
  );

drop policy if exists "Public read product images" on storage.objects;
create policy "Public read product images" on storage.objects
  for select using (
    bucket_id = 'product-images'
  );
