import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Ranking = () => {
  const [searchParams] = useSearchParams();
  const urlGameId = searchParams.get('gameid');
  
  const [rankings, setRankings] = useState([]);
  const [allRankings, setAllRankings] = useState([]);
  const [rankingList, setRankingList] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(urlGameId || 'all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    // gameidの一意な値を取得してプルダウン用のリストを作成
    const uniqueGameIds = [...new Set(allRankings.map(r => r.gameid))].filter(Boolean);
    setRankingList(uniqueGameIds);

    // 選択したgameidでフィルター
    if (selectedGameId === 'all') {
      setRankings(allRankings);
    } else {
      setRankings(allRankings.filter(r => r.gameid === selectedGameId));
    }
  }, [allRankings, selectedGameId]);

  const fetchRankings = async () => {
    try {
      setLoading(true);
      // APIのベースURLを環境変数から取得、なければデフォルト値を使用
      const apiUrl = import.meta.env.VITE_RANKING_API_URL || '/api/ranking';

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('ランキングの取得に失敗しました');
      }

      const data = await response.json();
      setAllRankings(data);
    } catch (err) {
      console.error('Error fetching rankings:', err);
      setError(err.message);
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
        <div className="text-xl font-bold">読み込み中...</div>
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

  const getGameName = (gameid) => {
    const gameNames = {
      'element': '周期表クイズ',
      'tokyo': '東京都の市区町村クイズ',
      'saitama': '埼玉県の市区町村クイズ',
      'chiba': '千葉県の市区町村クイズ',
      'tochigi': '栃木県の市区町村クイズ',
      'yamanashi': '山梨県の市区町村クイズ',
      'gunma': '群馬県の市区町村クイズ',
      'shizuoka': '静岡県の市区町村クイズ',
      'kanagawa': '神奈川県の市区町村クイズ',
      'ibaraki': '茨城県の市区町村クイズ',
      // 他のゲームIDも追加可能
    };
    return gameNames[gameid] || gameid;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">ランキング</h1>

      {/* ゲーム選択プルダウン */}
      {rankingList.length > 0 && (
        <div className="mb-6 flex justify-center">
          <select
            value={selectedGameId}
            onChange={(e) => setSelectedGameId(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 font-semibold"
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
        <div className="text-center text-gray-500 text-lg">
          まだランキングデータがありません
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">順位</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">名前</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">クリアタイム</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">日付</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((ranking, index) => (
                  <tr
                    key={ranking.id}
                    className={`border-b ${index < 3
                        ? index === 0
                          ? 'bg-yellow-50'
                          : index === 1
                            ? 'bg-gray-50'
                            : 'bg-orange-50'
                        : 'hover:bg-gray-50'
                      }`}
                  >
                    <td className="px-4 py-3 font-bold">
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      {index >= 3 && `${index + 1}位`}
                    </td>
                    <td className="px-4 py-3 font-semibold">{ranking.user}</td>
                    <td className="px-4 py-3 font-mono">{formatTime(ranking.cleartime)}</td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(ranking.data)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
