import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Ranking = () => {
  const [searchParams] = useSearchParams();
  const urlGameId = searchParams.get('gameid');
  
  const [rankings, setRankings] = useState([]);
  const [allRankings, setAllRankings] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(urlGameId || 'element');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ゲーム名のマッピング
  const gameNames = {
    'element': '周期表クイズ',
    'monhan': 'モンハンモンスタークイズ',
    'japan': '日本の47都道府県クイズ',
    'tokyo': '東京都の市区町村クイズ',
    'saitama': '埼玉県の市区町村クイズ',
    'kanagawa': '神奈川県の市区町村クイズ',
    'chiba': '千葉県の市区町村クイズ',
    'tochigi': '栃木県の市区町村クイズ',
    'gunma': '群馬県の市区町村クイズ',
    'ibaraki': '茨城県の市区町村クイズ',
    'yamanashi': '山梨県の市区町村クイズ',
    'shizuoka': '静岡県の市区町村クイズ',
  };

  // getGameName関数
  const getGameName = (gameid) => {
    return gameNames[gameid] || gameid;
  };

  // プルダウン用のゲームIDリスト（gameNamesから取得）
  const rankingList = Object.keys(gameNames);

  useEffect(() => {
    fetchRankings();
  }, []);

  // URLパラメータが変更されたときに選択状態を更新
  useEffect(() => {
    if (urlGameId) {
      setSelectedGameId(urlGameId);
    }
  }, [urlGameId]);

  useEffect(() => {
    // 選択したgameidでフィルター
    setRankings(allRankings.filter(r => r.gameid === selectedGameId));
  }, [allRankings, selectedGameId]);

  const fetchRankings = async () => {
    try {
      setLoading(true);
      // APIのベースURLを環境変数から取得、なければデフォルト値を使用
      const apiUrl = import.meta.env.VITE_RANKING_API_URL || '/api/ranking';

      const response = await fetch(apiUrl);

      // 開発環境でHTMLが返ってきた場合（404など）はモックデータを使用
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('APIがJSONを返しませんでした。開発用モックデータを使用します。');
        // 開発用モックデータ
        const mockData = [
          { id: 1, gameid: 'element', user: 'テストユーザー1', cleartime: 300, data: '2024-01-01 12:00:00' },
          { id: 2, gameid: 'element', user: 'テストユーザー2', cleartime: 450, data: '2024-01-02 12:00:00' },
          { id: 3, gameid: 'tokyo', user: 'テストユーザー3', cleartime: 600, data: '2024-01-03 12:00:00' },
        ];
        setAllRankings(mockData);
        return;
      }

      if (!response.ok) {
        throw new Error('ランキングの取得に失敗しました');
      }

      const data = await response.json();
      setAllRankings(data);
    } catch (err) {
      console.error('Error fetching rankings:', err);
      // 開発環境ではエラーでもモックデータを表示
      if (import.meta.env.DEV) {
        const mockData = [
          { id: 1, gameid: 'element', user: 'テストユーザー1', cleartime: 300, data: '2024-01-01 12:00:00' },
          { id: 2, gameid: 'element', user: 'テストユーザー2', cleartime: 450, data: '2024-01-02 12:00:00' },
          { id: 3, gameid: 'tokyo', user: 'テストユーザー3', cleartime: 600, data: '2024-01-03 12:00:00' },
        ];
        setAllRankings(mockData);
        setError(null); // エラーをクリアしてモックデータを表示
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-bold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl font-bold">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-2 md:p-4">
      <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-6">クリアタイムランキング</h1>

      {/* ゲーム選択プルダウン */}
      {rankingList.length > 0 && (
        <div className="mb-4 md:mb-6 flex justify-center px-2">
          <select
            value={selectedGameId}
            onChange={(e) => setSelectedGameId(e.target.value)}
            className="w-full max-w-xs px-3 md:px-4 py-2 text-sm md:text-base border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 font-semibold"
          >
            {rankingList.map((gameid) => (
              <option key={gameid} value={gameid}>
                {getGameName(gameid)}
              </option>
            ))}
          </select>
        </div>
      )}

      {rankings.length === 0 ? (
        <div className="text-center text-gray-500 text-base md:text-lg">
          まだランキングデータがありません
        </div>
      ) : (
        <>
          {/* デスクトップ表示: テーブル */}
          <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-gray-700 w-20">順位</th>
                    <th className="px-4 py-3 text-left font-bold text-gray-700 min-w-[120px] max-w-[200px]">名前</th>
                    <th className="px-4 py-3 text-left font-bold text-gray-700 w-32">クリアタイム</th>
                    <th className="px-4 py-3 text-left font-bold text-gray-700 w-28">日付</th>
                  </tr>
                </thead>
                <tbody>
                  {rankings.map((ranking, index) => (
                    <tr
                      key={ranking.id}
                      className={`border-b border-gray-200 ${index < 3
                          ? index === 0
                            ? 'bg-yellow-50'
                            : index === 1
                              ? 'bg-gray-50'
                              : 'bg-orange-50'
                          : 'hover:bg-gray-50'
                        }`}
                    >
                      <td className="px-4 py-3 font-bold">
                        {index + 1}位
                      </td>
                      <td className="px-4 py-3 font-semibold truncate" title={ranking.user}>
                        {ranking.user}
                      </td>
                      <td className="px-4 py-3 font-bold text-cyan-500">{formatTime(ranking.cleartime)}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{formatDate(ranking.data)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* モバイル表示: カード形式 */}
          <div className="md:hidden space-y-2">
            {rankings.map((ranking, index) => (
              <div
                key={ranking.id}
                className={`bg-white rounded-lg shadow p-3 ${
                  index < 3
                    ? index === 0
                      ? 'bg-yellow-50 border-2 border-yellow-300'
                      : index === 1
                        ? 'bg-gray-50 border-2 border-gray-300'
                        : 'bg-orange-50 border-2 border-orange-300'
                    : 'border border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg">{index + 1}位</span>
                  <span className="font-mono text-sm text-blue-600">{formatTime(ranking.cleartime)}</span>
                </div>
                <div className="font-semibold text-base mb-1 truncate" title={ranking.user}>
                  {ranking.user}
                </div>
                <div className="text-xs text-gray-600">{formatDate(ranking.data)}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={fetchRankings}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold"
        >
          更新
        </button>
      </div>
    </div>
  );
};

export default Ranking;
