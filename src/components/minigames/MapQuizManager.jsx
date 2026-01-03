import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import ClearModal from '../assets/ClearModal';

const MapQuizManager = ({ allDistricts, children, gameTitle, isWide }) => {
    // SVG要素にrefを追加するための内部ref
    const svgRef = useRef(null);
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
    const hideTimeoutRef = useRef(null);
    const containerRef = useRef(null);

    // 音声ファイルの参照
    const correctSoundRef = useRef(new Audio('/audio/correct.mp3'));
    const wrongSoundRef = useRef(new Audio('/audio/wrong.mp3'));
    const startOrClearSoundRef = useRef(new Audio('/audio/start_or_clear.mp3'));

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
        // containerRefからSVG要素を取得
        const svgElement = containerRef.current?.querySelector('svg');
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

        let groupElement = svgElement.querySelector('#group');

        if (groupElement) {
            // グループ内の地域を処理
            groupElement.querySelectorAll(':scope > g').forEach((group) => {
                processDistrict(group.querySelector('text'), group.querySelectorAll('path'), registeredHandlers);
            });

            // グループ直下のpath要素を処理
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
                    className={`relative w-full mx-auto my-5 rounded-2xl overflow-hidden shadow-2xl border border-slate-300/50 ${isWide ? 'max-w-auto aspect-[1280/720]' : 'max-w-[640px] aspect-square'}`}
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
                                   {children}
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

export default MapQuizManager;