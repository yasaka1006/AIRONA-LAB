import { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import ClearModal from '../assets/ClearModal';

const Gunma = () => {
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
    const gameTitle = '群馬県の市区町村全部言えるかな？';

    // 市区町村のリスト（複数の名前に対応）
    const allDistricts = [
        // 市部 (12市)
        { id: '前橋市', names: ['前橋市', 'まえばしし'] },
        { id: '高崎市', names: ['高崎市', 'たかさきし'] },
        { id: '桐生市', names: ['桐生市', 'きりゅうし'] },
        { id: '伊勢崎市', names: ['伊勢崎市', 'いせさきし'] },
        { id: '太田市', names: ['太田市', 'おおたし'] },
        { id: '沼田市', names: ['沼田市', 'ぬまたし'] },
        { id: '館林市', names: ['館林市', 'たてばやしし'] },
        { id: '渋川市', names: ['渋川市', 'しぶかわし'] },
        { id: '藤岡市', names: ['藤岡市', 'ふじおかし'] },
        { id: '富岡市', names: ['富岡市', 'とみおかし'] },
        { id: '安中市', names: ['安中市', 'あんなかし'] },
        { id: 'みどり市', names: ['みどり市', 'みどりし'] },

        // 町村部 (23町村)
        { id: '榛東村', names: ['榛東村', 'しんとうむら'] },
        { id: '吉岡町', names: ['吉岡町', 'よしおかまち'] },
        { id: '上野村', names: ['上野村', 'うえのむら'] },
        { id: '神流町', names: ['神流町', 'かんなまち'] },
        { id: '下仁田町', names: ['下仁田町', 'しもにたまち'] },
        { id: '南牧村', names: ['南牧村', 'なんもくむら'] },
        { id: '甘楽町', names: ['甘楽町', 'かんらまち'] },
        { id: '中之条町', names: ['中之条町', 'なかのじょうまち'] },
        { id: '長野原町', names: ['長野原町', 'ながのはらまち'] },
        { id: '嬬恋村', names: ['嬬恋村', 'つまごいむら'] },
        { id: '草津町', names: ['草津町', 'くさつまち'] },
        { id: '高山村', names: ['高山村', 'たかやまむら'] },
        { id: '東吾妻町', names: ['東吾妻町', 'ひがしあがつままち'] },
        { id: '片品村', names: ['片品村', 'かたしなむら'] },
        { id: '川場村', names: ['川場村', 'かわばむら'] },
        { id: '昭和村', names: ['昭和村', 'しょうわむら'] },
        { id: 'みなかみ町', names: ['みなかみ町', 'みなかみまち'] },
        { id: '玉村町', names: ['玉村町', 'たまむらまち'] },
        { id: '板倉町', names: ['板倉町', 'いたくらまち'] },
        { id: '明和町', names: ['明和町', 'めいわまち'] },
        { id: '千代田町', names: ['千代田町', 'ちよだまち'] },
        { id: '大泉町', names: ['大泉町', 'おおいずみまち'] },
        { id: '邑楽町', names: ['邑楽町', 'おうらまち'] }
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
                                            id="g120">
                                            <rect
                                                x="0"
                                                y="0"
                                                width="720"
                                                height="720"
                                                fill="#FFFFFF"
                                                id="rect2" />
                                            <path
                                                d="M479-4.00311 490 14.9379 481 28.8944 486 56.8075 476 89.705 483 91.6988 496 85.0528 524 98.677 566.667 102 595 94.6894 609 63.7857 650 68.7702 660 52.8199 698 45.8416 692.667 37.2019 714 28.8944 731 10.9503 745 6.96273 745-5 479-4.00311Z"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeMiterlimit="8"
                                                fill="#A0EBD2"
                                                fillRule="evenodd"
                                                id="path2" />
                                            <path
                                                d="M743 560 743 7 727 9 711 26 692 34 695 46 659 50 650 65 607 64 601 78 592 95 592 95 557 103 522 176 517 353 574 500 706 540 743 560Z"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeMiterlimit="8"
                                                fill="#A0EBD2"
                                                fillRule="evenodd"
                                                id="path3" />
                                            <path
                                                d="M182 724 742 724 742 557 717 544 419 481 194 635 179 691 182 724Z"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeMiterlimit="8"
                                                fill="#A0EBD2"
                                                fillRule="evenodd"
                                                id="path4" />
                                            <path
                                                d="M-13 54-13 60-13 721 182 721 181 688 192 42 80 14 8 36-13 54Z"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeMiterlimit="8"
                                                fill="#A0EBD2"
                                                fillRule="evenodd"
                                                id="path5" />
                                            <path
                                                d="M-11-3-11 54 50 34 66 25 92 32 99 52 106 54 104 86 117 108 123 106 130 124 169 135 170 152 159 165 170 171 154 190 170 201 167 213 197 215 322 198 475 99 490 58 481 36 495 16 480-4-11-4-11-3Z"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeMiterlimit="8"
                                                fill="#A0EBD2"
                                                fillRule="evenodd"
                                                id="path6" />
                                            <text
                                                fill="#7F7F7F"
                                                fillRule="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(18.6544 500)"
                                                id="text41">長野県</text>
                                            <text
                                                fill="#7F7F7F"
                                                fillRule="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(82.6544 500)"
                                                id="text42" />
                                            <text
                                                fill="#7F7F7F"
                                                fillRule="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(492.75 633)"
                                                id="text43">埼玉県</text>
                                            <text
                                                fill="#7F7F7F"
                                                fillRule="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(556.75 633)"
                                                id="text44" />
                                            <text
                                                fill="#7F7F7F"
                                                fillRule="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(643.5 290)"
                                                id="text45">栃木県</text>
                                            <text
                                                fill="#7F7F7F"
                                                fillRule="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(707.5 290)"
                                                id="text46" />
                                            <text
                                                fill="#7F7F7F"
                                                fillRule="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(553.994 39)"
                                                id="text47">福島県</text>
                                            <text
                                                fill="#7F7F7F"
                                                fillRule="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(617.994 39)"
                                                id="text48" />
                                            <text
                                                fill="#7F7F7F"
                                                fillRule="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(211.336 56)"
                                                id="text49">新潟県</text>
                                            <text
                                                fill="#7f7f7f"
                                                fillRule="'Noto Sans JP Black', 'Noto Sans JP Black_MSFontService', sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333px"
                                                transform="translate(275.336,56)"
                                                id="text50"
                                            />
                                            <g
                                                id="group">
                                                <g
                                                    id="g91"
                                                >
                                                    <path
                                                        d="m 140,425.045 4.986,10.558 3.49,31.676 -2.991,8.045 v 14.581 l 5.484,13.575 4.488,-2.514 19.944,5.531 8.476,-4.525 12.465,-0.503 14.459,-11.564 30.415,8.547 14.459,8.548 19.445,-5.531 12.964,2.514 10.471,-17.095 3.988,1.509 13.463,3.016 1.994,-4.525 -6.98,-24.134 -14.958,-1.508 -25.429,-14.581 -16.952,2.514 -13.961,-8.548 H 221.77 L 215.787,430.073 184.375,417 l -7.977,8.548 -8.975,-6.537 z"
                                                        stroke="#ffffff"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10b981"
                                                        fillRule="evenodd"
                                                        id="path19" />
                                                    <text
                                                        fillRule="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16px"
                                                        transform="translate(199.428,472)"
                                                        id="text51">安中市</text>
                                                </g>
                                                <g
                                                    id="g92">
                                                    <path
                                                        d="M405.018 503 415 503 403.521 518 400.526 507ZM277.25 374 292.722 385.5 286.233 385.5 299.21 405 320.172 415 321.17 421.5 341.633 413.5 351.116 424.5 357.105 423 362.595 434.5 359.101 443 372.078 458 381.561 457 397.033 479.5 399.528 500.5 379.065 502.5 375.571 512.5 358.602 518 354.11 542 340.635 543 330.154 555.5 312.186 559 311.188 554.5 324.165 540.5 319.174 518.5 310.19 512 317.676 487.5 310.19 463.5 297.713 461.5 269.264 447 253.293 449 238.819 441.5 222.848 442 215.861 431.5 184.418 418 176.931 427.5 169.445 419.5 139.499 424.5 141.995 417 139 405.5 143.492 396.5 153.474 395.5 166.949 380.5 191.904 376 215.861 378.5 217.857 386.5 235.325 377 265.271 382Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path27" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(266.152 436)"
                                                        id="text52">高崎市</text>
                                                </g>
                                                <g
                                                    id="g109">
                                                    <path
                                                        d="M245.5 581 240 589.5 254.5 592.5 267.5 586 273 593 302 586 310 593.5 323 592.5 323.5 601 337 608 350 597 353.5 600 365 603 368.5 589 383 584 379.5 571.5 388.5 542.5 404.5 518 401 507.5 406 502.5 397 500 378.5 503 375 512 358 518.5 353.5 541.5 339 542.5 330 555 311 558.5 311 558.5 288.5 564 282 577.5 265 574.5 245.5 581Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path26" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(327.772 576)"
                                                        id="text53">藤岡市</text>
                                                </g>
                                                <g
                                                    id="g95">
                                                    <path
                                                        d="M145.398 491 136.431 500.455 125.472 503.441 118 515.882 130.453 546.237 143.405 555.692 153.368 553.701 160.84 560.668 173.294 547.232 187.242 550.218 196.208 563.156 204.178 561.166 212.149 575.099 213.145 595.502 234.067 596 246.52 578.583 248.513 555.194 247.517 550.716 252 533.796 229.085 540.763 215.138 536.782 212.647 522.848 203.182 514.389 198.699 498.962 185.747 500.455 175.784 506.426 154.862 500.455 149.881 501.948 145.398 491Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path20" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(148.103 538)"
                                                        id="text54">下仁田町</text>
                                                </g>
                                                <g
                                                    id="g117">
                                                    <path
                                                        d="M134.5 551.465 128 557.913 135.5 572.795 117.5 579.244 104.5 573.291 104 582.22 111 594.622 137.5 603.055 142.5 608.512 155 610 164.5 601.567 174.5 608.016 195 605.535 213 600.079 213 574.283 205.5 560.394 195.5 562.874 187.5 550.969 173 547 162 559.402 153.5 552.953 143.5 554.441 134.5 551.465Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path21" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(144.25 585)"
                                                        id="text55">南牧村</text>
                                                </g>
                                                <g
                                                    id="g94">
                                                    <path
                                                        d="M142.5 608 144 617.5 134 627 142 639 135.5 665 149 674.5 161 676 169.5 689 182 696 190.5 679.5 202.5 674.5 202 663 208.5 655.5 221 660 225.5 666.5 246 660 241.5 645.5 237 643.5 242 635 233 630.5 226.5 620.5 219 617.5 219.5 605 212.5 597 196.5 605.5 173.5 607.5 164.5 601.5 156.5 609 142.5 608Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path22" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(163.144 644)"
                                                        id="text56">上野村</text>
                                                </g>
                                                <g
                                                    id="g93">
                                                    <path
                                                        d="M239.5 588.5 256 591 267.5 584.5 275.5 592.5 302.5 584 310 592.5 323 591 324 602 320 603.5 320 618.5 308 627 301 621 271 630 255 643.5 245.5 659 239.5 644.5 235 643 240.5 634.5 233.5 630.5 226 621 218 615 218.5 606 214 596 233.5 594.5 239.5 588.5Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path25" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(246.815 616)"
                                                        id="text57">神流町</text>
                                                </g>
                                                <g
                                                    id="g89">
                                                    <path
                                                        d="M437.5 326 455.5 328 455 341 453.5 355.5 461 368 461.5 374 467.5 404 474 419 474 424.5 465.5 431 464.5 435.5 459 448.5 436 473 429 468 421.5 473 417 470 405.5 484 396 478.5 382.5 458.5 371.5 458.5 359 443 361.5 434 357 423.5 350 423.5 347 417 348 406.5 352.5 406.5 357.5 415.5 370.5 396 380 379.5 404.5 352.5 431 338 437.5 326Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path30" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(398.1 414)"
                                                        id="text58">前橋市</text>
                                                </g>
                                                <g
                                                    id="g90">
                                                    <path
                                                        d="M355.393 189.031 382.142 175 414.241 175 408.892 188.362 396.854 199.052 388.161 233.127 391.505 249.162 386.824 260.52 406.885 257.179 409.56 245.153 430.291 246.489 457.04 227.114 461.721 229.786 469.077 217.092 493.152 208.406C498.002 212.56 497.833 210.362 497.833 213.083L497.833 213.083 517.226 197.716 528.594 197.048 534.613 187.694 548.656 191.703 545.981 203.061 551.331 207.07 551.331 207.07 552 230.454 537.957 240.476 529.932 268.537 532.607 276.555 515.889 305.952 503.183 311.297 497.164 305.284 479.108 312.633 477.102 318.646 453.028 319.983 455.703 328 436.31 325.328 436.978 314.638 426.947 287.913 416.916 282.568 417.585 270.541 409.56 265.197 395.517 266.533 380.805 273.214 382.142 280.563 369.437 289.917 372.78 309.961 354.056 308.624 354.056 308.624 338.006 308.624 336 285.24 338.006 271.21 348.037 264.528 361.412 241.144 352.05 223.773 359.406 207.738 355.393 189.031Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path9" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(461.077 270)"
                                                        id="text59">沼田市</text>
                                                </g>
                                                <g
                                                    id="g87">
                                                    <path
                                                        d="M445.333 69.6667 462 77 470 69 473.333 73.6667 478 90.3333 496 85.6667 517.333 92.3333 532.667 101 558.667 99.6667 568.667 105 558.667 112.333 558 122.333 552 123 543.333 141 574 155.667 556.667 175.667 549.333 195 533.333 190.333 531.333 197.667 519.333 199 500.667 213.667 490.667 209 468.667 219 463.333 231 456 226.333 448.667 213 435.333 212.333 433.333 186.333 426 181 426.667 161.667 443.333 149.667 460.667 153 456 137.667 438.667 135 444 113.667 438.933 91.4 445.333 69.6667Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path8" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(477.105 157)"
                                                        id="text60">片品村</text>
                                                </g>
                                                <g
                                                    id="g116">
                                                    <path
                                                        d="M293.557 385.5 302.083 385.5 321.643 380 339.197 389.5 354.243 391.5 360.262 402 362.769 390 370.794 397 381.326 381 405.4 353 431.48 336.5 437.498 324.5 438 317 424.96 313.5 415.932 318 398.88 312 385.338 314 371.295 308 339.698 307 322.646 312.5 317.631 307.5 313.117 312.5 298.071 307.5 284.028 310 289.545 317 291.049 323 280.517 321 290.046 333 316.628 333 304.089 354 280.015 361.5 275 373.5 293.557 385.5Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path18" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(330.244 351)"
                                                        id="text61">渋川市</text>
                                                </g>
                                                <g
                                                    id="g86">
                                                    <path
                                                        d="M404.815 8 394.599 13.1137 397.664 28.4545 385.405 48.9092 354.759 60.1591 327.177 57.0909 322.069 91.8636 333.306 103.114 335.349 110.273 324.112 119.477 307.767 112.318 295.509 124.591 304.703 153.227 278.142 155.273 266.905 169.591 242.388 166.523 243.409 189.023 224 207.432 234.215 233 234.215 233 243.409 241.182 239.323 258.568 272.013 259.591 282.228 265.727 320.026 263.682 333.306 278 347.608 265.727 362.931 242.205 351.694 223.795 360.888 209.477 355.78 190.046 382.341 175.727 382.341 175.727 414.009 176.75 441.59 150.159 461 153.227 454.871 135.841 437.504 134.818 437.504 134.818 444.655 114.364 440.569 89.8182 440.569 89.8182 445.677 68.3409 439.547 61.1819 440.569 49.9318 421.159 38.6818 410.944 14.1364 404.815 8Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path7" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(320.673 155)"
                                                        id="text62">みなかみ町</text>
                                                </g>
                                                <g
                                                    id="g88">
                                                    <path
                                                        d="M188.509 201 173.821 214.264 165.142 210.285 158.465 218.244 131.76 224.876 118.408 234.824 113.734 224.876 103.052 240.13 93.7052 233.497 83.6908 234.161 81.6879 240.793 67 241.456 67 251.404 75.6792 256.71 78.3497 265.332 98.3786 271.301 101.717 277.933 119.075 273.29 133.095 291.197 125.751 302.471 111.731 301.145 111.731 313.083 121.746 317.062 131.092 329 142.442 320.378 162.471 321.041 157.13 303.135 179.162 309.104 191.847 301.145 206.535 305.788 214.546 317.062 245.257 310.43 251.266 315.073 292.659 325.684 291.324 317.725 285.983 311.093 298 308.44 283.312 296.503 278.639 264.668 273.298 258.699 241.251 258.036 244.59 241.456 234.575 232.834 225.896 208.295 207.87 210.948 188.509 201Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path11" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(159.934 270)"
                                                        id="text63">中之条町</text>
                                                </g>
                                                <g
                                                    id="g115">
                                                    <path
                                                        d="M144 398 144 398 151 397.5 155.5 396 168 380.5 191.5 377 217 381 218.5 388 236 379.5 265.5 383 277.5 374 281.5 364 305 356 318 333.5 290.5 333.5 281 321.5 249 315 245.5 309.5 214.5 316.5 207 305.5 190.5 302 180 308 157.5 303.5 162 321.5 177 323.5 183.5 333.5 178.5 345 172 343.5 162.5 353.5 147.5 352.5 138 365 138.5 387.5 144 388.5 144 398Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path17" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(199.077 353)"
                                                        id="text64">東吾妻町</text>
                                                </g>
                                                <g
                                                    id="g96">
                                                    <path
                                                        d="M64 271 41.5 274.988 25 307.885 12.5001 307.885 18.5001 334.303 8 342.777 0 404.087 27 417.046 48 432 51 422.529 67.5001 420.536 82.5001 427.015 91 412.56 100.5 411.065 106 393.619 97.5 391.625 101 371.189 94 357.731 97.5 342.777 106 353.245 114 332.31 104.5 321.344C100.821 318.2 102.087 319.436 100.5 317.854L93 306.39 83.5001 305.393 80.5001 296.92 71.5001 290.938 64 271Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path13" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(31.4229 360)"
                                                        id="text65">嬬恋村</text>
                                                </g>
                                                <g
                                                    id="g105">
                                                    <path
                                                        d="M502.558 448.5 495.023 469 499.544 482 496.53 491.5 490 492.5 502.055 506.5 498.037 515 503.562 524.5 518.129 528 528.175 539 534.203 535.5 537.217 520 559.318 526.5 575.392 509 592.47 513 590.461 503.5 599 496.5 579.912 481.5 583.931 472.5 556.806 449 547.765 453.5 526.668 443 502.558 448.5Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path33" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(521.237 495)"
                                                        id="text67">太田市</text>
                                                </g>
                                                <g
                                                    id="g99">
                                                    <path
                                                        d="M531.801 278 546.251 292 566.679 294 572.16 302.5 579.634 296 597.571 301.5 614.512 299 618 311 614.014 325 604.049 332 598.07 328.5 582.624 339.5 575.15 353 567.676 351.5 552.728 360.5 544.756 369.5 534.293 378 528.812 391.5 518.847 395.5 510.376 413.5 514.861 418 510.875 422.5 525.324 428 525.822 444.5 502.404 448 498.418 441.5 500.411 432 489.449 430 499.415 414.5 493.435 409 493.435 403 490.446 391 480.979 388 475 373.5 488.951 379.5 512.369 372 514.362 363.5 504.397 358 509.38 346.5 521.338 339.5 524.826 326 520.341 324 515.857 305 531.801 278Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path32" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(529.574 326)"
                                                        id="text69">みどり市</text>
                                                </g>
                                                <g
                                                    id="g114">
                                                    <path
                                                        d="M427.858 166 425.849 180.667 433.887 184 437.236 210.667 453.311 212 458 228 431.208 248 409.774 246.667 408.434 256.667 387 262 391.019 248.667 387 234.667 397.047 194.667 407.094 190 412.453 176 427.858 166Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path10" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(398.977 226)"
                                                        id="text70">川場村</text>
                                                </g>
                                                <g
                                                    id="g113">
                                                    <path
                                                        d="M380.5 273.5 381.5 279.5 369 289.5 373 309.5 387 314 397.5 313 415 320 423 315.5 437.5 319 438 313.5 428 287 417 284 417.5 269.5 411.5 265 395.5 265 380.5 273.5Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path16" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(375.967 300)"
                                                        id="text71">昭和村</text>
                                                </g>
                                                <g
                                                    id="g112">
                                                    <path
                                                        d="M279 265.01 282.967 297.327 295.862 308.941 312.228 315 316.691 310.455 321.154 313.99 328.098 312.475 340 308.436 337.52 288.743 338.016 278.139 321.65 264 279 265.01Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path15" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(285.611 292)"
                                                        id="text72">高山村</text>
                                                </g>
                                                <g
                                                    id="g111">
                                                    <path
                                                        d="M252.224 535 247.203 548 247.705 556 247.203 569 255.236 567 263.27 554 275.321 554 275.321 542.5 292.392 536.5 292.392 523 306.451 521 309.464 513 318 492 299.422 485 288.878 502.5 279.84 500 255.236 505.5 243.688 498.5 211.051 487.5 199 498 202.013 515.5 213.059 522.5 214.565 537 229.127 541.5 252.224 535Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path23" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(238.361 527)"
                                                        id="text73">富岡市</text>
                                                </g>
                                                <g
                                                    id="g97">
                                                    <path
                                                        d="M113.609 315 121.151 317 129.196 327.5 142.268 320 163.888 321 177.464 322.5 184 334 178.469 345.5 170.927 345 161.877 354.5 147.799 352.5 137.743 363 138.749 386.5 143.274 388.5 145.788 400.5 138.749 408 143.274 419 138.749 423 124.67 416 101.542 411.5 106.067 394.5 97.5196 392 100.034 371.5 94 357.5 96.514 340.5 106.067 351 112.101 331 103.553 321.5 113.609 315Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path14" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(93.4999 371)"
                                                        id="text74">長野原町</text>
                                                </g>
                                                <g
                                                    id="g98">
                                                    <path
                                                        d="M76.7885 265 64 269.693 71.4038 291.148 81.5 297.182 82.8462 306.568 91.5962 306.568 103.712 324 115.827 313.943 112.462 302.545 125.923 303.886 134 291.818 120.538 273.045 103.038 277.068 100.346 269.693 76.7885 265Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path12" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(79.5328 294)"
                                                        id="text75">草津町</text>
                                                </g>
                                                <g
                                                    id="g107">
                                                    <path
                                                        d="M472.5 425 466 429.522 458.5 446.606 437 471.227 428.5 466.704 422 471.227 424.5 486.803 439 504.892 481 527 490.5 522.98 503 523.985 500.5 512.931 500.5 505.897 489.5 492.833 497 491.325 499 481.778 495.5 469.217 503 447.108 498.5 442.586 500.5 430.527 488.5 428.517 479 433.039 472.5 425Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path34" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(443.694 479)"
                                                        id="text66">伊勢崎市</text>
                                                </g>
                                                <g
                                                    id="g110">
                                                    <path
                                                        d="M310.586 513 318.535 515.979 324 539.809 311.58 552.716 311.58 557.184 288.229 565.128 282.267 578.532 264.382 575.057 246 583 247.987 568.603 255.439 566.617 263.885 552.22 275.809 552.22 275.809 540.801 290.713 535.837 293.197 520.447 305.618 519.454 310.586 513Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path24" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(266.69 554)"
                                                        id="text76">甘楽町</text>
                                                </g>
                                                <g
                                                    id="g101">
                                                    <path
                                                        d="M628.61 506.564 644.695 500 653.743 507.069 659.273 507.069 665.305 517.673 689.433 514.139 702 522.723 689.936 524.743 684.406 521.208 675.861 529.792 676.866 541.911 638.663 545.445 627.604 551 608 544.436 612.021 538.376 618.556 542.921 627.102 535.852 625.594 531.307 620.567 528.782 628.107 519.188 628.61 506.564Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path38" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(630.199 530)"
                                                        id="text77">館林市</text>
                                                </g>
                                                <path
                                                    d="M629.5 562 659 557.5 684 552.5 681.5 544.5 676.5 541 640 544 626 550 629.5 562Z"
                                                    stroke="#FFFFFF"
                                                    strokeWidth="2"
                                                    strokeMiterlimit="8"
                                                    fill="#10B981"
                                                    fillRule="evenodd"
                                                    id="path40" />
                                                <text
                                                    fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                    fontWeight="700"
                                                    fontSize="12"
                                                    transform="translate(638.13,557)"
                                                    id="text78">明和町</text>
                                                <g
                                                    id="g102" />
                                                <g
                                                    id="g100">
                                                    <path
                                                        d="M596.502 328.92 597 346.86 586.536 356.826 581.553 374.268 592.017 381.742 590.024 391.709 577.069 392.706 556.141 427.09 551.656 440.047 557.137 449.017 547.172 454 525.247 444.033 524.749 429.084 509.801 421.609 513.787 418.12 510.299 414.134 516.777 395.197 528.237 391.211 533.718 375.763 543.684 369.284 550.66 358.321 566.605 350.846 574.079 352.839 579.56 337.391ZM500.333 305 503.323 310.98 516.278 305.498 520.265 321.445 524.749 325.93 521.759 339.385 509.302 349.351 504.818 359.318 514.285 363.304 511.794 372.274 488.873 380.746 474.921 374.766 476.914 378.752 480.402 387.722 490.368 390.712 493.856 403.171 492.361 408.652 499.337 415.13 490.866 426.592 477.911 433.07 472.928 423.602 473.426 417.124 466.948 403.669 461.966 371.776 460.969 366.294 452.997 355.331 455.986 330.913 452 319.452 475.419 319.452 479.406 308.987Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path31" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(498.315 415)"
                                                        id="text68">桐生市</text>
                                                </g>
                                                <g
                                                    id="g104">
                                                    <path
                                                        d="M690 512.5 690 512.5 704.5 510 709.5 514 708 520.5 719 543.5 714 549.5 718 557 703.5 563 683 552 681.5 544 677.5 540 676 528.5 683 521 689.5 524.5 699.5 522 690 512.5Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path41" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="12"
                                                        transform="translate(684 543)"
                                                        id="text79">板倉町</text>
                                                </g>
                                                <g
                                                    id="g120">
                                                    <path
                                                        d="M598.5 497 611 509 628 508.5 627.5 518.5 621.5 527.5 626 532.5 628 536 617.5 543 606 536 596 536 590.5 526 593 511.5 590 503 598.5 497Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path37" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="12"
                                                        transform="translate(593.675 517)"
                                                        id="text80">邑楽町</text>
                                                </g>
                                                <g
                                                    id="g103">
                                                    <path
                                                        d="M582.039 547.5 582.039 547.5 600.719 561 630 562 625.456 549.5 609.806 544 611.825 539 606.272 535.5 596.68 536 590.621 527 578 534 584.563 536.5 582.039 547.5Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path39" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="12"
                                                        transform="translate(574.572 561)"
                                                        id="text81">千代田町</text>
                                                </g>
                                                <g
                                                    id="g119">
                                                    <path
                                                        d="M285 385.5 293 397 298 404.5 320 414.5 323 423 342 415 347 419 349 406.5 343.5 406 342 398.5 334 391 317 392 305.5 382 285 385.5Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path29" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="12"
                                                        transform="translate(297.669 408)"
                                                        id="text85">榛東村</text>
                                                </g>
                                                <path
                                                    d="M559 527 583.145 548 584.13 538 581.174 533.5 591.029 526.5 593 511.5 576.246 508 559 527Z"
                                                    stroke="#FFFFFF"
                                                    strokeWidth="2"
                                                    strokeMiterlimit="8"
                                                    fill="#10B981"
                                                    fillRule="evenodd"
                                                    id="path36" />
                                                <text
                                                    fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                    fontWeight="700"
                                                    fontSize="12"
                                                    transform="translate(548.825,526)"
                                                    id="text82">大泉町</text>
                                                <g
                                                    id="g106" />
                                                <path
                                                    d="M417.759 470 422.819 471.5 425.855 486.5 438 503.5 416.241 503.5 405.615 504 399.542 500.5 396 477.5 405.615 480.5 417.759 470Z"
                                                    stroke="#FFFFFF"
                                                    strokeWidth="2"
                                                    strokeMiterlimit="8"
                                                    fill="#10B981"
                                                    fillRule="evenodd"
                                                    id="path35" />
                                                <text
                                                    fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                    fontWeight="700"
                                                    fontSize="12"
                                                    transform="translate(399.25,495)"
                                                    id="text83">玉村町</text>
                                                <g
                                                    id="g108" />
                                                <g
                                                    id="g118">
                                                    <path
                                                        d="M305 383.5 316 394 333.5 392.5 342 402 342 407 353.5 409 358.5 418 372 396.5 363.5 388 360 399 356 389 340.5 390 323.5 379 305 383.5Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path28" />
                                                    <text
                                                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="12"
                                                        transform="translate(325.539 394)"
                                                        id="text84">吉岡町</text>
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

export default Gunma;