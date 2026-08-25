-- Seed initial release metadata (placeholder until real builds are uploaded)
-- Apply after 001_init.sql

INSERT INTO releases (product_id, channel, version, r2_key, public_url, changelog, is_latest)
VALUES
  (
    'tabbeast_full',
    'full_win',
    '0.1.0',
    'tabbeast/full/win/0.1.0/TABbeast_0.1.0_x64.zip',
    NULL,
    'Placeholder package for download flow testing',
    1
  ),
  (
    'tabbeast_full',
    'full_web',
    '0.1.0',
    'tabbeast/full/web/0.1.0/',
    NULL,
    'Placeholder web build path (P4)',
    1
  ),
  (
    'tabbeast_demo',
    'demo_win',
    '0.1.0',
    'tabbeast/demo/win/0.1.0/TABbeast_Demo_0.1.0_x64.zip',
    NULL,
    'Demo Windows placeholder',
    1
  ),
  (
    'tabbeast_demo',
    'demo_web',
    '0.1.0',
    NULL,
    'https://tabbeast-demo.pages.dev',
    'Demo web Pages URL',
    1
  )
ON CONFLICT(product_id, channel, version) DO UPDATE SET
  r2_key = excluded.r2_key,
  public_url = excluded.public_url,
  changelog = excluded.changelog,
  is_latest = excluded.is_latest;
