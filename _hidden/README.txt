Pages hidden from the live site but kept for restoring. Jekyll skips folders that
start with "_", so nothing here is published.

reports-index.html — the Insights hub / Landscape reports / Press page that served
/reports/ until 2026-10-06. Hidden because no landscape report is published yet and
the page read as a separate product. To restore: copy it back to reports/index.html,
re-add ('/reports/...') links in scripts/sync-chrome.py, re-add /reports/ to
sitemap.xml and scripts/build-search-index.mjs, then run sync-chrome.py --write.
