CREATE TABLE applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  job_title text NOT NULL,
  salary text,
  nationality text,
  phone text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert_applications" ON applications FOR INSERT
  TO anon WITH CHECK (true);
