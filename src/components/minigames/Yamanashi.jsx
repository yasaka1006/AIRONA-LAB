import MapApp from '../assets/MapApp';

const Yamanashi = () => {

    const gameTitle = '山梨県の市区町村全部言えるかな？';

    const allDistricts = [
        // 市部 (13市)
        { id: '甲府市', names: ['甲府市', 'こうふし'] },
        { id: '富士吉田市', names: ['富士吉田市', 'ふじよしだし'] },
        { id: '都留市', names: ['都留市', 'つるし'] },
        { id: '山梨市', names: ['山梨市', 'やまなしし'] },
        { id: '大月市', names: ['大月市', 'おおつきし'] },
        { id: '韮崎市', names: ['韮崎市', 'にらさきし'] },
        { id: '南アルプス市', names: ['南アルプス市', 'みなみあるぷすし'] },
        { id: '北杜市', names: ['北杜市', 'ほくとし'] },
        { id: '甲斐市', names: ['甲斐市', 'かいし'] },
        { id: '笛吹市', names: ['笛吹市', 'ふえふきし'] },
        { id: '上野原市', names: ['上野原市', 'うえのはらし'] },
        { id: '甲州市', names: ['甲州市', 'こうしゅうし'] },
        { id: '中央市', names: ['中央市', 'ちゅうおうし'] },

        // 町村部 (14町村)
        { id: '市川三郷町', names: ['市川三郷町', 'いちかわみさとちょう'] },
        { id: '早川町', names: ['早川町', 'はやかわちょう'] },
        { id: '身延町', names: ['身延町', 'みのぶちょう'] },
        { id: '南部町', names: ['南部町', 'なんぶちょう'] },
        { id: '富士川町', names: ['富士川町', 'ふじかわちょう'] },
        { id: '昭和町', names: ['昭和町', 'しょうわちょう'] },
        { id: '道志村', names: ['道志村', 'どうしむら'] },
        { id: '西桂町', names: ['西桂町', 'にしかつらちょう'] },
        { id: '忍野村', names: ['忍野村', 'おしのむら'] },
        { id: '山中湖村', names: ['山中湖村', 'やまなかこむら'] },
        { id: '鳴沢村', names: ['鳴沢村', 'なるさわむら'] },
        { id: '富士河口湖町', names: ['富士河口湖町', 'ふじかわぐちこまち'] },
        { id: '小菅村', names: ['小菅村', 'こすげむら'] },
        { id: '丹波山村', names: ['丹波山村', 'たばやまむら'] }
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
                id="rect4" />
            <path
                d="M-9-2 400-0 399 33 410 45 411 54 419 62 407 86 373 124 132 162 39 297 23 310 24 332 10 359 4 363-6 351-9-2Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeMiterlimit="8"
                fill="#A0EBD2"
                fillRule="evenodd"
                id="path5" />
            <path
                d="M397-0 399 38 411 45 412 56 418 62 409 86 422 92 467 131 569 144 568 122 582 104 594 106 613 101 617 103 622 91 647 106 662 108 664 114 677 109 692 116 710 114 723 120 725-4 397-0Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeMiterlimit="8"
                fill="#A0EBD2"
                fillRule="evenodd"
                id="path6" />
            <path
                d="M-7 352 4 362 9 358 23 331 23 306 42 294 62 307 440 499 557 503 585 499 612 499 611 519 624 538 619 553 629 561 619 574 617 595 592 610 596 652 608 662 609 676 630 684 633 725-12 722-7 352Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeMiterlimit="8"
                fill="#A0EBD2"
                fillRule="evenodd"
                id="path7" />
            <path
                d="M701 277 723 281 728 724 625 725 629 686 608 676 607 660 594 655 590 606 619 594 619 576 626 562 618 555 620 540 611 523 610 501 573 499 554 506 543 501 557 425 676 338 701 277Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeMiterlimit="8"
                fill="#A0EBD2"
                fillRule="evenodd"
                id="path8" />
            <path
                d="M616 104 611 101 594 105 580 103 568 119 568 133 605 226C604 221 606 221 604 221L693 284 697 274 724 283C723 228 723 173 723 119L708 112 693 116 677 108 663 114 661 105 645 105 620 89 616 104Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeMiterlimit="8"
                fill="#A0EBD2"
                fillRule="evenodd"
                id="path9" />
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="21"
                transform="translate(22 70)"
                id="text63">長野県</text>
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="21"
                transform="translate(86 70)"
                id="text64" />
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="21"
                transform="translate(541 69)"
                id="text65">埼玉県</text>
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="21"
                transform="translate(605 69)"
                id="text66" />
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="21"
                transform="translate(639 186)"
                id="text67">東京都</text>
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="21"
                transform="translate(703 186)"
                id="text68" />
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="21"
                transform="translate(625 510)"
                id="text69">神奈川県</text>
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="21"
                transform="translate(711 510)"
                id="text70" />
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="21"
                transform="translate(332 641)"
                id="text71">静岡県</text>
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="21"
                transform="translate(396 641)"
                id="text72" />
            <g
                id="group">
                <g
                    id="g94">
                    <path
                        d="M43 295 40 296 42 306 40 318 46 327 46 336 50 347 49 356 59 376 62 392 71 408 63 415 62 443 50 452 50 459 59 466 64 489 52 500 54 504 41 521 42 525 56 531 59 545 57 557 67 573 67 573 82 582 87 569 98 571 112 558 120 560 125 550 126 539 135 535 145 543 158 538 161 510 176 504 182 491 161 472 161 472 149 455 150 436 142 430 140 415 128 395 132 386 119 374 114 379 105 367 120 351 123 343 114 328 103 335 101 326 105 313 105 303 83 296 59 300 43 295Z"
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
                        transform="translate(84 457)"
                        id="text36">早川町</text>
                </g>
                <g
                    id="g93">
                    <path
                        d="M121 345 121 345 131 341 140 349 150 342 165 345 176 340 177 344 182 347 188 353 200 352 222 356 226 366 221 380 216 389 203 388 203 399 216 404 217 410 197 425 186 424 178 420 168 431 156 436 148 437 141 430 139 414 128 394 131 386 119 374 115 379 106 366 119 351 121 345Z"
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
                        transform="translate(134 391)"
                        id="text37">富士川町</text>
                </g>
                <g
                    id="g100">
                    <path
                        d="M203 388C203 392 202 396 202 400L215 404 216 410 201 423 207 430 200 443 202 448 218 433 243 426 241 416 249 411 258 414 266 406 286 408 311 406 308 392 314 381 296 378 288 381 270 377 268 367 273 358 265 352 253 359 239 358 225 365 221 381 215 389 203 388Z"
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
                        transform="translate(220 398)"
                        id="text38">市川三郷町</text>
                </g>
                <g
                    id="g95">
                    <path
                        d="M149 437 147 456 159 472 181 491 175 505 161 510 157 538 145 542 134 535 125 540 124 549 120 561 129 572 135 571 147 580 145 586 152 588 164 584 170 587 181 573 199 569 208 577 227 576 230 569 225 559 229 546 239 542 239 535 246 532 253 519 260 520 264 513 268 510 264 494 273 486 283 473 300 464 303 451 300 439 309 432 313 420 318 416 314 411 311 405 286 408 266 405 258 413 249 411 241 415 242 426 217 433 202 447 199 443 208 429 202 422 197 425 184 424 178 419 169 431 156 436 149 437Z"
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
                        transform="translate(194 500)"
                        id="text39">身延町</text>
                </g>
                <g
                    id="g96">
                    <path
                        d="M141 599 144 605 147 616 158 632 167 665 174 667 186 674 193 683 224 685 234 693 241 691 249 673 258 666 263 667 267 662 261 653 262 645 257 634 256 619 251 615 254 606 253 590 250 585 249 570 264 559 268 552 261 540 263 537 260 520 253 518 246 532 238 533 238 541 228 547 224 558 229 570 225 575 208 577 200 569 179 574 169 587 163 584 161 585 152 587 146 586 141 599Z"
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
                        transform="translate(189 628)"
                        id="text40">南部町</text>
                </g>
                <g
                    id="g79">
                    <path
                        d="M381 431 371 429 357 440C357 449 357 457 357 465L361 472C360 476 360 480 360 484L349 489 351 493 344 501 361 504 370 513 371 527 372 530 383 537 397 532 412 531 415 511 412 488 410 481 417 473 425 466 424 457 417 449 412 450 406 447 410 440 408 426 398 422 381 431Z"
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
                        transform="translate(364 469)"
                        id="text41">鳴沢村</text>
                </g>
                <g
                    id="g80">
                    <path
                        d="M351 406 340 407 329 419 318 414 311 420 308 433 300 438 302 452 300 465 306 469 316 476 318 494 327 506 345 502 353 494 351 489 362 484 361 473 357 464 359 442 371 430 383 431 397 422 408 427 410 439 406 447 412 450 418 450 424 459 425 467 429 464 436 449 438 438 443 427 453 412 463 397 466 385 470 374 462 366 461 361 454 361 449 371 436 370 425 377 407 380 391 391 380 392 372 402 351 406Z"
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
                        transform="translate(338 424)"
                        id="text42">富士河口湖町</text>
                </g>
                <g
                    id="g78">
                    <path
                        d="M462 398 442 428 436 438 436 449 427 465 418 470 409 482 413 491 415 512 411 532 445 523 476 519 482 522 491 515 510 509 505 503 485 492 488 481 482 476 468 470 470 459 468 455 472 450 472 440 478 440 483 445 493 441 500 442 512 432 502 415 487 418 488 406 482 393 470 395 464 393 462 398Z"
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
                        transform="translate(417 512)"
                        id="text43">富士吉田市</text>
                </g>
                <g
                    id="g77">
                    <path
                        d="M471 459 468 470 483 478 486 482 485 494 501 501 503 503 511 511 517 515 527 510 548 503 551 492 557 487 559 477 557 474 565 459 554 453 538 461 535 459 534 466 528 470 518 467 509 469 508 464 512 459 497 454 498 459 489 467 477 463 471 459Z"
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
                        transform="translate(492 489)"
                        id="text44">山中湖村</text>
                </g>
                <g
                    id="g81">
                    <path
                        d="M322 262 336 285 335 288 339 293 325 299 321 305 312 306 311 325 320 324 321 336 308 340 306 344 312 352 327 354 331 371 328 381 345 394 352 406 373 402 381 392 392 390 407 380 427 378 437 370 449 370 456 360 452 349 445 349 439 334 437 318 432 319 427 323 421 316 416 314 417 308 404 303 398 293 398 287 395 282 385 283 381 288 364 285 367 275 350 272 350 262 333 251 331 261 322 262Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path26" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="16"
                        transform="translate(355 349)"
                        id="text45">笛吹市</text>
                </g>
                <g
                    id="g82">
                    <path
                        d="M471 120 464 126 464 135 451 151 455 178 451 184 440 178 418 179 416 186 421 192 417 207 410 205 402 221 392 231 391 249 398 247 397 264 400 267 385 277 388 277 395 277 397 284 397 292 404 303 416 308 415 315 421 316 426 322 436 318 438 333 447 332 453 322 477 318 488 309 500 300 500 274 506 265 503 255 506 239 504 227 498 215 483 209 475 193 483 188 503 191 512 184 514 173 504 165 506 157 500 149 507 144 508 125 505 121 492 118 486 123 479 118 471 120Z"
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
                        transform="translate(428 253)"
                        id="text46">甲州市</text>
                </g>
                <g
                    id="g88">
                    <path
                        d="M357 110 346 127 339 129 342 134 341 139 341 144 337 151 338 156 341 162 336 175 331 172 320 177 326 183 315 209 309 209 312 227 309 233 327 239 326 244 335 253 350 263 350 273 365 276 362 285 379 289 386 284 397 283 391 277 386 276 401 266 397 262 398 248 391 248 392 233 403 220 411 205 417 207 421 193 417 186 418 180 439 179 450 185 454 177 451 151 465 136 464 127 472 121 468 115 461 114 454 108 456 102 448 92 435 90 426 86 418 87 413 85 408 86 403 82 391 87 375 98 377 110 369 114 357 110Z"
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
                        transform="translate(360 187)"
                        id="text47">山梨市</text>
                </g>
                <g
                    id="g89">
                    <path
                        d="M336 113 329 122 321 124 317 131 306 132 306 141 300 149 293 148 290 145 280 148 280 155 285 160 276 165 279 172 276 183 271 193 271 204 284 207 281 210 283 216 287 216 288 226 279 234 274 240 260 248 260 260 268 267 268 274 263 286 269 290 265 292 268 297 274 292 280 301 275 304 279 316 285 321 283 335 286 340 286 351 295 354 300 370 303 371 305 379 313 381 311 385 306 388 313 412 329 419 340 407 348 408 350 403 344 393 335 385 328 380 331 372 326 354 313 351 306 344 308 340 320 335 320 323 311 323 312 306 321 304 325 300 339 293 335 287 336 286 322 262 330 262 332 251 327 245 330 239 322 236 310 233 313 228 310 210 317 207 323 195 327 183 322 178 330 172 336 174 341 163 338 158 338 158 337 151 341 148 342 137 343 134 341 129 346 127 359 110 354 109 336 113Z"
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
                        transform="translate(275 278)"
                        id="text48">甲府市</text>
                </g>
                <g
                    id="g91">
                    <path
                        d="M52 102 43 108 40 124 39 128 28 138 21 153 24 159 10 174 10 180 18 189 21 184 33 190 39 202 45 205 42 210 45 217 45 227 52 230 62 231 70 240 75 241 78 245 90 247 98 244 101 247 111 243 120 233 125 215 132 216 142 213 152 216 154 213 146 207 139 198 155 197 166 193 168 202 170 202 182 195 184 199 184 199 192 212 200 220 202 225 206 225 212 215 224 212 233 204 236 196 243 197 243 195 245 189 250 185 250 170 256 171 262 169 270 172 278 173 276 166 284 161 280 154 281 149 289 147 296 150 301 149 307 140 307 135 318 132 320 124 328 122 336 114 327 114 323 111 319 110 320 88 323 84 320 79 316 80 310 75 302 74 298 80 291 80 285 75 277 75 275 79 262 77 260 79 248 72 241 78 235 90 226 94 212 87 201 87 202 80 199 77 204 62 200 51 175 39 157 36 145 31 141 31 139 47 131 50 126 56 130 62 120 74 115 77 115 84 99 99 93 111 81 122 73 122 67 117 66 110 59 106 52 102Z"
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
                        transform="translate(147 148)"
                        id="text49">北杜市</text>
                </g>
                <g
                    id="g90">
                    <path
                        d="M138 198 145 210 154 215 151 216 143 213 132 216 124 213 118 233 112 241 112 241 101 247 97 244 90 247 101 259 108 274 126 280 132 268 154 272 158 279 171 277 192 285 212 279 226 279 227 274 215 264 218 260 214 251 220 240 227 241 230 248 235 238 247 232 247 223 254 214 251 208 255 200 244 195 242 197 236 197 232 204 222 213 210 213 207 225 201 224 199 218 192 214 183 194 172 202 167 193 154 196 138 198Z"
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
                        transform="translate(151 248)"
                        id="text50">韮崎市</text>
                </g>
                <g
                    id="g92">
                    <path
                        d="M42 211 32 214C28 221 30 219 27 222L27 222 6 239 6 248 14 255 15 263 12 266 19 278 33 299 47 295 59 300 85 297 104 305 104 311 99 326 102 336 114 329 124 346 130 343 139 349 149 343 165 346 175 341 177 346 181 346 187 354 200 353 220 356 225 365 239 358 241 348 246 343 243 326 248 315 240 290 234 273 225 273 223 278 209 278 192 285 171 277 158 278 153 271 132 267 125 279 109 273 100 257 90 246 80 245 77 239 72 240 63 231 53 230 48 227 46 217 42 211Z"
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
                        transform="translate(124 318)"
                        id="text51">南アルプス市</text>
                </g>
                <g
                    id="g83">
                    <path
                        d="M503 231 505 239 502 256 505 264 499 274C499 282 499 291 499 300L485 310 476 317 452 322 446 332 438 332 445 349 451 349 455 361 462 361 467 357 474 357 484 348 500 352 508 357 522 357 531 352 541 351 548 342 560 339 564 335 568 334 575 347 576 359 584 363 603 353 616 353 626 349 630 352 656 348 659 342 661 329 655 322 642 328 631 323 627 323 626 311 619 307 625 298 628 292 625 282 622 281 613 281 604 274 607 269 600 265 595 261 597 254 591 252 591 244 584 236 574 235 571 227 551 220 527 223 525 225 516 225 503 231Z"
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
                        transform="translate(528 305)"
                        id="text52">大月市</text>
                </g>
                <g
                    id="g75">
                    <g
                        id="g74">
                        <path
                            d="M591 245 591 253 596 254 594 261 606 270 604 275 612 282 623 282 627 291 619 308 625 311 625 323 635 325 643 329 656 323 660 330 658 342 653 349 629 352 626 348 615 353 614 363 624 371 630 383 649 385 670 380 681 385 697 377 704 367 703 351 701 348 708 336 706 327 704 317 700 310 704 304 700 295 695 293 696 286 706 278 697 267 685 262 674 263 654 253 648 247 630 242 628 233 619 223 610 230 605 244 591 245Z"
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
                            transform="translate(633 311)"
                            id="text53">上野原市</text>
                    </g>
                </g>
                <g
                    id="g73">
                    <path
                        d="M467 356 461 362 462 369 469 374 475 379 490 379 508 386 512 394 505 401 503 416 512 432 518 428 525 438 525 449 532 456 537 463 553 454 558 443 561 431 566 422 572 423 587 415 592 404 602 402 616 393 616 386 630 382 623 369 614 362 615 353 603 352 584 362 576 359C576 355 576 351 576 346L569 334 564 334 560 339 547 341 541 351 530 352 522 357 509 358 500 351 484 348 475 356 467 356Z"
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
                        transform="translate(528 396)"
                        id="text54">都留市</text>
                </g>
                <g
                    id="g87">
                    <path
                        d="M508 125 506 143 500 148 504 157 504 167 513 174 511 184 502 191 484 187 475 193 482 210 498 216 501 221 514 215 520 202 532 201 539 203 555 199 562 190 571 194 574 198 600 196 603 190 597 181 590 163 588 147 582 147 570 127 556 132 545 129 531 138 524 133C521 132 522 132 520 132L515 131 508 125Z"
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
                        transform="translate(520 172)"
                        id="text55">丹波山村</text>
                </g>
                <g
                    id="g86">
                    <path
                        d="M501 222 503 231 515 226 525 226 528 224 552 220 570 229 575 235 585 239 591 246 606 244 613 231 622 221 612 211 605 211 599 195 573 198 571 194 561 190 555 198 538 203 532 201 519 202 513 213 501 222Z"
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
                        transform="translate(558 220)"
                        id="text56">小菅村</text>
                </g>
                <g
                    id="g76">
                    <path
                        d="M566 422 562 429 560 432 558 445 554 453 563 461 581 453 595 446 596 449 602 448 615 438 621 440 631 434 645 411 653 412 681 405 689 395 695 378 681 384 670 380 648 383 629 382 616 385 616 393 602 401 591 402 586 415 572 423 566 422Z"
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
                        transform="translate(597 422)"
                        id="text57">道志村</text>
                </g>

                <g
                    id="g97">
                    <path
                        d="M245 320 253 323 255 330 258 331 265 331 268 323 275 322 284 328 284 335 287 342 286 353 295 355 301 371 304 372 305 380 296 379 289 382 270 377 267 366 273 358 264 353 253 359 238 359 241 346 245 342 243 326 245 320Z"
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
                        transform="translate(245 347)"
                        id="text59">中央市</text>
                </g>
                <g
                    id="g84">
                    <path
                        d="M469 375 466 384 465 392 471 396 482 393 488 404 487 418 504 415 505 401 513 394 508 386 489 379 474 380 469 375Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path33" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="14"
                        transform="translate(468 390)"
                        id="text60">西桂町</text>
                </g>
                <g
                    id="g85">
                    <path
                        d="M517 428 511 430 500 441 493 439 483 444 478 438 472 438 471 448 467 456 477 464 489 469 498 459 499 455 511 460 507 464 509 470 518 468 527 471 535 465 537 458 531 452 525 449C525 445 525 441 525 437L517 428Z"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeMiterlimit="8"
                        fill="#10B981"
                        fillRule="evenodd"
                        id="path35" />
                    <text
                        fontFamily="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        fontWeight="700"
                        fontSize="14"
                        transform="translate(480 454)"
                        id="text61">忍野村</text>
                </g>
                <g
                    id="g99">
                    <path
                        d="M264 169 254 170 249 169 250 184 243 189 243 195 254 200 252 209 254 214 247 220 247 231 235 236 231 246 228 239 221 238 215 251 217 258 215 263 227 273 233 273 247 311 256 310 266 312 262 303 268 297 265 292 270 290 264 287 268 278 269 267 261 259 261 248 276 240 280 234 290 228 287 215 283 215 281 211 285 206 271 203 271 195 277 185 279 173 271 172 264 169Z"
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
                        transform="translate(220 262)"
                        id="text62">甲斐市</text>
                </g>
                <g
                    id="g98">
                    <path
                        d="M246 309 246 319 254 324 255 332 267 331 270 323 276 322 285 328 287 321 280 315 277 304 280 302 274 291 261 302 264 310 253 307 246 309Z"
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
                        transform="translate(252 323)"
                        id="text58">昭和町</text>
                </g>
            </g>

            {/* ここまでSVGを貼り付ける */}
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

export default Yamanashi;