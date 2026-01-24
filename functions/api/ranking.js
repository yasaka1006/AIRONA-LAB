export async function onRequestGet(context) {
  // URLパラメータでgameidを取得
  const url = new URL(context.request.url);
  const gameid = url.searchParams.get('gameid');
  
  let query = "SELECT id, gameid, user, cleartime, data FROM ranking";
  let params = [];
  
  // gameidが指定されている場合はフィルター
  if (gameid) {
    query += " WHERE gameid = ?";
    params.push(gameid);
  }
  
  query += " ORDER BY cleartime ASC LIMIT 100";
  
  const statement = params.length > 0 
    ? context.env.DB.prepare(query).bind(...params)
    : context.env.DB.prepare(query);
  
  const { results } = await statement.all();
  
  return Response.json(results);
}

export async function onRequestPost(context) {
  const { gameid, user, cleartime } = await context.request.json();
  
  // 同じgameidとuserの組み合わせが存在するかチェック
  const existing = await context.env.DB.prepare(
    "SELECT * FROM ranking WHERE gameid = ? AND user = ?"
  ).bind(gameid, user).first();
  
  if (existing) {
    // 既存のレコードがある場合、新しいタイムが既存より早い（小さい）場合のみ更新
    if (cleartime < existing.cleartime) {
      await context.env.DB.prepare(
        "UPDATE ranking SET cleartime = ?, data = DATETIME('now', 'localtime') WHERE gameid = ? AND user = ?"
      ).bind(cleartime, gameid, user).run();
      return new Response("OK", { status: 201 });
    } else {
      // 既存のタイムより遅い場合は更新を拒否
      return new Response("既存のタイムより遅いため、更新されませんでした", { status: 200 });
    }
  } else {
    // 新規レコードを挿入
    await context.env.DB.prepare(
      "INSERT INTO ranking (gameid, user, cleartime) VALUES (?, ?, ?)"
    ).bind(gameid, user, cleartime).run();
    return new Response("OK", { status: 201 });
  }
}

//CloudFlare D1 の DBのテーブル構造

// CREATE TABLE ranking (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   gameid TEXT NOT NULL,
//   user TEXT NOT NULL,
//   cleartime INTEGER NOT NULL,
//   data TEXT DEFAULT (DATETIME('now', 'localtime'))
// );