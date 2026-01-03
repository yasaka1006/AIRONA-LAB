import MapQuizManager from './MapQuizManager';

const Chiba = () => {

    const gameTitle = '千葉県の市区町村全部言えるかな？';

    const allDistricts = [
        { id: '千葉市', names: ['千葉市', 'ちばし'] },
        { id: '銚子市', names: ['銚子市', 'ちょうしし'] },
        { id: '市川市', names: ['市川市', 'いちかわし'] },
        { id: '船橋市', names: ['船橋市', 'ふなばしし'] },
        { id: '館山市', names: ['館山市', 'たてやまし'] },
        { id: '木更津市', names: ['木更津市', 'きさらづし'] },
        { id: '松戸市', names: ['松戸市', 'まつどし'] },
        { id: '野田市', names: ['野田市', 'のだし'] },
        { id: '茂原市', names: ['茂原市', 'もばらし'] },
        { id: '成田市', names: ['成田市', 'なりたし'] },
        { id: '佐倉市', names: ['佐倉市', 'さくらし'] },
        { id: '東金市', names: ['東金市', 'とうがねし'] },
        { id: '旭市', names: ['旭市', 'あさひし'] },
        { id: '習志野市', names: ['習志野市', 'ならしのし'] },
        { id: '柏市', names: ['柏市', 'かしわし'] },
        { id: '勝浦市', names: ['勝浦市', 'かつうらし'] },
        { id: '市原市', names: ['市原市', 'いちはらし'] },
        { id: '流山市', names: ['流山市', 'ながれやまし'] },
        { id: '八千代市', names: ['八千代市', 'やちよし'] },
        { id: '我孫子市', names: ['我孫子市', 'あびこし'] },
        { id: '鴨川市', names: ['鴨川市', 'かもがわし'] },
        { id: '鎌ケ谷市', names: ['鎌ケ谷市', 'かまがやし'] },
        { id: '君津市', names: ['君津市', 'きみつし'] },
        { id: '富津市', names: ['富津市', 'ふっつし'] },
        { id: '浦安市', names: ['浦安市', 'うらやすし'] },
        { id: '四街道市', names: ['四街道市', 'よつかいどうし'] },
        { id: '袖ヶ浦市', names: ['袖ヶ浦市', 'そでがうらし', '袖ケ浦市'] },
        { id: '八街市', names: ['八街市', 'やちまたし'] },
        { id: '印西市', names: ['印西市', 'いんざいし'] },
        { id: '白井市', names: ['白井市', 'しろいし'] },
        { id: '富里市', names: ['富里市', 'とみさとし'] },
        { id: '南房総市', names: ['南房総市', 'みなみぼうそうし'] },
        { id: '匝瑳市', names: ['匝瑳市', 'そうさし'] },
        { id: '香取市', names: ['香取市', 'かとりし'] },
        { id: '山武市', names: ['山武市', 'さんむし'] },
        { id: 'いすみ市', names: ['いすみ市', 'いすみし'] },
        { id: '大網白里市', names: ['大網白里市', 'おおあみしらさとし'] },
        { id: '酒々井町', names: ['酒々井町', 'しすいまち'] },
        { id: '栄町', names: ['栄町', 'さかえまち'] },
        { id: '神崎町', names: ['神崎町', 'こうざきまち'] },
        { id: '多古町', names: ['多古町', 'たこまち'] },
        { id: '東庄町', names: ['東庄町', 'とうのしょうまち'] },
        { id: '九十九里町', names: ['九十九里町', 'くじゅうくりまち'] },
        { id: '芝山町', names: ['芝山町', 'しばやままち'] },
        { id: '横芝光町', names: ['横芝光町', 'よこしばひかりまち'] },
        { id: '一宮町', names: ['一宮町', 'いちのみやまち'] },
        { id: '睦沢町', names: ['睦沢町', 'むつざわまち'] },
        { id: '長生村', names: ['長生村', 'ちょうせいむら'] },
        { id: '白子町', names: ['白子町', 'しらこまち'] },
        { id: '長柄町', names: ['長柄町', 'ながらまち'] },
        { id: '長南町', names: ['長南町', 'ちょうなんまち'] },
        { id: '大多喜町', names: ['大多喜町', 'おおたきまち'] },
        { id: '御宿町', names: ['御宿町', 'おんじゅくまち'] },
        { id: '鋸南町', names: ['鋸南町', 'きょなんまち'] }
    ];

    const isWide = false; {/* ワイドならtrue、正方形ならfalse */ }

    const svgContent = (
        <svg
            width="100%"
            viewBox={isWide ? "0 0 1280 720" : "0 0 720 720"}
            style={{ display: 'block', width: '100%', height: 'auto' }}
        >

            {/* ここから下を貼り替える defはいらない*/}

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
                d="M132 280 120 276 117 291 106 277 92 285 96 295 104 297 105 306 94 307 86 297 79 286 82 279 76 271 72 282 81 305 89 312 81 317 88 317 98 334 91 341 95 345 87 355 80 354 86 358 68 366 69 355 34 392-6 389-9 185 29 185 61 191 70 186 74 161 125 174 144 202 165 238 153 259 132 280Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeMiterlimit="8"
                fill="#A0EBD2"
                fillRule="evenodd"
                id="path3" />
            <path
                d="M62 195 74 188 74 188 78 172 95 180 105 175 108 188 118 182 133 188 136 199 146 197 157 141 103 35 57-5-6-3-4 190 62 195Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeMiterlimit="8"
                fill="#A0EBD2"
                fillRule="evenodd"
                id="path4" />
            <path
                d="M509-1 515 23 547 86 560 86 555 96 565 117 583 139 581 144 624 215 636 219 595 220 225 160 135 84 93 28 89 18 80 23 62 18 62-2 509-1Z"
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
                fontSize="18"
                transform="translate(25 245)"
                id="text59">東京都</text>
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="18"
                transform="translate(81 245)"
                id="text60" />
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="18"
                transform="translate(26 115)"
                id="text61">埼玉県</text>
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="18"
                transform="translate(82 115)"
                id="text62" />
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="18"
                transform="translate(316 73)"
                id="text63">茨城県</text>
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="18"
                transform="translate(372 73)"
                id="text64" />
            <g
                id="group">
                <g
                    id="g121">
                    <path
                        d="M246 245 259 234 263 243 270 243 273 248 269 258 275 265 282 262 284 273 293 271 297 284 306 272 314 270 317 283 337 285 335 298 333 302 347 318 350 330 344 332 353 349 340 359 334 359 330 364 316 356 314 341 318 334 301 332 295 339 280 338 274 328 268 333 244 325 246 319 242 310 249 306 243 294 243 301 225 287 210 272 220 256 235 254 246 245Z"
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
                        transform="translate(267 308)"
                        id="text65">千葉市</text>
                </g>
                <g
                    id="g122">
                    <path
                        d="M272 516 284 501 289 502 289 492 304 480 301 473 319 472 309 455 308 437 298 433 301 426 296 420 287 398 296 395 292 387 286 384 295 375 303 376 311 366 327 372 330 362 316 356 315 341 318 334 300 332 294 338 279 337 274 328 267 332 245 324 243 328 245 336 233 330 225 336 228 340 220 343 212 356 212 362 204 367C206 372 205 370 208 374L210 377 215 384 218 403 229 404 242 399 247 415 243 419 252 433 254 425 266 452 255 460 252 468 264 469 257 474 262 506 272 516Z"
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
                        transform="translate(236 380)"
                        id="text66">市原市</text>
                </g>
                <path
                    d="M141 439 141 439 120 432 114 435 122 445 129 458 141 467 141 477 151 480 156 493 177 499 171 506 181 513 184 509 188 518 192 534 198 539C198 546 198 553 198 561L214 556 219 559 238 548 241 550 244 551C247 553 246 553 248 552L249 546 254 547 263 546 265 539 269 540 283 544 282 537 271 514 262 507 258 475 265 469 252 467 253 463 238 447 226 443 225 452 212 457 209 470 197 455 196 460 196 466 179 453 171 458 158 450 146 455 141 439Z"
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
                    transform="translate(200,507)"
                    id="text67">君津市</text>
                <g
                    id="g167" />
                <g
                    id="g170">
                    <path
                        d="M123 446 117 448 112 443 105 450 114 455 104 460 103 465 99 466 85 467 107 477 119 480 120 486 115 494 123 498 128 500 131 515 128 522 114 528 103 539 104 562 119 556 129 558 134 559 144 558 159 571 167 564 198 559 199 537 192 531 188 514 184 509 181 512 172 505 178 499 156 492 152 479 141 476C141 472 141 469 141 465L129 458 123 446Z"
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
                        transform="translate(129 534)"
                        id="text68">富津市</text>
                </g>
                <path
                    d="M160 572 161 576 189 591 188 586 196 583 199 593 206 597 219 619 230 615 236 616 251 606 254 608 252 593 266 581 276 582 289 578 292 582 300 575 301 586 311 585C310 580 310 575 310 570L302 550 285 552 283 544 265 539 263 546 249 546 247 553 237 547 219 560 215 555 197 560 167 564 160 572Z"
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
                    transform="translate(219,582)"
                    id="text69">鴨川市</text>
                <g
                    id="g168" />
                <path
                    d="M106 561 113 572 106 586 107 592 115 595 131 586 157 585 163 575 160 570 144 557 135 559 120 556 106 561Z"
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
                    transform="translate(100,579)"
                    id="text70">鋸南町</text>
                <g
                    id="g169" />
                <path
                    d="M115 596 117 601 106 608 104 613 111 625 107 628 101 626 102 632 116 634 136 624 137 626 141 639 140 644 147 646 152 639 157 641 165 635 167 638 167 652 162 656 151 664 150 677 159 685 155 692 143 691 130 697 126 696 108 702 125 706 140 711 142 705 161 706 181 680 175 668 183 658 187 643 211 625 219 618 206 596 199 593 196 584 188 586 188 590 177 584 163 576 157 585 132 586 115 596Z"
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
                    transform="translate(134,615)"
                    id="text71">南房総市</text>
                <g
                    id="g171" />
                <path
                    d="M116 634 124 640 123 656 107 654 107 658 97 665 72 662 68 668 78 678 94 678 107 689 106 701 127 695 130 697 145 690 155 691 159 684C156 681 153 678 151 675 151 671 151 667 151 663L168 652C167 647 167 642 167 637L164 633 157 639 152 637 146 645 141 643 141 637 136 623 116 634Z"
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
                    transform="translate(99,667)"
                    id="text72">館山市</text>
                <g
                    id="g172" />
                <path
                    d="M302 551 314 541 318 542 321 544 334 520 329 512 349 510 355 519 364 524 357 530 357 539 365 548 377 548 368 554 365 572 360 573 356 564 348 564 349 571 339 576 337 571 327 573 320 580 311 584 310 570 302 551Z"
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
                    transform="translate(319,563)"
                    id="text73">勝浦市</text>
                <g
                    id="g165" />
                <path
                    d="M338 467 348 463 353 456 366 449 373 451 381 449 393 454 390 459 401 458 408 459 413 472 406 487 408 506 398 531 405 535 396 537 383 533 388 523 376 526 368 519 365 524 353 519 348 509 343 511 344 497 329 491 340 479 338 467Z"
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
                    transform="translate(350,496)"
                    id="text75">いすみ市</text>
                <g
                    id="g163" />
                <path
                    d="M207 374 198 371 194 376 186 373 178 378 183 391 172 385 170 389 173 400 168 407 179 412 182 408 191 413 205 416 201 421 194 420 201 428 197 439 200 448 208 451 212 441 216 441 216 435 221 431 238 424 246 428 247 425 244 419 248 414 243 398 228 404 218 403 215 382 207 374Z"
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
                    transform="translate(190,406)"
                    id="text76"
                >袖ヶ浦市</text>
                <g
                    id="g174" />
                <path
                    d="M170 392 156 393 144 402 146 420 154 426 140 435 142 444 146 456 158 451 172 459 179 455 195 468 198 457 201 460 209 471 211 459 215 458 225 453 226 444 240 449 254 463 258 458 267 452 254 423 251 431 247 425 246 428 239 423 216 433 216 440 211 441 208 449 201 447 198 439 201 429 195 422 201 422 207 415 190 413 182 406 176 411 169 406 173 400 170 392Z"
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
                    transform="translate(128,432)"
                    id="text78">木更津市</text>
                <g
                    id="g173" />
                <path
                    d="M561 200 566 209 573 209C573 214 573 219 573 224L583 223 585 228 578 237 593 244 572 251 569 245 558 243 545 246 521 259 513 256 512 248 509 239 497 236 502 229 505 231 508 221 489 221 492 214 490 210 501 201 504 196 515 197 522 188 525 191 537 191 543 204 556 195 561 200Z"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeMiterlimit="8"
                    fill="#10B981"
                    fillRule="evenodd"
                    id="path58" />
                <text
                    fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                    fontWeight="700"
                    fontSize="14"
                    transform="translate(523,229)"
                    id="text79">旭市</text>
                <g
                    id="g145" />
                <path
                    d="M569 177 575 185 601 207 623 220 643 216 647 223 649 232 645 239 647 250 636 245 631 237 613 238 592 244 577 237 583 228 582 223 573 225C573 220 573 215 573 210L564 209 560 200 561 194 556 189 557 181 569 177Z"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeMiterlimit="8"
                    fill="#10B981"
                    fillRule="evenodd"
                    id="path59" />
                <text
                    fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                    fontWeight="700"
                    fontSize="14"
                    transform="translate(591,233)"
                    id="text80">銚子市</text>
                <g
                    id="g144" />
                <g
                    id="g166">
                    <path
                        d="M344 511 345 497 329 491 341 480 338 468 326 462 314 465 318 471 301 473 303 480 288 492 288 502 284 500 272 515 281 538 282 543 285 553 303 550 314 541 321 545 334 520 329 513 344 511Z"
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
                        transform="translate(282 517)"
                        id="text74">大多喜町</text>
                </g>
                <g
                    id="g142">
                    <path
                        d="M424 121 437 113 439 114 458 126 452 110 458 108 461 93 470 101 487 111 503 123 517 139 526 151 532 153 534 168 531 168C530 172 530 176 530 179L521 186 523 189 521 191 514 198 505 199 503 201 503 201 490 211 483 211 480 202 464 193 459 194 455 184 446 191 438 190 439 185 432 180 441 171 438 160 441 159 432 146 429 147 420 143 419 132 424 121Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path50" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="16"
                        transform="translate(459 167)"
                        id="text81">香取市</text>
                </g>
                <g
                    id="g140">
                    <path
                        d="M346 140 360 148 363 149 370 146 381 131 393 127 395 134 403 138C403 143 403 148 403 154L416 147 423 150 431 145C433 148 433 147 433 148L441 159 438 160 438 164 442 172 431 181 426 194 418 199 406 199 403 209 407 217 398 220 403 229 399 228 388 221 374 206 367 197 361 206 362 213 353 217 348 208 343 211 333 209 331 197 326 192 327 178 334 171 343 172 345 166 340 155 346 140Z"
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
                        transform="translate(359 183)"
                        id="text82">成田市</text>
                </g>
                <g
                    id="g152">
                    <path
                        d="M413 258 422 256 428 268 438 265 447 269 441 277 452 285 455 281 457 287 454 291 455 297 462 293 470 300 462 306 442 333 428 319 421 317 417 305 412 309 400 309 395 301 380 297 371 297 372 287 364 284 367 267 379 266 376 260 387 252 394 255 405 257 413 258Z"
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
                        transform="translate(387 290)"
                        id="text83">山武市</text>
                </g>
                <g
                    id="g131">
                    <path
                        d="M275 156 280 160 287 158 304 164 316 161 323 167 323 173 328 180 327 194 332 198 334 221 320 217 306 205 298 217 275 211 274 204 249 194 254 182 246 176 248 169 255 165 254 156 267 161 275 156Z"
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
                        transform="translate(271 191)"
                        id="text84">印西市</text>
                </g>
                <g
                    id="g143">
                    <path
                        d="M531 153 558 159 570 176 557 182 557 189 561 193 560 200 555 196 543 205 541 202 536 192 533 192 524 191 521 186 529 179C529 175 529 170 529 166L532 167 531 153Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path51" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(534 179)"
                        id="text85">東庄町</text>
                </g>
                <g
                    id="g146">
                    <path
                        d="M488 286 522 258 514 255 513 248 509 238 498 236 503 231 505 233 505 233 510 221 489 220 493 213 490 209 482 209 470 210 460 209 451 229 450 232 457 240 456 249 468 255 476 265 473 270 488 286Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path57" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="14"
                        transform="translate(465 251)"
                        id="text86">匝瑳市</text>
                </g>
                <g
                    id="g147">
                    <path
                        d="M418 200C418 204 418 209 418 214L423 225 420 236 427 233 437 249 441 250 441 246 446 231 453 229 460 210 470 211 482 209 480 200 464 192 457 193 456 184 446 190 438 189 439 182 432 179 425 193 418 200Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path53" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(422 214)"
                        id="text87">多古町</text>
                </g>
                <g
                    id="g153">
                    <path
                        d="M451 231 458 239 457 248 469 255 477 265 472 271 489 285 471 300 463 294 455 297 453 291 455 284 456 281 452 285 440 276 446 268 439 264 428 268 422 256 414 256 424 244 431 244 436 247 439 248 446 231 451 231Z"
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
                        transform="translate(425 271)"
                        id="text88">横芝光町</text>
                </g>
                <g
                    id="g148">
                    <path
                        d="M407 199 418 199 417 212 423 224 421 234 427 232 435 245 424 246 412 258 405 255 404 250 391 244 396 240 397 235 389 232 388 220 398 228 401 229 398 220 405 217 403 209 407 199Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path54" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(400 238)"
                        id="text89">芝山町</text>
                </g>
                <g
                    id="g151">
                    <path
                        d="M358 235 365 239 362 248 365 249 380 257 375 261 382 266 367 268 363 283 358 289 361 299 365 299 372 311 359 311 348 318 333 301 335 299 336 285 330 285 327 274 335 267 333 261 345 253 348 240 358 235Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path48" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(332 280)"
                        id="text120">八街市</text>
                </g>
                <g
                    id="g149">
                    <path
                        d="M367 197 378 211 388 222 389 231 397 236 397 241 391 245 406 250 405 257 393 255 387 251 380 256 362 249 364 240 358 235 351 224 359 220 358 215 361 214 362 205 367 197Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path52" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(357 242)"
                        id="text90">富里市</text>
                </g>
                <g
                    id="g138">
                    <path
                        d="M275 212 267 220 270 228 265 231 270 246 280 254 280 246 296 245 308 242 303 254 311 270 314 272 318 285 330 286 327 275 335 268 334 262 345 253 349 240 336 244 329 231 332 220 319 217 306 205 298 217 275 212Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path26" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(284 237)"
                        id="text92">佐倉市</text>
                </g>
                <g
                    id="g137">
                    <path
                        d="M273 249 280 253 279 243 293 245 308 241 305 252 312 270 307 270 297 285 292 272 283 273 281 263 275 264 268 259 273 249Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path25" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(276 265)"
                        id="text93">四街道市</text>
                </g>
                <g
                    id="g132">
                    <path
                        d="M244 194 250 194 275 204 276 210 268 220 272 228 266 232 271 244 262 243 259 235 243 246 233 237 234 233 229 214 243 207C243 202 243 198 244 194Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path23" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(233 226)"
                        id="text94">八千代市</text>
                </g>
                <g
                    id="g126">
                    <path
                        d="M213 128 229 133 236 141 250 137 263 143 273 157 266 162 255 157 246 152 229 155 223 151 215 152 196 146 192 141 203 129 213 128Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path19" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(210 146)"
                        id="text95">我孫子市</text>
                </g>
                <g
                    id="g127">
                    <path
                        d="M158 115 152 127 158 134 160 127 172 141 159 147 172 154 175 162 169 165 178 182 187 185 194 179 211 187 214 175 225 165 247 171 256 166 255 158 247 153 228 155 220 150 216 153 196 147 191 141 204 129 211 131 214 128 204 119 194 123 184 113 174 107 158 115Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path8" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(185 164)"
                        id="text96">柏市</text>
                </g>
                <path
                    d="M87 9 87 9 83 17 87 23 85 33 104 49 104 70 112 80 119 104 134 119 160 117 175 106 169 104 161 98 167 91 157 83 147 84 136 69 122 48 98 29 97 19 87 9Z"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeMiterlimit="8"
                    fill="#10B981"
                    fillRule="evenodd"
                    id="path6" />
                <text
                    fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                    fontWeight="700"
                    fontSize="12"
                    transform="translate(120,97)"
                    id="text97"
                >野田市</text>
                <g
                    id="g124" />
                <g
                    id="g125">
                    <path
                        d="M134 119 146 144C144 152 146 150 144 153L141 168 153 165C155 160 155 162 155 159L160 157 168 165 176 163 172 153 160 147 172 141 160 127 158 133 153 127 157 115 134 119Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path7" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(122 145)"
                        id="text99">流山市</text>
                </g>
                <g
                    id="g128">
                    <path
                        d="M141 168 146 194 137 202 145 216 152 206 163 210 163 214 170 215 180 198 192 190 198 191 199 186 193 178 187 184 178 182 169 164 160 157 154 157 153 164 141 168Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path9" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(137 192)"
                        id="text100">松戸市</text>
                </g>
                <g
                    id="g134">
                    <path
                        d="M145 216 150 229 158 241 153 251 151 251 141 255 143 261 155 270 171 261 178 260 178 239 168 239 180 222 184 224 185 210 190 198 184 196 179 198 170 214 163 214 163 210 151 205 145 216Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path10" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(132 234)"
                        id="text101">市川市</text>
                </g>
                <g
                    id="g150">
                    <path
                        d="M332 220 329 232 337 246 350 241 358 235 351 225 359 222 357 215 354 217 348 208 342 211 333 209C333 213 331 216 332 220Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path24" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(322 226)"
                        id="text91">酒々井町</text>
                </g>
                <path
                    d="M142 262 132 278 132 289 134 288 145 292 168 279 157 268 154 269 142 262Z"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeMiterlimit="8"
                    fill="#10B981"
                    fillRule="evenodd"
                    id="path11" />
                <text
                    fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                    fontWeight="700"
                    fontSize="12"
                    transform="translate(129,284)"
                    id="text102">浦安市</text>
                <g
                    id="g135" />
                <g
                    id="g133">
                    <path
                        d="M184 214 190 214 199 219 212 205 215 205 229 199 235 185C237 186 237 185 237 186L243 191C242 196 242 202 242 207L230 216 235 234 230 250 228 248 216 243 204 248 194 254 199 261 189 265 190 253 185 254 183 260 178 260 177 240 173 239 168 239 180 221 183 223 184 214Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path12" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(186 235)"
                        id="text103">船橋市</text>
                </g>
                <g
                    id="g130">
                    <path
                        d="M247 170 245 176 255 183 250 194C247 195 248 194 247 195L243 194 242 190 235 185 230 200 216 206 210 205 210 199 208 194 211 186 212 174 224 163 247 170Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path18" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(214 182)"
                        id="text104">白井市</text>
                </g>
                <g
                    id="g129">
                    <path
                        d="M194 180 212 186 208 193 211 198 211 207 200 219 191 215 185 214 185 207 189 198 185 196 192 190 198 190 198 186 194 180Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path13" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(175 205)"
                        id="text105">鎌ケ谷市</text>
                </g>
                <g
                    id="g136">
                    <path
                        d="M192 263 191 270 203 268 209 272 220 257 236 255 245 245 234 237 229 249 217 243 204 246 195 253 198 260 192 263Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path14" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(198 263)"
                        id="text106">習志野市</text>
                </g>
                <g
                    id="g139">
                    <path
                        d="M287 158 306 148 322 154 347 141 340 155 345 166 343 175 336 173 328 181 324 174 323 169 317 161 305 165 301 165 287 158Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path20" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(311 155)"
                        id="text107">栄町</text>
                </g>
                <g
                    id="g141">
                    <path
                        d="M394 125 411 122 417 124 424 122 419 132 420 142 429 146 423 150 418 146 402 155C402 149 402 143 403 137L396 134 394 125Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path49" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(391 139)"
                        id="text108">神崎町</text>
                </g>
                <g
                    id="g154">
                    <path
                        d="M362 284 358 289 360 300 365 300 371 310 358 312 347 318 348 326 358 324 367 326 376 341 379 337 383 343 383 347 408 356 411 350 400 344 397 337 416 345 416 329 426 319 422 317 418 304 411 309 401 308 395 300 378 296 371 296 372 287 362 284Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path47" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(373 323)"
                        id="text109">東金市</text>
                </g>
                <g
                    id="g155">
                    <path
                        d="M407 355 411 349 399 344 398 338 400 340 415 344 416 329 426 318 442 332 434 341 421 361 407 355Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path46" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(418 346)"
                        id="text110">九十九里町</text>
                </g>
                <g
                    id="g156">
                    <path
                        d="M348 325 348 325 355 324 368 325 376 341 380 336 383 343 384 347 393 351 422 359 414 377 396 373 393 364 381 361 379 367 369 362 367 356 354 361 342 358 352 349 344 331 348 325Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path43" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(350 355)"
                        id="text111">大網白里市</text>
                </g>
                <g
                    id="g157">
                    <path
                        d="M414 378 406 396 404 408 392 406 388 399 378 397 374 396 374 387 389 372 393 375 397 373 414 378Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path44" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(384 393)"
                        id="text112">白子町</text>
                </g>
                <g
                    id="g158">
                    <path
                        d="M377 396 371 408 364 411 366 422 376 422 381 430 384 425 394 422 400 424 405 407 392 405 389 398 377 396Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path45" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(374 417)"
                        id="text113">長生村</text>
                </g>
                <g
                    id="g159">
                    <path
                        d="M374 430 376 436 374 441 376 449 380 447 391 453 389 459 404 458 400 437C401 433 401 428 401 424L393 423 383 424 380 429 374 430Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path38" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(382 445)"
                        id="text114">一宮町</text>
                </g>
                <g
                    id="g123">
                    <path
                        d="M342 359 353 361 367 357 369 362 378 367 381 361 394 363 396 372 393 376 389 374 381 380 375 386 373 396 378 397 372 407 365 413 367 423 361 424 358 430 342 428 344 414 331 418 329 413 334 408 331 399 326 391 329 377 328 372 330 361 336 358 342 359Z"
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
                        transform="translate(331 389)"
                        id="text115">茂原市</text>
                </g>
                <g
                    id="g161">
                    <path
                        d="M300 426 300 426 304 415 310 416 309 406 331 401 334 409 329 414 332 419 344 415 343 428 357 430 356 438 340 442 329 455 328 464 315 465 308 456 307 438 299 433 300 426Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path40" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(307 436)"
                        id="text116">長南町</text>
                </g>
                <g
                    id="g162">
                    <path
                        d="M328 372 330 378 326 391 332 400 309 406C309 410 309 414 310 418L304 414 301 425 296 421 287 397 294 395 293 389 287 385 296 374 303 376 311 366 328 372Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path41" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(288 395)"
                        id="text117">長柄町</text>
                </g>
                <g
                    id="g160">
                    <path
                        d="M361 423 361 423 375 423 381 430 375 429 377 433 375 440 376 450 372 451 366 448 353 454 349 464 338 468 329 464 329 454 339 442 356 437 356 429 361 423Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path39" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(339 454)"
                        id="text118">睦沢町</text>
                </g>
                <g
                    id="g164">
                    <path
                        d="M364 524 369 519 376 526 389 523 384 531 397 536 389 546 379 545 375 549 363 549 357 540 357 528 364 524Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path36" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(363 542)"
                        id="text119">御宿町</text>
                </g>

            </g>

        </svg>
    );

    return (
        <>
            <MapQuizManager allDistricts={allDistricts} gameTitle={gameTitle} isWide={isWide}>
                {svgContent}
            </MapQuizManager>
        </>
    );
};

export default Chiba;