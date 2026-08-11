# Digital Library Repair Report

## Files changed
- [app/digital-library/[class]/page.tsx](app/digital-library/[class]/page.tsx)
- [app/digital-library/[class]/[subject]/page.tsx](app/digital-library/[class]/[subject]/page.tsx)
- [app/digital-library/[class]/[subject]/[book]/page.tsx](app/digital-library/[class]/[subject]/[book]/page.tsx)
- [app/digital-library/[class]/[subject]/[book]/[chapter]/page.tsx](app/digital-library/[class]/[subject]/[book]/[chapter]/page.tsx)
- [app/admin/digital-library/page.tsx](app/admin/digital-library/page.tsx)
- [app/api/books/route.ts](app/api/books/route.ts)
- [app/api/chapters/route.ts](app/api/chapters/route.ts)

## SQL required

```sql
-- Align the public schema with the live Supabase columns used by the digital library.
ALTER TABLE IF EXISTS classes RENAME COLUMN class_name TO name;
ALTER TABLE IF EXISTS subjects RENAME COLUMN subject_name TO name;
ALTER TABLE IF EXISTS books RENAME COLUMN book_name TO title;
ALTER TABLE IF EXISTS chapters RENAME COLUMN chapter_name TO title;

ALTER TABLE IF EXISTS books
  ADD COLUMN IF NOT EXISTS board_id BIGINT,
  ADD COLUMN IF NOT EXISTS class_id BIGINT,
  ADD COLUMN IF NOT EXISTS subject_id BIGINT,
  ADD COLUMN IF NOT EXISTS title TEXT,
  ADD COLUMN IF NOT EXISTS short_name TEXT,
  ADD COLUMN IF NOT EXISTS book_type TEXT,
  ADD COLUMN IF NOT EXISTS publisher TEXT,
  ADD COLUMN IF NOT EXISTS author TEXT,
  ADD COLUMN IF NOT EXISTS isbn TEXT,
  ADD COLUMN IF NOT EXISTS edition TEXT,
  ADD COLUMN IF NOT EXISTS language TEXT,
  ADD COLUMN IF NOT EXISTS academic_year TEXT,
  ADD COLUMN IF NOT EXISTS cover_image TEXT,
  ADD COLUMN IF NOT EXISTS storage_folder TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS total_chapters INT,
  ADD COLUMN IF NOT EXISTS display_order INT,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

ALTER TABLE IF EXISTS chapters
  ADD COLUMN IF NOT EXISTS book_id BIGINT,
  ADD COLUMN IF NOT EXISTS chapter_no INT,
  ADD COLUMN IF NOT EXISTS title TEXT,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE IF EXISTS resources
  ADD COLUMN IF NOT EXISTS chapter_id BIGINT,
  ADD COLUMN IF NOT EXISTS resource_type TEXT,
  ADD COLUMN IF NOT EXISTS title TEXT,
  ADD COLUMN IF NOT EXISTS file_url TEXT,
  ADD COLUMN IF NOT EXISTS storage_type TEXT,
  ADD COLUMN IF NOT EXISTS class TEXT,
  ADD COLUMN IF NOT EXISTS subject TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS thumbnail TEXT,
  ADD COLUMN IF NOT EXISTS file_size BIGINT,
  ADD COLUMN IF NOT EXISTS page_count INT,
  ADD COLUMN IF NOT EXISTS video_duration TEXT,
  ADD COLUMN IF NOT EXISTS display_order INT,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS views INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS downloads INT DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_books_class_subject ON books (class_id, subject_id);
CREATE INDEX IF NOT EXISTS idx_chapters_book ON chapters (book_id);
CREATE INDEX IF NOT EXISTS idx_resources_chapter ON resources (chapter_id);
```

## Remaining issues
- The live Supabase tables already contain the data needed by the digital library, so the UI now targets those real columns.
- The PDF viewer is wired to open files from the public folder paths stored in the database (for example `/pdfs/class9/mathematics/ch2.pdf`).
- No further blocking issues were found during the build and runtime verification.
