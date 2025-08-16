-- Users (managed by Supabase Auth). Optional profile table if needed.

create table if not exists profiles (
	id uuid primary key references auth.users(id) on delete cascade,
	name text,
	role text check (role in ('brand','creator','admin')) not null default 'creator',
	company_name text,
	avatar text,
	created_at timestamp with time zone default now()
);

-- Collaborations
create table if not exists collaborations (
	id uuid primary key default gen_random_uuid(),
	brand_id uuid not null references auth.users(id) on delete cascade,
	brand_name text not null,
	product_name text not null,
	product_url text not null,
	description text not null,
	requirements text[] not null default '{}',
	category text not null,
	creators_required int not null,
	creators_completed int not null default 0,
	compensation numeric not null default 0,
	collaboration_type text not null check (collaboration_type in ('product_sample','barter','co_creation')),
	deadline timestamp with time zone not null,
	status text not null check (status in ('active','completed','pending','paused')) default 'active',
	created_at timestamp with time zone default now(),
	updated_at timestamp with time zone default now()
);

-- Applications
create table if not exists applications (
	id uuid primary key default gen_random_uuid(),
	collaboration_id uuid not null references collaborations(id) on delete cascade,
	creator_id uuid not null references auth.users(id) on delete cascade,
	status text not null check (status in ('pending','approved','rejected')) default 'pending',
	applied_at timestamp with time zone default now(),
	message text
);

-- Contents (submissions)
create table if not exists contents (
	id uuid primary key default gen_random_uuid(),
	collaboration_id uuid not null references collaborations(id) on delete cascade,
	creator_id uuid not null references auth.users(id) on delete cascade,
	content_url text not null,
	screenshot_url text,
	status text not null check (status in ('pending','approved','rejected','flagged')) default 'pending',
	submitted_at timestamp with time zone default now(),
	verified_at timestamp with time zone,
	notes text
);

-- Indexes
create index if not exists idx_collaborations_brand on collaborations(brand_id);
create index if not exists idx_applications_collab on applications(collaboration_id);
create index if not exists idx_applications_creator on applications(creator_id);
create index if not exists idx_contents_collab on contents(collaboration_id);
create index if not exists idx_contents_creator on contents(creator_id);

-- RLS
alter table profiles enable row level security;
alter table collaborations enable row level security;
alter table applications enable row level security;
alter table contents enable row level security;

-- Profiles RLS: users read/update their profile; admins read all
create policy profiles_owner_select on profiles for select using (
	auth.uid() = id or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy profiles_owner_update on profiles for update using (
	auth.uid() = id or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy profiles_insert_self on profiles for insert with check (
	auth.uid() = id
);

-- Collaborations RLS
create policy collab_select on collaborations for select using (
	status = 'active' or brand_id = auth.uid() or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy collab_insert on collaborations for insert with check (
	auth.uid() = brand_id
);
create policy collab_update on collaborations for update using (
	brand_id = auth.uid() or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- Applications RLS
create policy app_select on applications for select using (
	creator_id = auth.uid() or exists (
		select 1 from collaborations c where c.id = collaboration_id and c.brand_id = auth.uid()
	) or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy app_insert on applications for insert with check (
	auth.uid() = creator_id
);
create policy app_update_brand on applications for update using (
	exists (select 1 from collaborations c where c.id = collaboration_id and c.brand_id = auth.uid())
);

-- Contents RLS
create policy contents_select on contents for select using (
	creator_id = auth.uid() or exists (
		select 1 from collaborations c where c.id = collaboration_id and c.brand_id = auth.uid()
	) or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy contents_insert on contents for insert with check (
	auth.uid() = creator_id
);
create policy contents_update_brand on contents for update using (
	exists (select 1 from collaborations c where c.id = collaboration_id and c.brand_id = auth.uid())
);