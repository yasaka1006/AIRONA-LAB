import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import React, { useEffect, useRef, useState, useMemo } from 'react';

const TokyoMap = ({ isGameStarted, correctAnswers, allDistricts, showCongratulations = false, isSurrendered = false, showSurrenderModal = false }) => {
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState({ show: false, district: null, isCorrect: false, x: 0, y: 0 });
  const hideTimeoutRef = useRef(null);

  // 各地域グループの状態を更新
  useEffect(() => {
    if (!svgRef.current) return;

    // 判定ロジック：地域名が正解リストにあるか
    const getStatus = (districtName) => {
      if (!isGameStarted) return { fill: '#e2e8f0', showText: false }; // ゲーム開始前は灰色
      const isCorrect = correctAnswers.includes(districtName);
      // 降参時は未回答の地域も表示する（赤文字）
      if (isSurrendered && !isCorrect) {
        return { fill: '#e2e8f0', showText: true, isUnanswered: true }; // 未回答（降参時）
      }
      return isCorrect
        ? { fill: '#10b981', showText: true } // emerald-500
        : { fill: '#e2e8f0', showText: false }; // slate-200（より柔らかいグレー）
    };

    // 地区情報を取得する関数
    const getDistrictInfo = (districtName) => {
      if (!Array.isArray(allDistricts) || allDistricts.length === 0) return null;
      // allDistrictsはオブジェクトの配列なので、idで検索
      return allDistricts.find(d => d && d.id === districtName) || null;
    };

    const districtGroups = svgRef.current.querySelectorAll('#gTokyo > g');
    const eventHandlers = new Map(); // イベントハンドラーを保存

    districtGroups.forEach((group) => {
      const textElement = group.querySelector('text');
      if (!textElement) return;

      const districtName = textElement.textContent.trim();
      const status = getStatus(districtName);
      const districtInfo = getDistrictInfo(districtName);

      // path要素の色を更新（すべてのpath要素を処理）
      const pathElements = group.querySelectorAll('path');
      pathElements.forEach((pathElement) => {
        // fillをstatusに基づいて設定
          pathElement.setAttribute('fill', status.fill);
        
        // 既存のイベントリスナーを削除
        const existingHandlers = eventHandlers.get(pathElement);
        if (existingHandlers) {
          pathElement.removeEventListener('mouseenter', existingHandlers.mouseenter);
          pathElement.removeEventListener('mouseleave', existingHandlers.mouseleave);
          pathElement.removeEventListener('mousemove', existingHandlers.mousemove);
        }
        
        // すべての地区にマウスイベントを追加（正解済み・未正解問わず）
        if (districtInfo) {
          // pointer-eventsを有効にする（念のため）
          pathElement.style.pointerEvents = 'auto';
          pathElement.style.cursor = 'pointer';
          // fillとfilterのトランジションを設定
          pathElement.style.transition = 'fill 0.5s ease, filter 0.2s ease';
          
          const isCorrect = status.fill === '#10b981';
          // 降参時は未回答の地域でも正解情報を表示する
          const tooltipIsCorrect = isSurrendered ? true : isCorrect;
          
          const handleMouseEnter = (e) => {
            // 既存のタイムアウトをクリア
            if (hideTimeoutRef.current) {
              clearTimeout(hideTimeoutRef.current);
              hideTimeoutRef.current = null;
            }
            
            // ホバー時の視覚効果
            if (pathElement) {
              pathElement.style.filter = 'brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.1))';
            }
            
            // 即座にツールチップを表示
            setTooltip({
              show: true,
              district: districtInfo,
              isCorrect: tooltipIsCorrect,
              x: e.clientX,
              y: e.clientY
            });
          };
          
          const handleMouseLeave = (e) => {
            // ホバー解除時の視覚効果をリセット
            if (pathElement) {
              pathElement.style.filter = '';
            }
            
            // 既存のタイムアウトをクリア
            if (hideTimeoutRef.current) {
              clearTimeout(hideTimeoutRef.current);
            }
            
            // 短い遅延を入れてから非表示にする（ツールチップへの移動を考慮）
            hideTimeoutRef.current = setTimeout(() => {
              setTooltip(prev => {
                // 現在の地区のツールチップの場合のみ非表示にする
                if (prev.district?.id === districtInfo.id) {
                  return { show: false, district: null, isCorrect: false, x: 0, y: 0 };
                }
                return prev;
              });
              hideTimeoutRef.current = null;
            }, 150);
          };
          
          const handleMouseMove = (e) => {
            setTooltip(prev => {
              if (prev.show) {
                return {
                  ...prev,
                  x: e.clientX,
                  y: e.clientY
                };
              }
              return prev;
            });
          };
          
          pathElement.addEventListener('mouseenter', handleMouseEnter);
          pathElement.addEventListener('mouseleave', handleMouseLeave);
          pathElement.addEventListener('mousemove', handleMouseMove);
          
          // イベントハンドラーを保存
          eventHandlers.set(pathElement, {
            mouseenter: handleMouseEnter,
            mouseleave: handleMouseLeave,
            mousemove: handleMouseMove
          });
        } else {
          // 地区情報がない場合はイベントハンドラーを削除
          pathElement.style.pointerEvents = 'auto';
          pathElement.style.cursor = 'default';
          eventHandlers.delete(pathElement);
        }
      });

      // text要素の表示・非表示を切り替え、降参時は未回答地域を赤文字で表示
      if (textElement) {
        // opacityとvisibilityでtransitionを適用
        if (status.showText) {
          textElement.style.opacity = '1';
          textElement.style.visibility = 'visible';
          textElement.style.display = 'block';
        } else {
          textElement.style.opacity = '0';
          textElement.style.visibility = 'hidden';
          textElement.style.display = 'none';
        }
        // トランジションを設定
        textElement.style.transition = 'opacity 0.5s ease, visibility 0.5s ease, fill 0.3s ease';

        // 降参時で未回答の地域は赤文字にする
        if (status.isUnanswered) {
          textElement.setAttribute('fill', '#ef4444'); // red-500
          textElement.style.fontWeight = 'bold';
        } else {
          // 元の色に戻す（正解済みは元の色）
          textElement.setAttribute('fill', '#000000'); // デフォルトの黒
        }
      }
    });


    // クリーンアップ関数
    return () => {
      // タイムアウトをクリア
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      
      eventHandlers.forEach((handlers, pathElement) => {
        pathElement.removeEventListener('mouseenter', handlers.mouseenter);
        pathElement.removeEventListener('mouseleave', handlers.mouseleave);
        pathElement.removeEventListener('mousemove', handlers.mousemove);
      });
    };
  }, [isGameStarted, correctAnswers, allDistricts, isSurrendered]);

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

  const containerRef = useRef(null);

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

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-508/286 my-5 rounded-2xl overflow-hidden shadow-2xl border border-slate-300/50"
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
            pointerEvents: 'auto'
          }}
          onMouseEnter={(e) => {
            // ツールチップ上でもマウスがあることを示す
            e.stopPropagation();
            // タイムアウトをクリア（ツールチップ上にいる間は非表示にしない）
            if (hideTimeoutRef.current) {
              clearTimeout(hideTimeoutRef.current);
              hideTimeoutRef.current = null;
            }
          }}
          onMouseLeave={() => {
            // ツールチップから離れたときに非表示にする
            if (hideTimeoutRef.current) {
              clearTimeout(hideTimeoutRef.current);
            }
            hideTimeoutRef.current = setTimeout(() => {
              setTooltip({ show: false, district: null, isCorrect: false, x: 0, y: 0 });
              hideTimeoutRef.current = null;
            }, 100);
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
            <div className={`absolute bottom-3 right-3 md:bottom-5 md:right-5 z-50 flex flex-col gap-1 transition-opacity duration-300 ${showCongratulations || showSurrenderModal ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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
                viewBox="0 0 507.99999 285.75"
                preserveAspectRatio="xMidYMid meet"
                style={{ display: 'block', width: '100%', height: 'auto' }}
                version="1.1"
                id="svg1"
                className="w-full h-full"
              >
                <defs id="defs1">
                  <rect
                    x="48.194946"
                    y="321.13571"
                    width="456.37665"
                    height="287.20255"
                    id="rect3"
                  />
                  <rect
                    x="84.587051"
                    y="402.77206"
                    width="382.1171"
                    height="175.07552"
                    id="rect2"
                  />
                </defs>
                <g
                  inkscape:label="Layer 1"
                  inkscape:groupmode="layer"
                  id="layer1"
                >
                  <g
                    transform="matrix(0.26458333,0,0,0.26458333,-19.778129,29.850104)"
                    id="g1"
                  >
                    <text
                      xmlSpace="preserve"
                      transform="translate(74.751985,-112.81929)"
                      id="text2"
                    />
                    <text
                      xmlSpace="preserve"
                      transform="translate(74.751985,-112.81929)"
                      id="text3"
                    />
                    <g
                      transform="matrix(1.506177,0,0,1.506177,77.122394,-111.03626)"
                      id="g139"
                    >
                      <rect
                        x="-2.7449095"
                        y="-5.9978361"
                        width="1282.7321"
                        height="727.54962"
                        fill="#caeefb"
                        id="rect1"
                      />
                      <path
                        d="m 1170.7144,182.2882 10.4523,-1.04623 8.3678,-12.55474 -7.3155,-16.74066 3.1366,-26.15671 -5.2311,-21.9718 15.6834,-47.083181 -16.7256,-34.52724 L 1161.3044,-4.9957016 -5.6207648,-3.9494331 -8.7577163,109.0492 89.53143,60.920093 l 98.28955,1.046228 182.98474,52.314029 126.52148,46.03605 107.69939,66.96262 110.83707,-28.25017 89.92453,33.48131 143.25111,-55.45311 126.5225,21.9718 80.5115,-14.6472 z"
                        stroke="#ffffff"
                        stroke-width="2.00427"
                        stroke-miterlimit="8"
                        fill="#a0ebd2"
                        fill-rule="evenodd"
                        id="path1"
                      />
                      <path
                        d="M 271.41502,317.76074 254.70143,290.59388 202.46918,275.96572 149.19371,246.7084 124.12231,196.55358 99.051908,143.26408 83.382033,82.660297 57.266208,71.166517 33.239835,86.8399 l -42.8297638,16.71861 -4.1784602,359.44258 285.183409,-1.04523 4.17891,-16.71761 -6.26836,-15.67338 12.5357,-13.58393 -9.40202,-6.26935 9.40202,-8.35881 -13.57992,-16.71861 2.08945,-25.07741 -4.1789,-6.26935 12.5357,-24.03219 z"
                        stroke="#ffffff"
                        stroke-width="2.00427"
                        stroke-miterlimit="8"
                        fill="#a0ebd2"
                        fill-rule="evenodd"
                        id="path2"
                      />
                      <path
                        d="m 1154.7204,376.81752 6.0128,14.02989 25.0533,3.0064 v 0 l 17.0363,-8.01708 28.0598,-18.03842 -7.0149,-19.04055 -12.0257,-5.01067 26.0555,-19.04056 -10.0213,-17.03628 7.0149,-32.06831 23.0491,-4.00853 27.0577,-9.01921 -1.0022,-267.5699016 -136.2903,-1.0021344 42.0897,63.13447 -17.0363,52.110996 12.0256,31.06616 -6.0128,24.05123 3.0064,8.01708 -21.0448,20.04269 30.064,58.12379 -12.0256,49.10459 -19.0405,60.12807 z"
                        stroke="#ffffff"
                        stroke-width="2.00427"
                        stroke-miterlimit="8"
                        fill="#a0ebd2"
                        fill-rule="evenodd"
                        id="path3"
                      />
                      <path
                        d="m 946.07899,590.86242 3.13869,8.3588 10.46329,13.58293 -8.37083,10.44826 -26.15671,-14.62816 -2.09246,-11.49248 z m 103.57761,-49.10659 -4.1789,8.3578 4.1789,2.09045 -18.8301,10.44825 -11.5045,-7.31457 2.0844,10.44825 -15.6934,7.31458 -8.36681,-6.26935 10.46131,11.49348 -6.2734,15.67238 -16.74265,-2.08945 -16.74066,8.3578 -10.46228,-19.85128 35.57277,-16.71761 37.66522,-18.80706 z m -777.37573,-235.08772 35.57377,12.53771 29.29539,11.49348 42.89737,8.3588 24.06426,49.10659 26.15671,18.80706 15.69342,-17.76183 80.56259,15.67238 65.9154,21.94173 17.78688,4.1789 49.17474,57.4664 -10.46329,-76.27345 19.87934,-34.47944 47.08229,9.40403 19.87934,-24.03119 41.85013,-8.3588 49.17474,30.29954 76.37768,31.34576 42.89736,39.70356 32.43409,32.38999 42.89332,-1.04522 40.807,22.98595 -1.0423,5.22413 8.3679,9.40403 -14.6513,12.5377 -8.3678,-6.26935 -51.26617,24.03119 -53.35965,21.94173 -23.01802,17.76183 3.13868,-10.44825 -20.92557,-1.04423 9.41706,4.1789 -10.46329,13.58293 -14.64719,-8.3588 -5.23215,2.08945 8.37083,18.80706 28.24917,15.67238 26.15671,6.26935 -2.09246,11.49348 -15.69442,12.53771 7.3246,13.58293 12.55474,-7.31358 4.18491,9.40303 -31.38785,14.62815 -20.92557,-26.12163 -28.24917,4.1799 18.83311,11.49348 -26.15671,13.58193 20.92557,4.1799 20.92457,10.44825 -10.46229,-3.13467 v 18.80705 l -309.69562,-1.04522 -60.68425,-258.07267 -252.15106,3.13367 -2.09245,-15.67238 3.13868,-8.3588 -6.27737,-9.40303 9.41706,-16.71761 -6.27837,-10.44825 7.3246,-7.31358 -9.41706,-15.67238 2.09246,-15.67238 -6.27737,-12.5377 12.55574,-25.07641 -4.18592,-13.58293 z"
                        stroke="#ffffff"
                        stroke-width="2.00427"
                        stroke-miterlimit="8"
                        fill="#a0ebd2"
                        fill-rule="evenodd"
                        id="path4"
                      />
                      <path
                        d="M -1.6701604,459.99468 H 531.40678 l 59.11191,260.55496 H -2.7449095 Z"
                        fill="#caeefb"
                        fill-rule="evenodd"
                        id="path5"
                      />
                      <path
                        d="M -2.7449095,458.99255 H 531.0841"
                        stroke="#000000"
                        stroke-width="2.00427"
                        stroke-miterlimit="8"
                        fill="none"
                        fill-rule="evenodd"
                        id="path67"
                      />
                      <path
                        d="m 531.39275,458.99255 59.20009,262.23353"
                        stroke="#000000"
                        stroke-width="2.00427"
                        stroke-miterlimit="8"
                        fill="none"
                        fill-rule="evenodd"
                        id="path68"
                      />
                      <path
                        d="M 195.67771,493.06512 V 677.14319"
                        stroke="#000000"
                        stroke-width="2.00427"
                        stroke-miterlimit="8"
                        fill="none"
                        fill-rule="evenodd"
                        id="path69"
                      />
                      <path
                        d="M 385.08112,493.06512 V 677.14319"
                        stroke="#000000"
                        stroke-width="2.00427"
                        stroke-miterlimit="8"
                        fill="none"
                        fill-rule="evenodd"
                        id="path70"
                      />
                      <path
                        d="M 493.31164,645.38956 V 719.308"
                        stroke="#000000"
                        stroke-width="2.00427"
                        stroke-miterlimit="8"
                        fill="none"
                        fill-rule="evenodd"
                        id="path71"
                      />
                      <path
                        d="m 493.31164,646.39169 h 78.83692"
                        stroke="#000000"
                        stroke-width="2.00427"
                        stroke-miterlimit="8"
                        fill="none"
                        fill-rule="evenodd"
                        id="path72"
                      />
                      <text
                        fill="#7f7f7f"
                        font-family="'Noto Sans JP Black', 'Noto Sans JP Black_MSFontService', sans-serif"
                        font-weight="900"
                        font-size="21.0448px"
                        id="text73"
                        x="631.69238"
                        y="607.30847"
                      >
                        神奈川県
                      </text>
                      <text
                        fill="#7f7f7f"
                        font-family="'Noto Sans JP Black', 'Noto Sans JP Black_MSFontService', sans-serif"
                        font-weight="900"
                        font-size="21.0448px"
                        id="text74"
                        x="54.973125"
                        y="316.68945"
                      >
                        山梨県
                      </text>
                      <text
                        fill="#7f7f7f"
                        font-family="'Noto Sans JP Black', 'Noto Sans JP Black_MSFontService', sans-serif"
                        font-weight="900"
                        font-size="21.0448px"
                        id="text75"
                        x="820.72607"
                        y="74.86058"
                      >
                        埼玉県
                      </text>
                      <text
                        fill="#7f7f7f"
                        font-family="'Noto Sans JP Black', 'Noto Sans JP Black_MSFontService', sans-serif"
                        font-weight="900"
                        font-size="21.0448px"
                        id="text76"
                        x="1199.0348"
                        y="152.3394"
                      >
                        千葉県
                      </text>
                      <g id="gTokyo">
                        <g
                          id="g4"
                          transform="matrix(1.0021345,0,0,1.0021345,-2.7449095,0.01497068)"
                        >
                          <path
                            d="M 137.835,18 131.2,34.599 104.659,42.3452 99.1294,35.7056 78.1176,47.8782 58.2118,63.3706 56,76.6498 l 7.7412,5.5329 3.3177,16.599 15.4823,14.3853 5.5293,4.427 3.3177,15.492 2.2118,30.985 13.271,6.64 -1.106,19.918 8.847,17.706 19.906,15.492 3.317,12.173 23.224,-7.746 12.164,-5.533 -1.105,-17.706 23.223,-4.426 18.8,-12.173 21.012,5.533 11.059,-16.599 27.647,23.239 13.27,-5.533 3.318,-18.812 12.165,-4.427 v -18.812 l 24.329,-4.426 11.059,-26.559 -4.424,-22.1317 -11.058,-5.533 -16.589,-24.3452 -18.8,-6.6395 -37.6,1.1066 -25.435,-8.8528 -9.953,-7.7462 -13.27,12.1726 -12.165,-16.599 -2.212,5.5329 -21.012,-22.1319 z"
                            stroke="#ffffff"
                            stroke-width="2"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path73"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16px"
                            transform="translate(172.914,133)"
                            id="text77"
                          >
                            奥多摩町
                          </text>
                        </g>
                        <g
                          id="g5"
                          transform="matrix(1.0021345,0,0,1.0021345,-2.7449095,0.01497068)"
                        >
                          <path
                            d="m 137,237.028 37.049,-14.612 -1.723,-18.91 23.263,-4.298 18.094,-11.174 23.263,6.017 9.478,-18.051 27.572,24.927 15.508,-6.876 8.617,6.016 -4.309,7.736 12.925,8.596 2.584,6.876 12.063,12.894 v 25.786 l -1.723,8.596 10.339,8.595 -0.862,18.051 -1.723,8.595 -11.201,23.208 -19.817,-0.86 -9.477,-9.455 -12.924,-1.719 -15.509,-11.174 -3.447,-9.455 -12.924,-6.017 -11.201,4.298 -11.201,-6.017 H 201.621 L 180.942,271.41 151.647,259.376 Z"
                            stroke="#ffffff"
                            stroke-width="2"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path6"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16px"
                            transform="translate(221.231,254)"
                            id="text78"
                          >
                            檜原村
                          </text>
                        </g>
                        <g
                          id="g56"
                          transform="matrix(1.0021345,0,0,1.0021345,-2.7449095,0.01497068)"
                        >
                          <path
                            d="m 288.833,190.233 12.491,-7.469 14.989,2.49 13.323,-11.618 19.986,-9.128 19.985,12.448 3.331,9.128 24.982,0.83 9.16,6.638 23.316,8.299 6.662,4.149 34.142,-2.49 4.996,-9.958 -5.829,-14.937 9.993,-3.319 19.986,9.958 10.825,-4.979 -4.996,-13.278 10.825,-6.638 -14.989,-14.937 -2.498,-19.917 -9.16,-10.787 -7.495,7.468 -0.833,-19.086 -15.821,-0.83 -11.658,-4.1493 -17.488,4.9793 -18.32,-4.9793 -12.491,-0.8298 -9.16,4.9791 -17.487,-9.9583 -4.996,-8.2983 -5.829,8.2983 -19.153,5.809 L 320.476,81.5238 309.734,74 l 14.073,24.1207 9.993,5.8093 3.331,13.277 -9.16,29.044 -25.815,6.639 -1.665,17.427 -12.491,7.468 z"
                            stroke="#ffffff"
                            stroke-width="2"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path8"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16px"
                            transform="translate(389.633,154)"
                            id="text79"
                          >
                            青梅市
                          </text>
                        </g>
                        <g
                          id="g57"
                          transform="matrix(1.0021345,0,0,1.0021345,-2.7449095,0.01497068)"
                        >
                          <path
                            d="m 322,182.277 6.406,-8.032 22.421,-11.245 20.286,12.316 4.27,9.639 26.158,1.606 8.542,8.568 27.759,9.639 0.534,5.89 20.286,4.819 v 16.6 l 5.338,4.82 -6.94,9.103 -25.624,-3.213 -18.15,-8.568 -14.414,2.678 -21.353,-10.174 -4.271,-12.317 -27.225,-11.245 -8.008,0.536 -4.271,-13.923 z"
                            stroke="#ffffff"
                            stroke-width="2"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path9"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="15px"
                            id="text80"
                            x="370.758"
                            y="207.4707"
                          >
                            日の出町
                          </text>
                        </g>
                        <g id="g60">
                          <path
                            d="m 286.58634,188.6307 -0.71653,6.08496 10.39214,6.79949 -4.65893,7.87477 11.82619,6.79948 3.9414,9.66358 12.18395,10.37911 -0.71653,28.27522 -1.79181,7.15725 11.46742,8.23253 -1.79182,19.32617 32.60946,1.43205 v -12.88445 l 6.09197,-3.93738 2.14958,-16.46307 22.57609,-6.80048 22.57608,9.30582 20.06774,1.43105 12.18395,4.29514 6.80851,-8.94805 32.25169,6.44272 16.12534,-5.36844 3.9414,-6.44272 13.25924,11.81116 -1.43305,-15.03202 -11.10966,-26.48541 -12.18295,-13.2422 -13.97577,-10.37911 -6.8085,4.29515 -4.65892,-7.87377 -33.32599,2.8631 2.86611,6.44172 20.42651,2.50533 v 13.95873 l 4.65792,9.30582 -7.16627,6.08396 -23.65137,-3.22086 -18.27593,-7.51601 -15.40882,1.78881 -21.14303,-11.81015 -2.8661,-11.4534 -25.80096,-10.02134 h -11.46742 l -2.50835,-11.81116 -15.76758,-11.09463 -6.8085,5.36844 -11.10866,-3.22086 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path7"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="15.032px"
                            id="text81"
                            x="372.58051"
                            y="255.55925"
                          >
                            あきる野市
                          </text>
                        </g>
                        <g
                          id="g55"
                          transform="matrix(1.0021345,0,0,1.0021345,-2.7449095,0.01497068)"
                        >
                          <path
                            d="m 328.343,299.828 -2.683,8.596 -9.66,20.414 9.66,5.91 -3.22,15.579 11.27,2.149 6.977,9.132 8.586,-4.835 11.807,-9.669 8.587,4.297 8.586,1.075 4.83,17.728 7.514,9.133 -2.684,7.521 11.807,6.446 4.293,12.893 16.1,10.745 19.857,-1.075 3.22,-8.595 24.687,-15.042 9.66,6.984 35.42,1.074 15.026,-2.686 9.124,7.521 7.513,8.595 17.173,-4.297 18.784,9.67 2.146,5.909 11.807,-20.414 11.807,-6.447 8.05,-12.893 23.613,-9.133 -5.903,-10.207 -10.197,-2.686 -0.537,-5.909 -10.196,2.686 -17.174,5.909 -19.856,-2.149 -22.004,-12.893 -1.61,-8.595 12.344,-12.894 3.756,-2.686 5.904,-10.207 0.536,-14.505 3.757,-5.909 -13.953,2.686 -30.59,-2.686 -10.734,-11.819 -1.61,-12.356 -14.49,-12.356 -4.293,7.521 -16.1,6.447 -32.737,-8.596 -5.903,10.745 -12.343,-5.372 -18.247,-1.612 -25.223,-9.67 -22.54,9.67 -1.074,15.579 -6.976,3.224 0.536,13.43 z"
                            stroke="#ffffff"
                            stroke-width="2"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path81"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16px"
                            transform="translate(440.456,345)"
                            id="text82"
                          >
                            八王子市
                          </text>
                        </g>
                        <g id="g70">
                          <path
                            d="m 516.36074,267.32632 4.29715,18.31801 9.13045,10.77596 31.68849,3.23288 18.79804,-1.61644 11.81616,-13.46969 6.44473,-15.08613 -5.37044,-1.0773 -15.57617,-10.77595 1.07428,-5.38747 -9.13044,0.53914 -9.66759,-3.23288 -27.92849,5.92662 -4.29715,6.46577 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path16"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16.0342px"
                            id="text83"
                            x="532.82782"
                            y="282.61688"
                          >
                            昭島市
                          </text>
                        </g>
                        <g id="g71">
                          <path
                            d="m 497.32018,224.77569 6.42168,8.02609 8.56123,20.33431 2.14056,5.3514 1.60542,9.09738 10.16766,-4.28112 6.95682,-7.49196 14.44777,-4.81525 -3.74598,-9.63252 8.56224,-5.88654 -6.95682,-9.09737 -4.81626,5.88653 -11.23693,-12.30721 -21.93973,-7.49196 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path14"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text84"
                            x="503.05341"
                            y="244.53578"
                          >
                            福生市
                          </text>
                        </g>
                        <g
                          id="g59"
                          transform="matrix(1.0021345,0,0,1.0021345,-2.7449095,0.01497068)"
                        >
                          <path
                            d="m 469,179.796 5.873,13.172 -4.805,10.537 3.737,9.484 5.873,-5.795 18.686,15.806 11.212,-11.064 22.424,8.43 -1.602,-11.065 -7.474,-6.849 -2.67,-13.172 -11.212,-4.742 v 0 L 497.297,185.064 479.144,174 Z"
                            stroke="#ffffff"
                            stroke-width="2"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path10"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14px"
                            transform="translate(476.718,204)"
                            id="text85"
                          >
                            羽村市
                          </text>
                        </g>
                        <g
                          id="g58"
                          transform="matrix(1.0021345,0,0,1.0021345,-2.7449095,0.01497068)"
                        >
                          <path
                            d="M 509.326,184.518 505,168.331 l 11.896,-9.712 9.193,3.777 9.733,-5.396 10.815,4.856 9.193,0.54 10.274,5.935 v 13.489 l 11.896,-1.079 -2.163,10.252 -7.03,4.856 -6.489,-8.633 -6.488,18.885 -6.489,13.489 -6.489,12.41 -10.274,-10.252 -1.622,-12.41 -8.652,-7.014 -3.245,-13.489 z"
                            stroke="#ffffff"
                            stroke-width="2"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path11"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14px"
                            transform="translate(518.475,184)"
                            id="text86"
                          >
                            瑞穂町
                          </text>
                        </g>
                        <g id="g63">
                          <path
                            d="m 646.63821,194.96219 7.04501,0.54215 14.63116,-7.03999 24.9271,-5.95569 7.58615,-8.12229 15.17332,3.79007 3.79308,29.24028 h -7.58616 v 9.2046 l -9.75478,1.08331 -2.70876,10.28791 2.16761,13.53683 -7.045,-0.54115 -6.50285,-11.91237 -7.04501,1.62446 -0.54115,-4.87338 -13.54786,9.2046 -7.58615,1.08331 2.70876,-5.95669 -3.79307,-8.1223 v -11.37021 l -10.29593,-7.04 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path19"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text89"
                            x="655.46204"
                            y="209.46107"
                          >
                            東村山市
                          </text>
                        </g>
                        <g id="g61">
                          <path
                            d="m 560.00469,187.41411 -6.44873,17.12347 -9.13546,21.4056 8.59831,9.09637 h 12.35933 l 22.57007,6.42168 1.61143,-5.3514 23.10822,6.42168 5.91059,-2.6757 -3.76201,-12.30721 -6.44774,-7.49196 1.61144,-9.63252 v -5.88654 l -13.97176,-0.53514 -10.20975,-10.70179 -9.13546,5.3514 -2.14957,-5.88654 -7.52303,2.14056 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path12"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="12.0256px"
                            id="text87"
                            x="544.9895"
                            y="220.18063"
                          >
                            武蔵村山市
                          </text>
                        </g>
                        <g id="g62">
                          <path
                            d="m 594.52722,203.24784 9.12143,-10.82305 8.04914,0.54115 18.78,7.03498 15.56115,-7.57613 2.14557,11.3642 10.73186,8.11729 -0.53615,11.3642 4.29215,7.57614 -3.756,6.49383 -20.92658,4.32922 -8.04814,4.87038 -13.41457,-7.03499 -2.68271,-14.61112 -6.97586,-4.32922 2.14657,-16.77573 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path13"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="12.0256px"
                            id="text88"
                            x="612.44537"
                            y="226.49736"
                          >
                            東大和市
                          </text>
                        </g>
                        <g id="g66">
                          <path
                            d="m 632.60833,244.61595 5.9166,-3.71792 20.43753,-3.71792 10.75692,-3.18679 10.75691,-8.4981 2.15158,6.37358 5.37845,-3.71792 8.06719,12.21602 h 6.45475 l -3.22788,-13.80942 10.21977,3.18679 15.59722,-4.24905 3.22687,9.02923 10.21877,-4.24905 11.29505,7.43584 -9.68162,7.96697 9.68162,12.74715 -6.99189,4.78018 h -12.37035 l -6.99189,6.90471 -8.06818,-3.18679 -14.52093,11.68489 -4.30317,-10.62263 -9.68162,5.84245 -6.99189,-11.68489 -13.44564,-2.12453 -11.8322,-6.37357 -18.28695,-3.71792 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path21"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text90"
                            x="679.50922"
                            y="254.55711"
                          >
                            小平市
                          </text>
                        </g>
                        <g id="g64">
                          <path
                            d="m 714.78336,177.68539 29.13906,-10.85712 5.93564,-7.59919 11.33214,-6.51387 8.09424,-11.39928 8.63339,5.42856 -6.4758,10.85612 -5.39549,7.59919 7.01494,9.22865 -6.47579,9.22766 -23.20342,5.42856 -1.0793,6.51388 -14.56903,10.85612 -9.17354,-2.17163 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path20"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text91"
                            x="722.56897"
                            y="182.40344"
                          >
                            清瀬市
                          </text>
                        </g>
                        <g id="g81">
                          <path
                            d="m 796.95838,200.47994 16.69055,-9.1575 17.2287,-12.92754 8.61434,2.69374 -4.30717,12.38839 12.38338,-1.0773 8.61434,-3.77003 8.07621,8.61836 4.30717,-15.62127 9.15249,7.00291 3.76903,5.92462 h 38.76457 l 7.53805,19.93045 -4.84532,10.77295 11.30608,3.23188 -2.69173,16.69756 -9.1535,-6.46376 -8.0752,9.69565 -23.15131,4.30918 -10.22979,-2.15459 -6.46076,-14.54298 -7.53805,5.38647 -22.61317,4.84733 -13.45966,13.46668 -8.0762,-1.61644 -7.53706,6.46377 -15.07511,-9.15651 -1.07729,-24.23962 2.69173,-22.08404 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path33"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16.0342px"
                            id="text107"
                            x="839.5451"
                            y="221.48668"
                          >
                            練馬区
                          </text>
                        </g>
                        <g id="g80">
                          <path
                            d="m 763.1173,216.10823 11.33114,-7.56311 9.17354,2.1606 12.41143,-10.26386 5.93564,8.10326 -2.69774,24.30978 0.53915,22.68832 -9.17354,4.86236 -5.93564,-3.2409 -15.10919,11.34416 -14.56903,1.0803 -4.31719,-8.64341 -10.79199,-15.12622 8.09424,-9.72371 -9.17354,-7.02296 18.34708,0.54015 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path29"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text93"
                            x="744.55475"
                            y="246.54004"
                          >
                            西東京市
                          </text>
                        </g>
                        <g id="g65">
                          <path
                            d="m 711.52341,215.35563 0.76964,-8.42896 6.15511,-1.53326 0.76864,-8.42996 7.69339,6.89769 17.69468,-9.96221 12.30822,-0.76664 20.0026,-10.72885 -3.84619,27.58776 -10.0013,6.13106 -5.38547,13.79438 h -17.69469 l -12.30821,4.59779 -1.53928,-10.72885 -17.69369,5.36443 -7.69339,-5.36443 0.76964,-8.42995 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path28"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="12.0256px"
                            id="text92"
                            x="711.61462"
                            y="217.47815"
                          >
                            東久留米市
                          </text>
                        </g>
                        <g id="g69">
                          <path
                            d="m 551.37732,234.51443 -6.95682,4.8363 4.28112,11.82218 10.16766,-1.07428 10.16665,3.22386 9.63252,-1.61243 -0.53514,5.37444 6.95681,5.37345 8.0261,6.98588 h 5.3514 l -5.88654,15.04705 -12.30722,12.89647 17.65862,2.68672 8.56223,6.98588 11.77208,1.61243 6.95681,-10.20974 11.23794,1.07428 1.07028,-8.59831 -5.88654,-8.06017 2.6757,-4.29915 6.95682,-3.76202 -5.88654,-10.74689 1.60542,-3.22487 13.37749,4.29916 4.28112,-11.28503 -16.05319,-3.22387 -5.3514,-5.37345 -14.44877,-4.8363 -7.49096,2.14958 -21.40559,-6.98688 -2.13956,4.29916 -20.33531,-4.8363 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path15"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text94"
                            x="594.3689"
                            y="271.59341"
                          >
                            立川市
                          </text>
                        </g>
                        <g id="g67">
                          <path
                            d="m 654.52802,254.55712 -3.21785,8.55121 -14.48185,-3.20683 v 4.81025 l 4.29114,7.48294 -7.50899,6.9478 14.48184,9.62049 13.9447,-2.67169 6.43671,8.01707 5.89957,-3.20683 10.1907,11.75804 22.52698,-6.94779 2.68171,-9.62049 -7.50899,-6.41366 -5.36342,-13.36247 -9.65457,7.48294 -6.4357,-11.75804 -14.48185,-2.67269 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path22"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="13.0277px"
                            id="text95"
                            x="645.34448"
                            y="284.62115"
                          >
                            国分寺市
                          </text>
                        </g>
                        <g id="g104">
                          <path
                            d="m 700.75347,277.4128 13.99281,-12.49661 7.53505,3.8031 8.07219,-7.60621 17.22168,-0.54315 3.22988,1.08631 4.84332,9.23667 0.53814,6.51989 2.69073,10.86715 v 8.69251 l -10.22578,4.89042 -4.84331,-0.54316 -8.0732,-8.69352 v 4.89042 l -3.22887,7.06304 -18.29798,1.08632 -8.61134,-9.23668 2.69073,-10.86614 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path30"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="13.0277px"
                            id="text96"
                            x="705.44043"
                            y="285.62329"
                          >
                            小金井市
                          </text>
                        </g>
                        <g id="g76">
                          <path
                            d="m 450.21986,402.64654 19.36124,1.0803 14.52193,10.797 13.98278,0.54015 8.60533,-3.2389 12.37035,4.31819 7.52903,-4.31819 15.06008,9.71769 11.8312,2.69875 9.68162,1.0803 11.8322,8.09725 15.05908,1.62045 12.36934,10.25685 2.15159,6.4788 10.75691,7.01794 13.98278,15.65635 4.84031,14.0369 12.90849,6.4788 20.97468,20.51469 v 15.1162 l 6.99189,-0.54015 8.06718,19.97554 16.67251,2.1596 -3.22687,-8.09825 -5.9156,-6.47779 11.8322,-7.01895 2.15058,-17.2758 -9.68062,-16.19649 0.53815,-21.594 -10.21877,-2.69975 1.61344,-16.1965 15.59722,-17.27579 2.15058,8.09825 -3.76402,16.19649 8.06719,9.17755 12.36934,-14.0369 4.30317,2.1596 3.22687,-10.79699 -7.53004,2.1596 -9.68062,-10.25785 1.07629,-7.01795 -19.36223,-12.9576 -8.60533,0.54015 -7.52904,-15.65634 -14.52193,10.798 -4.84031,-11.8773 -12.90749,2.69875 -5.9166,4.85935 -16.13437,-2.69975 -3.76502,-7.01795 -28.50471,2.1596 -10.75591,20.51469 -1.61343,-8.09825 -16.67252,-9.17754 -18.82409,4.3192 -16.13537,-16.73665 -13.44563,3.2399 h -39.26062 l -5.91661,-8.09825 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path17"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16.0342px"
                            id="text97"
                            x="628.15082"
                            y="461.99896"
                          >
                            町田市
                          </text>
                        </g>
                        <g id="g100">
                          <path
                            d="m 914.47067,321.69211 10.23981,5.39249 4.85033,11.86427 9.70066,24.80683 -4.85033,22.1111 -18.32402,-8.62838 -6.46678,1.0783 6.46678,17.7959 -5.92763,11.86427 22.09606,2.1576 2.69474,21.57094 -7.00592,1.0783 -11.85725,-11.32412 -13.4727,2.69574 2.69474,10.78597 -10.77896,-3.77504 -14.01184,-14.56101 -22.63421,-16.17846 -21.01877,-2.69574 -11.3171,-2.69675 4.31118,-14.56101 -5.38948,-6.47078 -0.53815,-17.25776 6.46678,-7.55008 -5.38948,-12.40342 3.23389,-7.00993 -10.23981,-8.08923 5.92862,-10.78597 6.46678,-3.23589 6.46677,2.69674 7.00592,11.86427 8.08422,-0.53915 21.55692,4.85334 8.08421,8.62838 16.70659,-10.24683 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path38"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16.0342px"
                            id="text98"
                            x="840.2536"
                            y="371.80685"
                          >
                            世田谷区
                          </text>
                        </g>
                        <g id="g103">
                          <path
                            d="m 949.55239,406.78535 6.46978,5.37846 15.09616,8.60533 6.47078,3.22687 8.08722,10.75691 7.54808,-3.76502 7.00689,4.84031 23.7206,0.53815 8.6283,6.99189 3.2369,-14.52193 11.3241,-3.22687 1.6135,9.68162 -3.768,5.9156 10.7829,1.07629 5.9327,6.45375 -29.6632,3.76501 10.793,4.84031 v 0 l 16.1744,3.22688 18.3291,30.11915 10.2418,11.8332 -14.561,8.06718 -5.3915,7.53004 -44.2042,-24.74069 -12.4064,3.76502 -11.32412,-5.91661 -8.08321,6.9919 -5.93064,-3.22688 -9.70467,9.68162 -21.02778,-0.53814 2.15659,-13.44664 5.93063,-7.52904 -8.08722,-5.9166 c -5.55884,-2.21772 -3.45536,-2.15158 -5.93064,-2.15158 l -16.17445,-4.30217 -9.70567,-15.59822 -1.07829,-10.75691 -10.78297,-9.68062 -6.46978,-2.15158 -1.61745,-10.75691 13.47871,-2.15159 12.40142,13.44664 7.00892,-1.61343 -3.77403,-18.8251 5.93063,-3.22687 -0.53915,-8.60533 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path43"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16.0342px"
                            id="text99"
                            x="968.7182"
                            y="466.00748"
                          >
                            大田区
                          </text>
                        </g>
                        <g id="g99">
                          <path
                            d="m 975.49064,374.81326 -4.81425,10.26386 -14.9759,1.0803 2.67469,9.18356 -9.09236,9.72471 28.34637,19.44742 7.48795,10.80401 7.48795,-4.86235 9.63051,5.4025 22.999,0.54015 6.9448,7.56311 3.2168,-15.66637 9.0894,-2.70075 -6.9548,-7.02296 -9.6305,-17.28682 -2.1346,-15.12621 -28.88149,1.0803 -5.3484,-11.34416 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path44"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16.0342px"
                            id="text100"
                            x="974.27808"
                            y="409.88797"
                          >
                            品川区
                          </text>
                        </g>
                        <g id="g96">
                          <path
                            d="m 975.31927,374.59379 1.61544,-7.6032 10.76293,-5.97472 -4.30517,-17.37902 -15.0691,-9.23266 4.84332,-13.03376 h 3.22888 l 4.30617,-7.6032 13.45466,-1.08631 12.9195,8.68951 23.1393,5.97372 1.6134,10.31898 -4.8403,4.88741 -1.0823,29.32746 25.2939,2.17263 4.3092,6.51688 -6.9949,5.43057 -3.2269,10.86213 -8.0772,-13.57691 7.536,-7.6042 -18.8401,-2.17163 -1.0723,11.94745 -30.6773,2.17263 -3.76803,-11.40529 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path45"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16.0342px"
                            id="text101"
                            x="990.43848"
                            y="357.77698"
                          >
                            港区
                          </text>
                        </g>
                        <g id="g87">
                          <path
                            d="m 1087.6876,400.29653 13.5088,8.5893 7.5561,14.49487 3.778,9.66358 -7.5561,-1.61043 -10.803,0.53715 -11.3441,6.97886 -14.5811,-3.22086 -0.5412,-7.51601 -3.2368,-3.22186 8.6384,-13.42059 z m 16.7457,-126.69885 15.6633,9.66358 14.5811,4.83129 v 10.20073 l -2.6957,13.95772 0.5311,14.49588 -1.6135,33.82204 -5.4015,1.61043 -3.2469,27.37931 -5.9326,15.56916 -12.4265,-23.62131 -4.8603,-17.71673 -21.606,7.516 -1.0723,19.86331 -7.025,-3.758 -7.025,-4.83129 11.3442,12.88444 -4.8603,6.44272 -8.6384,-12.88444 -3.7781,2.68372 9.7207,15.03201 -9.1795,7.51601 -12.4265,-18.25288 4.3192,-11.81115 6.4838,-4.29515 -4.8604,-9.12644 5.4016,-1.61043 14.0399,-2.14757 4.3192,-10.19973 -4.3192,-1.61043 -7.025,-10.73787 1.0823,-9.12644 -5.4015,-15.03201 9.7207,-13.42159 -0.5412,-6.97886 14.05,4.29514 10.793,-8.05315 8.6484,-2.14757 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path55"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16.0342px"
                            id="text102"
                            x="1071.8138"
                            y="344.74921"
                          >
                            江東区
                          </text>
                        </g>
                        <g id="g86">
                          <path
                            d="m 1163.94,233.39004 -8.0972,30.49094 3.778,6.41867 -15.0921,-3.20883 -9.1696,4.27911 -8.0872,-11.76806 -5.3915,2.67469 3.2369,9.62851 -6.4738,10.16365 15.1022,5.88353 -2.6957,21.39757 1.6134,21.93172 -1.6134,30.48994 3.768,3.74497 3.778,5.88454 6.4638,-6.95482 10.783,13.37349 0.5411,-11.23393 7.5561,4.28012 17.7879,-23.00199 v -26.74597 l -2.6957,-5.88453 3.778,-7.48895 h 15.6333 l 19.4114,-14.97791 -1.6135,-19.25701 -10.2518,-2.13956 -7.5461,-11.76806 -7.0049,-9.09437 4.8503,-14.44277 -3.2369,-9.6285 -9.1695,-6.95381 -9.7007,10.16364 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path56"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16.0342px"
                            id="text103"
                            x="1138.6963"
                            y="299.65317"
                          >
                            江戸川区
                          </text>
                        </g>
                        <g id="g85">
                          <path
                            d="m 1134.0163,154.34368 10.2017,8.07219 5.3715,-6.9959 19.3311,1.07629 -6.9849,10.76393 3.7681,10.76392 13.9597,-4.84431 9.1295,3.22887 -0.5412,5.92061 -17.1866,8.61134 12.3563,27.98461 -10.7429,10.22578 -8.5883,4.30517 -8.0571,29.0619 2.1445,8.07319 -12.8874,-2.69073 -10.2017,2.69073 -6.9849,-10.76392 -15.5732,-15.60725 -11.8151,-18.83611 -9.1295,-13.45466 2.6857,-6.45876 8.0572,6.9969 9.6606,-11.84021 18.2689,-11.30208 5.9026,8.61134 h 9.6705 l -3.758,-15.06909 -12.8974,-17.22168 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path48"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16.0342px"
                            id="text104"
                            x="1120.0465"
                            y="224.49309"
                          >
                            葛飾区
                          </text>
                        </g>
                        <g id="g84">
                          <path
                            d="m 1006.6951,174.70404 v 0 l 10.2017,-5.92762 5.3715,2.15559 8.0471,-18.85917 -8.0471,-8.62136 -2.1546,-8.62137 23.6303,-7.54406 6.4437,15.08713 25.2438,2.69474 12.8875,-6.46577 16.1043,-5.92763 -3.7581,22.63121 12.8875,3.23288 10.2017,-7.54407 9.6706,4.31119 -4.2991,11.85424 12.8874,18.85917 2.6857,12.93255 -6.9848,-0.53915 -8.0472,-7.54407 -19.3312,14.54899 -8.0571,8.08221 -6.9849,-7.54407 -2.6857,7.00492 8.5983,14.54899 -6.9849,7.00492 -12.3463,-1.07729 h -12.3563 l -9.6606,-8.62137 4.8303,-9.16051 -15.042,-2.69474 -27.3783,-0.53814 -6.9849,-7.00492 12.3463,-7.54407 v -6.46577 l -19.3312,3.77203 -5.9026,-15.08813 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path47"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16.0342px"
                            id="text105"
                            x="1049.8971"
                            y="187.41411"
                          >
                            足立区
                          </text>
                        </g>
                        <g id="g82">
                          <path
                            d="m 866.10566,182.02363 21.05885,-25.78091 29.15811,-5.90758 8.09925,5.37044 28.61795,-4.29615 -6.4798,19.87232 12.41945,4.8343 7.5591,23.63133 17.81895,14.50189 -3.2399,12.89045 -9.7197,-5.37144 -8.6384,10.20474 -11.34015,-3.22287 -12.41845,3.76001 -5.3995,-4.29715 -9.7197,-1.61043 3.78005,-12.89045 -7.5601,-19.33519 -39.41696,1.07429 -2.1596,-6.44573 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path36"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16.0342px"
                            id="text106"
                            x="898.20203"
                            y="187.41411"
                          >
                            板橋区
                          </text>
                        </g>
                        <g id="g101">
                          <path
                            d="m 815.99894,264.13753 5.40451,-5.92162 9.18656,2.15359 13.51078,-14.53395 23.77865,-4.30618 1.0803,5.38247 4.32321,5.38346 -1.0803,7.53605 20.53573,10.76594 7.02497,3.22987 h 9.18757 l 6.48481,17.22469 3.78306,4.84432 -5.40452,8.0752 -5.94466,1.61444 8.10627,15.61025 -17.29283,4.84431 -17.29384,9.68964 -9.72672,-10.22778 -20.53674,-3.76803 -5.94466,1.61544 -8.10626,-13.45766 -7.02497,-2.15259 -3.2429,-12.38137 1.62145,-11.30407 5.94466,-2.15259 -6.48481,-7.53605 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path34"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16.0342px"
                            id="text108"
                            x="847.54315"
                            y="296.64676"
                          >
                            杉並区
                          </text>
                        </g>
                        <g id="g94">
                          <path
                            d="m 962.69639,253.16115 6.47479,15.6333 13.49073,-3.77404 8.09424,9.70366 19.96755,-0.53914 2.6957,11.32111 -19.42635,17.78889 -1.61845,10.78196 -9.71269,0.53915 -3.23789,8.08622 -4.85635,-0.53914 -2.69774,-12.93756 -11.33214,-7.00793 -9.17354,4.85134 -9.17354,0.53914 -3.23789,-12.3984 4.85734,-16.17245 5.93564,-8.08622 -14.02988,-4.31319 -6.47579,-8.62537 2.1586,-13.4767 5.39549,10.78196 20.50567,2.15559 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path42"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text110"
                            x="955.33569"
                            y="290.63397"
                          >
                            新宿区
                          </text>
                        </g>
                        <g id="g102">
                          <path
                            d="m 875.05272,236.5187 -6.94279,3.74097 1.60241,5.34538 3.20383,5.87852 v 8.55222 l 29.90569,14.43074 5.87451,-1.06928 6.40865,19.77512 2.66969,2.67269 -3.20382,6.9478 -5.87452,3.20683 4.80624,10.68977 12.28316,-9.62049 13.88458,-11.22391 4.27209,-16.56829 5.34038,-8.01707 -12.8163,-3.20683 -8.01106,-10.15563 3.20482,-11.75805 -8.5452,-6.9478 -8.01006,9.08535 -23.49805,4.27611 -10.68074,-2.67269 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path35"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text109"
                            x="900.52399"
                            y="277.6062"
                          >
                            中野区
                          </text>
                        </g>
                        <g id="g97">
                          <path
                            d="m 914.20811,315.86971 25.28185,-19.22294 3.22788,12.28116 6.99189,-1.06728 10.22077,-5.87451 11.8342,7.47592 3.22688,12.28216 -6.9929,12.8153 16.67552,11.74802 2.68973,15.48498 -10.75792,8.01006 -3.76602,-5.33937 -3.76502,2.66969 -8.60633,-5.87452 -16.67551,-26.69886 -15.59923,-1.06828 -4.30316,-6.40764 -6.9929,-4.2721 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path40"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="15.032px"
                            id="text112"
                            x="925.19855"
                            y="325.70868"
                          >
                            渋谷区
                          </text>
                        </g>
                        <g id="g73">
                          <path
                            d="m 674.82725,290.63396 v 0 c -6.43069,3.51348 -3.79508,2.52738 -7.55008,3.78105 v -1.62045 l -4.31318,5.94266 0.53915,11.34416 -3.77505,10.26386 -22.10909,2.16161 7.00994,16.20652 4.85333,3.2409 17.25576,4.86135 h 9.16752 l 9.16653,6.48281 15.6383,-3.2409 18.33405,3.2409 7.55008,3.24191 9.16653,-3.78206 10.24582,7.02296 -7.00993,-21.06787 11.86327,-13.50577 -1.0783,-7.02296 -7.54908,-8.10326 4.31319,-8.64341 -10.78497,-9.18356 -1.61745,12.96562 -18.8732,-0.54015 -9.16752,-7.56311 -22.64824,5.94165 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path24"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16.0342px"
                            id="text113"
                            x="675.04871"
                            y="328.71506"
                          >
                            府中市
                          </text>
                        </g>
                        <g id="g77">
                          <path
                            d="m 750.18676,321.31431 -0.77264,6.16713 -11.58167,9.25071 7.72145,23.89689 10.03737,7.70842 13.89861,-2.31192 7.72144,3.85421 18.53147,6.93777 2.31594,-18.5014 17.75982,-6.16614 7.72145,7.70842 8.49309,-9.2507 -3.08858,-3.85421 -3.08858,-10.02134 3.86123,-6.16714 -13.89861,-10.02134 -6.17715,6.16713 3.86022,4.62485 -4.63287,8.48006 -7.72145,-6.93777 -6.9488,-17.73077 -10.03737,-8.47906 -15.4429,9.25071 v 11.56262 l 2.31594,8.48006 -13.12596,-6.93777 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path27"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16.0342px"
                            id="text114"
                            x="759.15088"
                            y="351.76416"
                          >
                            調布市
                          </text>
                        </g>
                        <g id="g105">
                          <path
                            d="m 797.64685,358.08663 18.84614,-5.32033 7.53805,6.38359 -1.61544,12.7682 8.61535,9.5764 -6.46176,14.36359 -9.1535,-7.98 -11.30808,1.5964 -9.1535,-9.57639 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path37"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="13.0277px"
                            id="text115"
                            x="791.0979"
                            y="378.82181"
                          >
                            狛江市
                          </text>
                        </g>
                        <g id="g74">
                          <path
                            d="m 650.93136,341.74282 16.0572,4.8824 9.63452,-1.62747 8.0281,7.59518 -3.74698,10.85011 4.81726,11.39326 -9.63452,8.13734 v 0 l -11.23894,7.59517 -6.95882,16.27467 -14.45078,1.62746 -4.28212,5.42556 -17.12748,-2.71278 -2.14056,-7.59518 -28.36742,2.17063 12.31022,-8.68049 8.0281,-12.47758 23.55016,-8.68049 -4.81626,-9.22264 -10.7048,-4.8824 0.53514,-7.59518 11.77508,6.50987 6.42268,-4.8824 7.49296,-4.8824 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path25"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text116"
                            x="632.36981"
                            y="380.82605"
                          >
                            多摩市
                          </text>
                        </g>
                        <g id="g75">
                          <path
                            d="m 684.19922,354.60521 -2.14157,8.61335 3.74799,11.84322 -9.10339,8.0752 1.60642,7.53606 13.92265,6.9989 6.96183,15.07311 22.4899,2.15358 -1.60642,-11.30508 -9.10339,-3.76802 12.85238,-10.76693 18.74191,-9.1515 4.28413,-12.38237 -1.07128,-6.9979 -10.17367,-8.61335 -8.56825,4.30617 -6.96183,-4.30617 -17.67064,-2.15359 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path26"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16.0342px"
                            id="text117"
                            x="690.91449"
                            y="378.82181"
                          >
                            稲城市
                          </text>
                        </g>
                        <g id="g78">
                          <path
                            d="m 744.52571,302.58241 -2.68472,6.47579 8.05315,12.95059 22.01088,13.48973 -2.14757,-10.79199 -0.53715,-9.71268 15.56916,-8.09424 10.20073,7.01494 6.44172,20.50467 5.36843,4.3172 6.44273,-7.55409 -4.29515,-2.69875 8.5903,-7.55409 2.14757,0.53915 4.83129,-9.71269 7.51601,-2.69775 -4.83129,-11.87228 -5.90558,0.54015 -10.20073,-18.34708 -1.61043,9.17354 -14.49487,-0.53915 -9.66358,-10.79299 -9.12644,-1.61845 5.90558,9.17354 -5.36944,9.17354 -15.03202,-2.69875 v 0 l -4.29414,6.4758 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path32"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text118"
                            x="770.68445"
                            y="307.67026"
                          >
                            三鷹市
                          </text>
                        </g>
                        <g id="g79">
                          <path
                            d="m 755.87087,269.23839 v 0 l 1.07028,5.78733 1.07128,8.94405 6.42469,7.36569 12.84936,3.15672 4.81827,-8.41793 -4.81827,-8.94405 8.03011,1.57836 10.7078,9.47017 13.38551,1.57836 1.60542,-8.41793 10.70781,16.30974 h 5.3544 l 2.14156,-11.04853 4.81827,-3.68284 -5.35341,-8.41793 -8.0311,-5.26121 -19.80919,-13.67913 -9.63753,4.20896 -5.3534,-1.57836 -14.99093,9.99629 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path31"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text119"
                            x="768.75531"
                            y="275.60196"
                          >
                            武蔵野市
                          </text>
                        </g>
                        <g id="g72">
                          <path
                            d="m 575.39147,297.6489 -4.32722,4.81927 v 12.85237 l -5.94867,10.17367 -15.68441,14.99394 1.62246,11.24495 19.47047,11.78109 23.25553,4.28412 27.0416,-11.24495 10.27588,3.21285 7.57213,-5.35541 7.02997,-2.14156 5.94968,-10.17467 -7.57213,-6.42569 -7.02997,-12.85237 -13.5208,-7.49597 -4.32722,-6.96183 -14.6021,-1.60642 -7.03098,-7.49697 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path18"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="16.0342px"
                            id="text120"
                            x="578.05414"
                            y="340.74069"
                          >
                            日野市
                          </text>
                        </g>
                        <g id="g68">
                          <path
                            d="m 633.66458,279.61048 14.00784,9.67962 16.16342,-3.22687 4.84933,7.52803 -4.84933,6.99089 v 12.90549 l -4.31018,10.21676 h -22.09005 l -15.08613,-6.45275 -3.77103,-8.60332 6.46577,-10.75491 11.3141,1.61344 -4.84933,-16.13236 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path23"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="13.0277px"
                            id="text121"
                            x="623.84766"
                            y="308.67239"
                          >
                            国立市
                          </text>
                        </g>
                        <g id="g90">
                          <path
                            d="m 934.39511,229.11794 v 0 l -2.14858,16.18848 5.90759,10.25284 18.79904,2.69774 4.83329,-4.31619 6.98187,15.64833 14.50189,-2.1586 3.22286,-12.95058 16.11333,-2.1586 2.6857,-7.55409 9.1295,-4.3172 -3.758,-9.71268 -12.35436,0.53915 -5.37144,-5.93565 -8.5933,7.5551 -3.22287,-7.01495 -9.13044,-5.39649 -7.51902,11.33214 -11.81617,-4.3172 -5.90758,3.77705 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path41"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text122"
                            x="951.57367"
                            y="247.54218"
                          >
                            豊島区
                          </text>
                        </g>
                        <g id="g83">
                          <path
                            d="m 954.21132,149.333 v 0 l 12.26612,14.54498 18.66576,0.53915 5.33236,5.92562 14.93684,-5.38647 2.1245,8.08021 -4.7902,8.08121 5.3313,14.54498 19.7321,-4.30918 1.0622,7.54207 -12.7972,7.00291 5.8625,7.00292 -3.728,3.23288 11.1939,9.69666 9.0693,7.54206 -4.2691,9.15851 -19.732,-1.61645 -3.1968,-10.2358 -14.39971,-1.61544 -3.73295,-4.84832 -8.53318,8.61935 -4.79922,-7.54206 4.26608,-11.85224 -19.19889,-14.00684 -5.86549,-26.39722 -11.73299,-2.15459 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path46"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text123"
                            x="975.96967"
                            y="202.44614"
                          >
                            北区
                          </text>
                        </g>
                        <g id="g89">
                          <path
                            d="m 1022.7293,212.46747 h 27.4083 l 13.4286,1.08331 -3.2168,9.20862 8.5983,9.20861 23.6403,1.08431 -4.2991,15.1673 -15.042,-0.54215 -5.9126,-4.87539 -11.2841,9.75077 -15.5832,-2.16661 -12.3663,-8.12531 6.4537,-1.08331 3.2169,-6.50084 -19.3412,-18.41723 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path49"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="13.0277px"
                            id="text124"
                            x="1041.379"
                            y="239.5251"
                          >
                            荒川区
                          </text>
                        </g>
                        <g id="g92">
                          <path
                            d="m 1038.9137,250.02346 18.5195,2.6757 11.4443,-10.16765 4.3593,4.28112 16.3448,0.53514 -4.9004,13.37749 -5.9928,6.95682 -13.629,29.96682 -10.352,-5.3514 -8.7186,-9.63151 -4.9004,-1.07028 -2.7258,-10.7028 -1.0824,-7.49195 -3.8181,-7.49096 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path52"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="13.0277px"
                            id="text125"
                            x="1038.7334"
                            y="271.59341"
                          >
                            台東区
                          </text>
                        </g>
                        <g id="g88">
                          <path
                            d="m 1102.2386,227.49949 9.6806,17.16356 17.7478,15.55413 -6.4537,2.68171 2.1546,10.1907 -6.4538,11.26299 -15.0621,-8.58127 -2.6857,19.84526 -8.0672,2.68172 -11.294,5.36342 -18.279,-5.36342 13.9798,-26.28098 8.0672,-12.33628 6.9949,-26.28197 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path51"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="13.0277px"
                            id="text126"
                            x="1083.4686"
                            y="269.58914"
                          >
                            墨田区
                          </text>
                        </g>
                        <g id="g91">
                          <path
                            d="m 1013.6499,240.52724 16.0141,2.11651 9.6105,6.88065 -4.8002,7.93791 4.2691,8.99616 -1.0623,6.88066 4.8002,7.9379 -8.5382,6.35053 -14.9518,-6.35053 -7.4759,1.05826 -1.0623,-7.93791 -19.75507,-1.58738 -5.33837,-6.35153 1.06727,-11.6428 16.55027,-3.70389 c 3.5576,-3.52851 3.3772,-8.11528 10.6727,-10.58454 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path50"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="13.0277px"
                            id="text127"
                            x="993.60925"
                            y="267.58487"
                          >
                            文京区
                          </text>
                        </g>
                        <g id="g98">
                          <path
                            d="m 927.79605,333.72574 14.70031,1.62546 14.70132,21.126 c 5.00466,6.64014 1.09934,2.36905 7.07807,7.042 1.3158,1.02819 3.81112,3.24992 3.81112,3.24992 l 4.35528,-1.62546 4.90043,4.87538 -7.07807,16.79277 -16.33379,0.54115 4.90044,10.83408 -10.34504,10.29292 -11.97851,-6.50084 v 9.75076 l -4.35528,2.16662 -2.17864,-4.33323 -21.77838,-1.08331 7.62223,-14.084 -6.53291,-17.33492 7.07807,0.54216 18.51143,7.58315 4.35628,-23.83376 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path39"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text128"
                            x="933.54431"
                            y="379.82391"
                          >
                            目黒区
                          </text>
                        </g>
                        <g id="g95">
                          <path
                            d="m 1056.0001,293.64036 9.1495,2.70978 4.8503,11.37923 -9.6906,14.08901 4.8403,13.54786 -2.1546,9.75377 7.5461,12.46355 -15.6233,9.21262 -5.9226,-2.16762 12.9275,-9.75377 -3.768,-10.83809 -14.0098,12.46355 -16.6956,-13.0057 4.3092,-5.41854 -2.1546,-11.9224 11.8452,-12.46354 v -16.25663 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path54"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="12.0256px"
                            id="text129"
                            x="1026.5875"
                            y="335.73001"
                          >
                            中央区
                          </text>
                        </g>
                        <g id="g93">
                          <path
                            d="m 1011.6356,282.77823 -17.12044,20.57282 -2.14056,9.2036 5.88554,2.16461 10.69976,8.1213 20.8645,4.87238 12.3062,-15.70044 -0.5312,-13.53383 13.9097,-4.87238 -8.0271,-11.91137 h -4.8103 l -7.4959,5.41453 -15.5131,-6.49683 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path53"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="12.0256px"
                            id="text111"
                            x="996.46533"
                            y="307.67026"
                          >
                            千代田区
                          </text>
                        </g>
                        <g id="g106">
                          <path
                            d="m 93.603203,493.06512 -2.147474,9.26373 5.726497,8.55222 -3.579023,7.83869 15.032117,6.41366 7.87377,-14.25235 -5.01067,-12.82732 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path57"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text130"
                            x="110.67466"
                            y="514.10992"
                          >
                            大島町
                          </text>
                        </g>
                        <g id="g107">
                          <path
                            d="m 74.265315,545.17611 -4.856544,-6.8566 5.550322,-6.17115 3.468888,7.54207 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path58"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text131"
                            x="80.552788"
                            y="542.16974"
                          >
                            利島村
                          </text>
                        </g>
                        <g id="g108">
                          <path
                            d="m 77.425847,557.20173 -11.023479,11.45339 5.144256,13.59997 4.409392,-7.87377 0.734965,-9.30582 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path59"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text132"
                            x="78.365227"
                            y="576.24231"
                          >
                            新島村
                          </text>
                        </g>
                        <g id="g109">
                          <path
                            d="m 44.178533,598.28924 -2.829527,13.02775 v 0 l 7.073867,-3.83217 h 4.951747 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path60"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text133"
                            x="48.486008"
                            y="611.31696"
                          >
                            神津島村
                          </text>
                        </g>
                        <g id="g110">
                          <path
                            d="m 129.16104,623.3426 -3.60167,9.24569 -5.04174,2.84506 4.3212,8.53418 7.20334,1.42203 11.52455,-9.2457 -2.1606,-10.66772 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path61"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text134"
                            x="141.5374"
                            y="637.3725"
                          >
                            三宅村
                          </text>
                        </g>
                        <g id="g111">
                          <path
                            d="m 149.36808,650.40023 -4.79923,7.23741 6.85661,5.79034 h 4.11376 l 2.05738,-9.40904 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path62"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text135"
                            x="131.43689"
                            y="678.46002"
                          >
                            御蔵島村
                          </text>
                        </g>
                        <g id="g112">
                          <path
                            d="m 262.68142,523.82263 7.47593,5.93564 2.13655,5.93565 h -7.47593 l -8.01006,-10.25184 z m 27.76714,-9.71269 11.21389,7.55409 8.01006,3.77805 3.20382,1.61845 h 9.07734 l 7.47592,11.33213 0.53414,9.71269 -5.33937,7.01494 -4.2721,8.09424 -4.2721,-3.23789 -14.41771,-3.2379 -2.66969,-8.63339 -2.66968,-5.39649 -7.47593,0.54015 -6.40764,-8.63439 -1.06828,-14.56903 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path63"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text136"
                            x="305.02863"
                            y="522.12701"
                          >
                            八丈町
                          </text>
                        </g>
                        <g id="g113">
                          <path
                            d="m 286.87195,622.35149 1.67055,9.37196 7.7936,3.64476 5.56786,-3.64476 -1.11337,-6.76842 c -4.63988,-0.86784 -7.6092,-2.77691 -13.91864,-2.60354 z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            stroke-miterlimit="8"
                            fill="#10b981"
                            fill-rule="evenodd"
                            id="path64"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text137"
                            x="303.21475"
                            y="634.36609"
                          >
                            青ヶ島村
                          </text>
                        </g>
                        <g id="g114">
                          <path
                            d="m 454.2284,603.94729 4.91948,4.8353 h 7.6523 l -1.6395,4.8363 6.01281,1.07429 -3.27998,4.8353 2.18665,4.83529 3.82615,-2.68672 3.82615,4.8363 -6.55897,4.29816 4.91948,5.90958 1.63949,5.37245 -4.91948,4.29815 -4.37231,-9.6706 -7.6533,-6.44773 1.64049,-3.22286 -0.54716,-8.59631 -5.46564,-2.68673 z m 42.08965,-83.27637 4.91947,1.07529 1.09333,6.98387 -9.29279,-2.14857 z m -24.05123,-15.58019 6.01281,0.53715 3.82615,5.90958 -3.27999,6.44774 1.64049,6.44673 9.29179,4.8353 2.73383,5.37344 -7.6533,3.22287 5.46664,4.29815 v 6.98488 l 2.73282,6.44673 h -2.18666 l -2.18565,5.91059 -3.82715,-1.07429 -12.57178,2.14858 3.27999,-4.8353 -0.54717,-6.98488 6.01281,-6.98387 -6.55897,-3.76101 8.74562,-2.68673 -12.02561,-4.8353 4.91948,1.61244 6.55997,-2.68672 -6.55997,-4.8353 1.63949,-3.22387 -2.73282,-5.90959 v -6.44773 z M 531.39275,677.26044 534.90022,682.46853 538.40769,678.74861 C 536.06971,678.25255 536.09878,674.96655 531.39275,677.26044 Z"
                            stroke="#ffffff"
                            stroke-width="2.00427"
                            fill="#10b981"
                            fill-rule="evenodd"
                          />
                          <text
                            font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                            font-weight="700"
                            font-size="14.0299px"
                            id="text138"
                            x="447.24551"
                            y="589.27002"
                          >
                            小笠原村
                          </text>
                        </g>
                        <g id="g115">

                        </g>
                      </g>
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
  );
};

export default TokyoMap;
