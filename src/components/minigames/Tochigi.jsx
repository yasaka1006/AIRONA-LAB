import { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import ClearModal from '../assets/ClearModal';

const Tochigi = () => {
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
    const gameTitle = '栃木県の市区町村全部言えるかな？';

    // 市区町村のリスト（複数の名前に対応）
    const allDistricts = [
        { id: '宇都宮市', names: ['宇都宮市', 'うつのみやし'] },
        { id: '足利市', names: ['足利市', 'あしかがし'] },
        { id: '栃木市', names: ['栃木市', 'とちぎし'] },
        { id: '佐野市', names: ['佐野市', 'さのし'] },
        { id: '鹿沼市', names: ['鹿沼市', 'かぬまし'] },
        { id: '日光市', names: ['日光市', 'にっこうし'] },
        { id: '小山市', names: ['小山市', 'おやまし'] },
        { id: '真岡市', names: ['真岡市', 'もおかし'] },
        { id: '大田原市', names: ['大田原市', 'おおたわらし'] },
        { id: '矢板市', names: ['矢板市', 'やいたし'] },
        { id: '那須塩原市', names: ['那須塩原市', 'なすしおばらし'] },
        { id: 'さくら市', names: ['さくら市', 'さくらし'] },
        { id: '那須烏山市', names: ['那須烏山市', 'なすからすやまし'] },
        { id: '下野市', names: ['下野市', 'しもつけし'] },
        { id: '上三川町', names: ['上三川町', 'かみのかわまち'] },
        { id: '益子町', names: ['益子町', 'ましこまち'] },
        { id: '茂木町', names: ['茂木町', 'もてぎまち'] },
        { id: '市貝町', names: ['市貝町', 'いちかいまち'] },
        { id: '芳賀町', names: ['芳賀町', 'はがまち'] },
        { id: '壬生町', names: ['壬生町', 'みぶまち'] },
        { id: '野木町', names: ['野木町', 'のぎまち'] },
        { id: '塩谷町', names: ['塩谷町', 'しおやまち'] },
        { id: '高根沢町', names: ['高根沢町', 'たかねざわまち'] },
        { id: '那須町', names: ['那須町', 'なすまち'] },
        { id: '那珂川町', names: ['那珂川町', 'なかがわまち'] }
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
                                                id="rect2" />
                                            <rect
                                                x="0"
                                                y="0"
                                                width="720"
                                                height="720"
                                                fill="#FFFFFF"
                                                id="rect2" />
                                            <path
                                                d="M661 176 695 171 714 204 736 202 742 209 735 224 743 241 780 254 780 723 295 732 291 694 648 159 661 176Z"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeMiterlimit="8"
                                                fill="#A0EBD2"
                                                fillRule="evenodd"
                                                id="path2" />
                                            <path
                                                d="M-49 654-49 725 298 729 295 699 269 689 55 638-49 654Z"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeMiterlimit="8"
                                                fill="#A0EBD2"
                                                fillRule="evenodd"
                                                id="path3" />
                                            <path
                                                d="M-48 123-48 653 20 681 32 673 49 677 61 684 77 666 101 687 124 695 129 708 177 712 229 701 247 715 283 698 163 389 98 361 120 250 98 169-25 113-48 117-48 123Z"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeMiterlimit="8"
                                                fill="#A0EBD2"
                                                fillRule="evenodd"
                                                id="path4" />
                                            <path
                                                d="M8-3 778-3 778 253 742 242 735 226 741 212 734 203 713 205 695 173 685 173 676 172 667 179 657 172 506 29 344 94 109 194 81 180 71 187 49 176 33 163 0 169 0 156 11 116 2 110 14 78 2 44 0 21 8 8 8-3Z"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeMiterlimit="8"
                                                fill="#A0EBD2"
                                                fillRule="evenodd"
                                                id="path5" />
                                            <path
                                                d="M-46-5-47 120-34 130-33 148 2 158 12 118 5 111 15 82 3 50 1 26 9 9 8-3-46-5Z"
                                                stroke="#FFFFFF"
                                                strokeWidth="2"
                                                strokeMiterlimit="8"
                                                fill="#A0EBD2"
                                                fillRule="evenodd"
                                                id="path6" />
                                            <path
                                                d="M108 290 107 331 173 350 186 300 108 290Z"
                                                fill="#CAEEFB"
                                                fillRule="evenodd"
                                                id="path7" />
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21"
                                                transform="translate(27 450)"
                                                id="text56">群馬県</text>
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21"
                                                transform="translate(91 450)"
                                                id="text57" />
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21"
                                                transform="translate(148 69)"
                                                id="text58">福島県</text>
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21"
                                                transform="translate(212 69)"
                                                id="text59" />
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21"
                                                transform="translate(647 556)"
                                                id="text60">茨城県</text>
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21"
                                                transform="translate(711 556)"
                                                id="text61" />
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21"
                                                transform="translate(30 712)"
                                                id="text62">埼玉県</text>
                                            <text
                                                fill="#7F7F7F"
                                                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                                                fontWeight="900"
                                                fontSize="21"
                                                transform="translate(94 712)"
                                                id="text63" />
                                            <g
                                                id="group">
                                                <g
                                                    id="g77">
                                                    <path
                                                        d="M144 305 116 308 115 317 143 317 141 328 161 331 169 316 156 314ZM351 61 378 66 359 94 342 89 323 128 328 137 322 162 343 184 343 228 332 228 314 261 322 297 330 294 365 309 371 318 399 325 390 335 387 345 381 339C378 336 380 338 374 331L352 338 358 388 329 406 306 404 309 386 305 370 267 368 261 376 269 381 261 392 224 375C220 371 223 374 215 366L218 352 213 337 182 338 186 354 167 381 174 393 137 416 71 406 56 381 64 350 81 337 84 309 73 303 76 285 87 286 86 271 91 270 110 256 109 248 72 233 75 210 95 199 101 188 112 176 123 172 137 171 144 158 151 141 188 140 200 132 227 115 247 103 274 102 290 76 337 75Z"
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
                                                        transform="translate(191 261)"
                                                        id="text32">日光市</text>
                                                </g>
                                                <g
                                                    id="g89">
                                                    <path
                                                        d="M378 69 378 69 378 35 395 24 410 24 426 12 441 19 464 12 469 17 454 25 449 48 465 54 456 69 464 94 493 99 496 102 517 131 514 135 549 148C548 142 548 144 548 141L549 133 553 136 564 144 582 136 584 153 572 150C572 155 572 153 572 156L572 168 555 174 551 184 519 172 520 190 500 200 508 213 488 226 494 240 474 247 466 238 474 236 458 214 445 220 432 209 402 199 388 178 356 196 342 197 343 185 322 164 328 139 322 129 341 89 357 94 378 69Z"
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
                                                        transform="translate(392 136)"
                                                        id="text33">那須塩原市</text>
                                                </g>
                                                <g
                                                    id="g86">
                                                    <path
                                                        d="M456 213 444 218 460 248 488 261 490 273 518 296 524 294 524 282 547 282 547 273 565 276 581 284 604 265 606 247C612 250 609 250 612 250L616 259 629 241 646 244 643 263 659 283 667 278 670 247 661 240 659 201 651 189 663 170 650 163 641 170 610 161 598 173 582 166 579 176 580 184 560 171 554 173 552 183 518 170 519 191 500 199 507 212 487 225 492 240 474 245 468 238 474 234 456 213Z"
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
                                                        transform="translate(545 233)"
                                                        id="text34">大田原市</text>
                                                </g>
                                                <g
                                                    id="g90">
                                                    <path
                                                        d="M470 16 477 23 512 20 551 38 563 32 584 50 595 59 598 64 602 71 622 79 622 87 624 105 643 115 654 102 662 113 653 127 659 141 652 164 642 172 611 162 597 173 584 168C579 176 580 173 579 178L579 185 560 171 572 167 572 148 583 151 582 135 566 144 549 133 549 147 512 134 516 129 494 99 465 94 455 68 464 53 449 48 454 23 470 16Z"
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
                                                        transform="translate(538 95)"
                                                        id="text35">那須町</text>
                                                </g>
                                                <g
                                                    id="g88">
                                                    <path
                                                        d="M343 197 355 195 366 209 367 222 380 228 379 237 399 242 401 261 405 264 413 270 410 277 432 298 434 312 455 325 447 333 424 327 412 329 371 319 364 309 331 295 322 299 312 261 332 227 343 228C342 218 342 208 343 197Z"
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
                                                        transform="translate(344 278)"
                                                        id="text36">塩谷町</text>
                                                </g>
                                                <g
                                                    id="g85">
                                                    <path
                                                        d="M547 272 567 275 580 283 603 265 605 244 613 249 616 258 629 240 647 244 643 262 659 282 660 304 676 317 684 331 678 339 655 340 638 350 646 365 640 368 629 358 613 361 599 351 598 334 589 324 575 336 565 322 551 320 545 304 549 298 537 292 530 293 525 293 524 281 547 281 547 272Z"
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
                                                        transform="translate(581 307)"
                                                        id="text37">那珂川町</text>
                                                </g>
                                                <g
                                                    id="g79">
                                                    <path
                                                        d="M540 500 545 493 546 482 569 474 575 479 591 465 594 467 591 482 583 484 589 489 589 510 599 517 595 538 588 547 587 557 577 553 563 570 552 561 539 561 541 554 536 547 540 500Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path25" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(542 526)"
                                                        id="text40">益子町</text>
                                                </g>
                                                <g
                                                    id="g80">
                                                    <path
                                                        d="M550 418 551 429 547 438 553 442 551 456 544 458 542 472 535 460 533 464 525 486 509 500 495 497 495 487 500 482 492 458 495 452 489 418 494 415 502 431 515 430 525 434 519 412 529 414 535 408 550 418Z"
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
                                                        transform="translate(497 453)"
                                                        id="text41">芳賀町</text>
                                                </g>
                                                <g
                                                    id="g82">
                                                    <path
                                                        d="M537 313 548 310 550 320 566 321 575 336 588 323 598 333 600 352 614 361 632 356 642 369 646 366 655 385 650 402 625 414 621 429 611 426 605 412 591 410 585 413 581 407 584 401 566 397 563 403 548 418 545 405 532 396 534 388 527 373 513 364 512 352 528 346 531 333 542 321 537 313Z"
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
                                                        transform="translate(537 379)"
                                                        id="text42">那須烏山市</text>
                                                </g>
                                                <g
                                                    id="g84">
                                                    <path
                                                        d="M486 270 497 274 519 296 535 290 551 296 545 303 550 310 538 314 543 323 532 334 529 346 514 357 513 364 503 375 492 366 487 367 482 370 476 369 475 380 467 390 464 379 460 375 460 358 438 329 447 330 454 322 470 325 475 317 468 312 478 305 477 301 487 294 478 283 486 270Z"
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
                                                        transform="translate(466 336)"
                                                        id="text43">さくら市</text>
                                                </g>
                                                <g
                                                    id="g87">
                                                    <path
                                                        d="M389 177 400 197 432 208 445 217 460 250 489 261 491 272 484 271 478 284 481 288 487 294 476 301 477 304 469 312 476 318 467 326 453 325 433 312 431 297 410 276 411 269 400 262 398 242 393 240 378 238 379 228 365 222 365 209 354 196 389 177Z"
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
                                                        transform="translate(406 253)"
                                                        id="text44">矢板市</text>
                                                </g>
                                                <g
                                                    id="g78">
                                                    <path
                                                        d="M585 415 591 409 605 411 611 426 621 428 626 414 649 402 652 406 656 414 652 434 653 460 663 476 645 493 624 530 627 550 620 562 601 565 588 557 587 546 593 538 597 518 588 512 588 490 583 483 592 480 593 469 577 455 580 443 578 430 584 432 585 415Z"
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
                                                        transform="translate(599 483)"
                                                        id="text45">茂木町</text>
                                                </g>
                                                <g
                                                    id="g75">
                                                    <path
                                                        d="M438 330 456 352C461 359 459 356 461 360L461 375 463 379 475 409 475 414 480 414 490 418 496 455 493 459 502 484 495 490 475 488 467 498 471 507 463 510 458 501 440 503 436 498 430 504 429 511 408 517 405 510 390 502 381 485 386 470 377 457 381 448 365 444 358 429 365 425 346 416 336 419 330 405 357 388 351 335 376 329 387 346 389 335 399 323 411 328 425 325 438 330Z"
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
                                                        transform="translate(390 427)"
                                                        id="text46">宇都宮市</text>
                                                </g>
                                                <g
                                                    id="g76">
                                                    <path
                                                        d="M146 411 160 435 176 441 190 466 190 481 215 496 233 498 250 519 256 499 284 493C305 503 297 500 307 503L307 503 320 495 336 512 343 508 345 497 364 483 380 485 387 469 376 457 381 448 366 442 359 430 366 425 346 415 336 419 328 403 306 403 309 386 304 368 267 367 261 375 261 375 262 388 224 373 216 365 219 351 212 335 182 336 185 348 167 378 172 391 146 411Z"
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
                                                        transform="translate(241 441)"
                                                        id="text47">鹿沼市</text>
                                                </g>
                                                <g
                                                    id="g83">
                                                    <path
                                                        d="M466 389 474 380 475 369 482 368 488 365 493 367 502 373 513 363 528 373 535 388 532 396 544 405 549 417 536 409 531 415 521 412 525 436 514 430 503 431 493 415 488 417 474 413 475 406 466 389Z"
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
                                                        transform="translate(468 400)"
                                                        id="text38">高根沢町</text>
                                                </g>
                                                <path
                                                    d="M212 496 222 519 253 532 260 552 256 578 241 588 248 621 259 619 242 647 244 661 259 658 263 663 255 676 274 686 281 701 300 701 292 683 305 658 316 649 316 635 320 613 327 616 330 599 338 599 342 583 347 583 362 579 366 563 341 533 337 510 319 492 307 504 285 493 256 499 249 518 233 497 212 496Z"
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
                                                    transform="translate(270,591)"
                                                    id="text48">栃木市</text>
                                                <g
                                                    id="g67" />
                                                <g
                                                    id="g69">
                                                    <path
                                                        d="M314 650 304 657 291 684 296 693 307 689 318 665 329 665 327 675 345 682 349 672 358 673 357 684 360 688 372 685 390 654 384 645 398 627 418 623 431 636 438 635 438 613 440 601 426 590 423 599 410 601 411 596 407 597 395 600 390 586 362 578 347 584 343 581 338 599 330 599 326 616 320 612 315 633 314 650Z"
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
                                                        transform="translate(335 635)"
                                                        id="text49">小山市</text>
                                                </g>
                                                <g
                                                    id="g81">
                                                    <path
                                                        d="M549 418 549 418 562 404 565 398 585 401 584 410 588 421 587 434 579 433 582 440 578 454 592 464 576 479 570 475 547 482 547 492 541 501 536 495 527 502 525 484 535 458 543 470 544 457 551 456 550 441 546 437 551 428 549 418Z"
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
                                                        transform="translate(545 444)"
                                                        id="text39">市貝町</text>
                                                </g>
                                                <g
                                                    id="g73">
                                                    <path
                                                        d="M495 491 495 497 509 499 526 486 526 500 535 493 541 501 537 546 541 553 539 572 527 584 512 580 484 591 477 583 464 593 470 603 452 605 438 615 439 603 435 597 441 585 445 563 452 553 450 541 462 521 471 519 468 508 470 506 466 498 475 487 495 491Z"
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
                                                        transform="translate(472 551)"
                                                        id="text50">真岡市</text>
                                                </g>
                                                <g
                                                    id="g71">
                                                    <path
                                                        d="M390 500 404 509 410 517 406 526 409 529 404 553 418 559 422 550 426 554 429 563 446 563 442 585 434 599 427 589 425 600 410 601 410 601 396 601 389 586 363 577 364 563 382 566 384 560 379 551 385 545 381 539 387 524 395 522 390 500Z"
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
                                                        transform="translate(383 578)"
                                                        id="text51">下野市</text>
                                                </g>
                                                <g
                                                    id="g74">
                                                    <path
                                                        d="M435 499 429 502 429 511 407 515 405 526 408 530 403 554 419 561 422 552 426 557 429 565 447 564 453 554 452 541 463 524 473 519 468 508 463 509 459 499 440 502 435 499Z"
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
                                                        transform="translate(403 533)"
                                                        id="text52">上三川町</text>
                                                </g>
                                                <g
                                                    id="g72">
                                                    <path
                                                        d="M366 482 381 484 388 495 397 522 386 526 380 539 386 546 378 551 384 559 381 566 363 563 340 535 337 509 342 507 343 495 366 482Z"
                                                        stroke="#FFFFFF"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="8"
                                                        fill="#10B981"
                                                        fillRule="evenodd"
                                                        id="path15" />
                                                    <text
                                                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                                                        fontWeight="700"
                                                        fontSize="14"
                                                        transform="translate(345 524)"
                                                        id="text53">壬生町</text>
                                                </g>
                                                <g
                                                    id="g66">
                                                    <path
                                                        d="M158 434 141 456 127 454 130 472 116 492 129 512 111 519 111 529 124 538 132 529 156 552 159 563 176 581 173 605 179 610 198 607 196 629 181 635 189 650 197 650 205 664 244 659 242 646 261 618 247 618 240 587 256 577 261 552 252 530 223 517 209 490 191 481C191 477 191 472 191 467L175 436 158 434Z"
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
                                                        transform="translate(180 556)"
                                                        id="text54">佐野市</text>
                                                </g>
                                                <g
                                                    id="g65">
                                                    <path
                                                        d="M114 530 88 570 80 575 95 607 123 622 122 639 145 646 144 655 157 661 190 650 183 635 200 630 199 604 180 610 174 606 176 579 159 562 158 550 132 527 128 530 124 537 114 530Z"
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
                                                        transform="translate(115 605)"
                                                        id="text55">足利市</text>
                                                </g>
                                                <g
                                                    id="g70">
                                                    <path
                                                        d="M316 664 306 688 295 693 298 700 290 700 296 707 313 705 323 711 361 690 358 683 359 671 350 670 344 681 329 674 331 664 316 664Z"
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
                                                        transform="translate(304 696)"
                                                        id="text64">野木町</text>
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

export default Tochigi;

