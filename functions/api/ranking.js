export async function onRequestGet(context) {
  // データベースからランキングを取得（速い順に100件、gameidは非表示）
  const { results } = await context.env.DB.prepare(
    "SELECT id, user, cleartime, data FROM ranking ORDER BY cleartime ASC LIMIT 100"
  ).all();
  
  return Response.json(results);
}

export async function onRequestPost(context) {
  const { gameid, user, cleartime } = await context.request.json();
  
  // 同じgameidとuserの組み合わせが存在するかチェック
  const existing = await context.env.DB.prepare(
    "SELECT * FROM ranking WHERE gameid = ? AND user = ?"
  ).bind(gameid, user).first();
  
  if (existing) {
    // 既存のレコードがある場合、クリアタイムと日付を更新
    await context.env.DB.prepare(
      "UPDATE ranking SET cleartime = ?, data = DATETIME('now', 'localtime') WHERE gameid = ? AND user = ?"
    ).bind(cleartime, gameid, user).run();
  } else {
    // 新規レコードを挿入
    await context.env.DB.prepare(
      "INSERT INTO ranking (gameid, user, cleartime) VALUES (?, ?, ?)"
    ).bind(gameid, user, cleartime).run();
  }

  return new Response("OK", { status: 201 });
}

//CloudFlare D1 の DBのテーブル構造

// CREATE TABLE ranking (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   gameid TEXT NOT NULL,
//   user TEXT NOT NULL,
//   cleartime INTEGER NOT NULL,
//   data TEXT DEFAULT (DATETIME('now', 'localtime'))
// );