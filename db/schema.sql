-- Luna Exclusive — Supabase / Postgres schema
-- Run in Supabase SQL Editor after creating a project.

-- Profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Membership plans reference
create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  plan_id text not null check (plan_id in ('basic', 'premium', 'vip')),
  status text not null default 'active' check (status in ('active', 'canceled', 'expired')),
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  provider text default 'manual',
  provider_ref text,
  created_at timestamptz not null default now()
);
create index if not exists memberships_user_idx on public.memberships(user_id);

-- Gallery
create table if not exists public.gallery_items (
  id bigserial primary key,
  title text not null,
  category text not null default 'fullBody',
  tags text[] default '{}',
  is_locked boolean not null default true,
  cover_url text not null,
  sort_order int default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Videos
create table if not exists public.videos (
  id bigserial primary key,
  title text not null,
  category text not null default 'scene',
  duration text,
  resolution text default '1080p',
  preview_seconds int default 20,
  is_locked boolean not null default true,
  cover_url text not null,
  video_url text,
  views int default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Blog
create table if not exists public.blog_posts (
  id bigserial primary key,
  title text not null,
  excerpt text,
  body text,
  cover_url text,
  is_locked boolean not null default false,
  published boolean not null default true,
  published_at date default current_date,
  created_at timestamptz not null default now()
);

-- Custom requests (fan)
create table if not exists public.custom_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  name text not null,
  email text not null,
  level text,
  types text[] default '{}',
  description text not null,
  budget text,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected', 'done')),
  created_at timestamptz not null default now()
);

-- Business inquiries
create table if not exists public.business_inquiries (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  contact text not null,
  email text not null,
  collab_type text,
  description text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- Fan comments (moderated)
create table if not exists public.fan_comments (
  id bigserial primary key,
  display_user text not null,
  content text not null,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

-- Helper: active membership?
create or replace function public.has_active_membership(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.memberships m
    where m.user_id = uid
      and m.status = 'active'
      and (m.ends_at is null or m.ends_at > now())
  );
$$;

-- Auto profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.memberships enable row level security;
alter table public.gallery_items enable row level security;
alter table public.videos enable row level security;
alter table public.blog_posts enable row level security;
alter table public.custom_requests enable row level security;
alter table public.business_inquiries enable row level security;
alter table public.fan_comments enable row level security;

-- Profiles: own row
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- Memberships: own
create policy "memberships_select_own" on public.memberships for select using (auth.uid() = user_id);

-- Gallery: public free items; locked only if member (or list metadata for all published)
create policy "gallery_public_read" on public.gallery_items for select using (published = true);

-- Videos / blog same
create policy "videos_public_read" on public.videos for select using (published = true);
create policy "blog_public_read" on public.blog_posts for select using (published = true);

-- Fan comments public
create policy "fan_comments_public" on public.fan_comments for select using (is_public = true);

-- Custom: insert anyone (or authenticated); select own
create policy "custom_insert" on public.custom_requests for insert with check (true);
create policy "custom_select_own" on public.custom_requests for select using (auth.uid() = user_id or auth.uid() is null);

create policy "biz_insert" on public.business_inquiries for insert with check (true);

-- Seed sample content (optional)
insert into public.gallery_items (title, category, tags, is_locked, cover_url, sort_order) values
  ('午夜红丝', 'props', array['红丝袜','高跟鞋'], false, 'https://picsum.photos/seed/luna1/600/800', 1),
  ('浴室蒸汽', 'scene', array['湿身','全裸'], true, 'https://picsum.photos/seed/luna2/600/800', 2),
  ('束缚之夜', 'props', array['束缚','皮革'], true, 'https://picsum.photos/seed/luna3/600/800', 3),
  ('晨光私语', 'fullBody', array['自然光','慵懒'], false, 'https://picsum.photos/seed/luna4/600/800', 4),
  ('黑色蕾丝', 'closeup', array['蕾丝','特写'], true, 'https://picsum.photos/seed/luna5/600/800', 5),
  ('油光肌肤', 'fullBody', array['油光','曲线'], true, 'https://picsum.photos/seed/luna6/600/800', 6)
on conflict do nothing;

insert into public.videos (title, category, duration, resolution, preview_seconds, is_locked, cover_url, views) values
  ('第一次尝试束缚', 'roleplay', '12:45', '4K', 30, true, 'https://picsum.photos/seed/vid1/800/450', 1280),
  ('浴室湿身独角戏', 'scene', '18:20', '1080p', 20, true, 'https://picsum.photos/seed/vid2/800/450', 2450),
  ('红丝特写引导', 'closeup', '08:15', '1080p', 15, false, 'https://picsum.photos/seed/vid3/800/450', 980),
  ('油光全身按摩', 'intense', '22:10', '4K', 30, true, 'https://picsum.photos/seed/vid4/800/450', 3100)
on conflict do nothing;

insert into public.blog_posts (title, excerpt, is_locked, cover_url, published_at) values
  ('今天拍了一组很过分的……', '红丝 + 束缚，灯光打得很暧昧。', false, 'https://picsum.photos/seed/blog1/600/400', current_date),
  ('关于定制的一些真心话', '最近接到很多特定道具请求。', false, 'https://picsum.photos/seed/blog2/600/400', current_date - 3),
  ('深夜独白', '有时候镜头前的感觉比现实更真实……', true, 'https://picsum.photos/seed/blog3/600/400', current_date - 7)
on conflict do nothing;

insert into public.fan_comments (display_user, content) values
  ('M***7', '那组红丝的特写我反复看了很久……'),
  ('Anonymous', '终于有人把「被看」这件事拍得既大胆又干净。'),
  ('K***2', '定制回复很快，而且真的会按描述调整细节。')
on conflict do nothing;
