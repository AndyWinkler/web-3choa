-- Optional property details captured on the contact form.
-- All nullable: the form only reveals these once a subject other than "Other" is picked.
ALTER TABLE contact_submissions ADD COLUMN phone TEXT;
ALTER TABLE contact_submissions ADD COLUMN dues_amount TEXT;
ALTER TABLE contact_submissions ADD COLUMN dues_frequency TEXT;
ALTER TABLE contact_submissions ADD COLUMN buildings TEXT;
ALTER TABLE contact_submissions ADD COLUMN units TEXT;
ALTER TABLE contact_submissions ADD COLUMN amenities TEXT;
