import MapApp from '../assets/MapApp';

const Gunma = () => {

    const gameTitle = '群馬県の市区町村全部言えるかな？';

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
                font-weight="900"
                fontSize="21.3333"
                transform="translate(18.6544 500)"
                id="text41">長野県</text>
            <text
                fill="#7F7F7F"
                fillRule="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                fontSize="21.3333"
                transform="translate(82.6544 500)"
                id="text42" />
            <text
                fill="#7F7F7F"
                fillRule="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                fontSize="21.3333"
                transform="translate(492.75 633)"
                id="text43">埼玉県</text>
            <text
                fill="#7F7F7F"
                fillRule="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                fontSize="21.3333"
                transform="translate(556.75 633)"
                id="text44" />
            <text
                fill="#7F7F7F"
                fillRule="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                fontSize="21.3333"
                transform="translate(643.5 290)"
                id="text45">栃木県</text>
            <text
                fill="#7F7F7F"
                fillRule="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                fontSize="21.3333"
                transform="translate(707.5 290)"
                id="text46" />
            <text
                fill="#7F7F7F"
                fillRule="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                fontSize="21.3333"
                transform="translate(553.994 39)"
                id="text47">福島県</text>
            <text
                fill="#7F7F7F"
                fillRule="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                fontSize="21.3333"
                transform="translate(617.994 39)"
                id="text48" />
            <text
                fill="#7F7F7F"
                fillRule="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                fontSize="21.3333"
                transform="translate(211.336 56)"
                id="text49">新潟県</text>
            <text
                fill="#7f7f7f"
                fillRule="'Noto Sans JP Black', 'Noto Sans JP Black_MSFontService', sans-serif"
                font-weight="900"
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
                        font-weight="700"
                        fontSize="16px"
                        transform="translate(199.428,472)"
                        id="text51">安中市</text>
                </g>
                <g
                    id="g92">
                    <path
                        d="M405 503 415 503 403 518 400 507ZM277 374 292 385 286 385 299 405 320 415 321 421 341 413 351 424 357 423 362 434 359 443 372 458 381 457 397 479 399 500 379 502 375 512 358 518 354 542 340 543 330 555 312 559 311 554 324 540 319 518 310 512 317 487 310 463 297 461 269 447 253 449 238 441 222 442 215 431 184 418 176 427 169 419 139 424 141 417 139 405 143 396 153 395 166 380 191 376 215 378 217 386 235 377 265 382Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path27" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(266 436)"
                        id="text52">高崎市</text>
                </g>
                <g
                    id="g109">
                    <path
                        d="M245 581 240 589 254 592 267 586 273 593 302 586 310 593 323 592 323 601 337 608 350 597 353 600 365 603 368 589 383 584 379 571 388 542 404 518 401 507 406 502 397 500 378 503 375 512 358 518 353 541 339 542 330 555 311 558 311 558 288 564 282 577 265 574 245 581Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path26" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(327 576)"
                        id="text53">藤岡市</text>
                </g>
                <g
                    id="g95">
                    <path
                        d="M145 491 136 500 125 503 118 515 130 546 143 555 153 553 160 560 173 547 187 550 196 563 204 561 212 575 213 595 234 596 246 578 248 555 247 550 252 533 229 540 215 536 212 522 203 514 198 498 185 500 175 506 154 500 149 501 145 491Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path20" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(148 538)"
                        id="text54">下仁田町</text>
                </g>
                <g
                    id="g117">
                    <path
                        d="M134 551 128 557 135 572 117 579 104 573 104 582 111 594 137 603 142 608 155 610 164 601 174 608 195 605 213 600 213 574 205 560 195 562 187 550 173 547 162 559 153 552 143 554 134 551Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path21" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(144 585)"
                        id="text55">南牧村</text>
                </g>
                <g
                    id="g94">
                    <path
                        d="M142 608 144 617 134 627 142 639 135 665 149 674 161 676 169 689 182 696 190 679 202 674 202 663 208 655 221 660 225 666 246 660 241 645 237 643 242 635 233 630 226 620 219 617 219 605 212 597 196 605 173 607 164 601 156 609 142 608Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path22" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(163 644)"
                        id="text56">上野村</text>
                </g>
                <g
                    id="g93">
                    <path
                        d="M239 588 256 591 267 584 275 592 302 584 310 592 323 591 324 602 320 603 320 618 308 627 301 621 271 630 255 643 245 659 239 644 235 643 240 634 233 630 226 621 218 615 218 606 214 596 233 594 239 588Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path25" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(246 616)"
                        id="text57">神流町</text>
                </g>
                <g
                    id="g89">
                    <path
                        d="M437 326 455 328 455 341 453 355 461 368 461 374 467 404 474 419 474 424 465 431 464 435 459 448 436 473 429 468 421 473 417 470 405 484 396 478 382 458 371 458 359 443 361 434 357 423 350 423 347 417 348 406 352 406 357 415 370 396 380 379 404 352 431 338 437 326Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path30" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(398 414)"
                        id="text58">前橋市</text>
                </g>
                <g
                    id="g90">
                    <path
                        d="M355 189 382 175 414 175 408 188 396 199 388 233 391 249 386 260 406 257 409 245 430 246 457 227 461 229 469 217 493 208C498 212 497 210 497 213L497 213 517 197 528 197 534 187 548 191 545 203 551 207 551 207 552 230 537 240 529 268 532 276 515 305 503 311 497 305 479 312 477 318 453 319 455 328 436 325 436 314 426 287 416 282 417 270 409 265 395 266 380 273 382 280 369 289 372 309 354 308 354 308 338 308 336 285 338 271 348 264 361 241 352 223 359 207 355 189Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path9" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(461 270)"
                        id="text59">沼田市</text>
                </g>
                <g
                    id="g87">
                    <path
                        d="M445 69 462 77 470 69 473 73 478 90 496 85 517 92 532 101 558 99 568 105 558 112 558 122 552 123 543 141 574 155 556 175 549 195 533 190 531 197 519 199 500 213 490 209 468 219 463 231 456 226 448 213 435 212 433 186 426 181 426 161 443 149 460 153 456 137 438 135 444 113 438 91 445 69Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path8" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(477 157)"
                        id="text60">片品村</text>
                </g>
                <g
                    id="g116">
                    <path
                        d="M293 385 302 385 321 380 339 389 354 391 360 402 362 390 370 397 381 381 405 353 431 336 437 324 438 317 424 313 415 318 398 312 385 314 371 308 339 307 322 312 317 307 313 312 298 307 284 310 289 317 291 323 280 321 290 333 316 333 304 354 280 361 275 373 293 385Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path18" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(330 351)"
                        id="text61">渋川市</text>
                </g>
                <g
                    id="g86">
                    <path
                        d="M404 8 394 13 397 28 385 48 354 60 327 57 322 91 333 103 335 110 324 119 307 112 295 124 304 153 278 155 266 169 242 166 243 189 224 207 234 233 234 233 243 241 239 258 272 259 282 265 320 263 333 278 347 265 362 242 351 223 360 209 355 190 382 175 382 175 414 176 441 150 461 153 454 135 437 134 437 134 444 114 440 89 440 89 445 68 439 61 440 49 421 38 410 14 404 8Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path7" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(320 155)"
                        id="text62">みなかみ町</text>
                </g>
                <g
                    id="g88">
                    <path
                        d="M188 201 173 214 165 210 158 218 131 224 118 234 113 224 103 240 93 233 83 234 81 240 67 241 67 251 75 256 78 265 98 271 101 277 119 273 133 291 125 302 111 301 111 313 121 317 131 329 142 320 162 321 157 303 179 309 191 301 206 305 214 317 245 310 251 315 292 325 291 317 285 311 298 308 283 296 278 264 273 258 241 258 244 241 234 232 225 208 207 210 188 201Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path11" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(159 270)"
                        id="text63">中之条町</text>
                </g>
                <g
                    id="g115">
                    <path
                        d="M144 398 144 398 151 397 155 396 168 380 191 377 217 381 218 388 236 379 265 383 277 374 281 364 305 356 318 333 290 333 281 321 249 315 245 309 214 316 207 305 190 302 180 308 157 303 162 321 177 323 183 333 178 345 172 343 162 353 147 352 138 365 138 387 144 388 144 398Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path17" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(199 353)"
                        id="text64">東吾妻町</text>
                </g>
                <g
                    id="g96">
                    <path
                        d="M64 271 41 274 25 307 12 307 18 334 8 342 0 404 27 417 48 432 51 422 67 420 82 427 91 412 100 411 106 393 97 391 101 371 94 357 97 342 106 353 114 332 104 321C100 318 102 319 100 317L93 306 83 305 80 296 71 290 64 271Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path13" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(31 360)"
                        id="text65">嬬恋村</text>
                </g>
                <g
                    id="g105">
                    <path
                        d="M502 448 495 469 499 482 496 491 490 492 502 506 498 515 503 524 518 528 528 539 534 535 537 520 559 526 575 509 592 513 590 503 599 496 579 481 583 472 556 449 547 453 526 443 502 448Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path33" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(521 495)"
                        id="text67">太田市</text>
                </g>
                <g
                    id="g99">
                    <path
                        d="M531 278 546 292 566 294 572 302 579 296 597 301 614 299 618 311 614 325 604 332 598 328 582 339 575 353 567 351 552 360 544 369 534 378 528 391 518 395 510 413 514 418 510 422 525 428 525 444 502 448 498 441 500 432 489 430 499 414 493 409 493 403 490 391 480 388 475 373 488 379 512 372 514 363 504 358 509 346 521 339 524 326 520 324 515 305 531 278Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path32" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(529 326)"
                        id="text69">みどり市</text>
                </g>
                <g
                    id="g114">
                    <path
                        d="M427 166 425 180 433 184 437 210 453 212 458 228 431 248 409 246 408 256 387 262 391 248 387 234 397 194 407 190 412 176 427 166Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path10" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(398 226)"
                        id="text70">川場村</text>
                </g>
                <g
                    id="g113">
                    <path
                        d="M380 273 381 279 369 289 373 309 387 314 397 313 415 320 423 315 437 319 438 313 428 287 417 284 417 269 411 265 395 265 380 273Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path16" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(375 300)"
                        id="text71">昭和村</text>
                </g>
                <g
                    id="g112">
                    <path
                        d="M279 265 282 297 295 308 312 315 316 310 321 313 328 312 340 308 337 288 338 278 321 264 279 265Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path15" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(285 292)"
                        id="text72">高山村</text>
                </g>
                <g
                    id="g111">
                    <path
                        d="M252 535 247 548 247 556 247 569 255 567 263 554 275 554 275 542 292 536 292 523 306 521 309 513 318 492 299 485 288 502 279 500 255 505 243 498 211 487 199 498 202 515 213 522 214 537 229 541 252 535Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path23" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(238 527)"
                        id="text73">富岡市</text>
                </g>
                <g
                    id="g97">
                    <path
                        d="M113 315 121 317 129 327 142 320 163 321 177 322 184 334 178 345 170 345 161 354 147 352 137 363 138 386 143 388 145 400 138 408 143 419 138 423 124 416 101 411 106 394 97 392 100 371 94 357 96 340 106 351 112 331 103 321 113 315Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path14" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="14"
                        transform="translate(93 371)"
                        id="text74">長野原町</text>
                </g>
                <g
                    id="g98">
                    <path
                        d="M76 265 64 269 71 291 81 297 82 306 91 306 103 324 115 313 112 302 125 303 134 291 120 273 103 277 100 269 76 265Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path12" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="14"
                        transform="translate(79 294)"
                        id="text75">草津町</text>
                </g>
                <g
                    id="g107">
                    <path
                        d="M472 425 466 429 458 446 437 471 428 466 422 471 424 486 439 504 481 527 490 522 503 523 500 512 500 505 489 492 497 491 499 481 495 469 503 447 498 442 500 430 488 428 479 433 472 425Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path34" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(443 479)"
                        id="text66">伊勢崎市</text>
                </g>
                <g
                    id="g110">
                    <path
                        d="M310 513 318 515 324 539 311 552 311 557 288 565 282 578 264 575 246 583 247 568 255 566 263 552 275 552 275 540 290 535 293 520 305 519 310 513Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path24" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="14"
                        transform="translate(266 554)"
                        id="text76">甘楽町</text>
                </g>
                <g
                    id="g101">
                    <path
                        d="M628 506 644 500 653 507 659 507 665 517 689 514 702 522 689 524 684 521 675 529 676 541 638 545 627 551 608 544 612 538 618 542 627 535 625 531 620 528 628 519 628 506Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path38" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="14"
                        transform="translate(630 530)"
                        id="text77">館林市</text>
                </g>
                <path
                    d="M629 562 659 557 684 552 681 544 676 541 640 544 626 550 629 562Z"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeMiterlimit="8"
                    fill="#10B981"
                    fillRule="evenodd"
                    id="path40" />
                <text
                    fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                    font-weight="700"
                    fontSize="12"
                    transform="translate(638,557)"
                    id="text78">明和町</text>
                <g
                    id="g102" />
                <g
                    id="g100">
                    <path
                        d="M596 328 597 346 586 356 581 374 592 381 590 391 577 392 556 427 551 440 557 449 547 454 525 444 524 429 509 421 513 418 510 414 516 395 528 391 533 375 543 369 550 358 566 350 574 352 579 337ZM500 305 503 310 516 305 520 321 524 325 521 339 509 349 504 359 514 363 511 372 488 380 474 374 476 378 480 387 490 390 493 403 492 408 499 415 490 426 477 433 472 423 473 417 466 403 461 371 460 366 452 355 455 330 452 319 475 319 479 308Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path31" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="16"
                        transform="translate(498 415)"
                        id="text68">桐生市</text>
                </g>
                <g
                    id="g104">
                    <path
                        d="M690 512 690 512 704 510 709 514 708 520 719 543 714 549 718 557 703 563 683 552 681 544 677 540 676 528 683 521 689 524 699 522 690 512Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path41" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="12"
                        transform="translate(684 543)"
                        id="text79">板倉町</text>
                </g>
                <g
                    id="g120">
                    <path
                        d="M598 497 611 509 628 508 627 518 621 527 626 532 628 536 617 543 606 536 596 536 590 526 593 511 590 503 598 497Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path37" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="12"
                        transform="translate(593 517)"
                        id="text80">邑楽町</text>
                </g>
                <g
                    id="g103">
                    <path
                        d="M582 547 582 547 600 561 630 562 625 549 609 544 611 539 606 535 596 536 590 527 578 534 584 536 582 547Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path39" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="12"
                        transform="translate(574 561)"
                        id="text81">千代田町</text>
                </g>
                <g
                    id="g119">
                    <path
                        d="M285 385 293 397 298 404 320 414 323 423 342 415 347 419 349 406 343 406 342 398 334 391 317 392 305 382 285 385Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path29" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="12"
                        transform="translate(297 408)"
                        id="text85">榛東村</text>
                </g>
                <path
                    d="M559 527 583 548 584 538 581 533 591 526 593 511 576 508 559 527Z"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeMiterlimit="8"
                    fill="#10B981"
                    fillRule="evenodd"
                    id="path36" />
                <text
                    fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                    font-weight="700"
                    fontSize="12"
                    transform="translate(548,526)"
                    id="text82">大泉町</text>
                <g
                    id="g106" />
                <path
                    d="M417 470 422 471 425 486 438 503 416 503 405 504 399 500 396 477 405 480 417 470Z"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeMiterlimit="8"
                    fill="#10B981"
                    fillRule="evenodd"
                    id="path35" />
                <text
                    fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                    font-weight="700"
                    fontSize="12"
                    transform="translate(399,495)"
                    id="text83">玉村町</text>
                <g
                    id="g108" />
                <g
                    id="g118">
                    <path
                        d="M305 383 316 394 333 392 342 402 342 407 353 409 358 418 372 396 363 388 360 399 356 389 340 390 323 379 305 383Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path28" />
                    <text
                        fillRule="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        fontSize="12"
                        transform="translate(325 394)"
                        id="text84">吉岡町</text>
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

export default Gunma;