import { useState } from 'react';

const Mcp = () => {
    // 画像データの配列（各画像に説明文を設定）
    const images = [
        { id: 1, src: '/minecraft-portfolio/ (1).png', title: '@2020 Champon Island', description: 'さばちゃんぽん' },
        { id: 2, src: '/minecraft-portfolio/ (2).png', title: '@2015 Quartz Castle', description: '某鯖4周年記念で作ったやつ' },
        { id: 3, src: '/minecraft-portfolio/ (3).png', title: '@2016 Lobby', description: 'ロビー浮島' },
        { id: 4, src: '/minecraft-portfolio/ (4).png', title: '@2015 Aquanoa', description: '水上都市' },
        { id: 5, src: '/minecraft-portfolio/ (5).png', title: '@2016 The Tower', description: 'なにかの塔' },
        { id: 6, src: '/minecraft-portfolio/ (6).png', title: '@2014 Farm Village', description: '農村' },
        { id: 7, src: '/minecraft-portfolio/ (7).png', title: '@2022 Rathalos', description: 'リオレウス Blender使用' },
        { id: 8, src: '/minecraft-portfolio/ (8).png', title: '@2022 Nergigante', description: 'ネルギガンテ Blender使用' },
        { id: 9, src: '/minecraft-portfolio/ (9).png', title: '@2021 Anya', description: 'Youtube アイコン用 Blender使用' },
        { id: 10, src: '/minecraft-portfolio/ (10).png', title: '@2016 First Island', description: 'RPGの最初の島的な' },
        { id: 11, src: '/minecraft-portfolio/ (11).png', title: '@2015 Aquanoa', description: '水上都市' },
        { id: 12, src: '/minecraft-portfolio/ (12).png', title: '@2013 FDD', description: '某鯖初めての共同拠点' },
        { id: 13, src: '/minecraft-portfolio/ (13).png', title: '@2013 MyHome', description: '某鯖個人拠点' },
        { id: 14, src: '/minecraft-portfolio/ (14).png', title: '@2012 MyCity', description: 'シングルクリエイティブワールド#2' },
        { id: 15, src: '/minecraft-portfolio/ (15).png', title: '@2012 MyTown', description: 'シングルクリエイティブワールド' },
        { id: 16, src: '/minecraft-portfolio/ (16).png', title: '@2012 Survival World', description: '始めて間もないシングルサバイバルワールド' },
        { id: 17, src: '/minecraft-portfolio/ (17).png', title: '@2013 Test World', description: '試作用フラットワールド' },
    ];
    
    // 選択された画像の状態
    const [selectedImage, setSelectedImage] = useState(null);
    
    // 画像をクリックしたときの処理
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };
    
    // モーダルを閉じる処理
    const closeModal = () => {
        setSelectedImage(null);
    };
    
    // ESCキーでモーダルを閉じる
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };

    return (
        <>
            {/* 画像拡大モーダル */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={closeModal}
                    onKeyDown={handleKeyDown}
                    tabIndex={-1}
                >
                    <div 
                        className="relative bg-white rounded-2xl shadow-2xl p-2 md:p-8 max-w-4xl mx-4 max-h-[90vh] overflow-y-auto animate-fadeIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 閉じるボタン */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10 bg-white rounded-full p-2 shadow-lg"
                            aria-label="閉じる"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        {/* 拡大画像 */}
                        <div className="mb-4">
                            <img
                                src={selectedImage.src}
                                alt={`Minecraft Portfolio ${selectedImage.id}`}
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                        
                        {/* 説明文 */}
                        <div className="px-2">
                            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
                                {selectedImage.title}
                            </h3>
                            <p className="text-slate-600 text-base md:text-lg pb-2">
                                {selectedImage.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="mt-4 space-y-6 mx-2">
                <div className="bg-white py-8 px-4 md:px-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-10">
                        Minecraft Portfolio
                    </h1>
                    <div className="masonry-container">
                        <div
                            className="masonry-item rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => handleImageClick(images[0])}
                        >
                            <img
                                src={images[0].src}
                                alt={`Minecraft Portfolio ${images[0].id}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div
                            className="masonry-item rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => handleImageClick(images[1])}
                        >
                            <img
                                src={images[1].src}
                                alt={`Minecraft Portfolio ${images[1].id}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div
                            className="masonry-item rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => handleImageClick(images[2])}
                        >
                            <img
                                src={images[2].src}
                                alt={`Minecraft Portfolio ${images[2].id}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        <div
                            className="masonry-item rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => handleImageClick(images[4])}
                        >
                            <img
                                src={images[4].src}
                                alt={`Minecraft Portfolio ${images[4].id}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div
                            className="masonry-item rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => handleImageClick(images[5])}
                        >
                            <img
                                src={images[5].src}
                                alt={`Minecraft Portfolio ${images[5].id}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        <div
                            className="masonry-item rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => handleImageClick(images[7])}
                        >
                            <img
                                src={images[7].src}
                                alt={`Minecraft Portfolio ${images[7].id}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div
                            className="masonry-item rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => handleImageClick(images[8])}
                        >
                            <img
                                src={images[8].src}
                                alt={`Minecraft Portfolio ${images[8].id}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div
                            className="masonry-item rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => handleImageClick(images[9])}
                        >
                            <img
                                src={images[9].src}
                                alt={`Minecraft Portfolio ${images[9].id}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div
                            className="masonry-item rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => handleImageClick(images[11])}
                        >
                            <img
                                src={images[11].src}
                                alt={`Minecraft Portfolio ${images[11].id}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div
                            className="masonry-item rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => handleImageClick(images[3])}
                        >
                            <img
                                src={images[3].src}
                                alt={`Minecraft Portfolio ${images[3].id}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div
                            className="masonry-item rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => handleImageClick(images[6])}
                        >
                            <img
                                src={images[6].src}
                                alt={`Minecraft Portfolio ${images[6].id}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        
                        <div
                            className="masonry-item rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => handleImageClick(images[10])}
                        >
                            <img
                                src={images[10].src}
                                alt={`Minecraft Portfolio ${images[10].id}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div
                            className="masonry-item rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => handleImageClick(images[12])}
                        >
                            <img
                                src={images[12].src}
                                alt={`Minecraft Portfolio ${images[12].id}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        <div
                            className="masonry-item rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => handleImageClick(images[13])}
                        >
                            <img
                                src={images[13].src}
                                alt={`Minecraft Portfolio ${images[13].id}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div
                            className="masonry-item rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => handleImageClick(images[14])}
                        >
                            <img
                                src={images[14].src}
                                alt={`Minecraft Portfolio ${images[14].id}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        <div
                            className="masonry-item rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => handleImageClick(images[15])}
                        >
                            <img
                                src={images[15].src}
                                alt={`Minecraft Portfolio ${images[15].id}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div
                            className="masonry-item rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => handleImageClick(images[16])}
                        >
                            <img
                                src={images[16].src}
                                alt={`Minecraft Portfolio ${images[16].id}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Mcp