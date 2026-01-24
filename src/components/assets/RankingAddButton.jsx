import { useState } from 'react';

const RankingAddButton = ({ gameid, cleartime, onSuccess }) => {
  const [rankingName, setRankingName] = useState('');
  const [showRankingInput, setShowRankingInput] = useState(false);
  const [isSubmittingRanking, setIsSubmittingRanking] = useState(false);

  const handleSubmitRanking = async () => {
    if (!rankingName.trim()) {
      alert('名前を入力してください');
      return;
    }

    setIsSubmittingRanking(true);
    try {
      // APIのベースURLを環境変数から取得、なければデフォルト値を使用
      const apiUrl = import.meta.env.VITE_RANKING_API_URL || '/api/ranking';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameid: gameid,
          user: rankingName.trim(),
          cleartime: cleartime, // 秒数で送信
        }),
      });

      if (response.ok) {
        alert('ランキングに登録しました！');
        setShowRankingInput(false);
        setRankingName('');
        if (onSuccess) {
          onSuccess();
        }
      } else {
        alert('ランキングの登録に失敗しました');
      }
    } catch (error) {
      console.error('Error submitting ranking:', error);
      alert('ランキングの登録に失敗しました');
    } finally {
      setIsSubmittingRanking(false);
    }
  };

  if (!showRankingInput) {
    return (
      <button
        onClick={() => setShowRankingInput(true)}
        className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 font-bold"
      >
        ランキングに登録する
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          名前を入力してください
        </label>
        <input
          type="text"
          value={rankingName}
          onChange={(e) => setRankingName(e.target.value)}
          placeholder="あなたの名前"
          className="w-full border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          maxLength={20}
          disabled={isSubmittingRanking}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && rankingName.trim() && !isSubmittingRanking) {
              handleSubmitRanking();
            }
          }}
        />
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleSubmitRanking}
          disabled={isSubmittingRanking || !rankingName.trim()}
          className="flex-1 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmittingRanking ? '登録中...' : '登録する'}
        </button>
        <button
          onClick={() => {
            setShowRankingInput(false);
            setRankingName('');
          }}
          disabled={isSubmittingRanking}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
};

export default RankingAddButton;
