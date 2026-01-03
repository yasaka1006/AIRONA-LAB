import { useState, useEffect, useRef } from 'react';
import TokyoMap from '../maps/TokyoMap';
import confetti from 'canvas-confetti';
import ClearModal from '../assets/ClearModal';

const Tokyo = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showSurrenderModal, setShowSurrenderModal] = useState(false);
  const [isSurrendered, setIsSurrendered] = useState(false);
  const intervalRef = useRef(null);

  // 音声ファイルの参照
  const correctSoundRef = useRef(new Audio('/audio/correct.mp3'));
  const wrongSoundRef = useRef(new Audio('/audio/wrong.mp3'));
  const startOrClearSoundRef = useRef(new Audio('/audio/start_or_clear.mp3'));

  // ゲームタイトル
  const gameTitle = '東京都の市区町村全部言えるかな？';

  // 全63の市区町村のリスト（複数の名前に対応）
  // id: 地図に表示される主な名前
  // names: 入力として受け付ける複数の名前（漢字、ひらがななど）
  const allDistricts = [
    { id: '奥多摩町', names: ['奥多摩町', 'おくたままち'] },
    { id: '檜原村', names: ['檜原村', 'ひのはらむら'] },
    { id: '青梅市', names: ['青梅市', 'おうめし'] },
    { id: '日の出町', names: ['日の出町', 'ひのでまち'] },
    { id: 'あきる野市', names: ['あきる野市', 'あきるのし'] },
    { id: '八王子市', names: ['八王子市', 'はちおうじし'] },
    { id: '昭島市', names: ['昭島市', 'あきしまし'] },
    { id: '福生市', names: ['福生市', 'ふっさし'] },
    { id: '羽村市', names: ['羽村市', 'はむらし'] },
    { id: '瑞穂町', names: ['瑞穂町', 'みずほまち'] },
    { id: '東村山市', names: ['東村山市', 'ひがしむらやまし'] },
    { id: '武蔵村山市', names: ['武蔵村山市', 'むさしむらやまし'] },
    { id: '東大和市', names: ['東大和市', 'ひがしやまとし'] },
    { id: '小平市', names: ['小平市', 'こだいらし'] },
    { id: '清瀬市', names: ['清瀬市', 'きよせし'] },
    { id: '練馬区', names: ['練馬区', 'ねりまく'] },
    { id: '西東京市', names: ['西東京市', 'にしとうきょうし'] },
    { id: '東久留米市', names: ['東久留米市', 'ひがしくるめし'] },
    { id: '立川市', names: ['立川市', 'たちかわし'] },
    { id: '国分寺市', names: ['国分寺市', 'こくぶんじし'] },
    { id: '小金井市', names: ['小金井市', 'こがねいし'] },
    { id: '町田市', names: ['町田市', 'まちだし'] },
    { id: '世田谷区', names: ['世田谷区', 'せたがやく'] },
    { id: '大田区', names: ['大田区', 'おおたく'] },
    { id: '品川区', names: ['品川区', 'しながわく'] },
    { id: '港区', names: ['港区', 'みなとく'] },
    { id: '江東区', names: ['江東区', 'こうとうく'] },
    { id: '江戸川区', names: ['江戸川区', 'えどがわく'] },
    { id: '葛飾区', names: ['葛飾区', 'かつしかく'] },
    { id: '足立区', names: ['足立区', 'あだちく'] },
    { id: '板橋区', names: ['板橋区', 'いたばしく'] },
    { id: '杉並区', names: ['杉並区', 'すぎなみく'] },
    { id: '新宿区', names: ['新宿区', 'しんじゅくく'] },
    { id: '中野区', names: ['中野区', 'なかのく'] },
    { id: '渋谷区', names: ['渋谷区', 'しぶやく'] },
    { id: '府中市', names: ['府中市', 'ふちゅうし'] },
    { id: '調布市', names: ['調布市', 'ちょうふし'] },
    { id: '狛江市', names: ['狛江市', 'こまえし'] },
    { id: '多摩市', names: ['多摩市', 'たまし'] },
    { id: '稲城市', names: ['稲城市', 'いなぎし'] },
    { id: '三鷹市', names: ['三鷹市', 'みたかし'] },
    { id: '武蔵野市', names: ['武蔵野市', 'むさしのし'] },
    { id: '日野市', names: ['日野市', 'ひのし'] },
    { id: '国立市', names: ['国立市', 'くにたちし'] },
    { id: '豊島区', names: ['豊島区', 'としまく'] },
    { id: '北区', names: ['北区', 'きたく'] },
    { id: '荒川区', names: ['荒川区', 'あらかわく'] },
    { id: '台東区', names: ['台東区', 'たいとうく'] },
    { id: '墨田区', names: ['墨田区', 'すみだく'] },
    { id: '文京区', names: ['文京区', 'ぶんきょうく'] },
    { id: '目黒区', names: ['目黒区', 'めぐろく'] },
    { id: '中央区', names: ['中央区', 'ちゅうおうく'] },
    { id: '千代田区', names: ['千代田区', 'ちよだく'] },
    { id: '大島町', names: ['大島町', 'おおしままち'] },
    { id: '利島村', names: ['利島村', 'としまむら'] },
    { id: '新島村', names: ['新島村', 'にいじまむら'] },
    { id: '神津島村', names: ['神津島村', 'こうづしまむら'] },
    { id: '三宅村', names: ['三宅村', 'みやけむら'] },
    { id: '御蔵島村', names: ['御蔵島村', 'みくらじまむら'] },
    { id: '八丈町', names: ['八丈町', 'はちじょうまち'] },
    { id: '青ヶ島村', names: ['青ヶ島村', 'あおがしまむら'] },
    { id: '小笠原村', names: ['小笠原村', 'おがさわらむら'] }
  ];

  // タイマーの処理
  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTimerRunning]);

  // 全問正解チェック
  useEffect(() => {
    if (isGameStarted && correctAnswers.length === allDistricts.length) {
      setIsTimerRunning(false);

      // クリア時の音声を再生
      startOrClearSoundRef.current.currentTime = 0;
      startOrClearSoundRef.current.play().catch(err => console.log('Audio play failed:', err));

      // Confettiを発射
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // 複数の位置からconfettiを発射
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      // お祝いメッセージを表示（閉じるボタンで閉じるまで表示）
      setShowCongratulations(true);
    }
  }, [correctAnswers.length, isGameStarted, allDistricts.length]);

  // 主な名前のリスト（地図表示用）
  const districtIds = allDistricts.map(district => district.id);

  // クリア状態を判定
  const isCleared = isGameStarted && correctAnswers.length === allDistricts.length;

  // 降参状態またはクリア状態のときは再挑戦ボタンを表示
  const showRetryButton = isCleared || isSurrendered;

  // 時間のフォーマット
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // 開始ボタンのハンドラー
  const handleStart = () => {
    setIsGameStarted(true);
    setIsTimerRunning(true);
    setCorrectAnswers([]);
    setTime(0);
    setInputValue('');
    setShowCongratulations(false);
    setIsSurrendered(false);

    // 開始時の音声を再生
    startOrClearSoundRef.current.currentTime = 0;
    startOrClearSoundRef.current.play().catch(err => console.log('Audio play failed:', err));
  };

  // 降参ボタンのハンドラー
  const handleSurrender = () => {
    if (isGameStarted && !isCleared && !isSurrendered) {
      setShowSurrenderModal(true);
    }
  };

  // 降参を確定するハンドラー
  const handleConfirmSurrender = () => {
    setIsTimerRunning(false);
    setIsSurrendered(true);
    setShowSurrenderModal(false);
  };

  // 降参をキャンセルするハンドラー
  const handleCancelSurrender = () => {
    setShowSurrenderModal(false);
  };

  // 回答ボタンのハンドラー
  const handleAnswer = () => {
    if (inputValue.trim()) {
      const trimmedValue = inputValue.trim();
      // デバッグ用: "allcomplete"と入力したら全問正解にする
      if (trimmedValue === 'allcomplete') {
        setCorrectAnswers(districtIds);
        setInputValue('');
        return;
      }
      checkAnswer(trimmedValue);
    }
  };

  // 入力のハンドラー
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 入力確定時の処理
  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const trimmedValue = inputValue.trim();
      // デバッグ用: "allcomplete"と入力したら全問正解にする
      if (trimmedValue === 'allcomplete') {
        setCorrectAnswers(districtIds);
        setInputValue('');
        return;
      }
      checkAnswer(trimmedValue);
    }
  };

  // 正解判定
  const checkAnswer = (answer) => {
    // 入力値が地域名と一致するかチェック（複数の名前に対応）
    const matchedDistrict = allDistricts.find(
      (district) => district.names.includes(answer)
    );

    if (matchedDistrict) {
      // 既に正解済みの場合は無視（idで判定）
      if (correctAnswers.includes(matchedDistrict.id)) {
        // 入力済みの地域を再回答したときは音声を再生し、文字は消さない
        wrongSoundRef.current.currentTime = 0;
        wrongSoundRef.current.play().catch(err => console.log('Audio play failed:', err));
        return;
      }
      // 主な名前（id）を正解リストに追加
      setCorrectAnswers((prev) => [...prev, matchedDistrict.id]);
      setInputValue('');

      // 正解時の音声を再生
      correctSoundRef.current.currentTime = 0;
      correctSoundRef.current.play().catch(err => console.log('Audio play failed:', err));
    } else {
      // 何にも該当しないときは音声を再生
      wrongSoundRef.current.currentTime = 0;
      wrongSoundRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  };

  return (
    <>
      {/* 降参確認モーダル */}
      {showSurrenderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md mx-4 text-center animate-fadeIn">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
              降参しますか？
            </h2>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleConfirmSurrender}
                className="bg-red-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-red-600 transition"
              >
                はい
              </button>
              <button
                onClick={handleCancelSurrender}
                className="bg-gray-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-600 transition"
              >
                いいえ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* お祝いメッセージモーダル */}
      <ClearModal
        isOpen={showCongratulations}
        onClose={() => setShowCongratulations(false)}
        time={time}
        gameTitle={gameTitle}
      />
      <div>
        {/* メインコンテンツエリア */}
        <main className="w-full mt-4 bg-white py-5 px-2 md:px-5 rounded-xl shadow-lg">
          {/* タイトルセクション */}
          <div className="text-center mb-5">
            <h2 className="text-1xl md:text-3xl font-extrabold text-slate-700 ">
              {gameTitle}
            </h2>
          </div>

          {/* 地図エリア */}
          <TokyoMap
            isGameStarted={isGameStarted}
            correctAnswers={correctAnswers}
            allDistricts={allDistricts}
            showCongratulations={showCongratulations}
            isSurrendered={isSurrendered}
            showSurrenderModal={showSurrenderModal}
          />

          {/* 操作・統計エリア */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-5">
            {/* 入力欄 */}
            <div className="flex gap-2 w-full md:max-w-md">
              <input
                type="text"
                placeholder={isSurrendered || isCleared ? "再挑戦は右のボタンを押してね" : isGameStarted ? "入力してEnterを押してね" : "開始を押してね"}
                className="border-2 border-slate-300 rounded-lg px-4 py-2 grow focus:outline-none focus:border-blue-500"
                disabled={!isGameStarted}
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
              />
              <button
                className={`font-bold px-6 py-2 rounded-lg transition shrink-0 ${showRetryButton
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : isGameStarted
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                onClick={showRetryButton ? handleStart : (isGameStarted ? handleAnswer : handleStart)}
                disabled={isSurrendered && !showRetryButton}
              >
                {showRetryButton ? '再挑戦' : (isGameStarted ? '回答' : '開始')}
              </button>
            </div>

            {/* 統計数値 */}
            <div className="flex gap-8 items-center text-slate-600">
              <div>
                <p className="text-[14px] uppercase tracking-widest text-slate-400">
                  経過時間
                </p>
                <p className="text-xl md:text-2xl font-mono font-bold">
                  {formatTime(time)}
                </p>
              </div>
              <div>
                <p className="text-[14px] uppercase tracking-widest text-slate-400">
                  正解数
                </p>
                <p className="text-xl md:text-2xl font-mono font-bold text-red-500">
                  {String(correctAnswers.length).padStart(2, '0')}/{districtIds.length}
                </p>
              </div>
              <button
                className="bg-slate-500 text-white font-bold px-6 py-2 rounded-lg hover:bg-slate-600 transition shrink-0"
                onClick={handleSurrender}
                disabled={!isGameStarted || isCleared || isSurrendered}
              >
                降参
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Tokyo;