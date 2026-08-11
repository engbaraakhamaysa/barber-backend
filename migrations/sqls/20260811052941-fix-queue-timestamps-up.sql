ALTER TABLE queue_entries
  ALTER COLUMN joined_at TYPE TIMESTAMPTZ
  USING joined_at AT TIME ZONE 'Asia/Gaza';

ALTER TABLE queue_entries
  ALTER COLUMN called_at TYPE TIMESTAMPTZ
  USING called_at AT TIME ZONE 'Asia/Gaza';

ALTER TABLE queue_entries
  ALTER COLUMN started_at TYPE TIMESTAMPTZ
  USING started_at AT TIME ZONE 'Asia/Gaza';

ALTER TABLE queue_entries
  ALTER COLUMN completed_at TYPE TIMESTAMPTZ
  USING completed_at AT TIME ZONE 'Asia/Gaza';

ALTER TABLE queue_entries
  ALTER COLUMN cancelled_at TYPE TIMESTAMPTZ
  USING cancelled_at AT TIME ZONE 'Asia/Gaza';