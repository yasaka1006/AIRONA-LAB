import MapApp from '../assets/MapApp';

const Saitama = () => {

    const gameTitle = '埼玉県の市区町村全部言えるかな？';

    const allDistricts = [
        { id: 'さいたま市', names: ['さいたま市', 'さいたまし', '埼玉市'] },
        { id: '川越市', names: ['川越市', 'かわごえし'] },
        { id: '熊谷市', names: ['熊谷市', 'くまがやし'] },
        { id: '川口市', names: ['川口市', 'かわぐちし'] },
        { id: '行田市', names: ['行田市', 'ぎょうだし'] },
        { id: '秩父市', names: ['秩父市', 'ちちぶし'] },
        { id: '所沢市', names: ['所沢市', 'ところざわし'] },
        { id: '飯能市', names: ['飯能市', 'はんのうし'] },
        { id: '加須市', names: ['加須市', 'かぞし'] },
        { id: '本庄市', names: ['本庄市', 'ほんじょうし'] },
        { id: '東松山市', names: ['東松山市', 'ひがしまつやまし'] },
        { id: '春日部市', names: ['春日部市', 'かすかべし'] },
        { id: '狭山市', names: ['狭山市', 'さやまし'] },
        { id: '羽生市', names: ['羽生市', 'はにゅうし'] },
        { id: '鴻巣市', names: ['鴻巣市', 'こうのすし'] },
        { id: '深谷市', names: ['深谷市', 'ふかやし'] },
        { id: '上尾市', names: ['上尾市', 'あげおし'] },
        { id: '草加市', names: ['草加市', 'そうかし'] },
        { id: '越谷市', names: ['越谷市', 'こしがやし'] },
        { id: '蕨市', names: ['蕨市', 'わらびし'] },
        { id: '戸田市', names: ['戸田市', 'とだし'] },
        { id: '入間市', names: ['入間市', 'いるまし'] },
        { id: '朝霞市', names: ['朝霞市', 'あさかし'] },
        { id: '志木市', names: ['志木市', 'しきし'] },
        { id: '和光市', names: ['和光市', 'わこうし'] },
        { id: '新座市', names: ['新座市', 'にいざし'] },
        { id: '桶川市', names: ['桶川市', 'おけがわし'] },
        { id: '久喜市', names: ['久喜市', 'くきし'] },
        { id: '北本市', names: ['北本市', 'きたもとし'] },
        { id: '八潮市', names: ['八潮市', 'やしおし'] },
        { id: '富士見市', names: ['富士見市', 'ふじみし'] },
        { id: '三郷市', names: ['三郷市', 'みさとし'] },
        { id: '蓮田市', names: ['蓮田市', 'はすだし'] },
        { id: '坂戸市', names: ['坂戸市', 'さかどし'] },
        { id: '幸手市', names: ['幸手市', 'さってし'] },
        { id: '鶴ヶ島市', names: ['鶴ヶ島市', 'つるがしまし'] },
        { id: '日高市', names: ['日高市', 'ひだかし'] },
        { id: '吉川市', names: ['吉川市', 'よしかわし'] },
        { id: 'ふじみ野市', names: ['ふじみ野市', 'ふじみのし'] },
        { id: '白岡市', names: ['白岡市', 'しらおかし'] },
        { id: '伊奈町', names: ['伊奈町', 'いなまち'] },
        { id: '三芳町', names: ['三芳町', 'みよしまち'] },
        { id: '毛呂山町', names: ['毛呂山町', 'もろやままち'] },
        { id: '越生町', names: ['越生町', 'おごせまち'] },
        { id: '滑川町', names: ['滑川町', 'なめがわまち'] },
        { id: '嵐山町', names: ['嵐山町', 'らんざんまち'] },
        { id: '小川町', names: ['小川町', 'おがわまち'] },
        { id: '川島町', names: ['川島町', 'かわじままち'] },
        { id: '吉見町', names: ['吉見町', 'よしみまち'] },
        { id: '鳩山町', names: ['鳩山町', 'はとやままち'] },
        { id: 'ときがわ町', names: ['ときがわ町', 'ときがわまち'] },
        { id: '横瀬町', names: ['横瀬町', 'よこぜまち'] },
        { id: '皆野町', names: ['皆野町', 'みなのまち'] },
        { id: '長瀞町', names: ['長瀞町', 'ながとろまち'] },
        { id: '小鹿野町', names: ['小鹿野町', 'おがのまち'] },
        { id: '美里町', names: ['美里町', 'みさとまち'] },
        { id: '神川町', names: ['神川町', 'かみかわまち'] },
        { id: '上里町', names: ['上里町', 'かみさとまち'] },
        { id: '寄居町', names: ['寄居町', 'よりいまち'] },
        { id: '宮代町', names: ['宮代町', 'みやしろまち'] },
        { id: '杉戸町', names: ['杉戸町', 'すぎとまち'] },
        { id: '松伏町', names: ['松伏町', 'まつぶしまち'] },
        { id: '東秩父村', names: ['東秩父村', 'ひがしちちぶむら'] },
    ];

    const isWide = true; {/* ワイドならtrue、正方形ならfalse */ }

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
                width="1280"
                height="720"
                fill="#FFFFFF"
                id="rect2" />
            <path
                d="M255 539 265 512 346 482 564 549 669 571 707 617 835 627 904 578 1229 591 1255 642 1241 648 1246 671 1264 676 1264 728 342 725 330 687 289 631 283 588 263 578 255 539Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeMiterlimit="8"
                fill="#A0EBD2"
                fillRule="evenodd"
                id="path2" />
            <path
                d="M-7 493 20 483 118 492 253 544 273 579 288 582 296 632 315 652 335 687 345 727-5 724C-6 647-6 570-7 493Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeMiterlimit="8"
                fill="#A0EBD2"
                fillRule="evenodd"
                id="path3" />
            <path
                d="M1129 295 1129 308 1130 260 1140 256 1159 272 1172 319 1243 374 1244 396 1287 419 1284 728 1264 724 1264 677 1245 669 1242 648 1254 637 1236 590 1220 477 1158 402 1160 352 1129 295Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeMiterlimit="8"
                fill="#A0EBD2"
                fillRule="evenodd"
                id="path4" />
            <path
                d="M1202-8 1196 29 1197 63 1179 104 1131 118 1091 144 1062 140 1032 146 1034 167 1058 254 1088 300 1129 296 1130 266 1139 258 1158 274 1170 315 1202 345 1240 373 1242 396 1285 418C1284 277 1284 136 1283-4L1202-8Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeMiterlimit="8"
                fill="#A0EBD2"
                fillRule="evenodd"
                id="path5" />
            <path
                d="M759-3 785 53 802 48 810 60 797 69 839 73 899 58 898 70 961 72 976 64 981 72 978 88 986 108 1006 105 1013 124 1000 139 1030 148 1062 142 1092 146 1135 118 1180 101 1197 59 1198 29 1204-7 758-10 759-3Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeMiterlimit="8"
                fill="#A0EBD2"
                fillRule="evenodd"
                id="path6" />
            <path
                d="M763 0 785 50 801 46 812 60 812 60 801 69 830 69 903 55 902 69 959 71 972 63 987 74 980 87 989 104 1004 103 1019 127 1004 138 1008 154 962 170 776 163 690 96 646 127 480 68 375 218 257 286 166 320 120 357 65 366 16 398-0 393-4 389C-3 255-3 122-2-11L761-11 763 0Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeMiterlimit="8"
                fill="#A0EBD2"
                fillRule="evenodd"
                id="path7" />
            <path
                d="M-5 389 14 396 52 445 52 482 39 489 16 486-3 495-5 389Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeMiterlimit="8"
                fill="#A0EBD2"
                fillRule="evenodd"
                id="path71" />
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="21"
                transform="translate(137 183)"
                id="text71">群馬県</text>
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="21"
                transform="translate(1027 62)"
                id="text73">栃木県</text>
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="21"
                transform="translate(1169 218)"
                id="text75">茨城県</text>
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="21"
                transform="translate(1217 452)"
                id="text77">千葉県</text>
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="21"
                transform="translate(798 713)"
                id="text79">東京都</text>
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="21"
                transform="translate(91 685)"
                id="text81">山梨県</text>
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="14"
                transform="translate(-1 454)"
                id="text83">長野県</text>
            <g id="group">

                <g
                    id="g149">
                    <path
                        d="M139 337 121 349 108 345 98 352 77 337 69 345 62 342 50 371 28 390 14 397 22 428 37 433 49 457 35 484 46 490 49 489 57 497 84 493 102 505 101 528 117 528 124 538 140 534 146 542 154 532 165 539 173 547 187 544 191 559 206 565 223 549 247 558 262 549 259 535 276 521 276 521 300 512 301 525 320 517 332 496 365 514 375 521 389 529 406 524 416 534 427 535 434 522 431 517 443 501 431 486 431 473 416 462 418 438 411 425 406 411 411 399 415 382 425 373 431 377 439 386 453 378 459 385 471 381 497 393 503 388 488 374 483 363 475 357 470 351 447 346 435 319 415 320 407 304 375 313 372 298 349 304 329 281 318 280 322 271 305 270 298 256 291 255 292 247 277 233 267 243 276 256 268 270 244 285 265 313 287 321 286 333 308 345 323 351 345 365 362 357 367 358 371 368 359 381 364 385 363 402 346 419 331 421 331 405 324 401 312 408 302 399 295 404 276 401 261 420 232 418 219 409 199 414 162 393 148 363 155 345 139 337Z"
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
                        transform="translate(219 465)"
                        id="text85">秩父市</text>
                </g>
                <g
                    id="g150">
                    <path
                        d="M242 283 230 278 209 281 175 293 166 305 157 305 139 337 153 345 147 367 162 393 182 405 200 413 217 409 231 419 264 419 275 402 293 405 300 400 309 408 324 401 330 410 330 421 344 419 363 403 364 386 357 383 370 369 366 358 360 356 346 365 322 348 305 345 285 331 287 322 265 313 248 292 242 283Z"
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
                        transform="translate(208 365)"
                        id="text86">小鹿野町</text>
                </g>
                <g
                    id="g196">
                    <path
                        d="M331 271 318 276 318 282 330 284 349 304 373 300 377 315 408 306 416 322 436 322 448 348 473 355 480 330 486 313 473 277 445 276 436 284 406 268 410 254 402 241 395 245 376 237 361 241 354 265 338 264 331 271Z"
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
                        transform="translate(382 297)"
                        id="text87">皆野町</text>
                </g>
                <g
                    id="g201">
                    <path
                        d="M402 243 409 254 406 268 436 286 445 276 458 278 465 256 466 241 472 226 484 226 469 216 454 215 443 209 438 220 426 218 418 227 418 227 404 238 402 243Z"
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
                        transform="translate(413 256)"
                        id="text88">長瀞町</text>
                </g>
                <g
                    id="g198">
                    <path
                        d="M419 109 428 116 436 109 440 126 461 122 494 106 486 100 482 88 494 62 480 56 469 62 453 55 447 72 440 67 431 83 432 93 419 109Z"
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
                        transform="translate(433 98)"
                        id="text90">上里町</text>
                </g>
                <g
                    id="g199">
                    <path
                        d="M436 138 428 155 411 156 397 170 399 188 387 196 389 210 393 215 381 216 373 238 394 248 405 243 426 219 438 223 442 208 456 216 470 198 464 187 476 176 479 161 486 156 480 152 496 132 519 142 526 124 540 120 546 112 559 123 575 112 570 96 555 89 528 79 495 65 489 74 482 87 488 104 497 104 484 111 465 120 455 122 452 131 451 148 436 138Z"
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
                        transform="translate(429 168)"
                        id="text91">本庄市</text>
                </g>
                <g
                    id="g200">
                    <path
                        d="M497 131 480 151 486 156 480 157 477 173 465 183 471 195 459 213 471 215 484 225 496 228 521 214 517 201 523 193 522 181 518 179 532 166 537 163 535 145 527 153 523 142 497 131Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path16" />
                    <text
                        fontFamily="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                        fontWeight="700"
                        fontSize="16px"
                        id="text92"
                        x="464"
                        y="190">美里町</text>
                </g>
                <g
                    id="g180">
                    <path
                        d="M571 102 573 111 560 123 547 109 542 118 523 122 521 140 524 155 534 148 534 163 526 172 516 180 538 193 555 196 555 196 552 209 544 212 538 217 523 224 542 231 545 247 578 246 584 246 588 251 606 240 606 251 606 251 615 253 620 260 643 249 647 230 637 217 644 211 626 201 620 191 648 175 660 180 661 169 661 169 661 157 669 139 666 106 666 106 650 115 639 97 627 103 610 100 600 89 593 100 583 96 571 102Z"
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
                        transform="translate(569 180)"
                        id="text93">深谷市</text>
                </g>
                <g
                    id="g202">
                    <path
                        d="M522 183 523 194 517 199 521 214 495 227 481 225 473 225 465 238 467 254 459 275 474 279 485 274 491 279 499 279 513 302 527 301 537 279 544 281 549 274 559 283 567 279 584 285 600 267 615 273 621 257 616 252 605 251 608 239 589 249 584 243 545 245 543 229 524 224 541 216 544 209 553 209 555 195 539 192 522 183Z"
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
                        transform="translate(512 262)"
                        id="text94">寄居町</text>
                </g>
                <g
                    id="g194">
                    <path
                        d="M536 280 526 300 531 311 544 308 559 320 567 323 537 335 528 349 515 347 511 352 518 375 538 376 546 368 555 371 565 352 570 358 580 345 584 349 592 345 600 348 625 348 622 339 630 328 630 315 639 309 620 285 622 278 632 277 630 270 618 267 616 272 600 267 585 285 566 279 560 283 550 274 543 281 536 280Z"
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
                        transform="translate(566 319)"
                        id="text95">小川町</text>
                </g>
                <g
                    id="g195">
                    <path
                        d="M473 280 485 313 477 330 471 356 486 368 492 379 502 387 519 378 510 352 517 347 525 352 537 336 566 323 557 319 542 308 531 311 526 300 513 302 499 279 489 280 485 274 473 280Z"
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
                        transform="translate(481 329)"
                        id="text96">東秩父村</text>
                </g>
                <g
                    id="g152">
                    <path
                        d="M519 374 501 387 497 391 496 399 502 418 529 418 534 433 543 436 550 425 547 418 567 412 590 397 603 400 622 385 632 390 641 373 651 370 649 364 638 357 636 340 626 348 599 348 592 344 587 349 580 343 572 358 566 350 555 371 547 367 540 375 519 374Z"
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
                        transform="translate(533 390)"
                        id="text97">ときがわ町</text>
                </g>
                <g
                    id="g151">
                    <path
                        d="M425 373 414 382 411 400 405 414 418 440 415 465 433 463 443 466 458 456 469 452 477 446 493 442 497 430 506 421 495 400 497 392 472 380 458 384 455 377 438 385 425 373Z"
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
                        transform="translate(433 424)"
                        id="text98">横瀬町</text>
                </g>
                <g
                    id="g154">
                    <path
                        d="M624 385 632 391 642 371 663 373 670 375 682 372 684 379 700 383 712 401 697 411 685 421 666 429 650 427 638 402 627 399 616 390 624 385Z"
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
                        transform="translate(644 406)"
                        id="text100">鳩山町</text>
                </g>
                <g
                    id="g181">
                    <path
                        d="M667 106 669 141 661 157 661 180 647 174 621 190 626 202 645 212 635 216 647 230 643 250 640 252 643 262 649 276 657 279 663 266 670 278 678 278 679 260 687 258 705 270 714 265 724 266 725 257 751 277 750 282 744 288 750 294 765 296 781 290 779 284 772 280 773 264 777 258 767 251 773 240 774 236 768 227 759 219 763 204 767 217 772 213 772 200 777 194 775 187 758 186 764 178 758 161 760 152 781 156 768 146 757 140 748 123 742 126 706 96 699 96 695 91 685 91 681 98 667 106Z"
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
                        transform="translate(683 205)"
                        id="text103">熊谷市</text>
                </g>
                <g
                    id="g192">
                    <path
                        d="M713 266 713 266 717 276 711 281 715 289 713 309 719 319 715 322 719 333 707 331 698 342 693 332 686 338 668 332 661 336 671 349 672 366 666 373 671 378 680 370 683 379 701 383 711 401 723 398 740 404 759 386 760 374 769 374 773 380 784 376 787 380 795 367 784 364 779 368 773 358 760 343 753 343 757 332 755 311 761 294 747 294 743 285 751 279 751 276 723 255 723 266 713 266Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path35" />
                    <text
                        fontFamily="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                        fontWeight="700"
                        fontSize="16px"
                        id="text104"
                        x="693"
                        y="361">東松山市</text>
                </g>
                <g
                    id="g203">
                    <path
                        d="M701 408C708 405 711 399 723 400L740 402 760 387 772 387 778 398 794 404 805 428 789 445 775 448 779 428 760 433 754 430 746 441 734 443 728 435 715 439 713 448 699 452 692 466 679 473 675 479 657 471 655 458 673 456 681 463 686 456 680 447 693 447 694 436 684 421 701 408Z"
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
                        transform="translate(721 423)"
                        id="text105">坂戸市</text>
                </g>
                <g
                    id="g158">
                    <path
                        d="M651 427 640 443 620 449 614 442 605 440 595 449 595 470 603 484 600 497 608 499 638 489 655 471 654 459 673 457 682 464 687 458 682 448 692 447 693 437 686 424 683 422 667 427 651 427Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path26" />
                    <text
                        fontFamily="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                        fontWeight="700"
                        fontSize="16px"
                        id="text99"
                        x="608"
                        y="467">毛呂山町</text>
                </g>
                <g
                    id="g159">
                    <path
                        d="M801 431 789 445 776 449 778 429 756 433 766 444 766 451 756 460 759 469 760 477 752 470 743 477 720 481 721 491 728 489 736 503 752 501 758 509 772 509 772 522 787 525 801 516 795 532 803 535 803 535 793 548 808 560 816 575 830 567 826 557 828 550 818 551 842 537 854 521 862 505 869 523 891 523 890 513 896 515 902 509 894 504 902 495 894 485 892 467 896 461 883 460 887 441 880 437 870 443 853 432 820 435 814 425 801 431Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path48" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="16"
                        transform="translate(796 492)"
                        id="text107">川越市</text>
                </g>
                <g
                    id="g175">
                    <path
                        d="M895 513 894 528 891 535 871 535 865 541 879 541 873 556 874 567 885 568 889 576 898 584 912 576 927 573 922 554 929 548 923 530 908 525 895 513Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path58" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="11"
                        transform="translate(877 559)"
                        id="text109">富士見市</text>
                </g>
                <g
                    id="g197">
                    <path
                        d="M418 109 428 113 435 109 441 125 458 123 451 132 452 143 449 151 436 138 427 156 410 157 398 172 400 188 386 197 388 205C390 210 389 207 393 214L380 219 376 234 362 244 354 265 341 265 318 278 302 270 298 255 290 256 292 246 303 248 308 237 320 237 328 230 337 228 346 235 362 225 361 210 372 203 379 204 379 197 375 189 376 166 389 161 386 149 408 130 407 123 418 109Z"
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
                        transform="translate(361 186)"
                        id="text89">神川町</text>
                </g>
                <g
                    id="g191">
                    <path
                        d="M664 266 669 278 677 277 680 258 691 256 705 272 712 264 719 274 711 282 715 288 714 308 721 322 716 324 719 334 707 334 699 344 693 334 685 340 664 332 669 328 667 313 657 304 666 288 657 281 664 266Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path34" />
                    <text
                        fontFamily="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                        fontWeight="700"
                        fontSize="16px"
                        id="text102"
                        x="668"
                        y="303">滑川町</text>
                </g>
                <g id="g233">
                    <path
                        d="M960 578 949 585 932 580 922 590 919 592 918 617 926 625 926 636 934 630 938 636 938 642 945 641 946 630 962 620 962 606 972 600 972 592 960 578Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path66" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(922 610)"
                        id="text110">朝霞市</text>
                </g>
                <g
                    id="g172">
                    <path
                        d="M890 600 893 606 892 618 885 626 892 635 864 652 874 654 894 644 894 655 890 668 898 669 913 658 939 641 938 634 934 629 926 635 926 624 919 616 921 591 910 594 898 583 896 591 890 590 879 595 890 600Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path62" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="14"
                        transform="translate(886 637)"
                        id="text112">新座市</text>
                </g>
                <g
                    id="g171">
                    <path
                        d="M969 601 960 607 963 619 946 629 946 641 953 645 961 649 967 655 975 647 972 637 986 628 986 619 995 620 992 605 985 601 984 607 969 601Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path67" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(949 632)"
                        id="text113">和光市</text>
                </g>
                <g
                    id="g193">
                    <path
                        d="M638 252 618 257 619 263 617 267 631 270 632 275 622 278 620 287 638 309 631 313 632 325 620 337 626 349 636 339 636 357 650 363 650 370 669 373 674 368 672 349 661 337 671 327 669 313 656 303 666 287 666 287 657 281 652 275 646 271 644 259 638 252Z"
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
                        transform="translate(625 328)"
                        id="text101">嵐山町</text>
                </g>
                <g
                    id="g177">
                    <path
                        d="M800 565 788 574 785 585 772 586 766 592 756 590 753 601 716 607 724 613 718 632 731 638 719 646 718 655 729 653 729 653 739 646 758 656 794 649 818 636 844 638 860 625 868 628 884 604 892 605 890 599 878 594 876 587 861 592 850 600 840 596 836 577 828 571 818 574 806 572 800 565Z"
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
                        transform="translate(776 621)"
                        id="text114">所沢市</text>
                </g>
                <g
                    id="g179">
                    <path
                        d="M694 544 682 546 683 554 677 556 675 572 681 579 673 579 669 590 661 582 651 592 652 610 666 623 695 624 706 628 702 635 715 639 718 647 733 638 733 638 719 632 725 614 719 607 753 601 757 594 743 570 733 571 723 554 709 557 709 565 702 568 697 564 698 550 694 544Z"
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
                        transform="translate(682 599)"
                        id="text115">入間市</text>
                </g>
                <g
                    id="g178">
                    <path
                        d="M723 516 735 504 751 500 760 508 769 510 771 519 787 525 801 516 795 532 802 532 804 538 794 548 811 562 817 574 805 572 800 566 788 576 785 585 773 587 767 594 753 591 743 570 734 571 723 556 709 558 709 566 703 569 699 564 699 548 711 534 709 532 727 527 723 516Z"
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
                        transform="translate(736 556)"
                        id="text116">狭山市</text>
                </g>
                <g
                    id="g157">
                    <path
                        d="M729 434 715 438 713 448 697 450 691 465 691 465 689 476 701 468 711 475 719 473 720 483 743 477 752 471 759 474 759 466 755 462 767 454 766 444 754 431 749 439 735 442 729 434Z"
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
                        transform="translate(695 463)"
                        id="text106">鶴ヶ島市</text>
                </g>
                <g
                    id="g156">
                    <path
                        d="M638 489 606 499 609 525 603 528 609 537 646 533 663 522 680 530 684 525 694 528 699 517 705 521 704 533 710 533 725 527 722 515 737 503 728 489 720 489 719 473 708 473 703 469 688 475 688 469 678 474 678 479 657 471 638 489Z"
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
                        transform="translate(652 505)"
                        id="text117">日高市</text>
                </g>
                <g
                    id="g155">
                    <path
                        d="M420 465 430 473 431 489 441 499 432 515 435 521 427 535 447 540 473 539 495 557 526 571 540 559 560 574 568 567 577 574 604 573 610 567 624 574 635 573 636 583 649 586 651 594 661 585 670 591 675 579 682 578 677 568 678 555 683 553 682 546 694 543 699 548 712 535 702 533 705 520 696 518 694 527 684 521 680 527 662 521 646 532 612 537 604 528 610 523 606 498 601 496 604 485 593 472 577 471 563 461 565 451 554 444 548 444 543 435 535 431 529 419 505 419 500 426 493 441 478 445 472 451 458 455 446 465 433 461 420 465Z"
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
                        transform="translate(526 515)"
                        id="text118">飯能市</text>
                </g>
                <g
                    id="g160">
                    <path
                        d="M905 462 901 454 893 464 893 484 901 494 895 502 901 508 897 514 908 532 923 532 937 558 960 577 971 575 984 582 994 580 1001 572 1007 578 1025 572 1027 554 1036 562 1045 560 1053 542 1060 549 1070 538 1065 521 1076 526 1083 523 1092 534 1096 512 1096 512 1102 500 1110 498 1106 484 1100 484 1095 474 1103 468 1104 450 1094 434 1071 438 1073 432 1064 424 1061 416 1067 419 1074 420 1079 414 1071 396 1059 388 1049 376 1042 380 1046 395 1037 400 1045 412 1014 411 1004 414 1006 424 999 424 993 444 983 432 973 438 965 423 949 430 934 423 938 440 946 446 943 454 933 446 917 448 905 462Z"
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
                        transform="translate(958 501)"
                        id="text119">さいたま市</text>
                </g>
                <g
                    id="g161">
                    <path
                        d="M1112 447 1105 450 1103 466 1097 472 1100 485 1105 484 1108 496 1101 498 1097 512 1106 526 1117 528 1121 539 1129 536 1133 548 1148 542 1160 553 1171 545 1176 544 1177 532 1195 534 1197 530 1193 518 1201 511 1183 501 1187 492 1177 490 1175 480 1162 479 1162 471 1171 465 1172 460 1161 451 1162 446 1152 452 1151 440 1136 432 1131 443 1136 452 1117 458 1112 447Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path60" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="16"
                        transform="translate(1122 508)"
                        id="text120">越谷市</text>
                </g>
                <g
                    id="g163">
                    <path
                        d="M1207 449 1214 467 1228 471 1232 489 1251 511 1255 531 1263 538 1244 542 1232 537C1226 539 1228 539 1225 539L1208 544 1201 544 1197 545 1195 534 1198 529 1193 519 1201 509 1185 502 1188 491 1195 497 1207 490 1203 481 1195 479 1195 466 1207 449Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path61" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="16"
                        transform="translate(1204 518)"
                        id="text121">吉川市</text>
                </g>
                <g
                    id="g176">
                    <path
                        d="M863 507 852 523 843 536 814 553 828 551 827 559 830 566 842 557 861 561 865 567 873 554 880 540 863 542 872 537 892 535 896 529 895 515 888 511 889 521 868 521 863 507Z"
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
                        transform="translate(830 539)"
                        id="text108">ふじみ野市</text>
                </g>
                <g
                    id="g169">
                    <path
                        d="M963 577 971 592 972 607 986 607 986 601 993 606 996 620 1023 612 1051 617 1051 601 1035 597 1028 587 1009 585 1009 577 1003 573 995 579 983 580 971 575 963 577Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path65" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="14"
                        transform="translate(980 602)"
                        id="text122">戸田市</text>
                </g>
                <g
                    id="g168">
                    <path
                        d="M1009 578 1025 573 1038 580 1063 581 1062 591 1050 601 1037 599 1028 588 1011 587 1009 578Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path63" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(1030 593)"
                        id="text123">蕨市</text>
                </g>
                <g
                    id="g167">
                    <path
                        d="M1028 553 1024 573 1036 581 1063 581 1062 591 1048 601 1048 615 1060 624 1069 622 1082 630 1094 625 1096 638 1106 633 1110 622 1118 620 1110 614 1105 611 1102 597 1114 600 1124 591 1130 596 1144 584 1141 577 1132 573 1124 558 1124 552 1116 544 1120 538 1118 527 1106 523 1099 513 1098 511 1092 535 1086 523 1076 527 1065 520 1070 536 1063 549 1056 540 1045 559 1037 562 1028 553Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path64" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="16"
                        transform="translate(1065 574)"
                        id="text124">川口市</text>
                </g>
                <g
                    id="g166">
                    <path
                        d="M1128 537 1118 538 1117 545 1123 553 1122 562 1132 576 1141 577 1141 577 1144 584 1131 598 1145 608 1175 604 1165 594 1177 590 1170 578 1183 582 1188 557 1186 552 1195 544 1193 534 1177 532 1176 544 1168 545 1162 551 1148 544 1132 547 1128 537Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path68" />
                    <text
                        fontFamily="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                        fontWeight="700"
                        fontSize="14px"
                        id="text125"
                        x="1136"
                        y="569">草加市</text>
                </g>
                <g
                    id="g164">
                    <path
                        d="M1233 537 1245 541 1260 537 1261 548 1249 559 1247 593 1254 599 1249 619 1252 632 1242 630 1233 634 1230 627 1236 618 1231 615 1223 621 1217 618 1216 605 1226 592 1215 587 1202 579 1202 560 1197 554 1200 541 1209 543 1233 537Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path70" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="14"
                        transform="translate(1206 575)"
                        id="text126">三郷市</text>
                </g>
                <g
                    id="g173">
                    <path
                        d="M926 573 914 574 898 583 907 597 921 590 932 579 949 585 962 576 948 565 937 558 930 545 922 554 926 573Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path59" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(919 574)"
                        id="text111">志木市</text>
                </g>
                <g
                    id="g162">
                    <path
                        d="M1173 429 1165 435 1164 442 1161 448 1172 461 1170 468 1161 470 1165 480 1175 480 1179 490 1193 496 1208 489 1203 482 1194 477 1195 467 1198 460 1206 449 1192 432 1191 417 1177 418 1173 429Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path54" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="16"
                        transform="translate(1163 463)"
                        id="text127">松伏町</text>
                </g>
                <g
                    id="g204">
                    <path
                        d="M1059 388 1069 397 1079 412 1074 421 1062 417 1067 427 1072 432 1071 438 1096 434 1103 451 1111 446 1117 458 1136 452 1130 444 1135 432 1151 440 1153 450 1162 444 1165 434 1173 429 1178 419 1189 417 1178 411 1183 402 1180 394 1167 387 1171 382 1169 362 1173 344 1161 330 1159 346 1155 342 1136 344 1134 353 1138 363 1137 372 1142 381 1125 372 1117 382 1100 380 1089 386 1065 379 1059 388Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path53" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="16"
                        transform="translate(1096 414)"
                        id="text128">春日部市</text>
                </g>
                <g
                    id="g184">
                    <path
                        d="M979 153 974 158 976 164 963 163 951 152 948 161 954 177 961 182 951 195 937 186 931 192 932 200 922 211 922 211 914 215 920 222 895 225 876 223 868 212 865 218 867 226 873 227 877 238 875 244 883 265 899 266 895 272 888 274 887 287 909 301 931 300 931 294 939 301 949 284 971 287 973 292 981 282 990 276 995 258 1015 256 1009 245 1029 241 1037 236 1032 227 1039 218 1056 213 1045 192 1041 169 1044 159 1037 151 1033 143 1027 143 1017 139 1008 141 1004 133 1004 133C1004 138 1000 138 1003 149L987 155 979 153Z"
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
                        transform="translate(947 234)"
                        id="text129">加須市</text>
                </g>
                <g
                    id="g185">
                    <path
                        d="M1041 217 1055 214 1068 236 1081 257 1071 258 1070 265 1063 262 1059 269 1052 269 1045 287 1060 293 1058 307 1049 319 1037 316 1037 332 1027 331 1023 333 1009 324 1002 330 1005 337 994 343 983 332 965 332 961 324 951 333 952 339 938 345 917 345 913 337 919 333 904 321 905 311 910 309 907 297 931 299 932 290 939 301 949 281 970 286 975 291 982 279 988 275 995 257 1013 254 1009 245 1029 241 1036 235 1033 228 1041 217Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path43" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="16"
                        transform="translate(977 305)"
                        id="text130">久喜市</text>
                </g>
                <g
                    id="g186">
                    <path
                        d="M1051 269 1046 287 1060 294 1061 305 1056 311 1066 321 1077 321 1081 331 1093 332 1100 327 1103 315 1110 319 1122 336 1134 334 1134 319 1143 311 1137 299 1131 276 1126 288 1104 289 1093 282 1083 285 1077 262 1078 255 1071 257 1070 265 1064 260 1059 268 1051 269Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path44" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="16"
                        transform="translate(1073 308)"
                        id="text131">幸手市</text>
                </g>
                <g
                    id="g206">
                    <path
                        d="M918 374 922 391 920 398 914 390 884 388 885 406 879 424 885 426 884 432 893 438 886 444 884 460 896 461 901 455 906 462 914 448 932 448 942 456 945 448 938 440 933 424 949 431 963 423 972 438 983 436 992 443 1001 423 989 417 979 419 976 408 956 400 953 378 945 378 934 372 918 374Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path52" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="16"
                        transform="translate(906 417)"
                        id="text132">上尾市</text>
                </g>
                <g
                    id="g205">
                    <path
                        d="M767 253 776 256 773 263 770 281 783 287 791 283 798 297 809 298 815 313 829 313 824 319 833 326 833 341 849 347 855 345 869 349 873 338 864 327 869 322 869 315 893 333 900 332 910 341 921 334 904 320 907 313 910 311 908 301 885 285 889 276 896 272 899 266 883 265 874 244 858 240 848 237 851 248 840 248 833 251 844 261 839 269 833 278 823 270 825 261 817 261 803 246 799 253 792 247 777 245 767 253Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path39" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="16"
                        transform="translate(827 297)"
                        id="text133">鴻巣市</text>
                </g>
                <g
                    id="g182">
                    <path
                        d="M759 152 758 161 761 177 758 185 773 187 776 193 771 198 771 214 771 214 762 201 758 219 765 226 771 235 771 235 767 251 767 251 775 245 792 247 795 253 802 245 815 262 825 261 824 271 832 279 832 279 839 266 845 261 834 252 840 248 850 247 849 236 857 238 875 248 877 239 873 229 867 225 865 216 859 223 853 218 856 204 850 199 839 200 837 191 828 184 829 173 837 175 840 165 833 157 824 163 795 160 778 155 759 152Z"
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
                        transform="translate(787 218)"
                        id="text134">行田市</text>
                </g>
                <g
                    id="g183">
                    <path
                        d="M837 160 849 156 863 160 880 159 892 155 904 149 925 144 930 137 948 144 953 153 947 163 955 176 961 183 956 190 951 198 935 188 931 195 931 202 923 212 919 209 913 217 919 224 896 225 877 222 868 213 861 221 853 216 856 206 852 201 838 201 838 192 829 184 830 171 836 175 841 165 837 160Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path38" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="16"
                        transform="translate(873 189)"
                        id="text135">羽生市</text>
                </g>
                <g
                    id="g188">
                    <path
                        d="M941 357 932 371 945 379 953 379 956 400 975 410 980 421 991 418 989 401 995 395 985 383 980 373 965 372 957 357 941 357Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path51" />
                    <text
                        fontFamily="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                        fontWeight="700"
                        fontSize="12px"
                        id="text136"
                        x="945"
                        y="389">伊奈町</text>
                </g>
                <g
                    id="g207">
                    <path
                        d="M759 373 761 375 760 387 773 386 776 398 795 406 803 426 811 427 820 436 841 434 853 432 869 443 880 439 885 445 894 437 882 434 885 426 873 425 862 418 871 414 866 409 855 400 851 390 844 385 839 387 839 375 843 368 837 365 837 365 822 359 809 359 801 368 795 365 789 378 785 374 774 379 770 372 759 373Z"
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
                        transform="translate(802 407)"
                        id="text137">川島町</text>
                </g>
                <g
                    id="g190">
                    <path
                        d="M791 283 779 285 780 291 764 293 764 293 753 308 758 327 753 342 764 343 773 360 779 369 784 365 803 370 811 359 827 361 841 366 849 344 834 340 831 324 826 318 832 310 816 312 809 297 799 297 791 283Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path40" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="16"
                        transform="translate(775 336)"
                        id="text138">吉見町</text>
                </g>
                <g
                    id="g209">
                    <path
                        d="M878 425 886 406 885 389 912 392 919 399 923 392 918 374 932 372 942 355 938 344 915 344 914 339 900 348 905 359 897 364 902 370 894 380 890 368 875 364 859 368 860 378 849 377 849 388 855 401 870 413 863 418 873 426 878 425Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path49" />
                    <text
                        fontFamily="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
                        fontWeight="700"
                        fontSize="14px"
                        id="text139"
                        x="875"
                        y="392">桶川市</text>
                </g>
                <g
                    id="g208">
                    <path
                        d="M951 341 939 345 941 355 957 359 967 371 980 375 989 388 994 396 990 402 990 418 998 425 1007 425 1004 415 1014 412 1044 413 1038 402 1046 396 1043 386 1042 377 1025 381 1015 366 1005 370 998 368 998 352 993 347 974 347 951 341Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path50" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="14"
                        transform="translate(997 398)"
                        id="text140">蓮田市</text>
                </g>
                <g
                    id="g187">
                    <path
                        d="M961 326 951 332 952 340 971 348 992 349 995 355 997 369 1007 372 1015 369 1026 384 1041 381 1045 378 1059 386 1066 378 1059 368 1060 351 1044 350 1032 330 1023 332 1010 323 1002 328 1004 336 996 339 986 332 963 330 961 326Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path45" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="14"
                        transform="translate(1000 360)"
                        id="text141">白岡市</text>
                </g>
                <g
                    id="g189">
                    <path
                        d="M849 346 841 365 841 365 838 378 839 389 849 386 849 378 860 380 863 368 875 365 890 370 895 380 902 371 898 364 906 361 900 347 908 343 907 335 900 330 892 332 868 312 867 321 863 326 872 338 868 347 859 341 849 346Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path41" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="14"
                        transform="translate(857 357)"
                        id="text142">北本市</text>
                </g>
                <g
                    id="g211">
                    <path
                        d="M1054 312 1050 318 1050 327 1057 332 1060 342 1103 358 1110 365 1102 371 1102 380 1116 383 1124 373 1140 379 1136 369 1141 364 1133 355 1138 346 1154 341 1158 346 1161 329 1140 309 1136 318 1133 334 1121 334 1113 318 1102 314 1100 325 1093 332 1081 331 1079 320 1065 320 1054 312Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path47" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="14"
                        transform="translate(1093 348)"
                        id="text143">杉戸町</text>
                </g>
                <g
                    id="g210">
                    <path
                        d="M1038 317 1036 335 1043 351 1062 350 1060 363 1064 379 1090 387 1099 381 1102 374 1110 368 1102 357 1078 349 1062 343 1058 334 1050 324 1050 318 1038 317Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path46" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="14"
                        transform="translate(1061 371)"
                        id="text144">宮代町</text>
                </g>
                <g
                    id="g153">
                    <path
                        d="M615 391 628 400 638 402 651 427 640 446 619 450 611 443 602 441 593 453 593 473 578 472 563 464 566 453 555 445 545 447 544 435 549 424 546 417 567 411 592 397 603 401 615 391Z"
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
                        transform="translate(576 430)"
                        id="text145">越生町</text>
                </g>
                <g
                    id="g174">
                    <path
                        d="M842 557 824 569 835 579 839 597 851 600 861 591 877 588 880 595 887 590 897 591 899 582 889 574 886 565 875 565 871 557 866 566 863 561 842 557Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path57" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="12"
                        transform="translate(846 583)"
                        id="text146">三芳町</text>
                </g>
                <g
                    id="g212">
                    <path
                        d="M1195 545 1187 550 1189 557 1184 581 1170 578 1176 588 1166 594 1175 604 1180 620 1197 612 1218 629 1218 609 1228 594 1210 586 1201 580 1202 560 1196 555 1201 544 1195 545Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path69" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="14"
                        id="text148"
                        x="1177"
                        y="603">八潮市</text>
                </g>
            </g>

        </svg>
    );

    return (
        <>
            <MapApp allDistricts={allDistricts} gameTitle={gameTitle} isWide={isWide}>
                {svgContent}
            </MapApp>
        </>
    );
};

export default Saitama;