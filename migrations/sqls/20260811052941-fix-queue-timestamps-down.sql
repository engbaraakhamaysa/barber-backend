ALTER TABLE queue_entries
  ALTER COLUMN joined_at TYPE TIMESTAMP
  USING joined_at AT TIME ZONE 'Asia/Gaza';

ALTER TABLE queue_entries
  ALTER COLUMN called_at TYPE TIMESTAMP
  USING called_at AT TIME ZONE 'Asia/Gaza';

ALTER TABLE queue_entries
  ALTER COLUMN started_at TYPE TIMESTAMP
  USING started_at AT TIME ZONE 'Asia/Gaza';

ALTER TABLE queue_entries
  ALTER COLUMN completed_at TYPE TIMESTAMP
  USING completed_at AT TIME ZONE 'Asia/Gaza';

ALTER TABLE queue_entries
  ALTER COLUMN cancelled_at TYPE TIMESTAMP
  USING cancelled_at AT TIME ZONE 'Asia/Gaza';