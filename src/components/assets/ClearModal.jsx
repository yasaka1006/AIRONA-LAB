const ClearModal = ({ isOpen, onClose, time, gameTitle }) => {
    // 時間のフォーマット
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    // X投稿のハンドラー
    const handleTweet = () => {
        const currentUrl = window.location.href;
        const tweetText = `${gameTitle}を${formatTime(time)}でクリアしました！\n\n#クイズ #地理クイズ`;
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(currentUrl)}`;
        window.open(tweetUrl, '_blank', 'width=550,height=420');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md mx-4 text-center animate-fadeIn relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label="閉じる"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="text-4xl md:text-6xl mb-4">🎉</div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                    全正解おめでとう！
                </h2>
                <p className="text-lg md:text-xl text-slate-600 mb-4">
                    クリアタイムは <span className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">{formatTime(time)}</span> でした！
                </p>

                <div className="flex gap-3 justify-center">
                    <button
                        onClick={handleTweet}
                        className="bg-black text-white font-bold px-6 py-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        Xで共有
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClearModal;