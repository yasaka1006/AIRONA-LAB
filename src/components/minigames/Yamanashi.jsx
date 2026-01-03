import { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import ClearModal from '../assets/ClearModal';

const Yamanashi = () => {
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

    // ゲームタイトル
    const gameTitle = '山梨県の市区町村全部言えるかな？';

    // 市区町村のリスト（複数の名前に対応）
    const allDistricts = [
        // 市部 (13市)
        { id: '甲府市', names: ['甲府市', 'こうふし'] },
        { id: '富士吉田市', names: ['富士吉田市', 'ふじよしだし'] },
        { id: '都留市', names: ['都留市', 'つるし'] },
        { id: '山梨市', names: ['山梨市', 'やまなしし'] },
        { id: '大月市', names: ['大月市', 'おおつきし'] },
        { id: '韮崎市', names: ['韮崎市', 'にらさきし'] },
        { id: '南アルプス市', names: ['南アルプス市', 'みなみあるぷすし'] },
        { id: '北杜市', names: ['北杜市', 'ほくとし'] },
        { id: '甲斐市', names: ['甲斐市', 'かいし'] },
        { id: '笛吹市', names: ['笛吹市', 'ふえふきし'] },
        { id: '上野原市', names: ['上野原市', 'うえのはらし'] },
        { id: '甲州市', names: ['甲州市', 'こうしゅうし'] },
        { id: '中央市', names: ['中央市', 'ちゅうおうし'] },

        // 町村部 (14町村)
        { id: '市川三郷町', names: ['市川三郷町', 'いちかわみさとちょう'] },
        { id: '早川町', names: ['早川町', 'はやかわちょう'] },
        { id: '身延町', names: ['身延町', 'みのぶちょう'] },
        { id: '南部町', names: ['南部町', 'なんぶちょう'] },
        { id: '富士川町', names: ['富士川町', 'ふじかわちょう'] },
        { id: '昭和町', names: ['昭和町', 'しょうわちょう'] },
        { id: '道志村', names: ['道志村', 'どうしむら'] },
        { id: '西桂町', names: ['西桂町', 'にしかつらちょう'] },
        { id: '忍野村', names: ['忍野村', 'おしのむら'] },
        { id: '山中湖村', names: ['山中湖村', 'やまなかこむら'] },
        { id: '鳴沢村', names: ['鳴沢村', 'なるさわむら'] },
        { id: '富士河口湖町', names: ['富士河口湖町', 'ふじかわぐちこまち'] },
        { id: '小菅村', names: ['小菅村', 'こすげむら'] },
        { id: '丹波山村', names: ['丹波山村', 'たばやまむら'] }
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
                    origin: { x: randomInRange(0, 0.3), y: Math.random() - 0.2 }
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

        const getStatus = (districtName) => {
            if (!isGameStarted) return { fill: '#e2e8f0', showText: false };
            const isCorrect = districtName && correctAnswers.includes(districtName);
            if (isSurrendered && !isCorrect) return { fill: '#e2e8f0', showText: true, isUnanswered: true };
            return isCorrect ? { fill: '#10b981', showText: true } : { fill: '#e2e8f0', showText: false };
        };

        const getDistrictInfo = (districtName) => {
            return districtName ? allDistricts.find(d => d?.id === districtName) || null : null;
        };

        const updateTextElement = (textElement, status) => {
            if (!textElement) return;
            textElement.style.transition = 'opacity 0.5s ease, visibility 0.5s ease, fill 0.3s ease';
            textElement.style.opacity = status.showText ? '1' : '0';
            textElement.style.visibility = status.showText ? 'visible' : 'hidden';
            textElement.style.display = status.showText ? 'block' : 'none';
            textElement.setAttribute('fill', status.isUnanswered ? '#ef4444' : '#000000');
            textElement.style.fontWeight = 'bold';
        };

        const processDistrict = (textElement, pathElements, registeredHandlers) => {
            const districtName = textElement?.textContent.trim() || null;
            const status = getStatus(districtName);
            const districtInfo = getDistrictInfo(districtName);

            updateTextElement(textElement, status);

            pathElements.forEach((path) => {
                path.setAttribute('fill', status.fill);
                path.style.transition = 'fill 0.5s ease, filter 0.2s ease';
                path.style.pointerEvents = 'auto';
                path.style.cursor = districtInfo ? 'pointer' : 'default';

                if (!districtInfo) return;

                const isCorrect = districtName && correctAnswers.includes(districtName);
                const tooltipIsCorrect = isSurrendered ? true : isCorrect;

                const handleMouseEnter = (e) => {
                    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
                    path.style.filter = 'brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.1))';
                    setTooltip({ show: true, district: districtInfo, isCorrect: tooltipIsCorrect, x: e.clientX, y: e.clientY });
                };

                const handleMouseLeave = () => {
                    path.style.filter = '';
                    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
                    setTooltip(prev => prev.district?.id === districtInfo.id ? { show: false, district: null, isCorrect: false, x: 0, y: 0 } : prev);
                };

                const handleMouseMove = (e) => {
                    setTooltip(prev => prev.show ? { ...prev, x: e.clientX, y: e.clientY } : prev);
                };

                path.addEventListener('mouseenter', handleMouseEnter);
                path.addEventListener('mouseleave', handleMouseLeave);
                path.addEventListener('mousemove', handleMouseMove);
                registeredHandlers.push({ path, handleMouseEnter, handleMouseLeave, handleMouseMove });
            });
        };

        const registeredHandlers = [];

        // グループ内の地域を処理
        svgElement.querySelectorAll('#group > g').forEach((group) => {
            processDistrict(group.querySelector('text'), group.querySelectorAll('path'), registeredHandlers);
        });

        // グループ外（#group直下）のpath要素を処理
        const groupElement = svgElement.querySelector('#group');
        if (groupElement) {
            Array.from(groupElement.children)
                .filter(child => child.tagName === 'path')
                .forEach((path) => {
                    let nextSibling = path.nextElementSibling;
                    while (nextSibling && nextSibling.tagName !== 'text' && nextSibling.tagName !== 'g') {
                        nextSibling = nextSibling.nextElementSibling;
                    }
                    const textElement = nextSibling?.tagName === 'text' ? nextSibling : null;
                    processDistrict(textElement, [path], registeredHandlers);
                });
        }

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
            <ClearModal
                isOpen={showCongratulations}
                onClose={() => setShowCongratulations(false)}
                time={time}
                gameTitle={gameTitle}
            />

            {/* メインコンテンツエリア */}
            <div className="w-full mt-4 bg-white py-5 px-2 md:px-5 rounded-xl shadow-lg">
                {/* タイトルセクション */}
                <div className="text-center mb-5">
                    <h2 className="text-1xl md:text-3xl font-extrabold text-slate-700 ">
                        {gameTitle}
                    </h2>
                </div>

                {/* 地図エリア */}
                <div
                    ref={containerRef}
                    className="relative w-full max-w-[640px] mx-auto aspect-square my-5 rounded-2xl overflow-hidden shadow-2xl border border-slate-300/50"
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
                                <div className="absolute bottom-3 right-3 md:bottom-5 md:right-5 z-49 flex flex-col gap-1 transition-opacity duration-300">
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
                                        viewBox="0 0 720 720"
                                        preserveAspectRatio="xMidYMid meet"
                                        style={{ display: 'block', width: '100%', height: 'auto' }}
                                        version="1"
                                        id="svg148"
                                        className="w-full h-full"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                    >
                                        <defs>
                                            <clipPath id="a">
                                                <path d="M0 0h720v720H0z" />
                                            </clipPath>
                                        </defs>
                                        <g
                                            clipPath="url(#clip0)"
                                            id="g120">
                                            <rect
                                                x="0"
                                                y="0"
                                                width="720"
                                                height="720"
                                                fill="#FFFFFF"
                                                id="rect4" />
                                            <path
                                                d="M-9-2 400.383-0.510546 399.385 33.9043 410.701 45.2524 411.456 54.3309 419 62.6529 407.684 86.1057 373.735 124.689 132.32 162.516 39.5266 297.181 23.6837 310.042 24.4381 332.738 10.8586 359.974 4.0688 363-6.49309 351.652-9-2Z"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeMiterlimit="8"
                                                fill="#A0EBD2"
                                                fillRule="evenodd"
                                                id="path5" />
                                            <path
                                                d="M397-0.700624 399.324 38.1676 411.424 45.727 412.936 56.3103 418.986 62.3578 409.155 86.5481 422.768 92.5957 467.386 131.905 569.48 144 568.724 122.078 582.337 104.691 594.437 106.959 613.343 101.667 617.88 103.935 622.418 91.0838 647.374 106.203 662.499 108.471 664.012 114.518 677.624 109.982 692.749 116.786 710.143 114.518 723.755 120.566 725-4 397-0.700624Z"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeMiterlimit="8"
                                                fill="#A0EBD2"
                                                fillRule="evenodd"
                                                id="path6" />
                                            <path
                                                d="M-7.10783 352.609 4.23629 362.063 9.90835 358.281 23.1432 331.813 23.1432 306.289 42.05 294 62.8476 307.234 440.04 499.133 557.262 503.86 585.623 499.133 612.092 499.133 611.147 519.93 624.382 538.836 619.655 553.016 629.108 561.524 619.655 574.758 617.764 595.555 592.24 610.68 596.021 652.274 608.311 662.672 609.256 676.852 630.999 684.415 633 725-12 722.889-7.10783 352.609Z"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeMiterlimit="8"
                                                fill="#A0EBD2"
                                                fillRule="evenodd"
                                                id="path7" />
                                            <path
                                                d="M701.524 277 723.227 281.726 728 724.22 625.981 725 629.811 686.256 608.108 676.804 607.165 660.737 594.898 655.066 590.18 606.862 619.431 594.575 619.431 576.617 626.98 562.44 618.488 555.823 620.375 540.701 611.883 523.688 610.939 501.949 573.195 499.114 554.323 506.675 543 501.949 557.154 425.391 676.991 338.436 701.524 277Z"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeMiterlimit="8"
                                                fill="#A0EBD2"
                                                fillRule="evenodd"
                                                id="path8" />
                                            <path
                                                d="M616.365 104.581 611.149 101.276 594.079 105.998 580.802 103.165 568 119.218 568 133.383 605.933 226.397C604.465 221.525 606.161 221.676 604.036 221.676L693.179 284 697.447 274.557 724 283.056C723.842 228.443 723.684 173.83 723.526 119.218L708.827 112.136 693.654 116.385 677.532 108.358 663.307 114.024 661.41 105.525 645.763 105.998 620.158 89 616.365 104.581Z"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeMiterlimit="8"
                                                fill="#A0EBD2"
                                                fillRule="evenodd"
                                                id="path9" />
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(22.3535 70)"
                                                id="text63">長野県</text>
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(86.3535 70)"
                                                id="text64" />
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(541.365 69)"
                                                id="text65">埼玉県</text>
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(605.365 69)"
                                                id="text66" />
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(639.321 186)"
                                                id="text67">東京都</text>
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(703.321 186)"
                                                id="text68" />
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(625.883 510)"
                                                id="text69">神奈川県</text>
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(711.217 510)"
                                                id="text70" />
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(332.101 641)"
                                                id="text71">静岡県</text>
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(396.101 641)"
                                                id="text72" />
                                            <g
                                                id="group">
                                                <g
                                                    id="g94">
                                                    <path
                                                        d="M43.8036 295 40 296.884 42.5357 306.932 40.6339 318.864 46.9732 327.028 46.3393 336.449 50.7768 347.753 49.5089 356.545 59.6518 376.013 62.1875 392.969 71.6964 408.67 63.4554 415.578 62.8214 443.838 50.7768 452.63 50.7768 459.538 59.6518 466.446 64.7232 489.055 52.6786 500.359 54.5804 504.755 41.9018 521.083 42.5357 525.479 56.4821 531.759 59.6518 545.576 57.1161 557.508 67.2589 573.836 67.2589 573.836 82.4732 582 87.5446 569.44 98.9554 571.952 112.902 558.764 120.509 560.648 125.58 550.6 126.214 539.923 135.089 535.527 145.232 543.063 158.545 538.039 161.714 510.407 176.295 504.755 182 491.567 161.08 472.726 161.08 472.726 149.036 455.77 150.938 436.302 142.696 430.65 140.161 415.578 128.116 395.481 132.554 386.061 119.875 374.757 114.17 379.781 105.929 367.221 120.509 351.521 123.679 343.985 114.17 328.912 103.393 335.193 101.491 326.4 105.929 313.212 105.295 303.164 83.1071 296.256 59.0179 300.652 43.8036 295Z"
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
                                                        transform="translate(84.1653 457)"
                                                        id="text36">早川町</text>
                                                </g>
                                                <g
                                                    id="g93">
                                                    <path
                                                        d="M121.748 345.337 121.748 345.337 131.512 341.883 140.646 349.417 150.409 342.197 165.528 345.964 176.551 340 177.496 344.709 182.85 347.22 188.835 353.812 200.803 352.557 222.535 356.638 226 366.997 221.591 380.809 216.236 389.599 203.638 388.029 203.638 399.644 216.551 404.039 217.181 410.945 197.654 425.385 186.63 424.443 178.756 420.049 168.362 431.036 156.709 436.372 148.835 437 141.906 430.722 139.701 414.398 128.047 394.935 131.827 386.146 119.543 374.217 115.134 379.867 106 366.997 119.228 351.301 121.748 345.337Z"
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
                                                        transform="translate(134.855 391)"
                                                        id="text37">富士川町</text>
                                                </g>
                                                <g
                                                    id="g100">
                                                    <path
                                                        d="M203.141 388.392C203.036 392.261 202.931 396.131 202.826 400L215.702 404.706 216.959 410.039 201.884 423.216 207.537 430.118 200 443.608 202.826 448 218.529 433.569 243.025 426.039 241.769 416.627 249.934 411.294 258.413 414.118 266.264 406.275 286.05 408.784 311.802 406.275 308.347 392.157 314 381.49 296.727 378.98 288.876 381.804 270.975 377.725 268.777 367.059 273.802 358.902 265.322 352 253.388 359.843 239.256 358.902 225.124 365.49 221.041 381.804 215.074 389.961 203.141 388.392Z"
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
                                                        transform="translate(220.933 398)"
                                                        id="text38">市川三郷町</text>
                                                </g>
                                                <g
                                                    id="g95">
                                                    <path
                                                        d="M149.684 437.589 147.789 456.077 159.789 472.685 181.263 491.8 175.579 505.274 161.053 510.601 157.895 538.176 145.263 542.25 134.842 535.356 125.368 540.37 124.421 549.771 120 561.365 129.158 572.332 135.474 571.392 147.474 580.479 145.895 586.433 152.526 588 164.211 584.24 170.842 587.06 181.263 573.586 199.263 569.199 208.421 577.346 227.053 576.092 230.526 569.512 225.158 559.485 229.579 546.95 239.053 542.877 239.053 535.043 246.947 532.223 253.895 519.375 260.842 520.628 264.947 513.108 268.737 510.288 264 494.933 273.474 486.159 283.895 473.625 300.632 464.538 303.158 451.377 300.316 439.783 309.474 432.575 313.579 420.981 318 416.281 314.211 411.58 311.684 405 286.105 408.447 266.526 405.94 258.632 413.461 249.474 411.267 241.263 415.967 242.842 426.622 217.263 433.515 202.421 447.616 199.579 443.856 208.421 429.442 202.105 422.861 197.368 425.995 184.421 424.428 178.421 419.414 169.895 431.009 156.316 436.336 149.684 437.589Z"
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
                                                        transform="translate(194.076 500)"
                                                        id="text39">身延町</text>
                                                </g>
                                                <g
                                                    id="g96">
                                                    <path
                                                        d="M141 599.52 144.763 605.5 147.272 616.201 158.247 632.568 167.341 665.302 174.867 667.191 186.469 674.43 193.368 683.558 224.099 685.131 234.76 693 241.973 691.741 249.812 673.171 258.593 666.876 263.923 667.82 267.686 662.155 261.415 653.027 262.356 645.788 257.338 634.142 256.084 619.349 251.38 615.572 254.83 606.759 253.889 590.707 250.753 585.671 249.812 570.563 264.864 559.862 268 552.308 261.415 540.977 263.296 537.2 260.788 520.833 253.262 518 246.049 532.164 238.21 533.423 238.21 541.921 228.489 547.901 224.726 558.288 229.116 570.878 225.98 575.914 208.733 577.173 200.267 569.304 179.257 574.969 169.849 587.559 163.891 584.727 161.383 585.986 152.289 587.874 146.017 586.3 141 599.52Z"
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
                                                        transform="translate(189.609 628)"
                                                        id="text40">南部町</text>
                                                </g>
                                                <g
                                                    id="g79">
                                                    <path
                                                        d="M381.652 431.087 371.844 429.52 357.605 440.801C357.5 449.157 357.395 457.513 357.289 465.869L361.086 472.763C360.98 476.628 360.875 480.492 360.77 484.357L349.062 489.057 351.594 493.444 344 501.278 361.086 504.411 370.895 513.499 371.844 527.599 372.793 530.42 383.551 537 397.156 532.3 412.344 531.36 415.508 511.305 412.977 488.744 410.129 481.85 417.406 473.076 425 466.809 424.684 457.409 417.406 449.888 412.66 450.202 406.332 447.068 410.445 440.174 408.547 426.387 398.105 422 381.652 431.087Z"
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
                                                        transform="translate(364.349 469)"
                                                        id="text41">鳴沢村</text>
                                                </g>
                                                <g
                                                    id="g80">
                                                    <path
                                                        d="M351.944 406.293 340.611 407.236 329.278 419.189 318.889 414.785 311.648 420.132 308.5 433.028 300 438.375 302.833 452.215 300 465.74 306.926 469.2 316.37 476.748 318.259 494.048 327.704 506 345.333 502.226 353.204 494.362 351.315 489.33 362.019 484.926 361.389 473.289 357.926 464.482 359.185 442.15 371.778 430.512 383.111 431.141 397.593 422.334 408.611 427.367 410.185 439.633 406.093 447.182 412.074 450.957 418.685 450.328 424.981 459.449 425.296 467.312 429.389 464.482 436.63 449.384 438.518 438.69 443.556 427.681 453.63 412.898 463.704 397.8 466.222 385.219 470 374.839 462.13 366.347 461.5 361 454.889 361.315 449.852 371.065 436.63 370.751 425.611 377.67 407.037 380.816 391.296 391.195 380.593 392.768 372.093 402.833 351.944 406.293Z"
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
                                                        transform="translate(338.318 424)"
                                                        id="text42">富士河口湖町</text>
                                                </g>
                                                <g
                                                    id="g78">
                                                    <path
                                                        d="M462.862 398.346 442.073 428.851 436.404 438.285 436.404 449.292 427.269 465.645 418.765 470.362 409 482.627 413.41 491.747 415.3 512.188 411.835 532 445.223 523.824 476.407 519.735 482.076 522.566 491.211 515.018 510.11 509.357 505.385 503.382 485.541 492.376 488.061 481.054 482.076 476.337 468.217 470.676 470.737 459.041 468.217 455.896 472.312 450.235 472.312 440.172 478.612 440.172 483.651 445.518 493.731 441.115 500.976 442.373 512 432.624 502.55 415.957 487.431 418.158 488.691 406.208 482.076 393 470.737 395.201 464.122 393 462.862 398.346Z"
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
                                                        transform="translate(417.457 512)"
                                                        id="text43">富士吉田市</text>
                                                </g>
                                                <g
                                                    id="g77">
                                                    <path
                                                        d="M471.149 459.041 468 470.487 483.117 478.118 486.896 482.251 485.321 494.333 501.698 501.646 503.588 503.872 511.146 511.185 517.76 515 527.523 510.867 548.623 503.236 551.458 492.426 557.127 487.338 559.331 477.8 557.756 474.303 565 459.041 554.292 453 538.545 461.585 535.711 459.995 534.136 466.036 528.153 470.169 518.705 467.944 509.886 469.533 508.627 464.128 512.721 459.677 497.604 454.59 498.549 459.041 489.416 467.626 477.133 463.81 471.149 459.041Z"
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
                                                        transform="translate(492.465 489)"
                                                        id="text44">山中湖村</text>
                                                </g>
                                                <g
                                                    id="g81">
                                                    <path
                                                        d="M322.071 262.923 336.567 285.514 335.307 288.966 339.718 293.358 325.538 299.634 321.756 305.281 312.933 306.85 311.672 325.049 320.181 324.735 321.126 336.344 308.836 340.109 306 344.188 312.618 352.346 327.429 354.543 331.21 371.8 328.374 381.526 345.391 394.391 352.639 406 373.437 402.862 381.63 392.822 392.975 390.939 407.786 380.271 427.008 378.075 437.723 370.231 449.697 370.858 456 360.818 452.849 349.836 445.916 349.208 439.298 334.775 437.092 318.46 432.366 319.401 427.324 323.794 421.336 316.577 416.294 314.694 417.24 308.105 404.95 303.399 398.017 293.045 398.017 287.083 395.496 282.377 385.097 283.945 381 288.652 364.613 285.514 367.45 275.787 350.433 272.336 350.748 262.923 333.101 251 331.525 261.668 322.071 262.923Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path26" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(355.35 349)"
                                                        id="text45">笛吹市</text>
                                                </g>
                                                <g
                                                    id="g82">
                                                    <path
                                                        d="M471.316 120.829 464.36 126.487 464.676 135.917 451.397 151.633 455.191 178.037 451.081 184.009 440.331 178.665 418.515 179.608 416.301 186.838 421.044 192.81 417.566 207.269 410.61 205.383 402.39 221.099 392.588 231.472 391.324 249.389 398.279 247.817 397.331 264.477 400.809 267.306 385 277.678 388.162 277.993 395.118 277.993 397.647 284.279 397.331 292.452 404.919 303.453 416.618 308.797 415.669 315.712 421.676 316.969 426.419 322.627 436.221 318.855 438.75 333 447.287 332.371 453.61 322.313 477.956 318.227 488.074 309.111 500.404 300.624 500.404 274.535 506.728 265.734 503.882 255.675 506.412 239.016 504.199 227.072 498.824 215.756 483.331 209.155 475.743 193.753 483.015 188.724 503.25 191.867 512.735 184.637 514 173.95 504.515 165.778 506.096 157.291 500.088 149.747 507.676 144.404 508.941 125.23 505.147 121.143 492.816 118.314 486.809 123.029 479.853 118 471.316 120.829Z"
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
                                                        transform="translate(428.107 253)"
                                                        id="text46">甲州市</text>
                                                </g>
                                                <g
                                                    id="g88">
                                                    <path
                                                        d="M357.647 110.942 346.275 127.93 339.957 129.188 342.484 134.222 341.853 139.884 341.853 144.918 337.43 151.21 338.062 156.872 341.221 162.535 336.798 175.119 331.744 172.602 320.372 177.635 326.058 183.927 315.95 209.094 309 209.094 312.159 227.34 309.632 233.632 327.953 239.295 326.058 244.957 335.535 253.766 350.066 263.833 350.066 273.271 365.86 276.416 362.702 285.225 379.76 289 386.709 284.596 397.45 283.337 391.764 277.675 386.709 276.416 401.872 266.979 397.45 262.574 398.713 248.103 391.132 248.103 392.395 233.632 403.136 220.419 411.349 205.948 417.667 207.207 421.457 193.994 417.035 186.444 418.298 180.781 439.147 179.523 450.519 185.815 454.942 177.635 451.783 151.839 465.05 136.109 464.419 127.93 472 121.009 468.841 115.976 461.26 114.717 454.942 108.426 456.837 102.134 448.624 92.0669 435.988 90.1793 426.512 86.4043 418.93 87.6626 413.244 85.1459 408.822 86.4043 403.767 82 391.132 87.0334 375.969 98.3587 377.233 110.942 369.651 114.088 357.647 110.942Z"
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
                                                        transform="translate(360.951 187)"
                                                        id="text47">山梨市</text>
                                                </g>
                                                <g
                                                    id="g89">
                                                    <path
                                                        d="M336.443 113.411 329.551 122.232 321.405 124.122 317.646 131.053 306.367 132.943 306.367 141.764 300.728 149.325 293.835 148.695 290.076 145.545 280.677 148.065 280.051 155.626 285.063 160.667 276.918 165.077 279.424 172.008 276.918 183.35 271.905 193.431 271.905 204.142 284.437 207.293 281.93 210.443 283.81 216.744 287.57 216.744 288.196 226.825 279.424 234.386 274.411 240.057 260 248.248 260.627 260.85 268.146 267.78 268.146 274.711 263.759 286.683 269.399 290.463 265.013 292.354 268.772 297.394 274.411 292.354 280.051 301.805 275.665 304.955 279.424 316.297 285.063 321.337 283.81 335.199 286.943 340.87 286.316 351.581 295.715 354.732 300.101 370.484 303.861 371.744 305.741 379.935 313.259 381.195 311.38 385.606 306.367 388.756 313.886 412.699 329.551 419 340.203 407.028 348.975 408.919 350.854 403.878 344.589 393.167 335.19 385.606 328.297 380.565 331.43 372.374 326.418 354.732 313.886 351.581 306.367 344.02 308.247 340.87 320.778 335.829 320.152 323.228 311.38 323.228 312.633 306.846 321.405 304.955 325.165 300.545 339.576 293.614 335.816 287.943 336.443 286.053 322.658 262.74 330.804 262.74 332.684 251.398 327.044 245.728 330.177 239.427 322.032 236.906 310.127 233.126 313.259 228.085 310.753 210.443 317.646 207.923 323.285 195.321 327.671 183.98 322.658 178.939 330.804 172.638 336.443 174.528 341.456 163.187 338.323 158.776 338.323 158.776 337.696 151.215 341.456 148.065 342.082 137.984 343.962 134.203 341.456 129.793 346.468 127.272 359 110.26 354.614 109 336.443 113.411Z"
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
                                                        transform="translate(275.976 278)"
                                                        id="text48">甲府市</text>
                                                </g>
                                                <g
                                                    id="g91">
                                                    <path
                                                        d="M52.9943 102.214 43.0725 108.817 40.7102 124.38 39.2928 128.153 28.8986 138.528 21.3391 153.62 24.1739 159.751 10 174.371 10 180.974 18.0319 189.463 21.8116 184.275 33.6232 190.878 39.2928 202.668 45.9072 205.498 42.1275 210.214 45.4348 217.76 45.9072 227.192 52.5217 230.493 62.4435 231.437 70.4754 240.397 75.6725 241.341 78.9797 245.585 90.7914 247 98.3508 244.642 101.186 247 111.107 243.227 120.084 233.795 125.281 215.402 132.368 216.345 142.29 213.044 152.684 216.345 154.574 213.987 146.07 207.856 139.455 198.895 155.519 197.009 166.858 193.707 168.748 202.197 170.638 202.197 182.449 195.594 184.812 199.367 184.812 199.367 192.371 212.1 200.403 220.59 202.765 225.777 206.545 225.777 212.214 215.402 224.499 212.1 233.948 204.555 236.31 196.065 243.397 197.952 243.87 195.122 245.287 189.463 250.956 185.218 250.012 170.598 256.154 171.07 262.768 169.183 270.8 172.485 278.832 173.428 276.47 166.825 284.974 161.638 280.249 154.563 281.194 149.847 289.699 147.489 296.786 150.79 301.983 149.376 307.652 140.415 307.652 135.227 318.991 132.869 320.881 124.38 328.441 122.493 336 114.476 327.023 114.948 323.716 111.646 319.464 110.231 320.881 88.0656 323.243 84.7642 320.881 79.5765 316.156 80.048 310.487 75.8035 302.455 74.8603 298.675 80.5197 291.588 80.5197 285.919 75.3319 277.414 75.8035 275.052 79.5765 262.768 77.2183 260.406 79.1048 248.594 72.0306 241.035 78.6332 235.838 90.4236 226.861 94.1965 212.214 87.1223 201.82 87.5939 202.293 80.9913 199.458 77.2183 204.183 62.1266 200.403 51.7511 175.835 39.4891 157.881 36.6594 145.597 31 141.817 31.9432 139.455 47.0349 131.896 50.3363 126.699 56.4672 130.478 62.5983 120.084 74.8603 115.359 77.69 115.359 84.7642 99.2957 99.3843 93.1536 111.646 81.3421 122.493 73.7827 122.493 67.6406 117.306 66.6956 110.703 59.1362 106.459 52.9943 102.214Z"
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
                                                        transform="translate(147.719 148)"
                                                        id="text49">北杜市</text>
                                                </g>
                                                <g
                                                    id="g90">
                                                    <path
                                                        d="M138.492 198.671 145.42 210.644 154.237 215.055 151.718 216.315 143.531 213.795 132.195 216.315 124.008 213.795 118.969 233.329 112.672 241.521 112.672 241.521 101.336 247.822 97.5573 244.041 90 247.192 101.336 259.795 108.893 274.918 126.527 280.589 132.824 268.616 154.237 272.397 158.015 279.329 171.87 277.438 192.023 285 212.176 279.329 226.031 279.329 227.92 274.288 215.954 264.836 218.473 260.425 214.695 251.603 220.363 240.26 227.29 241.521 230.439 248.452 235.477 238.37 247.443 232.699 247.443 223.247 254.37 214.425 251.851 208.753 255 200.562 244.294 195.521 242.405 197.411 236.107 197.411 232.958 204.342 222.882 213.795 210.916 213.795 207.137 225.137 201.469 224.507 199.58 218.836 192.023 214.425 183.206 194.26 172.5 202.452 167.462 193 154.237 196.781 138.492 198.671Z"
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
                                                        transform="translate(151.362 248)"
                                                        id="text50">韮崎市</text>
                                                </g>
                                                <g
                                                    id="g92">
                                                    <path
                                                        d="M42.4571 211 32.4 214.143C28.3448 221.577 30.485 219.201 27.3714 222.314L27.3714 222.314 6 239.914 6 248.086 14.8 255 15.4286 263.8 12.9143 266.943 19.2 278.886 33.0286 299.629 47.4857 295.857 59.4286 300.257 85.2 297.743 104.686 305.286 104.686 311.571 99.6571 326.029 102.8 336.086 114.114 329.8 124.171 346.771 130.457 343 139.257 349.914 149.314 343 165.657 346.143 175.714 341.743 177.6 346.771 181.371 346.771 187.657 354.943 200.857 353.057 220.343 356.829 225.371 365 239.829 358.714 241.086 348.657 246.743 343.629 243.6 326.657 248 315.343 240.457 290.2 234.171 273.857 225.371 273.857 223.486 278.257 209.657 278.257 192.057 285.171 171.314 277 158.743 278.886 153.714 271.343 132.971 267.571 125.429 279.514 109.714 273.229 100.286 257.514 90.8571 246.2 80.8 245.571 77.6571 239.914 72 240.543 63.2 231.114 53.7714 230.486 48.7429 227.971 46.8571 217.914 42.4571 211Z"
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
                                                        transform="translate(124.719 318)"
                                                        id="text51">南アルプス市</text>
                                                </g>
                                                <g
                                                    id="g83">
                                                    <path
                                                        d="M503.922 231.629 505.499 239.171 502.03 256.457 505.184 264.943 499.191 274.371C499.296 282.962 499.401 291.552 499.506 300.143L485.628 310.2 476.796 317.743 452.509 322.771 446.832 332.829 438 332.829 445.57 349.171 451.878 349.486 455.979 361.743 462.918 361.114 467.965 357.029 474.904 357.343 484.682 348.857 500.768 352.314 508.653 357.971 522.847 357.029 531.048 352.314 541.141 351.686 548.711 342.257 560.697 339.743 564.798 335.029 568.898 334.714 575.522 347.6 576.784 359.543 584.354 363 603.594 353.571 616.211 353.571 626.304 349.8 630.089 352.629 656.269 348.229 659.738 342.571 661 329.686 655.953 322.457 642.075 328.114 631.351 323.4 627.25 323.714 626.304 311.143 619.996 307.686 625.042 298.571 628.197 292.914 625.673 282.229 622.204 281.6 613.372 281.914 604.856 274.371 607.064 269.343 600.755 265.571 595.393 261.8 597.286 254.886 591.608 252.057 591.608 244.514 584.038 236.971 574.576 235.4 571.106 227.857 551.55 220 527.578 223.771 525.371 225.971 516.223 225.029 503.922 231.629Z"
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
                                                        transform="translate(528.26 305)"
                                                        id="text52">大月市</text>
                                                </g>
                                                <g
                                                    id="g75">
                                                    <g
                                                        id="g74">
                                                        <path
                                                            d="M591 245.737 591.631 253.316 596.992 254.579 594.784 261.526 606.137 270.368 604.561 275.105 612.445 282.368 623.167 282.053 627.898 291.842 619.383 308.263 625.69 311.105 625.69 323.421 635.151 325.316 643.35 329.737 656.28 323.737 660.065 330.368 658.803 342.368 653.757 349 629.79 352.789 626.005 348.368 615.598 353.421 614.652 363.211 624.744 371.737 630.42 383.737 649.342 385 670.472 380.895 681.509 385 697.278 377.737 704.216 367 703.27 351.211 701.062 348.368 708 336.684 706.739 327.211 704.216 317.737 700.747 310.158 704.531 304.474 700.431 295.947 695.701 293.421 696.016 286.158 706.423 278.579 697.593 267.842 685.924 262.158 674.887 263.737 654.703 253.632 648.396 247.316 630.736 242.895 628.528 233.105 619.067 223 610.868 230.895 605.822 244.158 591 245.737Z"
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
                                                            transform="translate(633.458 311)"
                                                            id="text53">上野原市</text>
                                                    </g>
                                                </g>
                                                <g
                                                    id="g73">
                                                    <path
                                                        d="M467.283 356.968 461 362.317 462.571 369.239 469.796 374.588 475.136 379.622 490.528 379.937 508.119 386.544 512.831 394.095 505.92 401.017 503.721 416.749 512.203 432.166 518.799 428.705 525.082 438.773 525.082 449.785 532.621 456.078 537.961 463 553.981 454.505 558.693 443.807 561.52 431.537 566.861 422.412 572.829 423.356 587.593 415.176 592.305 404.793 602.043 402.276 616.807 393.151 616.493 386.229 630 382.454 623.717 369.239 614.608 362.946 615.236 353.507 603.613 352.563 584.452 362.632 576.913 359.485C576.808 355.29 576.703 351.095 576.599 346.9L569.374 334 564.662 334 560.264 339.349 547.071 341.866 541.73 351.62 530.736 352.249 522.883 357.598 509.375 358.227 500.894 351.934 484.874 348.159 475.764 356.339 467.283 356.968Z"
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
                                                        transform="translate(528.26 396)"
                                                        id="text54">都留市</text>
                                                </g>
                                                <g
                                                    id="g87">
                                                    <path
                                                        d="M508.419 125 506.842 143.256 500.222 148.607 504.32 157.42 504.32 167.492 513.148 174.731 511.887 184.489 502.744 191.413 484.458 187.636 475 193.302 482.882 210.613 498.33 216.593 501.798 221 514.724 215.02 520.714 202.43 532.695 201.485 539.315 203.059 555.394 199.282 562.015 190.784 571.788 194.246 574.31 198.652 600.478 196.134 603 190.154 597.64 181.656 590.074 163.085 588.813 147.348 582.507 147.033 570.527 127.518 556.025 132.239 545.621 129.721 531.118 138.849 524.182 133.813C521.378 132.413 522.6 132.554 520.714 132.554L515.67 131.295 508.419 125Z"
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
                                                        transform="translate(520.26 172)"
                                                        id="text55">丹波山村</text>
                                                </g>
                                                <g
                                                    id="g86">
                                                    <path
                                                        d="M501 222.09 503.521 231.843 515.81 226.18 525.578 226.494 528.099 224.607 552.047 220.831 570.953 229.011 575.68 235.303 585.133 239.393 591.75 246 606.245 244.112 613.492 231.528 622 221.461 612.547 211.079 605.93 211.079 599.943 195.663 573.474 198.494 571.898 194.09 561.5 190 555.513 198.809 538.182 203.528 532.195 201.011 519.906 202.27 513.919 213.91 501 222.09Z"
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
                                                        transform="translate(558.633 220)"
                                                        id="text56">小菅村</text>
                                                </g>
                                                <g
                                                    id="g76">
                                                    <path
                                                        d="M566.247 422.814 562.793 429.757 560.595 432.597 558.082 445.221 554 453.741 563.735 461 581.321 453.426 595.138 446.798 596.708 449.008 602.047 448.376 615.236 438.593 621.517 440.802 631.88 434.175 645.383 411.452 653.234 412.399 681.497 405.456 689.975 395.357 695 378 681.497 384.627 670.82 380.84 648.837 383.996 629.682 382.103 616.178 385.574 616.806 393.464 602.047 401.985 591.684 402.932 586.973 415.871 572.528 423.445 566.247 422.814Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path34" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(597.495 422)"
                                                        id="text57">道志村</text>
                                                </g>

                                                <g
                                                    id="g97">
                                                    <path
                                                        d="M245.993 320 253.046 323.3 255.161 330.844 258.453 331.08 265.74 331.08 268.326 323.536 275.614 322.122 284.782 328.251 284.077 335.559 287.368 342.867 286.428 353.24 295.832 355.597 301.004 371.392 304.06 372.335 305 380.821 296.302 379.171 289.014 382 270.442 377.521 267.621 366.441 273.028 358.897 264.095 353.24 253.751 359.84 238 359.605 241.526 346.639 245.993 342.631 243.407 326.365 245.993 320Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path17" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(245.85 347)"
                                                        id="text59">中央市</text>
                                                </g>
                                                <g
                                                    id="g84">
                                                    <path
                                                        d="M469.421 375 466.263 384.102 465 392.263 471.632 396.343 482.368 393.204 488.368 404.818 487.105 418 504.789 415.803 505.737 401.365 513 394.146 508.895 386.299 489.947 379.394 474.474 380.022 469.421 375Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path33" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(468.959 390)"
                                                        id="text60">西桂町</text>
                                                </g>
                                                <g
                                                    id="g85">
                                                    <path
                                                        d="M517.995 428 511.661 430.867 500.575 441.059 493.606 439.785 483.787 444.881 478.719 438.511 472.385 438.83 471.434 448.385 467 456.348 477.769 464.948 489.805 469.407 498.991 459.215 499.308 455.711 511.977 460.807 507.86 464.948 509.127 470.681 518.629 468.452 527.814 471 535.416 465.904 537 458.578 531.932 452.844 525.281 449.978C525.386 445.943 525.492 441.909 525.597 437.874L517.995 428Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path35" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(480.903 454)"
                                                        id="text61">忍野村</text>
                                                </g>
                                                <g
                                                    id="g99">
                                                    <path
                                                        d="M264.367 169.472 254.873 170.416 249.652 169 250.127 184.574 243.956 189.766 243.481 195.901 254.399 200.62 252.5 209.116 254.399 214.307 247.753 220.914 247.753 231.297 235.886 236.016 231.139 246.871 228.291 239.792 221.171 238.376 215 251.119 217.848 258.198 215 263.861 227.342 273.772 233.513 273.772 247.278 311.056 256.772 310.112 266.266 312 262.468 303.505 268.639 297.37 265.791 292.65 270.538 290.29 264.842 287.931 268.165 278.02 269.589 267.637 261.044 259.614 261.044 248.287 276.709 240.736 280.032 234.129 290 228.465 287.627 215.723 283.829 215.723 281.93 211.003 285.253 206.756 271.962 203.924 271.487 195.429 277.658 185.046 279.557 173.248 271.013 172.776 264.367 169.472Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path16" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(220.475 262)"
                                                        id="text62">甲斐市</text>
                                                </g>
                                                <g
                                                    id="g98">
                                                    <path
                                                        d="M246 309.812 246.711 319.218 254.058 324.765 255.006 332 267.803 331.035 270.647 323.076 276.098 322.835 285.815 328.382 287 321.388 280.364 315.359 277.283 304.988 280.838 302.094 274.202 291 261.879 302.335 264.96 310.294 253.584 307.4 246 309.812Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path18" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(252.196 323)"
                                                        id="text58">昭和町</text>
                                                </g>
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
            </div>
        </>
    );
};

export default Yamanashi;