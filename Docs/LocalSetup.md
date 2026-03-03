## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your Supabase project URL and anon key (found in **Project Settings > API**):

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. In **Auth > Providers > Email**, disable **Confirm email** (recommended for local dev)
3. Run the following SQL in the **SQL Editor**:

```sql
create table public.projects (
  id          text        primary key,
  user_id     uuid        not null references auth.users(id) on delete cascade,
  name        text        not null,
  created_at  timestamptz not null default now()
);

create table public.tasks (
  id          text        primary key,
  user_id     uuid        not null references auth.users(id) on delete cascade,
  project_id  text        references public.projects(id) on delete set null,
  title       text        not null,
  done        boolean     not null default false,
  priority    text        check (priority in ('high', 'medium', 'low')),
  due_date    text,
  notes       text        not null default '',
  created_at  timestamptz not null default now()
);

create index projects_user_id_idx on public.projects(user_id);
create index tasks_user_id_idx    on public.tasks(user_id);
create index tasks_project_id_idx on public.tasks(project_id);

alter table public.projects enable row level security;
alter table public.tasks    enable row level security;

create policy "projects: all own" on public.projects for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "tasks: all own"    on public.tasks    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```
