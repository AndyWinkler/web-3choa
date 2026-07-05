ALTER TABLE contact_submissions ADD COLUMN sent_to_gcp INTEGER NOT NULL DEFAULT 0;
ALTER TABLE contact_submissions ADD COLUMN gcp_sent_at TEXT;
