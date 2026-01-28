import { useState, useRef, useEffect } from 'react';
import Timer from '../assets/Timer';
import RankingAddButton from '../assets/RankingAddButton';

const gameid = 'monhan';

const monsters = [
  { id: '1', name: ['ドスランポス', 'どすらんぽす'] },
  { id: '2', name: ['イャンクック', 'いゃんくっく'] },
  { id: '3', name: ['ドスゲネポス', 'どすげねぽす'] },
  { id: '4', name: ['ドスイーオス', 'どすいーおす'] },
  { id: '5', name: ['ゲリョス', 'げりょす'] },
  { id: '6', name: ['ドスガレオス', 'どすがれおす'] },
  { id: '7', name: ['フルフル', 'ふるふる'] },
  { id: '8', name: ['ガノトトス', 'がのととす'] },
  { id: '9', name: ['リオレイア', 'りおれいあ'] },
  { id: '10', name: ['リオレウス', 'りおれうす'] },
  { id: '11', name: ['モノブロス', 'ものぶろす'] },
  { id: '12', name: ['ディアブロス', 'でぃあぶろす'] },
  { id: '13', name: ['グラビモス', 'ぐらびもす'] },
  { id: '14', name: ['バサルモス', 'ばさるもす'] },
  { id: '15', name: ['キリン', 'きりん'] },
  { id: '16', name: ['ラオシャンロン', 'らおしゃんろん'] },
  { id: '17', name: ['ミラボレアス', 'みらぼれあす'] },
  { id: '18', name: ['ミラバルカン', 'みらばるかん'] },
  { id: '19', name: ['イャンガルルガ', 'いゃんがるるが'] },
  { id: '20', name: ['ドスファンゴ', 'どすふぁんご'] },
  { id: '21', name: ['ダイミョウザザミ', 'だいみょうざざみ'] },
  { id: '22', name: ['ババコンガ', 'ばばこんが'] },
  { id: '23', name: ['ショウグンギザミ', 'しょうぐんぎざみ'] },
  { id: '24', name: ['ドドブランゴ', 'どどぶらんご'] },
  { id: '25', name: ['クシャルダオラ', 'くしゃるだおら'] },
  { id: '26', name: ['オオナズチ', 'おおなずち'] },
  { id: '27', name: ['テオ・テスカトル', 'てお・てすかとる', 'テオテスカトル', 'ておてすかとる'] },
  { id: '28', name: ['ナナ・テスカトリ', 'なな・てすかとり', 'ナナテスカトリ', 'ななてすかとり'] },
  { id: '29', name: ['ラージャン', 'らーじゃん'] },
  { id: '30', name: ['ヤマツカミ', 'やまつかみ'] },
  { id: '31', name: ['シェンガオレン', 'しぇんがおれん'] },
  { id: '32', name: ['ミラルーツ', 'みらるーつ'] },
  { id: '33', name: ['ドスギアノス', 'どすぎあのす'] },
  { id: '34', name: ['ティガレックス', 'てぃがれっくす'] },
  { id: '35', name: ['アカムトルム', 'あかむとるむ'] },
  { id: '36', name: ['キングチャチャブー', 'きんぐちゃちゃぶー'] },
  { id: '37', name: ['クイーンランゴスタ', 'くいーんらんごすた'] },
  { id: '38', name: ['ヒプノック', 'ひぷのっく'] },
  { id: '39', name: ['ナルガクルガ', 'なるがくるが'] },
  { id: '40', name: ['ヴォルガノス', 'ゔぉるがのす'] },
  { id: '41', name: ['ウカムルバス', 'うかむるばす'] },
  { id: '42', name: ['ドスジャギィ', 'どすじゃぎぃ'] },
  { id: '43', name: ['クルペッコ', 'くるぺっこ'] },
  { id: '44', name: ['ロアルドロス', 'ろあるどろす'] },
  { id: '45', name: ['ボルボロス', 'ぼるぼろす'] },
  { id: '46', name: ['チャナガブル', 'ちゃながぶる'] },
  { id: '47', name: ['ギギネブラ', 'ぎぎねぶら'] },
  { id: '48', name: ['ドスバギィ', 'どすばぎぃ'] },
  { id: '49', name: ['ラギアクルス', 'らぎあくるす'] },
  { id: '50', name: ['ウラガンキン', 'うらがんきん'] },
  { id: '51', name: ['ベリオロス', 'べりおろす'] },
  { id: '52', name: ['アグナコトル', 'あぐなことる'] },
  { id: '53', name: ['ナバルデウス', 'なばるでうす'] },
  { id: '54', name: ['アオアシラ', 'あおあしら'] },
  { id: '55', name: ['ドスフロギィ', 'どすふろぎぃ'] },
  { id: '56', name: ['ハプルボッカ', 'はぷるぼっか'] },
  { id: '57', name: ['ラングロトラ', 'らんぐろとら'] },
  { id: '58', name: ['ウルクスス', 'うるくすす'] },
  { id: '59', name: ['ジンオウガ', 'じんおうが'] },
  { id: '60', name: ['ドボルベルク', 'どぼるべるく'] },
  { id: '61', name: ['ジエン・モーラン', 'じえん・もーらん', 'ジエンモーラン', 'じえんもーらん'] },
  { id: '62', name: ['イビルジョー', 'いびるじょー'] },
  { id: '63', name: ['アルバトリオン', 'あるばとりおん'] },
  { id: '64', name: ['アマツマガツチ', 'あまつまがつち'] },
  { id: '65', name: ['ブラキディオス', 'ぶらきでぃおす'] },
  { id: '66', name: ['グラン・ミラオス', 'ぐらん・みらおす', 'グランミラオス', 'ぐらんみらおす'] },
  { id: '67', name: ['アルセルタス', 'あるせるたす'] },
  { id: '68', name: ['ケチャワチャ', 'けちゃわちゃ'] },
  { id: '69', name: ['テツカブラ', 'てつかぶら'] },
  { id: '70', name: ['ネルスキュラ', 'ねるすきゅら'] },
  { id: '71', name: ['ザボアザギル', 'ざぼあざぎる'] },
  { id: '72', name: ['ガララアジャラ', 'がららあじゃら'] },
  { id: '73', name: ['ゴア・マガラ', 'ごあ・まがら', 'ゴアマガラ', 'ごあまがら'] },
  { id: '74', name: ['ゲネル・セルタス', 'げねる・せるたす', 'ゲネルセルタス', 'げねるせるたす'] },
  { id: '75', name: ['ダレン・モーラン', 'だれん・もーらん', 'ダレンモーラン', 'だれんもーらん'] },
  { id: '76', name: ['シャガルマガラ', 'しゃがるまがら'] },
  { id: '77', name: ['ダラ・アマデュラ', 'だら・あまでゅら', 'ダラアマデュラ', 'だらあまでゅら'] },
  { id: '78', name: ['セルレギオス', 'せるれぎおす'] },
  { id: '79', name: ['ゴグマジオス', 'ごぐまじおす'] },
  { id: '80', name: ['ドスマッカォ', 'どすまっかぉ'] },
  { id: '81', name: ['ホロロホルル', 'ほろろほるる'] },
  { id: '82', name: ['ライゼクス', 'らいぜくす'] },
  { id: '83', name: ['ガムート', 'がむーと'] },
  { id: '84', name: ['タマミツネ', 'たまみつね'] },
  { id: '85', name: ['ディノバルド', 'でぃのばるど'] },
  { id: '86', name: ['オストガロア', 'おすとがろあ'] },
  { id: '87', name: ['バルファルク', 'ばるふぁるく'] },
  { id: '88', name: ['アトラル・カ', 'あとらる・か', 'アトラルカ', 'あとらるか'] },
  { id: '89', name: ['ドスジャグラス', 'どすじゃぐらす'] },
  { id: '90', name: ['クルルヤック', 'くるるやっく'] },
  { id: '91', name: ['プケプケ', 'ぷけぷけ'] },
  { id: '92', name: ['ジュラトドス', 'じゅらとどす'] },
  { id: '93', name: ['トビカガチ', 'とびかがち'] },
  { id: '94', name: ['アンジャナフ', 'あんじゃなふ'] },
  { id: '95', name: ['ゾラ・マグダラオス', 'ぞら・まぐだらおす', 'ゾラマグダラオス', 'ぞらまぐだらおす'] },
  { id: '96', name: ['パオウルムー', 'ぱおうるむー'] },
  { id: '97', name: ['ツィツィヤック', 'つぃつぃやっく'] },
  { id: '98', name: ['ドスギルオス', 'どすぎるおす'] },
  { id: '99', name: ['ラドバルキン', 'らどばるきん'] },
  { id: '100', name: ['レイギエナ', 'れいぎえな'] },
  { id: '101', name: ['オドガロン', 'おどがろん'] },
  { id: '102', name: ['ドドガマル', 'どどがまる'] },
  { id: '103', name: ['ネルギガンテ', 'ねるぎがんて'] },
  { id: '104', name: ['ヴァルハザク', 'ゔぁるはざく'] },
  { id: '105', name: ['ゼノ・ジーヴァ', 'ぜの・じーゔぁ', 'ゼノジーヴァ', 'ぜのじーゔぁ'] },
  { id: '106', name: ['バゼルギウス', 'ばぜるぎうす'] },
  { id: '107', name: ['マム・タロト', 'まむ・たろと', 'マムタロト', 'まむたろと'] },
  { id: '108', name: ['ブラントドス', 'ぶらんとどす'] },
  { id: '109', name: ['バフバロ', 'ばふばろ'] },
  { id: '110', name: ['イヴェルカーナ', 'いゔぇるかーな'] },
  { id: '111', name: ['ネロミェール', 'ねろみぇーる'] },
  { id: '112', name: ['アン・イシュワルダ', 'あん・いしゅわるだ', 'アンイシュワルダ', 'あんいしゅわるだ'] },
  { id: '113', name: ['ムフェト・ジーヴァ', 'むふぇと・じーゔぁ', 'ムフェトジーヴァ', 'むふぇとじーゔぁ'] },
  { id: '114', name: ['オサイズチ', 'おさいずち'] },
  { id: '115', name: ['アケノシルム', 'あけのしるむ'] },
  { id: '116', name: ['ヨツミワドウ', 'よつみわどう'] },
  { id: '117', name: ['ビシュテンゴ', 'びしゅてんご'] },
  { id: '118', name: ['マガイマガド', 'まがいまがど'] },
  { id: '119', name: ['オロミドロ', 'おろみどろ'] },
  { id: '120', name: ['ゴシャハギ', 'ごしゃはぎ'] },
  { id: '121', name: ['イソネミクニ', 'いそねみくに'] },
  { id: '122', name: ['ヤツカダキ', 'やつかだき'] },
  { id: '123', name: ['イブシマキヒコ', 'いぶしまきひこ'] },
  { id: '124', name: ['ナルハタタヒメ', 'なるはたたひめ'] },
  { id: '125', name: ['ガランゴルム', 'がらんごるむ'] },
  { id: '126', name: ['ルナガロン', 'るながろん'] },
  { id: '127', name: ['エスピナス', 'えすぴなす'] },
  { id: '128', name: ['メル・ゼナ', 'める・ぜな', 'メルゼナ', 'めるぜな'] },
  { id: '129', name: ['ガイアデルム', 'がいあでるむ'] },
  { id: '130', name: ['チャタカブラ', 'ちゃたかぶら'] },
  { id: '131', name: ['ケマトリス', 'けまとりす'] },
  { id: '132', name: ['ラバラ・バリナ', 'らばら・ばりな', 'ラバラバリナ', 'らばらばりな'] },
  { id: '133', name: ['バーラ・ハーラ', 'ばーら・はーら', 'バラハーラ', 'らーらはーら'] },
  { id: '134', name: ['ドシャグマ', 'どしゃぐま'] },
  { id: '135', name: ['ウズ・トゥナ', 'うず・とぅな', 'ウズトゥナ', 'うずとぅな'] },
  { id: '136', name: ['ププロポル', 'ぷぷろぽる'] },
  { id: '137', name: ['レ・ダウ', 'れ・だう', 'レダウ', 'れだう'] },
  { id: '138', name: ['ヒラバミ', 'ひらばみ'] },
  { id: '139', name: ['アジャラカン', 'あじゃらかん'] },
  { id: '140', name: ['ヌ・エグドラ', 'ぬ・えぐどら', 'ヌエグドラ', 'ぬえぐどら'] },
  { id: '141', name: ['アルシュベルド', 'あるしゅべるど'] },
  { id: '142', name: ['ジン・ダハド', 'じん・だはど', 'ジンダハド', 'じんだはど'] },
  { id: '143', name: ['シーウー', 'しーうー'] },
  { id: '144', name: ['ゾ・シア', 'ぞ・しあ', 'ゾシア', 'ぞしあ'] }
];

const Monhan = () => {
  const correctSoundRef = useRef(new Audio('/audio/correct.mp3'));
  const wrongSoundRef = useRef(new Audio('/audio/wrong.mp3'));
  const startOrClearSoundRef = useRef(new Audio('/audio/start_or_clear.mp3'));
  const inputRef = useRef(null);
  const cardRefsMap = useRef({});

  const [status, setStatus] = useState('idle');
  const [answeredIds, setAnsweredIds] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [clearTime, setClearTime] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSurrenderModal, setShowSurrenderModal] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const playSound = (soundRef) => {
    soundRef.current.currentTime = 0;
    soundRef.current.play().catch(err => console.log('Audio play failed:', err));
  };

  const startGame = () => {
    setResetTimer(true);
    setTimeout(() => setResetTimer(false), 0);
    setCurrentTime(0);
    setClearTime('');
    setAnsweredIds([]);
    setInputValue('');
    setStatus('playing');
    playSound(startOrClearSoundRef);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleKeydown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleSubmit = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || status !== 'playing') return;

    // デバッグ用: allcomplete で全問正解
    if (trimmed.toLowerCase() === 'allcomplete') {
      setAnsweredIds(monsters.map(m => m.id));
      setClearTime(formatTime(currentTime));
      setShowModal(true);
      setStatus('cleared');
      playSound(startOrClearSoundRef);
      setInputValue('');
      return;
    }

    const normalized = trimmed.toLowerCase().replace(/\s/g, '').replace(/・/g, '');
    const hit = monsters.find(m =>
      !answeredIds.includes(m.id) &&
      m.name.some(n => n.toLowerCase().replace(/\s/g, '').replace(/・/g, '') === normalized)
    );
    if (!hit) {
      playSound(wrongSoundRef);
      return;
    }
    const nextIds = [...answeredIds, hit.id];
    setAnsweredIds(nextIds);
    playSound(correctSoundRef);
    setInputValue('');
    // 回答したモンスターのカードが画面外ならそこまでスクロール
    const idToScroll = hit.id;
    setTimeout(() => {
      const el = cardRefsMap.current[idToScroll];
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
    if (nextIds.length >= 144) {
      setClearTime(formatTime(currentTime));
      setShowModal(true);
      setStatus('cleared');
      playSound(startOrClearSoundRef);
    }
  };

  const openSurrenderModal = () => setShowSurrenderModal(true);
  const handleSurrender = () => {
    setShowSurrenderModal(false);
    setStatus('surrendered');
  };

  useEffect(() => {
    if (status !== 'playing') return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [status]);

  const pageUrl = typeof window !== 'undefined' ? `${window.location.origin}/monhan` : '';
  const shareClearText = `モンハン歴代モンスター144種を全問正解しました！\nクリア時間: ${clearTime}\n正答数: 144/144\n`;
  const shareSurrenderText = `モンハン歴代モンスター144種に挑戦しました！\n経過時間: ${formatTime(currentTime)}\n正答数: ${answeredIds.length}/144\n`;

  const isPlaying = status === 'playing';
  const isCleared = status === 'cleared';
  const isSurrendered = status === 'surrendered';
  const shareHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(isCleared ? shareClearText : shareSurrenderText)}&url=${encodeURIComponent(pageUrl)}`;
  const showCard = (id) => answeredIds.includes(id) || isCleared || isSurrendered;

  const MonsterGrid = ({ startId, endId }) => {
    const filteredMonsters = monsters.filter(m => {
      const id = parseInt(m.id, 10);
      return id >= startId && id <= endId;
    });

    return (
      <div className="grid md:grid-cols-12 grid-cols-6 gap-1">
        {filteredMonsters.map((monster) => {
          const revealed = showCard(monster.id);
          const unansweredRevealed = revealed && isSurrendered && !answeredIds.includes(monster.id);
          const imagePath = `/monsterhunter/${monster.id}.png`;

          return (
            <div
              key={monster.id}
              ref={(el) => { cardRefsMap.current[monster.id] = el; }}
              className="flex flex-col items-center @container group"
            >
              <div className={`rounded-sm bg-slate-50 w-[99cqw] h-[99cqw] flex items-center justify-center overflow-hidden shadow-xl ${unansweredRevealed ? '[filter:grayscale(1)_brightness(1.2)_contrast(0.9)]' : ''}`}>
                {revealed ? (
                  <img
                    src={imagePath}
                    alt={monster.name[0]}
                    className="w-full h-full object-contain object-center [image-rendering:pixelated]"
                  />
                ) : (
                  <span className="text-[30cqw] md:text-4xl font-bold text-slate-400 select-none">?</span>
                )}
              </div>
              <p className={`text-[8px] md:text-xs font-bold mt-2 mb-4 min-h-[1.5em] ${unansweredRevealed ? 'text-red-600' : 'text-slate-700'}`}>
                {revealed ? monster.name[0] : '？？？'}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <main className="w-full max-w-full min-w-0 my-4 space-y-3 p-3 sm:p-4 rounded-xl shadow-lg overflow-x-clip bg-gradient-to-br from-sky-50 via-slate-50 to-stone-200 relative">

      <div className="text-center mb-4">
        <h1 className="md:text-3xl font-extrabold text-slate-800 mb-2 bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
          モンハン 歴代モンスター144種言えるかな？
        </h1>
        <p className="text-[7px] lg:text-xs text-slate-500">※小型モンスター、亜種、希少種、二つ名、特殊個体、フロンティアモンスターは除く</p>
      </div>

      <div className="absolute top-1 right-0">
        <a href={`/ranking?gameid=${gameid}`} target="_blank" rel="noopener noreferrer">
          <p className="text-[7px] lg:text-base text-blue-600 hover:text-blue-800 cursor-pointer lg:mr-3 mr-1">ランキングを見る</p>
        </a>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-4 p-4 bg-slate-100/95 rounded-xl border border-slate-200 sticky top-12 z-10">

        <div className="flex flex-1 min-w-0 gap-1.5 sm:gap-2 w-full max-w-full flex-wrap">
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeydown}
            type="text"
            placeholder={isPlaying ? 'モンスター名を入力' : (isCleared || isSurrendered) ? '右のボタンで再挑戦' : '開始を押してね'}
            disabled={status === 'idle' || isCleared || isSurrendered}
            className="min-w-0 flex-1 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg border-2 border-slate-200 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 text-slate-800 placeholder-slate-400 text-sm sm:text-base"
          />
          {status === 'idle' && (
            <button type="button" onClick={startGame} className="shrink-0 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 active:bg-red-800 transition-colors duration-200 text-sm sm:text-base">
              開始
            </button>
          )}
          {isPlaying && (
            <>
              <button type="button" onClick={handleSubmit} className="shrink-0 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 text-sm sm:text-base">
                回答
              </button>
              <button type="button" onClick={openSurrenderModal} className="shrink-0 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-slate-600 text-white font-medium hover:bg-slate-700 active:bg-slate-800 transition-colors duration-200 text-sm sm:text-base">
                降参
              </button>
            </>
          )}
          {(isCleared || isSurrendered) && (
            <>
              <button type="button" onClick={startGame} className="shrink-0 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 active:bg-red-800 transition-colors duration-200 text-sm sm:text-base">
                再挑戦
              </button>
              <a href={shareHref} target="_blank" rel="noopener noreferrer" className="shrink-0 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-700 active:bg-cyan-800 transition-colors duration-200 text-sm sm:text-base inline-flex items-center justify-center no-underline">
                共有
              </a>
            </>
          )}
        </div>

        <div className="flex gap-6 text-slate-700 font-medium">
          <span>経過時間: <span className="tabular-nums text-red-600 font-semibold"><Timer isRunning={isPlaying} reset={resetTimer} onTimeUpdate={setCurrentTime} /></span></span>
          <span>回答数: <span className="tabular-nums font-semibold">{answeredIds.length}/144</span></span>
        </div>

      </div>

      <div className="flex items-center gap-3 mb-2">
        <div className="h-8 w-1 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>
        <h2 className="text-lg md:text-xl font-bold text-slate-700 tracking-wide">MH, MHG, MHP世代</h2>
      </div>
      <MonsterGrid startId={1} endId={19} />

      <div className="flex items-center gap-3 mb-2">
        <div className="h-8 w-1 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
        <h2 className="text-lg md:text-xl font-bold text-slate-700 tracking-wide">MH2, MH2nd, MH2ndG世代</h2>
      </div>
      <MonsterGrid startId={20} endId={41} />

      <div className="flex items-center gap-3 mb-2">
        <div className="h-8 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
        <h2 className="text-lg md:text-xl font-bold text-slate-700 tracking-wide">MH3, MH3rd, MH3G世代</h2>
      </div>
      <MonsterGrid startId={42} endId={66} />

      <div className="flex items-center gap-3 mb-2">
        <div className="h-8 w-1 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full"></div>
        <h2 className="text-lg md:text-xl font-bold text-slate-700 tracking-wide">MH4, MH4G世代</h2>
      </div>
      <MonsterGrid startId={67} endId={79} />

      <div className="flex items-center gap-3 mb-2">
        <div className="h-8 w-1 bg-gradient-to-b from-red-400 to-red-600 rounded-full"></div>
        <h2 className="text-lg md:text-xl font-bold text-slate-700 tracking-wide">MHX, MHXX世代</h2>
      </div>
      <MonsterGrid startId={80} endId={88} />

      <div className="flex items-center gap-3 mb-2">
        <div className="h-8 w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
        <h2 className="text-lg md:text-xl font-bold text-slate-700 tracking-wide">MHW, MHW:I世代</h2>
      </div>
      <MonsterGrid startId={89} endId={113} />

      <div className="flex items-center gap-3 mb-2">
        <div className="h-8 w-1 bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-full"></div>
        <h2 className="text-lg md:text-xl font-bold text-slate-700 tracking-wide">MHR, MHR:S世代</h2>
      </div>
      <MonsterGrid startId={114} endId={129} />

      <div className="flex items-center gap-3 mb-2">
        <div className="h-8 w-1 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full"></div>
        <h2 className="text-lg md:text-xl font-bold text-slate-700 tracking-wide">MHWs世代</h2>
      </div>
      <MonsterGrid startId={130} endId={144} />

      <p className="text-xs text-slate-500">本サイトは個人による非公式のファンコンテンツです。使用されているモンスター名や画像等の著作権は、株式会社カプコンに帰属します。 </p>

      {/* 全問正解お祝いモーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-4 text-slate-800">🎉 おめでとうございます！</h2>
            <p className="text-center mb-6 text-slate-600">歴代モンスター144種、全問正解です！</p>
            {clearTime && (
              <p className="text-center mb-6 text-lg font-semibold text-red-600">
                クリアタイム: {clearTime}
              </p>
            )}
            <div className="flex flex-col gap-4">
              <RankingAddButton
                gameid={gameid}
                cleartime={currentTime}
                onSuccess={() => setShowModal(false)}
              />
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 font-bold"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 降参確認モーダル */}
      {showSurrenderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-4 text-slate-800">降参しますか？</h2>
            <p className="text-center mb-6 text-slate-500">※未回答のモンスターがすべて表示されます</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleSurrender}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-bold"
              >
                降参
              </button>
              <button
                onClick={() => setShowSurrenderModal(false)}
                className="px-6 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 font-bold"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Monhan