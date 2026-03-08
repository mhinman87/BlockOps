-- Block Ops: Vector Embeddings Table
-- Run this in Supabase SQL Editor (SQL Editor in left sidebar)

-- Enable pgvector extension (should already be on)
create extension if not exists vector;

-- Create the embeddings table
create table if not exists document_embeddings (
  id uuid default gen_random_uuid() primary key,
  storage_path text not null,
  chunk_index integer not null,
  chunk_text text not null,
  embedding vector(1536),
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  
  -- One embedding per chunk per document
  unique(storage_path, chunk_index)
);

-- Index for fast similarity search
create index if not exists document_embeddings_embedding_idx 
  on document_embeddings 
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 10);

-- Index for filtering by document
create index if not exists document_embeddings_path_idx 
  on document_embeddings(storage_path);

-- RLS: allow authenticated users to read, service role to write
alter table document_embeddings enable row level security;

create policy "Authenticated users can read embeddings"
  on document_embeddings for select
  to authenticated
  using (true);

create policy "Service role can manage embeddings"
  on document_embeddings for all
  to service_role
  using (true)
  with check (true);

-- Function for similarity search
create or replace function search_documents(
  query_embedding vector(1536),
  match_count int default 5,
  match_threshold float default 0.7
)
returns table (
  storage_path text,
  chunk_text text,
  similarity float
)
language sql stable
as $$
  select
    d.storage_path,
    d.chunk_text,
    1 - (d.embedding <=> query_embedding) as similarity
  from document_embeddings d
  where 1 - (d.embedding <=> query_embedding) > match_threshold
  order by d.embedding <=> query_embedding
  limit match_count;
$$;
