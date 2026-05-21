-- Schema for Neni Motos

create table if not exists motorcycles (
  id text primary key,
  brand text not null,
  model text not null,
  year int not null,
  model_year int not null,
  price int not null,
  mileage int not null,
  engine_capacity int not null,
  color text not null,
  fuel text not null,
  transmission text not null,
  starter text not null,
  documentation_status text not null,
  accepts_trade boolean not null default false,
  financing_available boolean not null default false,
  status text not null,
  featured boolean not null default false,
  description text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists motorcycle_images (
  id text primary key,
  motorcycle_id text references motorcycles(id) on delete cascade,
  image_url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists store_settings (
  id text primary key,
  store_name text not null,
  logo_url text,
  whatsapp text,
  instagram text,
  facebook text,
  email text,
  address text,
  opening_hours text,
  home_title text,
  home_subtitle text,
  primary_color text,
  updated_at timestamptz not null default now()
);

create index if not exists idx_motorcycles_status on motorcycles (status);
create index if not exists idx_motorcycles_featured on motorcycles (featured);
create index if not exists idx_motorcycle_images_motorcycle_id on motorcycle_images (motorcycle_id);
