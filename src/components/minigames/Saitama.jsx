import { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const Saitama = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [time, setTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [showCongratulations, setShowCongratulations] = useState(false);
    const [showSurrenderModal, setShowSurrenderModal] = useState(false);
    const [isSurrendered, setIsSurrendered] = useState(false);
    const [tooltip, setTooltip] = useState({ show: false, district: null, isCorrect: false, x: 0, y: 0 });

    // ref
    const intervalRef = useRef(null);
    const svgRef = useRef(null);
    const hideTimeoutRef = useRef(null);
    const containerRef = useRef(null);

    // 音声ファイルの参照
    const correctSoundRef = useRef(new Audio('/audio/correct.mp3'));
    const wrongSoundRef = useRef(new Audio('/audio/wrong.mp3'));
    const startOrClearSoundRef = useRef(new Audio('/audio/start_or_clear.mp3'));

    // 全63の市区町村のリスト（複数の名前に対応）
    const allDistricts = [
        { id: 'さいたま市', names: ['さいたま市', 'さいたまし', '埼玉市'] },
        { id: '川越市', names: ['川越市', 'かわごえし'] },
        { id: '熊谷市', names: ['熊谷市', 'くまがやし'] },
        { id: '川口市', names: ['川口市', 'かわぐちし'] },
        { id: '行田市', names: ['行田市', 'ぎょうだし'] },
        { id: '秩父市', names: ['秩父市', 'ちちぶし'] },
        { id: '所沢市', names: ['所沢市', 'ところざわし'] },
        { id: '飯能市', names: ['飯能市', 'はんのうし'] },
        { id: '加須市', names: ['加須市', 'かぞし'] },
        { id: '本庄市', names: ['本庄市', 'ほんじょうし'] },
        { id: '東松山市', names: ['東松山市', 'ひがしまつやまし'] },
        { id: '春日部市', names: ['春日部市', 'かすかべし'] },
        { id: '狭山市', names: ['狭山市', 'さやまし'] },
        { id: '羽生市', names: ['羽生市', 'はにゅうし'] },
        { id: '鴻巣市', names: ['鴻巣市', 'こうのすし'] },
        { id: '深谷市', names: ['深谷市', 'ふかやし'] },
        { id: '上尾市', names: ['上尾市', 'あげおし'] },
        { id: '草加市', names: ['草加市', 'そうかし'] },
        { id: '越谷市', names: ['越谷市', 'こしがやし'] },
        { id: '蕨市', names: ['蕨市', 'わらびし'] },
        { id: '戸田市', names: ['戸田市', 'とだし'] },
        { id: '入間市', names: ['入間市', 'いるまし'] },
        { id: '朝霞市', names: ['朝霞市', 'あさかし'] },
        { id: '志木市', names: ['志木市', 'しきし'] },
        { id: '和光市', names: ['和光市', 'わこうし'] },
        { id: '新座市', names: ['新座市', 'にいざし'] },
        { id: '桶川市', names: ['桶川市', 'おけがわし'] },
        { id: '久喜市', names: ['久喜市', 'くきし'] },
        { id: '北本市', names: ['北本市', 'きたもとし'] },
        { id: '八潮市', names: ['八潮市', 'やしおし'] },
        { id: '富士見市', names: ['富士見市', 'ふじみし'] },
        { id: '三郷市', names: ['三郷市', 'みさとし'] },
        { id: '蓮田市', names: ['蓮田市', 'はすだし'] },
        { id: '坂戸市', names: ['坂戸市', 'さかどし'] },
        { id: '幸手市', names: ['幸手市', 'さってし'] },
        { id: '鶴ヶ島市', names: ['鶴ヶ島市', 'つるがしまし'] },
        { id: '日高市', names: ['日高市', 'ひだかし'] },
        { id: '吉川市', names: ['吉川市', 'よしかわし'] },
        { id: 'ふじみ野市', names: ['ふじみ野市', 'ふじみのし'] },
        { id: '白岡市', names: ['白岡市', 'しらおかし'] },
        { id: '伊奈町', names: ['伊奈町', 'いなまち'] },
        { id: '三芳町', names: ['三芳町', 'みよしまち'] },
        { id: '毛呂山町', names: ['毛呂山町', 'もろやままち'] },
        { id: '越生町', names: ['越生町', 'おごせまち'] },
        { id: '滑川町', names: ['滑川町', 'なめがわまち'] },
        { id: '嵐山町', names: ['嵐山町', 'らんざんまち'] },
        { id: '小川町', names: ['小川町', 'おがわまち'] },
        { id: '川島町', names: ['川島町', 'かわじままち'] },
        { id: '吉見町', names: ['吉見町', 'よしみまち'] },
        { id: '鳩山町', names: ['鳩山町', 'はとやままち'] },
        { id: 'ときがわ町', names: ['ときがわ町', 'ときがわまち'] },
        { id: '横瀬町', names: ['横瀬町', 'よこぜまち'] },
        { id: '皆野町', names: ['皆野町', 'みなのまち'] },
        { id: '長瀞町', names: ['長瀞町', 'ながとろまち'] },
        { id: '小鹿野町', names: ['小鹿野町', 'おがのまち'] },
        { id: '美里町', names: ['美里町', 'みさとまち'] },
        { id: '神川町', names: ['神川町', 'かみかわまち'] },
        { id: '上里町', names: ['上里町', 'かみさとまち'] },
        { id: '寄居町', names: ['寄居町', 'よりいまち'] },
        { id: '宮代町', names: ['宮代町', 'みやしろまち'] },
        { id: '杉戸町', names: ['杉戸町', 'すぎとまち'] },
        { id: '松伏町', names: ['松伏町', 'まつぶしまち'] },
        { id: '東秩父村', names: ['東秩父村', 'ひがしちちぶむら'] },
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

    // ひらがな名を取得（names配列から漢字以外を取得）
    const getHiraganaName = (district) => {
        if (!district || !district.names) return '';
        return district.names.find(name => name !== district.id) || '';
    };

    // 未正解の場合の表示用テキストを生成
    const getMaskedText = (text, isCorrect) => {
        if (isCorrect) return text;
        // 未正解の場合：最初の1文字＋"？？"のみ表示
        if (!text) return '';
        if (text.length === 0) return '';
        return text[0] + '？？';
    };

    // ツールチップの位置を計算
    const tooltipPosition = useMemo(() => {
        if (!tooltip.show || !containerRef.current) return null;
        
        const containerRect = containerRef.current.getBoundingClientRect();
        const x = tooltip.x - containerRect.left;
        const y = tooltip.y - containerRect.top;
        
        // ツールチップのサイズを考慮して位置を調整（上に表示）
        const tooltipWidth = 150; // 推定幅
        const tooltipHeight = 60; // 推定高さ
        let tooltipX = x + 10;
        let tooltipY = y - tooltipHeight - 10;
        
        // 右端を超える場合は左に表示
        if (tooltipX + tooltipWidth > containerRect.width) {
            tooltipX = x - tooltipWidth - 10;
        }
        
        // 上端を超える場合は下に表示
        if (tooltipY < 0) {
            tooltipY = y + 10;
        }
        
        return { x: tooltipX, y: tooltipY };
    }, [tooltip.show, tooltip.x, tooltip.y]);

    // 各地域グループの状態を更新
    useEffect(() => {
        const svgElement = svgRef.current;
        if (!svgElement) return;

        // --- ヘルパー関数 ---

        // 判定ロジック：地域の色とテキスト表示状態を決定
        const getStatus = (districtName) => {
            if (!isGameStarted) return { fill: '#e2e8f0', showText: false };

            const isCorrect = correctAnswers.includes(districtName);

            // 降参時は未回答の地域も表示する（赤文字フラグを立てる）
            if (isSurrendered && !isCorrect) {
                return { fill: '#e2e8f0', showText: true, isUnanswered: true };
            }

            return isCorrect
                ? { fill: '#10b981', showText: true }    // 正解: エメラルド
                : { fill: '#e2e8f0', showText: false };   // 未回答: グレー
        };

        // 地区情報を取得
        const getDistrictInfo = (districtName) => {
            if (!Array.isArray(allDistricts)) return null;
            return allDistricts.find(d => d?.id === districtName) || null;
        };

        // --- メイン処理 ---

        const districtGroups = svgElement.querySelectorAll('#group > g');
        const registeredHandlers = []; // クリーンアップ用に保存

        districtGroups.forEach((group) => {
            const textElement = group.querySelector('text');
            if (!textElement) return;

            const districtName = textElement.textContent.trim();
            const status = getStatus(districtName);
            const districtInfo = getDistrictInfo(districtName);
            const pathElements = group.querySelectorAll('path');

            // 1. テキスト要素の更新（表示・色・アニメーション）
            textElement.style.transition = 'opacity 0.5s ease, visibility 0.5s ease, fill 0.3s ease';
            textElement.style.opacity = status.showText ? '1' : '0';
            textElement.style.visibility = status.showText ? 'visible' : 'hidden';
            textElement.style.display = status.showText ? 'block' : 'none';

            // 降参時の未回答は赤色、それ以外は黒
            if (status.isUnanswered) {
                textElement.setAttribute('fill', '#ef4444');
                textElement.style.fontWeight = 'bold';
            } else {
                textElement.setAttribute('fill', '#000000');
                textElement.style.fontWeight = 'bold';
            }

            // 2. パス要素（地図の形）の更新とイベント登録
            pathElements.forEach((path) => {
                // 色の更新
                path.setAttribute('fill', status.fill);
                path.style.transition = 'fill 0.5s ease, filter 0.2s ease';
                path.style.pointerEvents = 'auto';
                path.style.cursor = districtInfo ? 'pointer' : 'default';

                if (!districtInfo) return;

                // イベントハンドラーの定義
                const isCorrect = correctAnswers.includes(districtName);
                const tooltipIsCorrect = isSurrendered ? true : isCorrect;

                const handleMouseEnter = (e) => {
                    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
                    path.style.filter = 'brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.1))';

                    setTooltip({
                        show: true,
                        district: districtInfo,
                        isCorrect: tooltipIsCorrect,
                        x: e.clientX,
                        y: e.clientY
                    });
                };

                const handleMouseLeave = () => {
                    path.style.filter = '';
                    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

                    // 地区から離れたら即座にツールチップを非表示にする
                    setTooltip(prev => (prev.district?.id === districtInfo.id
                        ? { show: false, district: null, isCorrect: false, x: 0, y: 0 }
                        : prev));
                };

                const handleMouseMove = (e) => {
                    setTooltip(prev => (prev.show ? { ...prev, x: e.clientX, y: e.clientY } : prev));
                };

                // イベントリスナーの追加
                path.addEventListener('mouseenter', handleMouseEnter);
                path.addEventListener('mouseleave', handleMouseLeave);
                path.addEventListener('mousemove', handleMouseMove);

                // クリーンアップ用に保存
                registeredHandlers.push({ path, handleMouseEnter, handleMouseLeave, handleMouseMove });
            });
        });

        // クリーンアップ関数
        return () => {
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
            registeredHandlers.forEach(({ path, handleMouseEnter, handleMouseLeave, handleMouseMove }) => {
                path.removeEventListener('mouseenter', handleMouseEnter);
                path.removeEventListener('mouseleave', handleMouseLeave);
                path.removeEventListener('mousemove', handleMouseMove);
            });
        };
    }, [isGameStarted, correctAnswers, allDistricts, isSurrendered]);
    
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
            {showCongratulations && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md mx-4 text-center animate-fadeIn relative">
                        <button
                            onClick={() => setShowCongratulations(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                            aria-label="閉じる"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="text-4xl md:text-6xl mb-4">🎉</div>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                            おめでとう！
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 mb-2">
                            クリアタイムは
                        </p>
                        <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
                            {formatTime(time)}
                        </p>
                        <p className="text-lg md:text-xl text-slate-600 mb-6">
                            でした！
                        </p>
                        <button
                            onClick={() => setShowCongratulations(false)}
                            className="bg-blue-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-600 transition"
                        >
                            閉じる
                        </button>
                    </div>
                </div>
            )}
            <div>
                {/* メインコンテンツエリア */}
                <main className="w-full mt-4 bg-white py-5 px-2 md:px-5 rounded-xl shadow-lg">
                    {/* タイトルセクション */}
                    <div className="text-center mb-5">
                        <h2 className="text-1xl md:text-3xl font-extrabold text-slate-700 ">
                            埼玉県の市区町村全部言えるかな？
                        </h2>
                    </div>

                    {/* 地図エリア */}
                    <div
                        ref={containerRef}
                        className="relative w-full aspect-[1280/720] my-5 rounded-2xl overflow-hidden shadow-2xl border border-slate-300/50"
                        style={{
                            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                        }}
                    >
                        {/* ツールチップ */}
                        {tooltip.show && tooltip.district && tooltipPosition && (
                            <div
                                className="absolute z-50 text-white px-4 py-3 rounded-xl shadow-2xl whitespace-nowrap backdrop-blur-sm transition-all duration-200"
                                style={{
                                    left: `${tooltipPosition.x}px`,
                                    top: `${tooltipPosition.y}px`,
                                    background: tooltip.isCorrect
                                        ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
                                        : 'linear-gradient(135deg, #475569 0%, #64748b 100%)',
                                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    animation: 'fadeIn 0.2s ease-out',
                                    pointerEvents: 'none'
                                }}
                            >
                                {/* 漢字名：正解済みはそのまま、未正解は"？？？" */}
                                <div className={`font-bold text-base ${tooltip.isCorrect ? 'text-emerald-300' : 'text-slate-300'}`}>
                                    {tooltip.isCorrect ? tooltip.district.id : '？？？'}
                                </div>
                                {/* ひらがな名：正解済みはそのまま、未正解は最初の1文字＋"？？" */}
                                {getHiraganaName(tooltip.district) && (
                                    <div className={`text-xs mt-1.5 ${tooltip.isCorrect ? 'text-emerald-200' : 'text-slate-400'}`}>
                                        {getMaskedText(getHiraganaName(tooltip.district), tooltip.isCorrect)}
                                    </div>
                                )}
                            </div>
                        )}
                        <TransformWrapper
                            wheel={{ step: 0.2 }}
                            initialScale={1}
                            centerOnInit={true}
                            limitToBounds={true}
                            minScale={1}
                            maxScale={3}
                        >
                            {/* ★ここから関数の形にする */}
                            {({ zoomIn, zoomOut, resetTransform }) => (
                                <>
                                    {/* 1. ボタンコンテナ: relativeな親要素に対してabsoluteで配置 */}
                                    <div className="absolute top-3 right-3 md:top-5 md:right-5 z-49 flex flex-col gap-1 transition-opacity duration-300">
                                        {/* 各ボタン：モダンなデザイン */}
                                        <button
                                            onClick={() => zoomIn()}
                                            className="opacity-80 w-8 h-8 md:w-12 md:h-12 bg-white border border-slate-200/50 rounded-xl shadow-lg flex items-center justify-center font-bold text-lg md:text-xl text-slate-700 hover:bg-white hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
                                            style={{
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                            }}
                                        >
                                            +
                                        </button>

                                        <button
                                            onClick={() => zoomOut()}
                                            className="opacity-80 w-8 h-8 md:w-12 md:h-12 bg-white border border-slate-200/50 rounded-xl shadow-lg flex items-center justify-center font-bold text-lg md:text-xl text-slate-700 hover:bg-white hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
                                            style={{
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                            }}
                                        >
                                            −
                                        </button>

                                        <button
                                            onClick={() => resetTransform()}
                                            className="opacity-80 w-8 h-8 md:w-12 md:h-12 bg-white border border-slate-200/50 rounded-xl shadow-lg flex items-center justify-center text-[9px] md:text-[11px] font-bold text-slate-600 hover:bg-white hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
                                            style={{
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                            }}
                                        >
                                            RESET
                                        </button>
                                    </div>

                                    <TransformComponent
                                        wrapperStyle={{ width: '100%', height: '100%' }} // 表示する「窓」のサイズを固定
                                        contentStyle={{ width: '100%', height: '100%' }} // 中身のベースサイズ
                                    >
                                        {/* ここからSVGの内容を貼り付ける */}
                                        <svg
                                            ref={svgRef}
                                            width="100%" /* 横幅は親に合わせる */
                                            /* height属性を削除、または height="auto" にする */
                                            viewBox="0 0 1280 720"
                                            preserveAspectRatio="xMidYMid meet"
                                            style={{ display: 'block', width: '100%', height: 'auto' }}
                                            version="1.1"
                                            id="svg148"
                                            className="w-full h-full"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                        >
                                            <defs id="defs1">
                                                <clipPath id="clip0">
                                                    <rect x="0" y="0" width="1280" height="720" id="rect1" />
                                                </clipPath>
                                            </defs>
                                            <g
                                                clipPath="url(#clip0)"
                                                id="group">
                                                <rect
                                                    x="0"
                                                    y="0"
                                                    width="1280"
                                                    height="720"
                                                    fill="#FFFFFF"
                                                    id="rect2" />
                                                <path
                                                    d="M255 539.947 265.908 512.613 346.628 482 564.79 549.787 669.508 571.653 707.686 617.573 835.311 627.413 904.032 578.213 1229.09 591.333 1255.27 642.72 1241.09 648.187 1246.55 671.147 1264 676.613 1264 728 342.265 725.813 330.266 687.547 289.906 631.787 283.361 588.053 263.726 578.213 255 539.947Z"
                                                    stroke="#FFFFFF"
                                                    strokeWidth="2"
                                                    strokeMiterlimit="8"
                                                    fill="#A0EBD2"
                                                    fillRule="evenodd"
                                                    id="path2" />
                                                <path
                                                    d="M-7 493.942 20.3291 483 118.714 492.848 253.174 544.274 273.944 579.287 288.155 582.569 296.901 632.901 315.484 652.596 335.161 687.61 345 727-5.90693 724.812C-6.27125 647.855-6.63568 570.898-7 493.942Z"
                                                    stroke="#FFFFFF"
                                                    strokeWidth="2"
                                                    strokeMiterlimit="8"
                                                    fill="#A0EBD2"
                                                    fillRule="evenodd"
                                                    id="path3" />
                                                <path
                                                    d="M1129 295.333 1129 308.444 1130.09 260.37 1140.99 256 1159.51 272.389 1172.59 319.37 1243.41 374 1244.5 396.944 1287 419.889 1284.82 728 1264.12 724.722 1264.12 677.741 1245.59 669 1242.32 648.241 1254.31 637.315 1236.88 590.333 1220.53 477.796 1158.42 402.407 1160.6 352.148 1129 295.333Z"
                                                    stroke="#FFFFFF"
                                                    strokeWidth="2"
                                                    strokeMiterlimit="8"
                                                    fill="#A0EBD2"
                                                    fillRule="evenodd"
                                                    id="path4" />
                                                <path
                                                    d="M1202.12-8 1196.67 29.1385 1197.76 63 1179.22 104.508 1131.24 118.708 1091.98 144.923 1062.53 140.554 1032 146.015 1034.18 167.862 1058.17 254.154 1088.71 300.031 1129.06 296.754 1130.15 266.169 1139.96 258.523 1158.5 274.908 1170.5 315.323 1202.12 345.908 1240.29 373.215 1242.47 396.154 1285 418C1284.64 277.092 1284.27 136.185 1283.91-4.72315L1202.12-8Z"
                                                    stroke="#FFFFFF"
                                                    strokeWidth="2"
                                                    strokeMiterlimit="8"
                                                    fill="#A0EBD2"
                                                    fillRule="evenodd"
                                                    id="path5" />
                                                <path
                                                    d="M759.09-3.46212 785.262 53.2 802.709 48.8414 810.342 60.8276 797.257 69.5448 839.785 73.9034 899.76 58.6482 898.67 70.6344 961.917 72.8138 976.093 64.0966 981.545 72.8138 978.274 88.069 986.998 108.772 1006.63 105.503 1013.17 124.028 1000.08 139.283 1030.62 148 1062.24 142.552 1092.77 146.91 1135.3 118.579 1180.01 101.145 1197.46 59.7379 1198.55 29.2276 1204-7.82067 758-10 759.09-3.46212Z"
                                                    stroke="#FFFFFF"
                                                    strokeWidth="2"
                                                    strokeMiterlimit="8"
                                                    fill="#A0EBD2"
                                                    fillRule="evenodd"
                                                    id="path6" />
                                                <path
                                                    d="M763.795 0.997333 785.608 50.0773 801.967 46.8053 812.873 60.984 812.873 60.984 801.967 69.7093 830.323 69.7093 903.395 55.5306 902.304 69.7093 959.016 71.8907 972.103 63.1653 987.372 74.072 980.828 87.16 989.553 104.611 1004.82 103.52 1019 127.515 1004.82 138.421 1008.09 154.781 962.288 170.051 776.883 163.507 690.724 96.976 646.008 127.515 480.235 68.6186 375.535 218.04 257.748 286.752 166.136 320.563 120.331 357.645 65.7997 366.371 16.7218 398-0.728117 393.637-4 389.275C-3.63642 255.85-3.27295 122.425-2.90937-11L761.614-11 763.795 0.997333Z"
                                                    stroke="#FFFFFF"
                                                    strokeWidth="2"
                                                    strokeMiterlimit="8"
                                                    fill="#A0EBD2"
                                                    fillRule="evenodd"
                                                    id="path7" />
                                                <path
                                                    d="M-5 389 14.3585 396.649 52 445.825 52 482.979 39.0943 489.536 16.5095 486.258-3.92452 495-5 389Z"
                                                    stroke="#FFFFFF"
                                                    strokeWidth="2"
                                                    strokeMiterlimit="8"
                                                    fill="#A0EBD2"
                                                    fillRule="evenodd"
                                                    id="path71" />
                                                <text
                                                    fill="#7F7F7F"
                                                    fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                    fontWeight="900"
                                                    fontSize="21.3333"
                                                    transform="translate(137.091 183)"
                                                    id="text71">群馬県</text>
                                                <text
                                                    fill="#7F7F7F"
                                                    fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                    fontWeight="900"
                                                    fontSize="21.3333"
                                                    transform="translate(1027.33 62)"
                                                    id="text73">栃木県</text>
                                                <text
                                                    fill="#7F7F7F"
                                                    fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                    fontWeight="900"
                                                    fontSize="21.3333"
                                                    transform="translate(1169.33 218)"
                                                    id="text75">茨城県</text>
                                                <text
                                                    fill="#7F7F7F"
                                                    fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                    fontWeight="900"
                                                    fontSize="21.3333"
                                                    transform="translate(1217.09 452)"
                                                    id="text77">千葉県</text>
                                                <text
                                                    fill="#7F7F7F"
                                                    fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                    fontWeight="900"
                                                    fontSize="21.3333"
                                                    transform="translate(798.398 713)"
                                                    id="text79">東京都</text>
                                                <text
                                                    fill="#7F7F7F"
                                                    fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                    fontWeight="900"
                                                    fontSize="21.3333"
                                                    transform="translate(91.5152 685)"
                                                    id="text81">山梨県</text>
                                                <text
                                                    fill="#7F7F7F"
                                                    fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                    fontWeight="900"
                                                    fontSize="14.6667"
                                                    transform="translate(-1.46446 454)"
                                                    id="text83">長野県</text>
                                                <g
                                                    id="g149">
                                                    <path
                                                        d="M139.446 337.8 121.069 349 108.284 345.8 98.6961 352.2 77.1225 337 69.1324 345.8 62.7402 342.6 50.7549 371.4 28.3824 390.6 14 397.8 22.7892 428.2 37.1716 433 49.1569 457.8 35.5735 484.2 46.905 490.018 49.9559 489.8 57.9461 497.8 84.3137 493 102.691 505.8 101.892 528.2 117.873 528.2 124.265 538.6 140.245 534.6 146.637 542.6 154.627 532.2 165.015 539.4 173.005 547.4 187.387 544.2 191.382 559.4 206.564 565 223.343 549 247.314 558.6 262.495 549 259.299 535.4 276.877 521.8 276.877 521.8 300.049 512.2 301.647 525 320.824 517.8 332.01 496.2 365.569 514.6 375.157 521.8 389.539 529 406.319 524.2 416.706 534.6 427.093 535.4 434.284 522.6 431.887 517.8 443.074 501 431.088 486.6 431.887 473 416.706 462.6 418.304 438.6 411.912 425.8 406.319 411.4 411.912 399.4 415.907 382.6 425.495 373 431.088 377 439.877 386.6 453.461 378.6 459.853 385 471.039 381.8 497.407 393 503 388.2 488.618 374.6 483.025 363.4 475.034 357.8 470.24 351.4 447.868 346.6 435.083 319.4 415.108 320.2 407.118 304.2 375.956 313 372.76 298.6 349.588 304.2 329.613 281.8 318.426 280.2 322.422 271.4 305.642 270.6 298.451 256.2 291.26 255.4 292.858 247.4 277.676 233 267.289 243.4 276.877 256.2 268.088 270.6 244.118 285.8 265.691 313.8 287.265 321 286.466 333 308.039 345.8 323.221 351.4 345.593 365.8 362.373 357 367.966 358.6 371.162 368.2 359.176 381.8 364.77 385 363.971 402.6 346.392 419.4 331.211 421 331.211 405.8 324.819 401 312.034 408.2 302.446 399.4 295.255 404.2 276.877 401 261.696 420.2 232.931 418.6 219.348 409 199.373 414.6 162.618 393.8 148.235 363.4 155.426 345.8 139.446 337.8Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path9" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(219.143 465)"
                                                        id="text85">秩父市</text>
                                                </g>
                                                <g
                                                    id="g150">
                                                    <path
                                                        d="M242.111 283.592 230.121 278 209.339 281.196 175.768 293.978 166.176 305.162 157.384 305.961 139 337.117 153.388 345.106 147.792 367.475 162.18 393.039 182.962 405.022 200.547 413.81 217.332 409.816 231.72 419.402 264.491 419.402 275.682 402.626 293.266 405.821 300.46 400.229 309.253 408.218 324.439 401.827 330.834 410.615 330.834 421 344.422 419.402 363.606 403.425 364.405 386.648 357.211 383.453 370 369.872 366.803 358.687 360.408 356.29 346.021 365.877 322.042 348.302 305.256 345.106 285.273 331.525 287.671 322.737 265.291 313.151 248.505 292.38 242.111 283.592Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path8" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(208.046 365)"
                                                        id="text86">小鹿野町</text>
                                                </g>
                                                <g
                                                    id="g196">
                                                    <path
                                                        d="M331.665 271.517 318.804 276.333 318 282.755 330.057 284.361 349.349 304.429 373.464 300.415 377.483 315.667 408.029 306.034 416.871 322.891 436.163 322.088 448.22 348.578 473.139 355 480.373 330.116 486 313.258 473.943 277.939 445.005 276.333 436.163 284.361 406.421 268.306 410.44 254.66 402.402 241.816 395.971 245.027 376.679 237 361.407 241.816 354.976 265.095 338.9 264.293 331.665 271.517Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path11" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(382.298 297)"
                                                        id="text87">皆野町</text>
                                                </g>
                                                <g
                                                    id="g201">
                                                    <path
                                                        d="M402 243.928 409.235 254.247 406.02 268.536 436.569 286 445.412 276.474 458.275 278.856 465.51 256.629 466.314 241.546 472.745 226.464 484 226.464 469.529 216.938 454.255 215.351 443.804 209 438.176 220.907 426.922 218.526 418.882 227.258 418.882 227.258 404.412 238.371 402 243.928Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path12" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(413.651 256)"
                                                        id="text88">長瀞町</text>
                                                </g>
                                                <g
                                                    id="g198">
                                                    <path
                                                        d="M419 109.247 428.574 116.427 436.553 109.247 440.543 126 461.287 122.011 494 106.056 486.819 100.472 482.032 88.5056 494 62.9775 480.436 56.5955 469.266 62.9775 453.309 55 447.723 72.5506 440.543 67.764 431.766 83.7191 432.564 93.2921 419 109.247Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path14" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(433.646 98)"
                                                        id="text90">上里町</text>
                                                </g>
                                                <g
                                                    id="g199">
                                                    <path
                                                        d="M436.125 138.491 428.942 155.266 411.383 156.863 397.017 170.443 399.411 188.017 387.439 196.804 389.035 210.383 393.026 215.176 381.054 216.774 373 238.414 394.332 248 405.796 243.933 426.547 219.969 438.519 223.164 442.51 208.786 456.876 216.774 470.445 198.401 464.858 187.218 476.83 176.035 479.224 161.656 486.407 156.064 480.022 152.869 496.783 132.1 519.929 142.485 526.314 124.911 540.68 120.118 546.267 112.13 559.037 123.313 575 112.13 570.211 96.9524 555.047 89.7631 528.708 79.3786 495.187 65 489.6 74.5857 482.417 87.3667 488.802 104.94 497.581 104.142 484.013 111.331 465.656 120.917 455.28 122.514 452.088 131.301 451.29 148.875 436.125 138.491Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path13" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(429.928 168)"
                                                        id="text91">本庄市</text>
                                                </g>
                                                <g
                                                    id="g200">
                                                    <path
                                                        d="M497.667 131 480.333 151.069 486.333 156.421 480.333 157.759 477 173.145 465 183.848 471 195.89 459 213.952 471 215.959 484.333 225.324 496.333 228 521.667 214.621 517 201.241 523 193.883 522.333 181.172 518.333 179.166 532.333 166.455 537 163.779 535.667 145.717 527 153.745 523 142.372 497.667 131Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path16" />
                                                    <text
                                                        fontFamily="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16px"
                                                        id="text92"
                                                        x="464.47955"
                                                        y="190.66171">美里町</text>
                                                </g>
                                                <g
                                                    id="g180">
                                                    <path
                                                        d="M571 102 573 111 560 123 547 109 542 118 523 122 521 140 524 155 534 148 534 163 526 172 516 180 538 193 555 196 555 196 552 209 544 212 538 217 523 224 542 231 545 247 578 246 584 246 588 251 606 240 606 251 606 251 615 253 620 260 643 249 647 230 637 217 644 211 626 201 620 191 648 175 660 180 661 169 661 169 661 157 669 139 666 106 666 106 650 115 639 97 627 103 610 100 600 89 593 100 583 96 571 102Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path15" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(569.2 180)"
                                                        id="text93">深谷市</text>
                                                </g>
                                                <g
                                                    id="g202">
                                                    <path
                                                        d="M522.333 183 523 194.365 517 199.713 521.667 214.421 495.667 227.124 481.667 225.118 473.667 225.787 465.667 238.489 467 254.534 459 275.927 474.333 279.27 485 274.59 491.667 279.27 499.667 279.27 513.667 302 527 301.331 537.667 279.27 544.333 281.275 549.667 274.59 559.667 283.949 567 279.938 584.333 285.955 600.333 267.904 615.667 273.921 621 257.208 616.333 252.528 605.667 251.191 608.333 239.157 589 249.854 584.333 243.837 545 245.174 543 229.798 524.333 224.449 541.667 216.427 544.333 209.742 553 209.742 555.667 195.034 539 192.36 522.333 183Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path17" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(512.667 262)"
                                                        id="text94">寄居町</text>
                                                </g>
                                                <g
                                                    id="g194">
                                                    <path
                                                        d="M536.466 280.374 526.414 300.436 531.105 311.135 544.508 308.46 559.921 320.497 567.963 323.84 537.136 335.877 528.424 349.92 515.691 347.245 511 352.595 518.372 375.331 538.476 376 546.518 368.644 555.901 371.988 565.953 352.595 570.644 358.613 580.026 345.908 584.717 349.252 592.089 345.239 600.801 348.583 625.597 348.583 622.916 339.221 630.958 328.521 630.958 315.147 639 309.798 620.906 285.055 622.916 278.368 632.298 277.699 630.958 270.344 618.225 267 616.215 272.35 600.131 267.669 585.387 285.055 566.623 279.706 560.592 283.049 550.539 274.356 543.838 281.712 536.466 280.374Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path19" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(566.296 319)"
                                                        id="text95">小川町</text>
                                                </g>
                                                <g
                                                    id="g195">
                                                    <path
                                                        d="M473.676 280.686 485.718 313.45 477.69 330.166 471 356.911 486.387 368.278 492.408 379.645 502.444 387 519.169 378.976 510.472 352.231 517.162 347.55 525.859 352.231 537.901 336.183 566 323.479 557.303 319.467 542.584 308.769 531.211 311.444 526.528 300.746 513.148 302.083 499.768 279.349 489.732 280.018 485.718 274 473.676 280.686Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path18" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(481.203 329)"
                                                        id="text96">東秩父村</text>
                                                </g>
                                                <g
                                                    id="g152">
                                                    <path
                                                        d="M519.384 374 501.345 387.333 497.336 391.333 496 399.333 502.013 418.667 529.405 418.667 534.082 433.333 543.435 436 550.116 425.333 547.444 418.667 567.487 412 590.203 397.333 603.565 400.667 622.272 385.333 632.961 390 641.647 373.333 651 370.667 649.664 364 638.306 357.333 636.302 340 626.28 348 599.556 348.667 592.207 344 587.53 349.333 580.515 343.667 572.164 358.667 566.485 350 555.461 371.667 547.11 367.333 540.095 375.333 519.384 374Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path23" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(533.191 390)"
                                                        id="text97">ときがわ町</text>
                                                </g>
                                                <g
                                                    id="g151">
                                                    <path
                                                        d="M425.066 373 414.364 382.3 411.689 400.236 405 414.186 418.377 440.093 415.033 465.336 433.762 463.343 443.126 466 458.51 456.7 469.881 452.05 477.238 446.736 493.96 442.75 497.974 430.129 506 421.493 495.967 400.9 497.305 392.264 472.556 380.307 458.51 384.293 455.166 377.65 438.444 385.621 425.066 373Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path20" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(433.202 424)"
                                                        id="text98">横瀬町</text>
                                                </g>
                                                <g
                                                    id="g154">
                                                    <path
                                                        d="M624 385.667 632 391 642.667 371 663.333 373 670.667 375.667 682 372.333 684.667 379.667 700 383.667 712 401 697.333 411 685.333 421.667 666.667 429 650 427 638.667 402.333 627.333 399.667 616 390.333 624 385.667Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path25" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(644.263 406)"
                                                        id="text100">鳩山町</text>
                                                </g>
                                                <g
                                                    id="g181">
                                                    <path
                                                        d="M667 106.974 669 141.584 661.667 157.558 661 180.188 647 174.864 621 190.172 626.333 202.818 645.667 212.136 635.667 216.13 647.667 230.107 643 250.74 640.333 252.071 643.667 262.055 649 276.698 657 279.36 663.667 266.049 670.333 278.695 678.333 278.695 679.667 260.058 687.667 258.727 705.667 270.708 714.333 265.383 724.333 266.714 725 257.396 751.667 277.364 750.333 282.688 744.333 288.013 750.333 294.669 765 296 781 290.675 779.667 284.019 772.333 280.026 773 264.052 777 258.062 767.667 251.406 773 240.424 774.333 236.763 768.333 227.445 759 219.458 763.667 204.815 767.667 217.461 772.333 213.468 772.333 200.156 777 194.831 775.667 187.51 758.333 186.179 764.333 178.857 758.333 161.552 760.333 152.234 781 156.893 768.333 146.243 757.667 140.253 748.333 123.614 742.333 126.942 706.333 96.9903 699.667 96.9903 695.667 91.6656 685.667 91 681 98.987 667 106.974Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path33" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(683.074 205)"
                                                        id="text103">熊谷市</text>
                                                </g>
                                                <g
                                                    id="g192">
                                                    <path
                                                        d="M713.667 266.973 713.667 266.973 717 276.286 711 281.607 715 289.589 713 309.545 719.667 319.522 715.667 322.848 719 333.491 707.667 331.496 698.333 342.138 693.667 332.161 686.333 338.812 668.333 332.161 661 336.817 671 349.455 672.333 366.75 666.333 373.402 671.667 378.058 680.333 370.741 683 379.388 701 383.379 711 401.339 723 398.679 740.333 404 759.667 386.705 760.333 374.732 769.667 374.732 773.667 380.054 784.333 376.728 787.667 380.054 795 367.415 784.333 364.754 779 368.08 773.667 358.103 760.333 343.469 753 343.469 757.667 332.161 755.667 311.54 761 294.246 747.667 294.246 743.667 285.598 751.667 279.612 751 276.286 723 255 723 266.973 713.667 266.973Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path35" />
                                                    <text
                                                        fontFamily="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16px"
                                                        id="text104"
                                                        x="693.8064"
                                                        y="361.78525">東松山市</text>
                                                </g>
                                                <g
                                                    id="g203">
                                                    <path
                                                        d="M701.205 408.842C708.571 405.974 711.92 399.796 723.304 400.237L740.714 402.885 760.134 387 772.188 387 778.214 398.252 794.286 404.871 805 428.036 789.598 445.245 775.536 448.554 779.554 428.698 760.804 433.331 754.777 430.022 746.071 441.273 734.688 443.259 728.661 435.978 715.938 439.95 713.259 448.554 699.196 452.525 692.5 466.424 679.777 473.043 675.089 479 657.679 471.058 655 458.482 673.75 456.496 681.116 463.777 686.473 456.496 680.446 447.23 693.17 447.23 694.509 436.64 684.464 421.417 701.205 408.842Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path27" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(721.191 423)"
                                                        id="text105">坂戸市</text>
                                                </g>
                                                <g
                                                    id="g158">
                                                    <path
                                                        d="M651.284 427.974 640.689 443.905 620.162 449.879 614.203 442.578 605.595 440.586 595 449.879 595 470.457 603.608 484.397 600.959 497.009 608.243 499 638.703 489.043 655.919 471.784 654.595 459.836 673.797 457.845 682.405 464.483 687.703 458.509 682.405 448.552 692.338 447.888 693 437.931 686.378 424.655 683.068 422 667.176 427.974 651.284 427.974Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path26" />
                                                    <text
                                                        fontFamily="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16px"
                                                        id="text99"
                                                        x="608.70361"
                                                        y="467.20139">毛呂山町</text>
                                                </g>
                                                <g
                                                    id="g159">
                                                    <path
                                                        d="M801.333 431 789.333 445.667 776 449 778.667 429 756 433 766.667 444.333 766.667 451.667 756 460.333 759.333 469 760 477 752.667 470.333 743.333 477.667 720 481.667 721.333 491.667 728 489.667 736.667 503.667 752.667 501.667 758.667 509.667 772 509 772.667 522.333 787.333 525 801.333 516.333 795.333 532.333 803.333 535 803.333 535 793.333 548.333 808 560.333 816 575 830.667 567.667 826.667 557.667 828.667 550.333 818 551.667 842 537 854 521.667 862.667 505.667 869.333 523.667 891.333 523.667 890 513 896.667 515 902 509 894.667 504.333 902 495.667 894 485 892.667 467 896.667 461.667 883.333 460.333 887.333 441.667 880.667 437.667 870 443 853.333 432.333 820.667 435.667 814.667 425 801.333 431Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path48" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(796.525 492)"
                                                        id="text107">川越市</text>
                                                </g>
                                                <g
                                                    id="g175">
                                                    <path
                                                        d="M895.833 513 894.167 528.515 891.667 535.936 871 535.936 865 541.333 879.667 541.333 873 556.173 874.333 567.81 885.5 568.316 889 576.411 898.667 584 912.667 576.411 927 573.038 922.333 554.824 929 548.078 923.667 530.539 908 525.311 895.833 513Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path58" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="11"
                                                        transform="translate(877 559)"
                                                        id="text109">富士見市</text>
                                                </g>
                                                <g
                                                    id="g197">
                                                    <path
                                                        d="M418.612 109 428.258 113.806 435.493 109.801 441.12 125.019 458 123.417 451.569 132.227 452.373 143.441 449.962 151.45 436.297 138.635 427.455 156.256 410.574 157.858 398.517 172.275 400.124 188.294 386.981 197.753 388.871 205.915C390.474 210.707 389.226 207.602 393.694 214.725L380.833 219.531 376.813 234.749 362.344 244.36 354.306 265.986 341.445 265.986 318.938 278 302.057 270.791 298.038 255.573 290 256.374 292.411 246.763 303.665 248.365 308.488 237.152 320.545 237.953 328.584 230.744 337.426 228.341 346.268 235.55 362.344 225.137 361.541 210.72 372.794 203.512 379.074 204.913 379.743 197.418 375.206 189.896 376.01 166.668 389.675 161.062 386.459 149.848 408.163 130.626 407.359 123.417 418.612 109Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path10" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(361.072 186)"
                                                        id="text89">神川町</text>
                                                </g>
                                                <g
                                                    id="g191">
                                                    <path
                                                        d="M664.333 266 669.667 278.667 677 277.333 680.333 258 691 256 705 272 712.333 264 719 274 711.667 282.667 715.667 288 714.333 308.667 721 322.667 716.333 324.667 719 334 707.667 334 699.667 344 693 334.667 685.667 340.667 664.333 332.667 669.667 328.667 667.667 313.333 657 304.667 666.333 288.667 657 281.333 664.333 266Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path34" />
                                                    <text
                                                        fontFamily="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16px"
                                                        id="text102"
                                                        x="668.76154"
                                                        y="303.5235">滑川町</text>
                                                </g>
                                                <g id="g233">
                                                    <path
                                                        d="M960 578 949.333 585.333 932.667 580 922 590.667 919.333 592 918 617.333 926.667 625.333 926 636 934 630.667 938.667 636 938.667 642 945.333 641.333 946 630 962.667 620 962 606 972 600.667 972 592 960 578Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path66" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="12"
                                                        transform="translate(922.667 610)"
                                                        id="text110">朝霞市</text>
                                                </g>
                                                <g
                                                    id="g172">
                                                    <path
                                                        d="M890 600.862 893.333 606.154 892.667 618.723 885.333 626 892 635.923 864 652.462 874.667 654.446 894 644.523 894 655.108 890.667 668.338 898.667 669 913.333 658.415 939 641.877 938.667 634.6 934 629.969 926 635.262 926 624.677 919 616.408 921.667 591.6 910.167 594.412 898.667 583 896.667 591.6 890.667 590.277 879.333 595.569 890 600.862Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path62" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14.0133"
                                                        transform="translate(886.475 637)"
                                                        id="text112">新座市</text>
                                                </g>
                                                <g
                                                    id="g171">
                                                    <path
                                                        d="M969.493 601.667 960.767 607.667 963.452 619.667 946 629 946.671 641.667 953.384 645 961.438 649.667 967.479 655 975.534 647.667 972.178 637.667 986.274 628.333 986.945 619 995 620.333 992.315 605 985.603 601 984.26 607 969.493 601.667Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path67" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="12"
                                                        transform="translate(949.192 632)"
                                                        id="text113">和光市</text>
                                                </g>
                                                <g
                                                    id="g193">
                                                    <path
                                                        d="M638.209 252 618.988 257.319 619.651 263.302 617 267.291 631.581 270.615 632.907 275.269 622.965 278.593 620.977 287.901 638.209 309.841 631.581 313.83 632.244 325.132 620.314 337.099 626.279 349.066 636.884 339.093 636.221 357.709 650.14 363.692 650.14 370.341 669.36 373 674 368.346 672.674 349.066 661.407 337.099 671.349 327.791 669.36 313.83 656.767 303.192 666.709 287.901 666.709 287.901 657.43 281.918 652.791 275.269 646.163 271.945 644.174 259.313 638.209 252Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path32" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(625.284 328)"
                                                        id="text101">嵐山町</text>
                                                </g>
                                                <g
                                                    id="g177">
                                                    <path
                                                        d="M800 565 788 574.299 785.333 585.591 772 586.255 766 592.234 756 590.905 753.333 601.533 716 607.843 724 613.157 718.667 632.42 731.667 638.066 719.333 646.036 718.667 655.336 729.333 653.343 729.333 653.343 739.333 646.036 758.667 656 794.667 649.358 818.667 636.737 844.667 638.066 860 625.445 868 628.766 884.667 604.854 892 605.518 890 599.54 878.667 594.891 876 587.584 861.333 592.234 850.667 600.204 840 596.883 836 577.62 828 571.642 818.667 574.299 806 572.307 800 565Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path31" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(776.617 621)"
                                                        id="text114">所沢市</text>
                                                </g>
                                                <g
                                                    id="g179">
                                                    <path
                                                        d="M694.333 544 682.333 546.006 683.667 554.701 677.667 556.039 675.667 572.091 681.667 579.448 673.667 579.448 669.667 590.149 661.667 582.792 651 592.156 652.333 610.883 666.333 623.591 695 624.26 706.333 628.273 702.333 635.63 715 639.643 718.333 647 733.667 638.974 733.667 638.974 719.667 632.955 725 614.227 719.667 607.539 753.667 601.519 757 594.831 743 570.753 733.667 571.422 723.667 554.701 709 557.377 709.667 565.403 702.333 568.747 697.667 564.065 698.333 550.688 694.333 544Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path22" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(682.455 599)"
                                                        id="text115">入間市</text>
                                                </g>
                                                <g
                                                    id="g178">
                                                    <path
                                                        d="M723.667 516 735.667 504 751 500 760.333 508 769.667 510 771.667 519.333 787 525.333 801 516.667 795.667 532 802.333 532.667 804.333 538.667 794.333 548 811 562.667 817 574 805 572.667 800.333 566 788.333 576.667 785 585.333 773 587.333 767 594 753.667 591.333 743.667 570.667 734.333 571.333 723.667 556 709 558.667 709 566 703 569.333 699 564.667 699 548 711.667 534.667 709 532.667 727 527.333 723.667 516Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path30" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(736.475 556)"
                                                        id="text116">狭山市</text>
                                                </g>
                                                <g
                                                    id="g157">
                                                    <path
                                                        d="M729.667 434.949 715.667 438.241 713.667 448.114 697.667 450.747 691.667 465.886 691.667 465.886 689 476.418 701.667 468.519 711 475.101 719.667 473.127 720.333 483 743.667 477.076 752.333 471.152 759 474.443 759.667 466.544 755 462.595 767 454.038 766.333 444.165 754.333 431 749.667 439.557 735 442.848 729.667 434.949Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path29" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(695.858 463)"
                                                        id="text106">鶴ヶ島市</text>
                                                </g>
                                                <g
                                                    id="g156">
                                                    <path
                                                        d="M638.51 489.667 606.35 499 609.7 525.667 603 528.333 609.03 537 646.55 533 663.97 522.333 680.72 530.333 684.74 525 694.12 528.333 699.48 517.667 705.51 521 704.17 533.667 710.2 533.667 725.61 527 722.93 515.667 737 503.667 728.29 489 720.92 489 719.58 473.667 708.86 473 703.5 469 688.76 475.667 688.09 469.667 678.04 474.333 678.04 479.667 657.27 471 638.51 489.667Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path28" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(652.424 505)"
                                                        id="text117">日高市</text>
                                                </g>
                                                <g
                                                    id="g155">
                                                    <path
                                                        d="M420 465.756 430.667 473.103 431.333 489.134 441.333 499.821 432 515.851 435.333 521.863 427.333 535.221 447.333 540.565 473.333 539.229 495.333 557.931 526 571.29 540 559.935 560.667 574.63 568 567.282 577.333 574.63 604.667 573.962 610.667 567.95 624.667 574.63 635.333 573.962 636.667 583.981 649.333 586.653 651.333 594 661.333 585.317 670 591.328 675.333 579.973 682 578.637 677.333 568.618 678.667 555.927 683.333 553.924 682 546.576 694 543.905 699.333 548.58 712 535.221 702.667 533.218 705.333 520.527 696.667 518.523 694.667 527.206 684 521.863 680 527.874 662 521.195 646 532.55 612 537.225 604 528.542 610 523.198 606.667 498.485 601.333 496.481 604.667 485.794 593.333 472.435 577.333 471.767 563.333 461.748 565.333 451.729 554.667 444.382 548.667 444.382 543.333 435.031 535.333 431.023 529.333 419 505.333 419 500 426.347 493.333 441.71 478.667 445.718 472 451.729 458 455.737 446.667 465.088 433.333 461.08 420 465.756Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path21" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(526.333 515)"
                                                        id="text118">飯能市</text>
                                                </g>
                                                <g
                                                    id="g160">
                                                    <path
                                                        d="M905.018 462.667 901.68 454 893 464 893 484.667 901.012 494.667 895.003 502 901.68 508 897.006 514 908.357 532.667 923.046 532 937.068 558.667 960.437 577.333 971.788 575.333 984.474 582 994.489 580 1001.83 572 1007.18 578.667 1025.2 572 1027.87 554 1036.55 562.667 1045.23 560 1053.91 542.667 1060.59 549.333 1070.61 538 1065.26 521.333 1076.62 526 1083.96 523.333 1092.64 534.667 1096.65 512.667 1096.65 512.667 1102.66 500 1110 498 1106.66 484.667 1100.65 484.667 1095.98 474 1103.32 468 1104.66 450.667 1094.64 434 1071.27 438 1073.28 432.667 1064.6 424.667 1061.93 416 1067.27 419.333 1074.61 420 1079.29 414 1071.27 396 1059.26 388 1049.24 376 1042.56 380 1046.57 395.333 1037.89 400.667 1045.23 412.667 1014.52 411.333 1004.5 414.667 1006.51 424 999.831 424 993.154 444 983.806 432.667 973.791 438.667 965.778 423.333 949.086 430.667 934.397 423.333 938.403 440.667 946.415 446 943.077 454.667 933.729 446.667 917.705 448 905.018 462.667Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path55" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(958.691 501)"
                                                        id="text119">さいたま市</text>
                                                </g>
                                                <g
                                                    id="g161">
                                                    <path
                                                        d="M1112.33 447.376 1105 450.718 1103 466.762 1097 472.111 1100.33 485.481 1105.67 484.812 1108.33 496.177 1101.67 498.851 1097.67 512.221 1106.33 526.26 1117 528.265 1121.67 539.63 1129.67 536.956 1133.67 548.989 1148.33 542.972 1160.33 553 1171 545.646 1176.33 544.309 1177.67 532.945 1195 534.95 1197.67 530.271 1193 518.906 1201 511.552 1183.67 501.525 1187 492.166 1177.67 490.16 1175 480.133 1162.33 479.464 1162.33 471.442 1171.67 465.425 1172.33 460.077 1161.67 451.387 1162.33 446.707 1152.33 452.055 1151.67 440.691 1136.33 432 1131.67 443.365 1136.33 452.055 1117.67 458.74 1112.33 447.376Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path60" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(1122.67 508)"
                                                        id="text120">越谷市</text>
                                                </g>
                                                <g
                                                    id="g163">
                                                    <path
                                                        d="M1207 449 1214.33 467 1228.33 471.667 1232.33 489 1251 511.667 1255 531 1263 538.333 1244.33 542.333 1232.33 537C1226.58 539.156 1228.9 539 1225.67 539L1208.33 544.333 1201 544.333 1197 545 1195 534.333 1198.33 529 1193.67 519 1201.67 509.667 1185 502.333 1188.33 491 1195 497 1207.67 490.333 1203.67 481.667 1195.67 479.667 1195.67 466.333 1207 449Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path61" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(1204 518)"
                                                        id="text121">吉川市</text>
                                                </g>
                                                <g
                                                    id="g176">
                                                    <path
                                                        d="M863.4 507 852.089 523 843.44 536.333 814 553.333 828.803 551 827.306 559 830.633 566.833 842.109 557 861.404 561.667 865.396 567 873.379 554.333 880.698 540.333 863.4 542.333 872.049 537 892.673 535 896 529.667 895.335 515 888.682 511.667 889.347 521.667 868.722 521.667 863.4 507Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path56" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="12"
                                                        transform="translate(830.881 539)"
                                                        id="text108">ふじみ野市</text>
                                                </g>
                                                <g
                                                    id="g169">
                                                    <path
                                                        d="M963 577.029 971 592.471 972.333 607.243 986.333 607.243 986.333 601.871 993 606.571 996.333 620 1023.67 612.614 1051 617.986 1051 601.2 1035.67 597.843 1028.33 587.1 1009.67 585.757 1009.67 577.7 1003 573 995 579.714 983 580.386 971 575.014 963 577.029Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path65" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14.0133"
                                                        transform="translate(980.667 602)"
                                                        id="text122">戸田市</text>
                                                </g>
                                                <g
                                                    id="g168">
                                                    <path
                                                        d="M1009 578.463 1025.67 573 1038.33 580.512 1063 581.878 1062.33 591.439 1050.33 601 1037.67 599.634 1028.33 588.707 1011.67 587.341 1009 578.463Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path63" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="12"
                                                        transform="translate(1030.69 593)"
                                                        id="text123">蕨市</text>
                                                </g>
                                                <g
                                                    id="g167">
                                                    <path
                                                        d="M1028.67 553.111 1024 573.163 1036 581.853 1063.33 581.853 1062.67 591.211 1048.67 601.905 1048.67 615.942 1060 624.632 1069.33 622.626 1082.67 630.647 1094 625.968 1096.67 638 1106 633.321 1110 622.626 1118 620.621 1110.67 614.605 1105.33 611.263 1102.67 597.895 1114.67 600.568 1124.67 591.211 1130 596.558 1144 584.526 1141.33 577.842 1132 573.832 1124 558.458 1124.67 552.442 1116.67 544.421 1120.67 538.405 1118 527.711 1106 523.7 1099.33 513.005 1098 511 1092.67 535.732 1086 523.032 1076.67 527.711 1065.33 520.358 1070.67 536.4 1063.33 549.1 1056.67 540.411 1045.33 559.126 1037.33 562.468 1028.67 553.111Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path64" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(1065.71 574)"
                                                        id="text124">川口市</text>
                                                </g>
                                                <g
                                                    id="g166">
                                                    <path
                                                        d="M1128.9 537.333 1118.98 538.667 1117 545.333 1123.61 553.333 1122.95 562 1132.2 576.667 1141.46 577.333 1141.46 577.333 1144.1 584.667 1131.54 598 1145.42 608 1175.83 604.667 1165.92 594.667 1177.81 590 1170.54 578.667 1183.1 582 1188.39 557.333 1186.41 552 1195 544 1193.68 534.667 1177.81 532 1176.49 544 1168.56 545.333 1162.61 551.333 1148.07 544 1132.86 547.333 1128.9 537.333Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path68" />
                                                    <text
                                                        fontFamily="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14.0133px"
                                                        id="text125"
                                                        x="1136.843"
                                                        y="569.08551">草加市</text>
                                                </g>
                                                <g
                                                    id="g164">
                                                    <path
                                                        d="M1233.67 537.669 1245.67 541.683 1260.33 537 1261 548.372 1249.67 559.076 1247.67 593.193 1254.33 599.883 1249 619.283 1252.33 632.662 1242.33 630.655 1233.67 634 1230.33 627.31 1236.33 618.614 1231 615.938 1223.67 621.959 1217.67 618.614 1216.33 605.903 1226.33 592.524 1215 587.841 1202.33 579.814 1202.33 560.414 1197 554.393 1200.33 541.014 1209.67 543.69 1233.67 537.669Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path70" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14.0133"
                                                        transform="translate(1206.84 575)"
                                                        id="text126">三郷市</text>
                                                </g>
                                                <g
                                                    id="g173">
                                                    <path
                                                        d="M926.707 573.304 914.549 574.62 898 583.835 907.794 597 921.979 590.418 932.111 579.886 949.673 585.81 962 576.76 948.491 565.734 937.683 558.165 930.76 545 922.654 554.215 926.707 573.304Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path59" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="12"
                                                        transform="translate(919.142 574)"
                                                        id="text111">志木市</text>
                                                </g>
                                                <g
                                                    id="g162">
                                                    <path
                                                        d="M1173.09 429.613 1165.7 435.588 1164.36 442.227 1161 448.202 1172.41 461.479 1170.4 468.118 1161 470.773 1165.03 480.731 1175.77 480.731 1179.13 490.689 1193.9 496 1208 489.361 1203.97 482.059 1194.57 477.412 1195.24 467.454 1198.6 460.151 1206.66 449.529 1192.56 432.933 1191.21 417 1177.79 418.328 1173.09 429.613Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path54" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(1163.59 463)"
                                                        id="text127">松伏町</text>
                                                </g>
                                                <g
                                                    id="g204">
                                                    <path
                                                        d="M1059 388 1069.67 397.333 1079 412 1074.33 421.333 1062.33 417.333 1067.67 427.333 1072.33 432 1071 438.667 1096.33 434.667 1103.67 451.333 1111.67 446.667 1117.67 458 1136.33 452.667 1130.33 444.667 1135.67 432.667 1151.67 440 1153.67 450 1162.33 444 1165 434.667 1173 429.333 1178.33 419.333 1189 417.333 1178.33 411.333 1183.67 402.667 1180.33 394 1167 387.333 1171.67 382 1169 362.667 1173.67 344.667 1161.67 330 1159 346.667 1155.67 342 1136.33 344 1134.33 353.333 1138.33 363.333 1137.67 372.667 1142.33 381.333 1125.67 372 1117 382 1100.33 380 1089.67 386.667 1065.67 379.333 1059 388Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path53" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(1096.91 414)"
                                                        id="text128">春日部市</text>
                                                </g>
                                                <g
                                                    id="g184">
                                                    <path
                                                        d="M979.867 153.08 974.524 158.434 976.528 164.458 963.171 163.789 951.818 152.41 948.479 161.781 954.49 177.175 961.168 182.53 951.15 195.247 937.126 186.546 931.783 192.57 932.451 200.602 922.434 211.98 922.434 211.98 914.42 215.996 920.43 222.689 895.052 225.367 876.353 223.359 868.339 212.649 865 218.673 867.003 226.705 873.014 227.374 877.021 238.084 875.017 244.777 883.699 265.526 899.059 266.195 895.72 272.219 888.374 274.896 887.038 287.614 909.077 301 931.115 300.331 931.783 294.307 939.129 301 949.815 284.267 971.185 287.614 973.857 292.299 981.203 282.259 990.552 276.904 995.895 258.833 1015.26 256.155 1009.92 245.446 1029.95 241.43 1037.3 236.076 1032.63 227.374 1039.3 218.004 1056 213.988 1045.31 192.57 1041.31 169.813 1044.65 159.104 1037.3 151.741 1033.96 143.04 1027.28 143.709 1017.93 139.024 1008.58 141.032 1004.58 133 1004.58 133C1004.35 138.578 1000.12 138.801 1003.91 149.733L987.881 155.088 979.867 153.08Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path42" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(947.858 234)"
                                                        id="text129">加須市</text>
                                                </g>
                                                <g
                                                    id="g185">
                                                    <path
                                                        d="M1041.08 217.325 1055.71 214 1068.36 236.609 1081 257.223 1071.02 258.553 1070.35 265.203 1063.03 262.543 1059.04 269.858 1052.39 269.858 1045.07 287.812 1060.37 293.797 1058.38 307.096 1049.73 319.731 1037.08 316.406 1037.08 332.365 1027.1 331.036 1023.77 333.695 1009.8 324.386 1002.48 330.371 1005.81 337.685 994.496 343.005 983.184 332.365 965.883 332.365 961.226 324.386 951.91 333.695 952.575 339.68 938.602 345 917.308 345 913.981 337.685 919.97 333.03 904 321.061 905.996 311.086 910.654 309.756 907.327 297.122 931.282 299.782 932.613 290.472 939.932 301.112 949.248 281.162 970.541 286.482 975.199 291.802 982.519 279.168 988.508 275.178 995.162 257.223 1013.79 254.563 1009.8 245.254 1029.1 241.264 1036.42 235.279 1033.76 228.629 1041.08 217.325Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path43" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(977.667 305)"
                                                        id="text130">久喜市</text>
                                                </g>
                                                <g
                                                    id="g186">
                                                    <path
                                                        d="M1051.35 269.058 1046 287.132 1060.72 294.496 1061.39 305.207 1056.7 311.901 1066.07 321.942 1077.44 321.273 1081.46 331.983 1093.5 332.653 1100.86 327.967 1103.53 315.917 1110.89 319.264 1122.93 336 1134.97 334.661 1134.97 319.934 1143 311.231 1137.65 299.851 1131.63 276.421 1126.94 288.471 1104.87 289.141 1093.5 282.446 1083.46 285.124 1077.44 262.364 1078.78 255 1071.42 257.008 1070.75 265.711 1064.06 260.355 1059.38 268.388 1051.35 269.058Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path44" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(1073.33 308)"
                                                        id="text131">幸手市</text>
                                                </g>
                                                <g
                                                    id="g206">
                                                    <path
                                                        d="M918.12 374 922.098 391.333 920.109 398.667 914.141 390.667 884.304 388.667 885.63 406 879 424.667 885.63 426 884.304 432 893.587 438 886.293 444 884.304 460 896.239 461.333 901.543 455.333 906.185 462 914.804 448 932.043 448.667 942.652 456 945.304 448 938.011 440 933.37 424 949.283 431.333 963.87 423.333 972.489 438.667 983.761 436 992.38 443.333 1001 423.333 989.065 417.333 979.12 419.333 976.467 408.667 956.576 400.667 953.924 378 945.304 378.667 934.033 372 918.12 374Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path52" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(906.191 417)"
                                                        id="text132">上尾市</text>
                                                </g>
                                                <g
                                                    id="g205">
                                                    <path
                                                        d="M767 253 776.49 256.333 773.16 263.667 770.996 281.667 783.149 287 791.807 283.667 798.466 297.667 809.121 298.333 815.781 313.667 829.099 313.667 824.438 319.667 833.095 326.333 833.761 341 849.744 347 855.737 345 869.056 349 873.052 338.333 864.395 327.667 869.056 322.333 869.056 315 893.03 333 900.356 332.333 910.345 341 921 334.333 904.351 320.333 907.015 313 910.345 311.667 908.347 301 885.705 285.667 889.035 276.333 896.36 272.333 899.69 266.333 883.707 265 874.384 244.333 858.401 240.333 848.412 237 851.076 248.333 840.421 248.333 833.761 251 844.416 261.667 839.755 269.667 833.761 278.333 823.772 270.333 825.77 261.667 817.778 261.667 803.794 246.333 799.798 253 792.472 247 777.156 245 767 253Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path39" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(827.93 297)"
                                                        id="text133">鴻巣市</text>
                                                </g>
                                                <g
                                                    id="g182">
                                                    <path
                                                        d="M759.33 152 758.665 161.309 761.989 177.932 758 185.246 773.955 187.906 776.615 193.89 771.296 198.544 771.961 214.503 771.961 214.503 762.654 201.869 758 219.822 765.313 226.471 771.961 235.115 771.961 235.115 767.972 251.738 767.972 251.738 775.95 245.089 792.57 247.749 795.894 253.068 802.542 245.754 815.838 262.377 825.145 261.047 824.48 271.021 832.458 279 832.458 279 839.771 266.366 845.089 261.047 834.453 252.403 840.436 248.414 850.408 247.084 849.078 236.445 857.056 238.44 875.006 248.414 877 239.77 873.011 229.131 867.028 225.141 865.034 216.497 859.715 223.147 853.067 218.492 856.391 204.529 850.408 199.874 839.771 200.539 837.112 191.23 828.469 184.581 829.799 173.942 837.112 175.937 840.436 165.298 833.788 157.984 824.48 163.304 795.894 160.644 778.609 155.99 759.33 152Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path37" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(787.845 218)"
                                                        id="text134">行田市</text>
                                                </g>
                                                <g
                                                    id="g183">
                                                    <path
                                                        d="M837.623 160.511 849.563 156.481 863.492 160.511 880.075 159.84 892.015 155.137 904.618 149.763 925.844 144.389 930.487 137 948.397 144.389 953.04 153.122 947.734 163.198 955.03 176.634 961 183.351 956.357 190.74 951.714 198.13 935.794 188.053 931.814 195.443 931.814 202.832 923.191 212.237 919.211 209.55 913.905 217.611 919.211 224.328 896.658 225 877.422 222.985 868.799 213.58 861.503 221.641 853.543 216.939 856.859 206.191 852.216 201.489 838.95 201.489 838.286 192.756 829 184.023 830.327 171.26 836.96 175.962 841.603 165.885 837.623 160.511Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path38" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(873.333 189)"
                                                        id="text135">羽生市</text>
                                                </g>
                                                <g
                                                    id="g188">
                                                    <path
                                                        d="M941.284 357 932 371.147 945.263 379.232 953.221 379.905 956.537 400.789 975.768 410.221 980.411 421 991.021 418.305 989.695 401.463 995 395.4 985.053 383.947 980.411 373.168 965.821 372.495 957.863 357.674 941.284 357Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path51" />
                                                    <text
                                                        fontFamily="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                                                        fontWeight="700"
                                                        fontSize="12px"
                                                        id="text136"
                                                        x="945.23492"
                                                        y="389.67657">伊奈町</text>
                                                </g>
                                                <g
                                                    id="g207">
                                                    <path
                                                        d="M759 373.781 761.005 375.797 760.337 387.219 773.035 386.547 776.376 398.641 795.757 406.703 803.109 426.188 811.129 427.531 820.485 436.938 841.203 434.25 853.233 432.906 869.272 443.656 880.634 439.625 885.98 445 894 437.609 882.639 434.25 885.312 426.859 873.282 425.516 862.589 418.125 871.277 414.094 866.599 409.391 855.238 400.656 851.896 390.578 844.545 385.875 839.198 387.219 839.198 375.797 843.208 368.406 837.861 365.047 837.861 365.047 822.49 359.672 809.458 359 801.939 368.07 795.757 365.047 789.743 378.484 785.232 374.957 774.371 379.156 770.361 372.269 759 373.781Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path36" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(802.142 407)"
                                                        id="text137">川島町</text>
                                                </g>
                                                <g
                                                    id="g190">
                                                    <path
                                                        d="M791 283 779.667 285.004 780.333 291.015 764.333 293.687 764.333 293.687 753.667 308.382 758.333 327.752 753 342.447 764.333 343.115 773.667 360.482 779 369.833 784.333 365.658 803.667 370 811 359.146 827.667 361.818 841.667 366.493 849 344.451 834.333 340.443 831 324.413 826.333 318.401 832.333 310.386 816.333 312.39 809.667 297.695 799.667 297.695 791 283Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path40" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(775.091 336)"
                                                        id="text138">吉見町</text>
                                                </g>
                                                <g
                                                    id="g209">
                                                    <path
                                                        d="M878.893 425.336 886.2 406.74 885.536 389.473 912.771 392.13 919.414 399.435 923.4 392.13 918.75 374.198 932.7 372.87 942 355.603 938.014 344.313 915.429 344.313 914.1 339 900.482 348.298 905.464 359.588 897.576 364.652 902.807 370.214 894.836 380.176 890.186 368.885 875.571 364.237 859.629 368.885 860.293 378.183 849 377.519 849 388.809 855.643 401.427 870.921 413.382 863.614 418.031 873.579 426 878.893 425.336Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path49" />
                                                    <text
                                                        fontFamily="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14.0133px"
                                                        id="text139"
                                                        x="875.99213"
                                                        y="392.24536">桶川市</text>
                                                </g>
                                                <g
                                                    id="g208">
                                                    <path
                                                        d="M951.627 341 939 345.704 941.658 355.112 957.609 359.816 967.578 371.912 980.205 375.272 989.509 388.712 994.826 396.104 990.174 402.824 990.174 418.28 998.814 425 1007.45 425 1004.8 415.592 1014.76 412.904 1044.67 413.576 1038.02 402.152 1046 396.104 1043.34 386.696 1042.01 377.288 1025.4 381.32 1015.43 366.536 1005.46 370.568 998.149 368.552 998.149 352.424 993.497 347.72 974.888 347.72 951.627 341Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path50" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14.0133"
                                                        transform="translate(997.809 398)"
                                                        id="text140">蓮田市</text>
                                                </g>
                                                <g
                                                    id="g187">
                                                    <path
                                                        d="M961.029 326.316 951 332.284 952.337 340.905 971.727 348.863 992.453 349.526 995.797 355.495 997.802 369.421 1007.83 372.074 1015.19 369.421 1026.55 384.674 1041.26 381.358 1045.94 378.042 1059.31 386 1066 378.705 1059.31 368.095 1060.65 351.516 1044.6 350.189 1032.57 330.295 1023.21 332.284 1010.51 323 1002.48 328.968 1004.49 336.263 996.465 339.579 986.436 332.284 963.703 330.958 961.029 326.316Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path45" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14.0133"
                                                        transform="translate(1000.33 360)"
                                                        id="text141">白岡市</text>
                                                </g>
                                                <g
                                                    id="g189">
                                                    <path
                                                        d="M849.333 346.587 841.333 365.437 841.333 365.437 838 378.228 839.333 389 849.333 386.98 849.333 378.902 860 380.921 863.333 368.13 875.333 365.437 890 370.15 895.333 380.921 902.667 371.496 898.667 364.764 906 361.398 900.667 347.933 908 343.221 907.333 335.142 900.667 330.429 892.667 332.449 868.333 312 867.583 321.593 863.333 326.979 872.667 338.508 868 347.26 859.333 341.201 849.333 346.587Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path41" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14.0133"
                                                        transform="translate(857.142 357)"
                                                        id="text142">北本市</text>
                                                </g>
                                                <g
                                                    id="g211">
                                                    <path
                                                        d="M1054.68 312.304 1050 318.25 1050.67 327.5 1057.36 332.786 1060.03 342.036 1103.49 358.554 1110.18 365.161 1102.83 371.107 1102.16 380.357 1116.87 383 1124.22 373.089 1140.27 379.036 1136.26 369.786 1141.61 364.5 1133.58 355.25 1138.93 346 1154.31 341.375 1158.99 346.661 1161 329.482 1140.94 309 1136.26 318.25 1133.58 334.107 1121.55 334.107 1113.52 318.911 1102.83 314.286 1100.82 325.518 1093.46 332.125 1081.43 331.464 1079.42 320.893 1065.38 320.893 1054.68 312.304Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path47" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14.0133"
                                                        transform="translate(1093.1 348)"
                                                        id="text143">杉戸町</text>
                                                </g>
                                                <g
                                                    id="g210">
                                                    <path
                                                        d="M1038 317 1036 335.667 1043.33 351.667 1062 350.333 1060.67 363.667 1064.67 379.667 1090 387 1099.33 381.667 1102 374.333 1110 368.333 1102 357.667 1078.67 349.667 1062.67 343 1058 334.333 1050 324.333 1050 318.333 1038 317Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path46" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14.0133"
                                                        transform="translate(1061.67 371)"
                                                        id="text144">宮代町</text>
                                                </g>
                                                <g
                                                    id="g153">
                                                    <path
                                                        d="M615.776 391 628.404 400.333 638.373 402.333 651 427 640.366 446.333 619.099 450.333 611.789 443 602.484 441.667 593.845 453 593.845 473 578.559 472.333 563.273 464.333 566.596 453.667 555.298 445.667 545.994 447 544 435.667 549.981 424.333 546.658 417.667 567.261 411.667 592.516 397.667 603.149 401 615.776 391Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path24" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(576.233 430)"
                                                        id="text145">越生町</text>
                                                </g>
                                                <g
                                                    id="g174">
                                                    <path
                                                        d="M842.333 557 824 569.934 835.167 579.172 839.667 597.312 851.667 600 861.667 591.266 877 588.578 880.333 595.297 887.667 590.594 897 591.938 899 582.531 889 574.469 886.333 565.734 875 565.734 871.667 557.672 866.333 566.406 863 561.703 842.333 557Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path57" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="12"
                                                        transform="translate(846.142 583)"
                                                        id="text146">三芳町</text>
                                                </g>
                                                <g
                                                    id="g212">
                                                    <path
                                                        d="M1195.33 545.339 1187.33 550.693 1189.33 557.386 1184 581.48 1170 578.134 1176.67 588.843 1166 594.197 1175.33 604.236 1180.67 620.969 1197.33 612.937 1218.67 629 1218 609.591 1228 594.197 1210 586.835 1201.33 580.142 1202 560.732 1196 555.378 1201.33 544 1195.33 545.339Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path69" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14.0133"
                                                        id="text148"
                                                        x="1177.0624"
                                                        y="603.10736">八潮市</text>
                                                </g>
                                            </g>
                                        </svg>
                                        {/* ここまでSVGの内容を貼り付ける */}
                                    </TransformComponent>
                                </>
                            )}
                        </TransformWrapper>
                    </div>

                    {/* 操作・統計エリア */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-5">
                        {/* 入力欄 */}
                        <div className="flex gap-2 w-full md:max-w-md">
                            <input
                                type="text"
                                placeholder={isSurrendered || isCleared ? "再挑戦は右のボタンを押してね" : isGameStarted ? "入力してEnterを押してね" : "開始を押してね"}    
                                className="border-2 border-slate-300 rounded-lg px-4 py-2 grow focus:outline-none focus:border-blue-500"
                                disabled={!isGameStarted || isSurrendered}
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

export default Saitama;

