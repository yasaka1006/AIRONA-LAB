import { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const Kanagawa = () => {
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

    // 市区町村のリスト（複数の名前に対応）
    const allDistricts = [
        // 市部 (19市)
        { id: '横浜市', names: ['横浜市', 'よこはまし'] },
        { id: '川崎市', names: ['川崎市', 'かわさきし'] },
        { id: '相模原市', names: ['相模原市', 'さがみはらし'] },
        { id: '横須賀市', names: ['横須賀市', 'よこすかし'] },
        { id: '平塚市', names: ['平塚市', 'ひらつかし'] },
        { id: '鎌倉市', names: ['鎌倉市', 'かまくらし'] },
        { id: '藤沢市', names: ['藤沢市', 'ふじさわし'] },
        { id: '小田原市', names: ['小田原市', 'おだわらし'] },
        { id: '茅ヶ崎市', names: ['茅ヶ崎市', 'ちがさきし'] },
        { id: '逗子市', names: ['逗子市', 'ずしし'] },
        { id: '三浦市', names: ['三浦市', 'みうらし'] },
        { id: '秦野市', names: ['秦野市', 'はだのし'] },
        { id: '厚木市', names: ['厚木市', 'あつぎし'] },
        { id: '大和市', names: ['大和市', 'やまとし'] },
        { id: '伊勢原市', names: ['伊勢原市', 'いせはらし'] },
        { id: '海老名市', names: ['海老名市', 'えびなし'] },
        { id: '座間市', names: ['座間市', 'ざまし'] },
        { id: '南足柄市', names: ['南足柄市', 'みなみあしがらし'] },
        { id: '綾瀬市', names: ['綾瀬市', 'あやせし'] },

        // 町村部 (13町、1村)
        { id: '葉山町', names: ['葉山町', 'はやままち'] },
        { id: '寒川町', names: ['寒川町', 'さむかわまち'] },
        { id: '大磯町', names: ['大磯町', 'おおいそまち'] },
        { id: '二宮町', names: ['二宮町', 'にのみやまち'] },
        { id: '中井町', names: ['中井町', 'なかいまち'] },
        { id: '大井町', names: ['大井町', 'おおいまち'] },
        { id: '松田町', names: ['松田町', 'まつだまち'] },
        { id: '山北町', names: ['山北町', 'やまきたまち'] },
        { id: '開成町', names: ['開成町', 'かいせいまち'] },
        { id: '箱根町', names: ['箱根町', 'はこねまち'] },
        { id: '真鶴町', names: ['真鶴町', 'まなづるまち'] },
        { id: '湯河原町', names: ['湯河原町', 'ゆがわらまち'] },
        { id: '愛川町', names: ['愛川町', 'あいかわまち'] },
        { id: '清川村', names: ['清川村', 'きよかわむら'] }
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

            {/* メインコンテンツエリア */}
            <div className="w-full mt-4 bg-white py-5 px-2 md:px-5 rounded-xl shadow-lg">
                {/* タイトルセクション */}
                <div className="text-center mb-5">
                    <h2 className="text-1xl md:text-3xl font-extrabold text-slate-700 ">
                        神奈川県の市区町村全部言えるかな？
                    </h2>
                </div>

                {/* 地図エリア */}
                <div
                    ref={containerRef}
                    className="relative w-full max-w-auto mx-auto aspect-[1280/720] my-5 rounded-2xl overflow-hidden shadow-2xl border border-slate-300/50"
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
                                        viewBox="0 0 1280 720"
                                        preserveAspectRatio="xMidYMid meet"
                                        style={{ display: 'block', width: '100%', height: 'auto' }}
                                        version="1"
                                        id="svg148"
                                        className="w-full h-full"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                    >
                                        <g id="g120">
                                            <rect
                                                x="0"
                                                y="0"
                                                width="1280"
                                                height="725"
                                                fill="#CAEEFB"
                                                id="rect3" />
                                            <path
                                                d="M-15-12 404-5 397 178 183 367-28 375-15-12Z"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeMiterlimit="8"
                                                fill="#A0EBD2"
                                                fillRule="evenodd"
                                                id="path3" />
                                            <path
                                                d="M346 688 346 698 344 745-41 738-29 369 51 338 225 319 288 381 312 564 346 688Z"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeMiterlimit="8"
                                                fill="#A0EBD2"
                                                fillRule="evenodd"
                                                id="path4" />
                                            <path
                                                d="M367 18 340-8 1207-7 1168 28 1126 30 1118 78 1088 68 1097 50 1077 42 1069 77 1105 131 1091 140 1105 147 1121 189 1111 199 947 198 768 261 426 110 367 18Z"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeMiterlimit="8"
                                                fill="#A0EBD2"
                                                fillRule="evenodd"
                                                id="path5" />
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(70.6729 514)"
                                                id="text38">静岡県</text>
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(102.66 126)"
                                                id="text40">山梨県</text>
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21.3333"
                                                transform="translate(647.006 47)"
                                                id="text42">東京都</text>
                                            <g id="group">

                                                <g
                                                    id="g79">
                                                    <path
                                                        d="M1020.97 253.462 1033 270.812 1017.63 278.82 1006.94 258.801 1020.97 253.462ZM811.828 116 847.243 133.35 863.279 146.695 887.334 146.695 904.039 157.372 924.753 157.372 930.767 158.707 954.153 160.709 947.471 180.06 963.508 191.404 984.89 184.064 988.231 198.744 1007.61 226.103 1020.97 246.122 1004.27 254.13 1000.93 244.788 995.581 260.803 982.886 272.147 988.899 271.479 995.581 270.145 1006.94 287.494 999.59 296.169 968.185 278.82 970.19 264.139 954.153 265.474 951.481 283.491 939.453 274.816 937.448 288.829 960.167 297.504 958.831 307.513 969.522 293.5 994.245 308.18 984.222 341.545 998.254 350.22 977.54 364.9 956.158 347.551 932.103 348.218 942.126 356.226 934.776 362.898 928.762 377.579 954.822 376.244 946.135 386.921 956.158 399.6 948.14 403.603 959.499 430.295 947.471 443.641 934.108 438.97 935.444 454.318 905.375 471 888.67 470.333 880.652 446.977 871.966 444.976 859.938 426.959 849.915 428.961 830.538 407.607 809.156 413.613 782.428 404.271 775.746 414.28 763.719 409.609 771.069 390.925 762.382 377.579 753.027 369.571 755.032 336.874 747.682 328.199 755.7 302.175 749.687 296.836 749.018 280.154 748.35 258.133 742.336 242.786 741 225.436 764.387 230.774 760.378 218.096 768.396 192.071 756.368 178.058 755.032 159.374 745.677 154.036 756.368 130.013 767.728 130.68 764.387 141.357 769.732 150.032 788.442 139.355 794.455 147.363 807.151 138.021 811.828 116Z"
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
                                                        transform="translate(836.238 304)"
                                                        id="text44">横浜市</text>
                                                </g>
                                                <g
                                                    id="g78">
                                                    <path
                                                        d="M1069.59 224.402 1091.62 226.399 1089.62 234.387 1056.23 251.693 1046.21 245.702 1051.56 259.681 1046.21 269 1030.85 269 1020.84 253.025 1042.21 241.043ZM810.481 52 848.546 63.9816 861.234 75.9632 907.98 86.6135 948.047 117.899 962.739 116.567 981.437 151.847 1008.82 169.819 998.8 173.813 1006.15 189.123 1032.86 179.138 1057.57 176.475 1117 203.767 1104.98 222.405 1097.63 219.077 1062.91 225.067 1020.17 246.368 1008.15 227.064 985.444 194.448 985.444 184.463 964.742 191.12 947.38 178.472 954.725 161.166 901.969 156.506 889.949 147.853 863.237 147.187 849.881 133.874 810.481 116.567 808.478 139.199 793.786 147.853 787.776 136.537 775.756 129.88 773.753 119.896 741.698 96.5982 727.007 99.2607 723 85.9479 739.027 75.2975 760.397 91.273 777.092 97.9294 779.763 80.6227 795.79 73.9663Z"
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
                                                        transform="translate(911.667 141)"
                                                        id="text45">川崎市</text>
                                                </g>
                                                <g
                                                    id="g77">
                                                    <path
                                                        d="M368.968 17 350.913 27.4583 353.764 44.572 357.565 77.8485 367.067 90.2083 355.664 114.928 366.117 145.352 344.262 163.417 342.362 182.432 314.805 209.053 292 225.216 306.253 247.083 316.706 247.083 323.357 255.64 331.909 260.394 357.565 262.295 367.067 247.083 401.275 268 434.532 224.265 463.039 204.299 465.89 186.235 481.093 191.939 500.097 172.924 521.952 173.875 532.405 160.564 553.31 167.22 569.463 182.432 587.517 179.58 615.074 198.595 641.68 210.955 636.929 242.33 673.987 237.576 687.29 215.708 699.643 227.117 731 204.299 720.548 189.087 704.394 177.678 674.937 136.795 624.576 109.224 583.716 99.716 565.662 102.568 554.26 99.716 545.708 90.2083 520.052 93.0607 508.649 102.568 470.641 82.6023 454.487 45.5227 439.284 41.7197 428.831 48.3751 415.528 49.3258 406.026 30.3107 393.673 21.7539C373.392 19.6177 381.61 20.7086 368.968 17Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path6" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(476.994 141)"
                                                        id="text46">相模原市</text>
                                                </g>
                                                <g
                                                    id="g91">
                                                    <path
                                                        d="M613.727 196 605.743 212.602 608.072 217.915 605.078 238.501 582.456 225.219 566.155 205.297 554.845 205.297 539.542 217.915 528.896 219.907 540.207 251.45 550.853 262.408 550.187 278.014 506.275 287.311 484.651 278.678 477.333 291.959C477.222 297.604 477.111 303.249 477 308.893L489.641 309.225 501.618 298.6 507.606 301.92 524.239 308.561 554.845 315.534 578.131 332.468 583.454 328.151 606.076 341.765 612.396 363.348 632.357 367 634.353 363.016 634.685 356.707 627.699 346.746 634.353 335.124 636.681 313.542 631.359 307.233 640.008 292.291 644 267.72 636.349 258.091 637.014 240.825 641.671 207.953 613.727 196Z"
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
                                                        transform="translate(571.405 283)"
                                                        id="text47">厚木市</text>
                                                </g>
                                                <g
                                                    id="g92">
                                                    <path
                                                        d="M402.667 267 404 279.667 398 293 438.667 299 446.667 285 477.333 293 486 280.333 507.333 287 550 280.333 552 263.667 540 250.333 528.667 219 512 220.333 508 209.667 500 205.667 492.667 179 481.333 189.667 466 184.333 462.667 204.333 433.333 222.333 402.667 267Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path7" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(455.644 253)"
                                                        id="text48">清川村</text>
                                                </g>
                                                <g
                                                    id="g82">
                                                    <path
                                                        d="M934.571 453.992 960.997 452 962.334 461.962 947.951 466.278 931.227 488.194 937.247 494.835 951.965 478.564 958.321 488.194 950.293 501.144 958.99 506.789 963.672 485.869 982.739 490.85 978.39 505.793 997.122 531.029 1043.95 533.685 1058 547.964 1032.58 563.902 1041.28 579.841 1034.25 585.486 1025.22 581.169 1021.21 584.489 1033.25 596.111 994.781 602.752 967.352 623.008 952.969 606.405 924.871 605.409 919.185 617.363 904.132 625 889.08 619.023 904.132 601.092 919.185 601.092 918.85 592.791 900.118 586.482 887.742 586.15 893.763 573.532 885.401 558.921 866 547.964 900.118 543.315 910.822 538.998C914.785 541.948 912.57 540.376 917.512 543.647L921.526 546.635 935.909 533.353 934.237 520.071 917.512 514.758 916.174 506.457 918.516 498.155 912.16 485.869 903.129 477.9 904.132 470.927 934.571 453.992Z"
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
                                                        transform="translate(934.333 567)"
                                                        id="text49">横須賀市</text>
                                                </g>
                                                <g
                                                    id="g83">
                                                    <path
                                                        d="M919.073 618.619 905.016 624.598 910.371 635.892 913.383 658.147 902.673 660.472 901 676.748 908.698 687.045 901.335 700 928.778 699.668 928.109 692.36 962.246 695.682 967.601 685.052C969.747 688.248 969.069 686.971 969.944 688.706L972.956 692.36 984 693.357 983.331 666.783 961.242 665.122 954.883 635.227 967.935 621.941 951.871 606.329 924.093 605 919.073 618.619Z"
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
                                                        transform="translate(912.333 659)"
                                                        id="text50">三浦市</text>
                                                </g>
                                                <g
                                                    id="g85">
                                                    <path
                                                        d="M782.95 404 776.966 413.296 795.581 432.552 793.587 441.184 778.296 448.82 774.64 461.104 765 476.708 810.872 486.336 820.179 478.036 834.804 481.024 837.464 487 853.087 476.044 856.078 476.708 871.369 469.072 884 457.784 881.008 445.832 871.036 444.504 859.735 425.912 850.427 428.236 830.151 406.988 809.542 413.628 782.95 404Z"
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
                                                        transform="translate(803.204 457)"
                                                        id="text51">鎌倉市</text>
                                                </g>
                                                <g
                                                    id="g84">
                                                    <path
                                                        d="M720.482 324 716.806 325.336 730.172 342.036 718.477 350.719 703.775 336.358 683.058 338.362 670.027 357.065 659 361.073 668.69 373.765 665.015 381.781 676.041 387.125 693.416 380.111 704.443 385.789 702.438 394.472 712.462 402.154 709.455 407.832 715.47 425.868 712.462 462.941 757.906 478.304 749.552 489.994 767.93 493 765.257 475.966 776.283 457.263 779.959 448.579 794.327 441.565 797 432.213 776.617 412.842 765.257 408.5 771.605 388.794 763.252 376.103 752.893 368.087 756.569 335.356 750.22 327.34 738.86 331.348 720.482 324Z"
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
                                                        transform="translate(720.405 426)"
                                                        id="text52">藤沢市</text>
                                                </g>
                                                <g
                                                    id="g86">
                                                    <path
                                                        d="M636.667 423.838 629 435.129 639.333 443.432 631.333 453.727 637.667 467.675 678.667 470 712.667 462.694 715 424.834 710 407.897 714.333 402.583 701.333 393.284 704.333 384.317 694 380 673.667 386.31 671.667 386.974 670 402.251 658.667 405.904 659.667 422.177 636.667 423.838Z"
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
                                                        transform="translate(643.423 448)"
                                                        id="text53">茅ヶ崎市</text>
                                                </g>
                                                <g
                                                    id="g94">
                                                    <path
                                                        d="M537.446 381.333 544.795 391.333 526.088 395 519.407 412.667 495.69 420 485 436.333 497.36 450.667 511.39 445.667 550.474 452.667 557.489 460 588.222 454 586.552 462.667 590.56 471.667 615.28 473 639.332 469 633.653 453.333 640 444.333 629.978 435 636.994 424.333 636.325 421 630.647 407 633.319 399.333 636.325 398 634.321 366.667 631.315 366.333 612.942 362 617.953 376 613.276 385.667 610.269 378.333 603.254 384.667 597.575 378 579.871 385 576.196 404.667 556.821 373.333 554.149 374.333 553.481 385 537.446 381.333Z"
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
                                                        transform="translate(553.803 432)"
                                                        id="text54">平塚市</text>
                                                </g>
                                                <g
                                                    id="g93">
                                                    <path
                                                        d="M477 308.032 481.667 330.436 497.333 350.166 505.667 365.213 497.667 379.927 510.667 385.277 522 377.252 538 380.93 553.667 384.274 555.667 376.583 575.667 403 579.333 384.943C582.888 385.299 581.55 385.277 583.333 385.277L596.333 378.589 603.333 385.611 610.667 375.914 612.667 387.952 619 376.248 612.333 361.535 605 340.468 583.333 327.427 576.333 331.774 555.667 313.382 526 308.366 502 298 487 308.366 477 308.032Z"
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
                                                        transform="translate(519.494 354)"
                                                        id="text55">伊勢原市</text>
                                                </g>
                                                <g
                                                    id="g99">
                                                    <path
                                                        d="M398.336 293.25 390.058 305 377.014 305.5 373 316.25 382.783 346 384.037 372.25 376.763 383.25 397.834 415 409.122 414 419.157 429 452.018 411.5 460.798 421.5 495.666 420.25 519.497 413 525.768 393.75 545 391.25 537.558 381 522.005 376.75 511.47 384.5 499.178 380.5 505.449 364.75 496.419 347 481.869 330.25 476.601 308 476.35 291.25 446.499 284 439.225 297.75 398.336 293.25Z"
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
                                                        transform="translate(420.321 366)"
                                                        id="text56">秦野市</text>
                                                </g>
                                                <g
                                                    id="g108">
                                                    <path
                                                        d="M292.534 225.977 272.844 218 266.837 224.647 265.169 235.616 247.147 256.555 221.784 264.2 204.764 263.535 196.755 275.501 186.409 273.839 137.685 305.082 130.343 322.365 138.019 329.345 131.678 344.302 122.334 347.626C122.223 351.836 122.111 356.046 122 360.256L142.691 364.245 185.074 353.276 215.11 356.268C215.221 363.912 215.332 371.557 215.443 379.201L228.792 409.78 232.13 420.748 225.789 426.731 237.469 449 247.147 448.668 251.486 441.023 266.837 435.04 281.855 418.422 309.221 425.069 328.91 419.086 339.923 421.081 347.265 417.424 347.265 414.433 361.949 390.502 332.248 372.554 330.913 349.953 335.251 345.299 330.913 334.663 363.284 302.423 376.967 305.082 391.317 305.082 399.327 292.452 405 277.495 401.663 266.527 366.288 246.252 357.277 261.873 332.581 260.212 323.237 255.226 316.229 246.584 305.883 246.584 292.534 225.977Z"
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
                                                        transform="translate(245.238 335)"
                                                        id="text57">山北町</text>
                                                </g>
                                                <g
                                                    id="g104">
                                                    <path
                                                        d="M250.929 441.07 245.94 448.761 236.628 448.761 222.661 478.188 220 496.914 231.307 512.631 253.589 518.65 267.557 509.621 282.855 524 338.395 514.303 358.349 505.943 365 475.513 362.672 463.14 354.025 459.127 346.709 440.736 338.062 430.369 339.06 421.341 328.085 419 308.796 425.019 281.525 419 263.234 435.385 250.929 441.07Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path35" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="16"
                                                        transform="translate(260.024 475)"
                                                        id="text58">南足柄市</text>
                                                </g>
                                                <g
                                                    id="g102">
                                                    <path
                                                        d="M373.667 457.682 361.667 464.026 365.667 476.381 358.333 505.765 338.333 513.779 283 524.798 291.333 546.837 283.333 555.518 311.667 569.209 321.667 558.523 326.667 560.527 351.667 565.202 343.667 581.563 319.667 589.243 310 597.925 306.333 615.623 340.667 636.325 354.333 634.656 361 641 372 640.332 379 603.268 377.333 579.894 396.333 550.844 429.333 538.155 449 514.781 467 512.777 482.667 502.76 479 486.732 483 469.703 478.667 462.357 440.667 472.708 433.667 462.357 418 449 387 471.706 373.667 457.682Z"
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
                                                        transform="translate(354 538)"
                                                        id="text59">小田原市</text>
                                                </g>
                                                <g
                                                    id="g105">
                                                    <path
                                                        d="M219.601 497 191.99 527.067 190.659 529.74 187 555.464 188.331 558.805 198.976 594.217 204.964 603.238 202.302 613.594 228.583 635.309 249.208 646 285.8 624.953 296.778 612.926 306.093 615.599 310.085 597.892 319.732 588.872 343.683 581.857 352 564.818 327.05 560.475 322.06 558.471 312.413 568.159 283.804 555.464 291.123 547.446 283.139 525.063 267.504 509.695 252.867 517.379 232.575 513.036 219.601 497Z"
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
                                                        transform="translate(226.66 583)"
                                                        id="text60">箱根町</text>
                                                </g>
                                                <g
                                                    id="g106">
                                                    <path
                                                        d="M297.333 613 285.333 624.286 267.333 634.908 249 646.525 250.333 677.395 263.333 675.735 267 676.067 288 681.71 304.333 680.714 318.667 690.34 327.667 687.685C330.873 689.814 329.592 689.141 331.333 690.008L345.333 692 368 676.399 358.667 667.105 361.667 658.475 348.667 646.525 340.667 636.567 306.333 616.651 297.333 613Z"
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
                                                        transform="translate(274.157 661)"
                                                        id="text61">湯河原町</text>
                                                </g>
                                                <g
                                                    id="g107">
                                                    <path
                                                        d="M342 635.676 349 646.739 361.333 658.472 358.667 666.852 371.333 680.261 388.333 693 392.333 692.665 402 690.989 393.667 681.938 389.333 680.261 381.333 679.256 375 662.83 380 651.432 371.333 639.364 361.333 639.699 354 634 342 635.676Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path32" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(366 665)"
                                                        id="text62">真鶴町</text>
                                                </g>
                                                <g
                                                    id="g109">
                                                    <path
                                                        d="M643.845 268.338 639.465 292.089 630.706 307.477 636.433 314.836 634.749 335.911 627 345.947 635.422 359.662 661.364 361 672.144 357.655 675.85 348.623 678.545 319.854 671.807 299.114 690 274.359 667.428 267 652.604 273.69 643.845 268.338Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path22" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(617.866 326)"
                                                        id="text63">海老名市</text>
                                                </g>
                                                <g
                                                    id="g95">
                                                    <path
                                                        d="M635.25 359 635.25 398.136 632.625 399.794 630 408.085 637.875 425 660.516 422.347C660.406 417.04 660.297 411.734 660.188 406.427L672 401.121 672 383.874 667.078 382.216 670.031 375.251 659.531 360.99 635.25 359Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path20" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(625.768 396)"
                                                        id="text64">寒川町</text>
                                                </g>
                                                <g
                                                    id="g87">
                                                    <path
                                                        d="M688.667 273.716 680.333 286.429 671 299.142 677.333 319.549 674.667 350.996 684 338.953 704 337.28 718.333 352 731 341.629 717 325.236 720.333 321.222 721.333 305.164 727 295.127 724.333 277.396 706 274.385 708.333 260 688.667 273.716Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path19" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(677.768 311)"
                                                        id="text65">綾瀬市</text>
                                                </g>
                                                <g
                                                    id="g88">
                                                    <path
                                                        d="M741.667 225.61 740.667 210.317 730.667 204 701 226.94 710 259.522 705.667 275.813 724.667 278.14 727.667 296.426 721.333 306.4 720.667 324.686 740.333 332 750 328.01 756 301.413 750.333 296.094 749 257.527 742.667 242.899 741.667 225.61Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path11" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(711.971 263)"
                                                        id="text66">大和市</text>
                                                </g>
                                                <g
                                                    id="g89">
                                                    <path
                                                        d="M637 242.333C637.111 247.778 637.222 253.222 637.333 258.667L648.333 273.333 652.333 274 667 268.333 671 269.667 690 273.667 711 258.667 700.667 228.333 687 215 673.333 236.333 637 242.333Z"
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
                                                        transform="translate(654.167 256)"
                                                        id="text67">座間市</text>
                                                </g>
                                                <g
                                                    id="g90">
                                                    <path
                                                        d="M493 178.746 499.034 206.195 509.089 209.542 511.771 220.254 539.257 218.246 555.346 206.195 566.743 206.195 582.162 226.28 605.626 239 610.318 218.246 606.966 212.89 613 195.483 588.866 179.415 568.754 183.432 554.006 167.364 531.883 160 519.816 173.39 497.693 171.381 493 178.746Z"
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
                                                        transform="translate(524.595 198)"
                                                        id="text68">愛川町</text>
                                                </g>
                                                <g
                                                    id="g96">
                                                    <path
                                                        d="M497 450.688 506.828 469.978 513.885 471.957 519.933 491 575.123 481.849 591 470.473 587.22 462.312 588.984 452.667 557.987 458.849 551.182 452.667 511.617 445 497 450.688Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path26" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(528.119 475)"
                                                        id="text69">大磯町</text>
                                                </g>
                                                <g
                                                    id="g97">
                                                    <path
                                                        d="M479 462.442 483.722 470.903 479 486.829 482.976 504 521 490.811 513.793 471.401 507.083 469.908 496.396 450 479 462.442Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path28" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(468.815 486)"
                                                        id="text70">二宮町</text>
                                                </g>
                                                <g
                                                    id="g98">
                                                    <path
                                                        d="M497.245 420 497.245 420 461.989 422.75 451.664 412 429.42 421.667 433.785 434.5 430.007 448.5 429 459.75 440.08 474 442.347 474 474.832 464.75 498 449 485.912 436.5 497.245 420Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path27" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(440.809 446)"
                                                        id="text71">中井町</text>
                                                </g>
                                                <g
                                                    id="g101">
                                                    <path
                                                        d="M397.847 415.349 395.525 427.486 367 438.949 373.302 456.817 386.569 473 417.416 449.4 429.025 459.177 431.015 443.331 434 433.891 429.356 422.429 418.411 427.486 409.787 414 397.847 415.349Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path30" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(382.762 447)"
                                                        id="text72">大井町</text>
                                                </g>
                                                <g
                                                    id="g100">
                                                    <path
                                                        d="M362.83 301 329.67 334.918 334.024 344.229 329 350.88 332.015 372.494 361.155 390.118 345.748 414.393 346.083 417.053 364.505 427.694 369.864 439 396.66 427.361 398 413.728 377.568 382.137 383.932 371.496 384.602 343.896 373.883 315.964 377.903 305.323 362.83 301Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path38" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(337.899 366)"
                                                        id="text73">松田町</text>
                                                </g>
                                                <g
                                                    id="g103">
                                                    <path
                                                        d="M346.08 417 339.018 422 337 431.333 347.089 442.333 353.478 460 364.575 465 375 458 369.619 437 364.239 426.667 346.08 417Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path36" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(323.744 447)"
                                                        id="text74">開成町</text>
                                                </g>
                                                <g
                                                    id="g81">
                                                    <path
                                                        d="M856.645 505.886 851 510.165 858.305 527.279 854.984 534.19 868.93 549 907.113 542.089 911.098 539.127 921.391 546.367 936 533.532 933.676 519.051 917.406 514.443 916.742 518.063 892.836 515.101 899.477 510.823 903.129 500.949 878.891 497 863.949 509.177 856.645 505.886Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path16" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(868.371 533)"
                                                        id="text75">葉山町</text>
                                                </g>
                                                <g
                                                    id="g80">
                                                    <path
                                                        d="M884.191 457 872.813 468.059 855.745 476.103 852.398 475.432 848.717 477.778 837.673 484.816 836 494.535 843.697 500.568 860.43 499.562 855.076 505.93 863.442 509.616 879.171 497.551 904.271 500.903 899.586 510.957 890.215 514.978 918.661 519 916.319 508.276 920 498.222 913.307 484.816 909.625 482.47 904.271 477.778 903.936 469.065 888.876 469.735 884.191 457Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path14" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(854.552 491)"
                                                        id="text76">逗子市</text>
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

export default Kanagawa;