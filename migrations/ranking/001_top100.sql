-- ranking: 各ゲームのベスト100だけ残し、取得が全表スキャンにならない索引を足す
-- 再実行できる。適用:
--   npx wrangler d1 execute ranking --remote --file=./migrations/ranking/001_top100.sql

CREATE INDEX IF NOT EXISTS idx_ranking_game_time ON ranking(gameid, cleartime, id);
CREATE INDEX IF NOT EXISTS idx_ranking_game_user ON ranking(gameid, user);
CREATE INDEX IF NOT EXISTS idx_ranking_time ON ranking(cleartime, id);

DELETE FROM ranking
WHERE id IN (
  SELECT id FROM (
    SELECT id,
           ROW_NUMBER() OVER (
             PARTITION BY gameid, user
             ORDER BY cleartime ASC, id ASC
           ) AS rn
    FROM ranking
  )
  WHERE rn > 1
);

DELETE FROM ranking
WHERE id IN (
  SELECT id FROM (
    SELECT id,
           ROW_NUMBER() OVER (
             PARTITION BY gameid
             ORDER BY cleartime ASC, id ASC
           ) AS rn
    FROM ranking
  )
  WHERE rn > 100
);
