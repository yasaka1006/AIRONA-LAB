import { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import ClearModal from '../assets/ClearModal';

const Ibaraki = () => {
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
    const gameTitle = '茨城県の市区町村全部言えるかな？';

    // 市区町村のリスト（複数の名前に対応）
    const allDistricts = [
        // 市部 (32市)
        { id: '水戸市', names: ['水戸市', 'みとし'] },
        { id: '日立市', names: ['日立市', 'ひたちし'] },
        { id: '土浦市', names: ['土浦市', 'つちうらし'] },
        { id: '古河市', names: ['古河市', 'こがし'] },
        { id: '石岡市', names: ['石岡市', 'いしおかし'] },
        { id: '結城市', names: ['結城市', 'ゆうきし'] },
        { id: '龍ケ崎市', names: ['龍ケ崎市', 'りゅうがさきし'] },
        { id: '下妻市', names: ['下妻市', 'しもつまし'] },
        { id: '常総市', names: ['常総市', 'じょうそうし'] },
        { id: '常陸太田市', names: ['常陸太田市', 'ひたちおおたし'] },
        { id: '高萩市', names: ['高萩市', 'たかはぎし'] },
        { id: '北茨城市', names: ['北茨城市', 'きたいばらきし'] },
        { id: '笠間市', names: ['笠間市', 'かさまし'] },
        { id: '取手市', names: ['取手市', 'とりでし'] },
        { id: '牛久市', names: ['牛久市', 'うしくし'] },
        { id: 'つくば市', names: ['つくば市', 'つくばし'] },
        { id: 'ひたちなか市', names: ['ひたちなか市', 'ひたちなかし'] },
        { id: '鹿嶋市', names: ['鹿嶋市', 'かしまし'] },
        { id: '潮来市', names: ['潮来市', 'いたこし'] },
        { id: '守谷市', names: ['守谷市', 'もりやし'] },
        { id: '常陸大宮市', names: ['常陸大宮市', 'ひたちおおみやし'] },
        { id: '那珂市', names: ['那珂市', 'なかし'] },
        { id: '筑西市', names: ['筑西市', 'ちくせいし'] },
        { id: '坂東市', names: ['坂東市', 'ばんどうし'] },
        { id: '稲敷市', names: ['稲敷市', 'いなしきし'] },
        { id: 'かすみがうら市', names: ['かすみがうら市', 'かすみがうらし'] },
        { id: '桜川市', names: ['桜川市', 'さくらがわし'] },
        { id: '神栖市', names: ['神栖市', 'かみすし'] },
        { id: '行方市', names: ['行方市', 'なめがたし'] },
        { id: '鉾田市', names: ['鉾田市', 'ほこたし'] },
        { id: 'つくばみらい市', names: ['つくばみらい市', 'つくばみらいし'] },
        { id: '小美玉市', names: ['小美玉市', 'おみたまし'] },

        // 町村部 (10町、2村)
        { id: '茨城町', names: ['茨城町', 'いばらきまち'] },
        { id: '大洗町', names: ['大洗町', 'おおあらいまち'] },
        { id: '城里町', names: ['城里町', 'しろさとまち'] },
        { id: '東海村', names: ['東海村', 'とうかいむら'] },
        { id: '大子町', names: ['大子町', 'だいごまち'] },
        { id: '美浦村', names: ['美浦村', 'みほむら'] },
        { id: '阿見町', names: ['阿見町', 'あみまち'] },
        { id: '河内町', names: ['河内町', 'かわちまち'] },
        { id: '八千代町', names: ['八千代町', 'やちよまち'] },
        { id: '五霞町', names: ['五霞町', 'ごかまち'] },
        { id: '境町', names: ['境町', 'さかいまち'] },
        { id: '利根町', names: ['利根町', 'とねまち'] }
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
                                            <rect
                                                x="0"
                                                y="0"
                                                width="720"
                                                height="720"
                                                fill="#CAEEFB"
                                                id="rect3" />
                                            <path
                                                d="M132 726 64 482 230 528 413 597 456 582 542 618 610 694 648 713 649 726 132 726Z"
                                                stroke="#FFFFFF"
                                                stroke-width="2"
                                                stroke-miterlimit="8"
                                                fill="#A0EBD2"
                                                fill-rule="evenodd"
                                                id="path3" />
                                            <path
                                                d="M-99 425 97 461 295 362 367 237 347 47 313-7-76 2-99 425Z"
                                                stroke="#FFFFFF"
                                                stroke-width="2"
                                                stroke-miterlimit="8"
                                                fill="#A0EBD2"
                                                fill-rule="evenodd"
                                                id="path4" />
                                            <path
                                                d="M75 505 87 532 95 538 95 562 124 603 140 643 130 658 139 719-61 722-58 440-13 437-5 447 8 443 7 433 39 440 75 505Z"
                                                stroke="#FFFFFF"
                                                stroke-width="2"
                                                stroke-miterlimit="8"
                                                fill="#A0EBD2"
                                                fill-rule="evenodd"
                                                id="path5" />
                                            <path
                                                d="M21 438 7 414-10 398-16 407-54 395-58 449-3 456 21 438Z"
                                                stroke="#FFFFFF"
                                                stroke-width="2"
                                                stroke-miterlimit="8"
                                                fill="#A0EBD2"
                                                fill-rule="evenodd"
                                                id="path6" />
                                            <path
                                                d="M312-6 322 20 413 105 467 116 517 54 605 75 607 48 657 33 695-7 312-6Z"
                                                stroke="#FFFFFF"
                                                stroke-width="2"
                                                stroke-miterlimit="8"
                                                fill="#A0EBD2"
                                                fill-rule="evenodd"
                                                id="path7" />

                                            <g id="group">

                                                <g
                                                    id="g111">
                                                    <path
                                                        d="M356 141 350 148 336 150 307 158 308 169 316 181 314 193 322 207 316 221 323 257 338 256 348 249 363 243 383 253 395 271 401 273 406 260 427 266 429 257 421 241 421 230 412 220 419 208 408 195 424 182 419 172 427 164 419 154 413 162 399 161 389 164 379 156 366 153 362 141 356 141Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path8" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(321.662 209)"
                                                        id="text51">常陸大宮市</text>
                                                </g>
                                                <g
                                                    id="g126">
                                                    <path
                                                        d="M457 558.333 457.667 572 450.667 573.667 448 580 458.333 587 491.667 607 499.667 617 505 616.667 506 604.667 514 599 509.333 586 502.333 581.667 497 580.333 491.667 573.667 495.667 571 474.333 555.333 470 566 463 555 457 558.333Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path27" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(458.464 590)"
                                                        id="text100">潮来市</text>
                                                </g>
                                                <g
                                                    id="g112">
                                                    <path
                                                        d="M432.676 103.194 416.723 84.4839 407.416 84.4839 398.775 76.4654 386.809 76.4654 378.168 63.1014 382.156 53.0783 375.509 46.3963 366.867 47.7327 358.225 43.7235 354.237 29.6912 338.283 19 326.318 19 321 41.7189 328.312 89.8295 324.324 106.535 325.653 123.908 338.283 134.599 341.607 149.968 350.249 148.631 354.902 141.281 361.549 140.613 366.202 153.309 379.497 155.313 388.803 164 402.098 161.327 414.064 162.664 420.711 155.313 420.711 144.622 412.069 137.94 419.382 135.267 423.37 141.281 428.023 129.253 436 125.912 432.676 103.194Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path11" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(350.333 111)"
                                                        id="text54">大子町</text>
                                                </g>
                                                <g
                                                    id="g116">
                                                    <path
                                                        d="M488.679 14 484 31.3333 495.029 43 497.368 55 504.053 66.6667 524.105 75.6667 525.442 79.3333 527.113 86 544.492 92.6667 536.137 98.3333 530.455 105.333 525.108 105.333 533.463 116.333 553.85 127 573.568 125 592.953 84.6667 608.326 82 611 77.6667 604.984 61.6667 575.574 53 558.863 54.6667 545.161 42 541.484 41 525.776 39.3333 514.747 40 497.368 24 496.032 14.3333 488.679 14Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path41" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(532.572 76)"
                                                        id="text55">北茨城市</text>
                                                </g>
                                                <g
                                                    id="g115">
                                                    <path
                                                        d="M479.314 144.8 478.537 118.571 470 111.629 472.328 103.914 473.104 86.1714 481.642 76.9143 487.851 59.9429 496.388 53 504.925 66.8858 524.328 76.9143 528.985 86.9429 544.508 93.8857C538.454 99.0436 541.337 97.7647 536.746 99.2858L532.09 104.686 525.881 107 535.194 117.029 553.045 126.286 574 123.2 564.687 161 557.701 153.286 522 154.829 513.463 149.429 497.164 153.286 479.314 144.8Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path13" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(495.072 129)"
                                                        id="text57">高萩市</text>
                                                </g>
                                                <g
                                                    id="g114">
                                                    <path
                                                        d="M478.343 146 470.606 152.168 471.38 166.816 468.285 178.38 459 179.922 472.927 209.989 490.723 203.05 489.175 227.721 496.139 236.972 497.686 253.162 497.686 253.162 488.401 258.559 482.985 268.581 494.591 273.207 513.934 284 520.898 264.726 521.672 247.765 534.051 225.408 551.847 202.279 549.526 190.715 564.226 178.38 565 162.19 556.489 153.71 523.993 153.71 512.387 149.855 495.365 153.71 478.343 146Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path12" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(497.806 195)"
                                                        id="text58">日立市</text>
                                                </g>
                                                <g
                                                    id="g120">
                                                    <path
                                                        d="M393.667 289 387.667 294.315 397 305.276 384.667 311.92 371.667 307.601 367.333 312.916 376.667 328.528 358 333.178 361 342.811 370 351.448 363 360.416 371.667 373.703 397 379.017 392.333 368.056 402.667 361.08 410 370.049 412 376.36 431.333 375.031 436.667 378.685 447.333 373.038 450.667 382.007 466 384 475.667 375.364 479.333 379.682 494 364.734 470.333 348.458 455 343.143 445.667 342.147 443.333 322.549 437 325.538 428.667 321.552 426.667 297.636 409.333 301.622 402 290.329 393.667 289Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path17" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(387.833 346)"
                                                        id="text59">水戸市</text>
                                                </g>
                                                <g
                                                    id="g110">
                                                    <path
                                                        d="M324 256.5 321 266 313.5 268 309 282.5 302 283.5 295 310 313 306.5 318.5 312.5 345.5 303.5 367 306.5 385 313 398 306 388 295 394.5 290 402 294 407 282.5 401 279.5 396 282 395.5 269.5 383.5 251 363 242 343 250 336 255.5 324 256.5Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path9" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(330.685 281)"
                                                        id="text60">城里町</text>
                                                </g>
                                                <g
                                                    id="g109">
                                                    <path
                                                        d="M295.667 308.667 295.667 308.667 293 315.333 292 323.667 286 328 289 334.667 282.333 342 284.667 349.667 277 352.667 277 364.667 283 365.667 291 376.667 303.333 372.667 310 394.333 320.333 396 333 405 354 398.667 371.333 405 380 384.667 378.333 373.667 372 373 364.667 360.333 371 350.333 362 343.333 359.667 334.333 376.667 327.333 368.667 311.333 371.667 305 345.667 302 318.333 310.667 312.667 305.333 295.667 308.667Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path19" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(305.644 356)"
                                                        id="text63">笠間市</text>
                                                </g>
                                                <g
                                                    id="g123">
                                                    <path
                                                        d="M409.333 427.074 408 433.424 420.667 441.111 425.333 445.79 420.333 451.472C420.444 456.374 420.556 461.276 420.667 466.178L428.667 469.52 426.333 486.565 445.667 488.905 458.667 483.557 463 488.905 466.667 486.899 471.333 501.271 470.667 507.621 484 525 487.333 524.666 500.667 514.973 511 510.963 491 459.493 481.667 408.692 463 399 449.667 399.668 449 414.708 440 423.064 428.667 419.387 419.333 426.072 409.333 427.074Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path24" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(436.405 460)"
                                                        id="text64">鉾田市</text>
                                                </g>
                                                <g
                                                    id="g151">
                                                    <path
                                                        d="M285.849 371 263.443 382.072 269.418 393.898 259.211 409.751 250 429.126 264.439 461.586 267.676 462.341 288.09 461.586 301.782 447.746 304.77 447.746 306.762 445.985 303.276 439.191 305.517 439.443 312.736 438.436 327.425 457.811 329.914 458.818 333.4 466.115 320.952 481.968 364.768 487 361.78 477.941 351.822 465.612 354.312 452.527 369 451.521 365.515 446.74 353.067 439.694 331.159 422.835 346.096 409.751 353.814 408.493 348.835 399.686 332.902 403.963 320.703 395.156 309.251 393.646 303.027 372.761 290.58 375.026 285.849 371Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path22" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(278.973 429)"
                                                        id="text65">石岡市</text>
                                                </g>
                                                <g
                                                    id="g137">
                                                    <path
                                                        d="M221.214 429.333 219.886 435 208.262 443.667 200.956 449 203.28 458.333 194.314 461.333 189 481.667C190.107 485.556 191.546 490.778 192.653 494.667 192.542 499.444 192.432 504.222 192.321 509L194.314 524.333 207.598 534 217.561 540.333 214.572 553.667 224.867 554 234.498 563.667 238.815 578.667 248.447 587 251.103 584.667 248.447 568.333 256.749 571 266.048 566 261.731 556.333 267.376 556 263.723 538.667 261.399 534.667 279 521.667 269.037 506 273.354 497.667 257.413 485.667 264.055 468.333 257.745 461 261.731 454.333 250.107 428 221.214 429.333Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path39" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(196.327 506)"
                                                        id="text66">つくば市</text>
                                                </g>
                                                <g
                                                    id="g149">
                                                    <path
                                                        d="M211.333 343.347 204.333 339 185.667 345.688 175.333 343.013 171.333 354.717 148.667 360.401 141.667 370.433 145.333 383.475 138.333 385.481 137.667 392.838 143.667 395.847 132 411.229 140.333 424.605 159 418.586 163 425.943 180.667 423.602 190 429.621 197.333 442.997 208 444 219.667 434.637 221.667 428.618 224 400.529 220 397.519 217.333 394.51 220.333 377.455 210.333 354.717 216.333 351.038 211.333 343.347Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path38" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(158.321 393)"
                                                        id="text67">筑西市</text>
                                                </g>
                                                <g
                                                    id="g150">
                                                    <path
                                                        d="M285.974 328 271.519 329.667 260.426 319 248.996 320.333 244.962 330 225.464 326 222.102 336.333 210 343.667 215.379 352 210.336 356.333 220.085 377 215.715 395.333 223.447 401.333 220.757 430 248.996 428.333 251.685 427 260.426 408 269.502 393.667 264.46 381.667 285.974 371.667 282.613 365 276.562 363.667 275.889 352.333 285.974 349.667 282.949 343 289 337.333 285.974 328Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path21" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(221.261 369)"
                                                        id="text68">桜川市</text>
                                                </g>
                                                <g
                                                    id="g127">
                                                    <path
                                                        d="M378.991 469.655 376 472.978 382.646 474.307 398.929 489.261 397.932 506.208 408.233 511.193 409.562 524.484 423.186 537.776 424.516 541.432 426.842 552.398 434.817 553.394 437.807 567.351 450.767 573 458.078 571.006 457.081 557.714 463.062 555.056 469.043 566.022 473.031 555.056 483 542.761 473.031 537.444 478.68 533.789 471.037 527.807 473.363 525.481 466.053 519.832 469.043 516.177 467.714 508.866 462.73 504.214 465.388 499.23 461.068 487.932 458.078 483.944 444.786 488.596 426.177 485.938 427.174 467.994 418.534 466 403.913 476.634 395.938 467.329 378.991 469.655Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path25" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(412.333 527)"
                                                        id="text70">行方市</text>
                                                </g>
                                                <g
                                                    id="g122">
                                                    <path
                                                        d="M402.561 362 392.927 367.667 397.578 379.333 378.311 375.333 379.308 384 372 404.667 391.931 411.667 391.266 418.667 407.875 434 409.204 427.333 418.505 427 427.142 421.333 439.433 423 448.069 416.333 450.727 399.667 462.353 399.667 468 392 467.003 384.667 451.059 382 447.737 373 436.111 378.667 432.125 375.667 412.526 375.333 410.533 371 402.561 362Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path20" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(394.44 404)"
                                                        id="text71">茨城町</text>
                                                </g>
                                                <g
                                                    id="g130">
                                                    <path
                                                        d="M362.228 557 354.913 568.782 345.27 573.158 333.965 567.772 327.315 570.802 332.302 587.634 330.307 595.376 322.66 595.376 320 612.545 351.255 625 362.56 613.554 365.885 619.614 385.835 606.485 388.828 613.218 425.735 609.178 433.05 602.782 452.667 612.881 445.02 599.079 450.672 595.376 453 583.257 448.677 580.228 445.352 584.604 424.405 577.535 424.737 572.485C421.974 571.436 423.024 571.475 421.745 571.475L404.788 564.069 401.795 563.733 386.832 568.109 374.862 565.753 370.54 570.129 369.875 565.079 376.193 562.386 369.21 557 362.228 557Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path30" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(356.5 595)"
                                                        id="text72">稲敷市</text>
                                                </g>
                                                <g
                                                    id="g125">
                                                    <path
                                                        d="M552.333 600.675 559 601.009 563.333 614.382 579.667 631.767 586 652.83 625 703.982 636 705.988 626.333 710 568.667 680.579 566.333 665.869 544.333 646.812 522 640.46 504 615.385 505.333 603.015 514 598 520.333 602.012 552.333 600.675Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path29" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(528.333 632)"
                                                        id="text73">神栖市</text>
                                                </g>
                                                <g
                                                    id="g124">
                                                    <path
                                                        d="M483 524.774 490.299 543.912 497.598 544.584 492.621 550.964 501.248 557.343 507.883 569.095 501.579 576.482 508.215 580.175 507.22 583.197 509.874 587.898 514.519 598.307 523.145 602 553.005 599.985 554 588.905 548.028 581.182 552.009 577.825 541.393 575.139 510.537 510 498.262 514.701 483 524.774Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path28" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(501.333 561)"
                                                        id="text74">鹿嶋市</text>
                                                </g>
                                                <g
                                                    id="g135">
                                                    <path
                                                        d="M306.984 528.025 299.398 526 293.791 534.777 287.194 536.465 288.513 541.191 282.576 536.803 274 552.331 281.916 558.07 286.204 572.248 299.068 579 302.037 569.548 306.984 573.261 317.869 566.172 326.775 571.573 334.031 569.548 337 563.809 333.372 546.93 330.073 537.478 315.56 534.44 306.984 528.025Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path31" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(287.961 556)"
                                                        id="text75">阿見町</text>
                                                </g>
                                                <g
                                                    id="g113">
                                                    <path
                                                        d="M426.605 264.5 428.113 255.5 419.568 240.5 420.07 227.5 411.524 220 417.557 207 407 193.5 423.086 180.5 418.059 171.5 426.103 163.5 419.568 155 419.568 147 408.005 138 418.562 132.5 423.589 140.5 427.611 127 434.649 124 432.135 103 443.195 95.0001 445.205 86.5 460.789 78.0001 474.865 63.0001 487.432 61 481.903 79.5001 473.859 86.5 472.351 103.5 469.335 111 479.892 119.5C480.059 127.333 480.227 135.167 480.395 143L470.843 151.5 473.357 167.5 470.341 180 460.286 182.5 472.854 207 491.957 202 489.443 226.5 498.492 238 497.989 246.5 500 257 489.443 262 481.4 269.5 467.324 269.5 454.254 268.5 445.708 273 426.605 264.5Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path10" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="16"
                                                        transform="translate(407.181 191)"
                                                        id="text53">常陸太田市</text>
                                                </g>
                                                <g
                                                    id="g136">
                                                    <path
                                                        d="M261.333 454 256 460.667 262.667 467.667 256.667 486 272.333 496.667 268.333 506.333 278 520.333 261.667 534.667 273 551 282 538.333 289.667 542.333 289 536.333 294.333 535 299 526.333 307 528.333C306.889 522.556 304.778 516.111 304.667 510.333L313.667 511 316.333 519 329.667 521.333 328 513.667 325.333 508.333 328 505 332.667 506.333 339 498 326.667 490 294 485.333 297 475 294.333 464.667 286.333 464.333 284.667 459 265.333 459.667 261.333 454Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path40" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="14"
                                                        transform="translate(277.732 516)"
                                                        id="text77">土浦市</text>
                                                </g>
                                                <g
                                                    id="g128">
                                                    <path
                                                        d="M301.616 447 285 462 286.662 466 294.305 465.333 297.628 477 292.976 486.667 325.876 491.333 338.172 500 331.526 505.333 327.87 503.667 323.55 509.333 327.538 517.333 328.535 522 343.822 524.667 349.139 519 377.387 526 395 511 386.692 503.667 390.347 499.667 373.066 490 363.761 487 321.224 481 334.184 466.667 328.867 458 325.544 456.667 312.915 437 302.613 439.333 301.616 447Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path26" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(310.963 499)"
                                                        id="text78">かすみがうら市</text>
                                                </g>
                                                <g
                                                    id="g152">
                                                    <path
                                                        d="M353 408.753 347 408.417 331 423.874 349.333 437.652 352.333 441.684 367.333 447.397 370 451.093 355 452.437 351.333 466.887 367.667 474.615 369.667 481 380 469.239 396.333 467.895 404 477.976 419.667 467.895 420.333 453.445 427 447.733 421.667 441.012 407 432.947 392.667 418.162 393 411.105 371.333 403.377 354 398 349.333 400.016 353 408.753Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path23" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(355.728 440)"
                                                        id="text79">小美玉市</text>
                                                </g>
                                                <g
                                                    id="g119">
                                                    <path
                                                        d="M469.78 294 459.401 301.3 456.388 316.894 444 323.198 446.344 342.774 456.722 343.438 472.458 349.742 490.537 363.677 505.604 366 508.282 354.387 520 341.447 510.96 332.82 509.956 310.59 484.511 308.931 469.78 294Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path16" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="14"
                                                        transform="translate(453.104 337)"
                                                        id="text80">ひたちなか市</text>
                                                </g>
                                                <g
                                                    id="g121">
                                                    <path
                                                        d="M478.869 377.333 473.908 375.667 467.292 384 467.954 392 462 400 480.523 410 484.162 392 505 366.667 494.415 363 478.869 377.333Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path18" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(475.87 392)"
                                                        id="text81">大洗町</text>
                                                </g>
                                                <g
                                                    id="g117">
                                                    <path
                                                        d="M484.869 269 474.055 276.609 470 293.481 484.193 309.03 519 313C518.887 309.251 518.775 305.501 518.662 301.752L510.552 300.759 510.552 280.248 484.869 269Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path15" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(484.034 295)"
                                                        id="text82">東海村</text>
                                                </g>
                                                <g
                                                    id="g118">
                                                    <path
                                                        d="M406.835 261 401.417 271.871 396 271.871 396 282.741 396 282.741 405.287 281.965 402.965 290.506 411.478 302.153 426.957 299.824 429.278 321.565 437.017 327 457.139 317.682 460.235 302.153 471.07 293.612 475.713 277.306 485 269.541 450.948 267.988 445.031 270.366 406.835 261Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path14" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="14"
                                                        transform="translate(417.101 292)"
                                                        id="text83">那珂市</text>
                                                </g>
                                                <g
                                                    id="g144">
                                                    <path
                                                        d="M42 483 46.6667 492.449 46 506.135 68.3333 512 76 501.573 79 498.966 69.6667 492.124 65.3333 484.303 42 483Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path51" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(29.6665 504)"
                                                        id="text84">五霞町</text>
                                                </g>
                                                <g
                                                    id="g143">
                                                    <path
                                                        d="M64 482.52 69.961 492.405 81.8831 501.301 92.8117 523.046 99.7662 527 115 517.775 108.708 510.197 111.688 483.179 102.416 474.942 99.4351 477.908 91.1558 478.566 89.8312 470.659 75.5909 470 75.5909 480.214 66.3182 477.578 64 482.52Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path50" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(79.7114 497)"
                                                        id="text85">境町</text>
                                                </g>
                                                <g
                                                    id="g147">
                                                    <path
                                                        d="M140 423.667 143.648 431 157.91 448.333 164.543 465.333 155.588 470.333 155.256 463 147.296 464C147.407 468.444 147.518 472.889 147.628 477.333L154.593 483 167.528 481.333 166.201 474.667 169.518 475.667 191.739 481.667 195.055 461 203.347 458.333 201.357 448.667 206 445.333 198.704 443.333 190.08 428.667 181.457 423.667 162.553 425.333 159.236 419 140 423.667Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path43" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(160.894 451)"
                                                        id="text87">下妻市</text>
                                                </g>
                                                <g
                                                    id="g129">
                                                    <path
                                                        d="M332 539 346.488 543.951 353.402 539.99 359.659 545.602 371.841 540.981C377.428 543.431 375.291 542.684 378.098 543.621L386 552.534 380.402 561.447 375.463 561.777 369.207 557.485 361.963 556.825 356.037 566.728 345.5 573 336.28 569.039 337.598 563.427 332 539Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path32" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(341.33 556)"
                                                        id="text76">美浦村</text>
                                                </g>
                                                <g
                                                    id="g148">
                                                    <path
                                                        d="M138.703 385.723 132.412 374 121.818 377.015 107.912 381.704 104.932 392.087 108.905 398.786 99.6351 407.495 98.6419 419.218 95 431.277 101.291 443 107.581 433.956 114.865 433.956 114.865 433.956 127.446 431.947 129.101 437.306 135.392 432.951 134.73 427.592 139.365 423.238 133.074 410.51 144 395.437 139.696 392.422 138.703 385.723Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path42" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(93.3333 412)"
                                                        id="text88">結城市</text>
                                                </g>
                                                <g
                                                    id="g145">
                                                    <path
                                                        d="M97.9182 419 71.1524 427.579 51.0781 442.426 34.3494 437.807 30 443.416 33.0112 449.025 32.0074 460.574 41.0409 482.68 63.7918 484 66.1338 478.391C67.249 478.501 68.3775 478.52 69.4796 478.721 76.8443 480.066 73.1298 480.041 75.5019 480.041L75.8364 480.371 75.5019 470.142 89.2193 470.472 91.2268 479.381 99.5911 477.731 103.606 471.132 114.312 472.122 113.643 458.594 120 451.665 112.974 433.188 107.286 432.858 101.264 442.096 94.2379 429.888 97.9182 419Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path49" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="14"
                                                        transform="translate(53.9 457)"
                                                        id="text89">古河市</text>
                                                </g>
                                                <g
                                                    id="g142">
                                                    <path
                                                        d="M150.667 577 130.333 569.667 128.333 553.333 99 528 114 518 108 510.667 111.667 484.333 101.333 475.667 103.667 472 118 473.667 126.333 477.333 136.333 490.333 152.667 505 158.667 521 168 531 164.333 542 147.667 548.333 150.667 577Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path47" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(115.987 531)"
                                                        id="text90">坂東市</text>
                                                </g>
                                                <g
                                                    id="g141">
                                                    <path
                                                        d="M147.414 477.333 144.057 481.667 137.007 481 136 490.333 152.449 505 158.827 520.333 168.227 531 163.527 541 147.078 547.667 150.771 576.333 154.799 578 161.849 572 175.277 574.333 176.619 571.667 178.969 555.667 186.355 560.333 188.033 549.667 198.775 544.667 207 532.25 194.747 524 192.733 506.667C192.845 501.889 192.957 497.111 193.069 492.333L188.704 479.333 165.206 473 166.884 479.667 153.792 481.333 147.414 477.333Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path44" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(157.5 519)"
                                                        id="text91">常総市</text>
                                                </g>
                                                <g
                                                    id="g140">
                                                    <path
                                                        d="M176.503 572.33 175.179 574.643 162.931 572 156.972 575.964 159.29 580.92 153 591.491 171.207 603.384 189.414 609 199.014 597.107 201 587.527 176.503 572.33Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path46" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(158.13 597)"
                                                        id="text93">守谷市</text>
                                                </g>
                                                <g
                                                    id="g139">
                                                    <path
                                                        d="M202 588.667 199.333 597.333 189 608.667 199.333 609 218.667 624.667 226.333 634 228 631.667 232.667 628.667 249.667 629.333 255.333 633 259.667 626.333 259.667 626.333 272 615.333 260 607 260.333 601.333 251.333 585 245 591 231.667 589.667 223.333 596.333 215.667 594 211.333 597 202 588.667Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path37" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(216.703 615)"
                                                        id="text94">取手市</text>
                                                </g>
                                                <g
                                                    id="g146">
                                                    <path
                                                        d="M113.013 434.387 116.052 443.768 120.104 452.479 112 460.521 114.701 473.253 126.519 477.273 135.974 489 137.662 481.964 145.429 481.294 148.468 476.938 147.117 463.201 154.883 462.866 156.234 469.902 164 465.211 158.26 446.784 142.727 430.366 139.688 424 134.286 427.686 135.636 432.711 127.532 436.732 126.857 431.706 113.013 434.387Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path48" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(109.305 460)"
                                                        id="text86">八千代町</text>
                                                </g>
                                                <g
                                                    id="g133">
                                                    <path
                                                        d="M250 584.973 259.333 601.74 258.333 606.671 270.667 615.219 257.333 624.753 272.667 627.055 280 622.781 285.667 622.781 291.667 631 299.333 629.027 306.667 619.493 319.667 612.26 323 594.836 318.333 590.562 305 588.26 294.667 583 287.333 586.288 280.667 597.466 277.667 590.233 273.667 585.63 270.333 590.89 250 584.973Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path35" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(268.797 613)"
                                                        id="text95">龍ケ崎市</text>
                                                </g>
                                                <g
                                                    id="g134">
                                                    <path
                                                        d="M273.77 552.263 273.77 552.263 264.066 540 265.739 556.24 259.381 555.909 265.07 565.52 255.366 569.497 247 566.514 250.012 584.743 270.424 591.04 274.774 586.069 278.455 592.034 280.798 598 287.825 586.731 293.179 584.08 304.556 587.726 317.607 590.046 326.642 597.669 331.661 595.349 333 587.394 327.646 569.829 319.28 564.194 307.568 571.486 302.214 568.834 298.198 576.789 285.817 571.817 281.467 556.571 273.77 552.263Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path36" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(268.297 581)"
                                                        id="text96">牛久市</text>
                                                </g>
                                                <g
                                                    id="g131">
                                                    <path
                                                        d="M319 612.333 305.667 620.333 299 629 304.333 634.667 305.667 642.333 316.667 648 327.333 634.667 342 632 359.667 640.667 374 623.333 389 614.333 386.333 607 365.333 618.333 362.667 612.667 352.333 624.667 319 612.333Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path33" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(323.538 636)"
                                                        id="text97">河内町</text>
                                                </g>
                                                <g
                                                    id="g138">
                                                    <path
                                                        d="M206.862 532 218.475 539.745 215.157 552.541 225.774 553.551 235.396 563.653 238.051 578.806 249 585.878 244.687 590.929 231.415 590.255 223.452 596.653 215.488 594.296 209.516 598 201.221 587.224 177 571.735 179.654 553.888 185.627 559.949 188.281 548.5 198.899 544.796 206.862 532Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path45" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(169.363 572)"
                                                        id="text92">つくばみらい市</text>
                                                </g>
                                                <g
                                                    id="g132">
                                                    <path
                                                        d="M261 625.27 253 632.568 259 647.486 273.333 653 292 640.351 306 640.351 303.667 632.568 300.333 629.324 291 631.919 287.083 623 279.667 623.486 272 627.703 261 625.27Z"
                                                        stroke="#FFFFFF"
                                                        stroke-width="2"
                                                        stroke-miterlimit="8"
                                                        fill="#10B981"
                                                        fill-rule="evenodd"
                                                        id="path34" />
                                                    <text
                                                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        font-weight="700"
                                                        font-size="12"
                                                        transform="translate(260.203 645)"
                                                        id="text99">利根町</text>
                                                </g>

                                                <text
                                                    fill="#7F7F7F"
                                                    font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                    font-weight="900"
                                                    font-size="18.6667"
                                                    transform="translate(105.634 225)"
                                                    id="text101">栃木県</text>
                                                <text
                                                    fill="#7F7F7F"
                                                    font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                    font-weight="900"
                                                    font-size="18.6667"
                                                    transform="translate(402.635 35)"
                                                    id="text103">福島県</text>
                                                <text
                                                    fill="#7F7F7F"
                                                    font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                    font-weight="900"
                                                    font-size="18.6667"
                                                    transform="translate(21.5 589)"
                                                    id="text105">埼玉県</text>
                                                <text
                                                    fill="#7F7F7F"
                                                    font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                    font-weight="900"
                                                    font-size="18.6667"
                                                    transform="translate(345.779 682)"
                                                    id="text107">千葉県</text>
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
            </div >
        </>
    );
};

export default Ibaraki;