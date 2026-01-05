import MapApp from '../assets/MapApp';

const Ibaraki = () => {

    const gameTitle = '茨城県の市区町村全部言えるかな？';

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
                        transform="translate(321 209)"
                        id="text51">常陸大宮市</text>
                </g>
                <g
                    id="g126">
                    <path
                        d="M457 558 457 572 450 573 448 580 458 587 491 607 499 617 505 616 506 604 514 599 509 586 502 581 497 580 491 573 495 571 474 555 470 566 463 555 457 558Z"
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
                        transform="translate(458 590)"
                        id="text100">潮来市</text>
                </g>
                <g
                    id="g112">
                    <path
                        d="M432 103 416 84 407 84 398 76 386 76 378 63 382 53 375 46 366 47 358 43 354 29 338 19 326 19 321 41 328 89 324 106 325 123 338 134 341 149 350 148 354 141 361 140 366 153 379 155 388 164 402 161 414 162 420 155 420 144 412 137 419 135 423 141 428 129 436 125 432 103Z"
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
                        transform="translate(350 111)"
                        id="text54">大子町</text>
                </g>
                <g
                    id="g116">
                    <path
                        d="M488 14 484 31 495 43 497 55 504 66 524 75 525 79 527 86 544 92 536 98 530 105 525 105 533 116 553 127 573 125 592 84 608 82 611 77 604 61 575 53 558 54 545 42 541 41 525 39 514 40 497 24 496 14 488 14Z"
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
                        transform="translate(532 76)"
                        id="text55">北茨城市</text>
                </g>
                <g
                    id="g115">
                    <path
                        d="M479 144 478 118 470 111 472 103 473 86 481 76 487 59 496 53 504 66 524 76 528 86 544 93C538 99 541 97 536 99L532 104 525 107 535 117 553 126 574 123 564 161 557 153 522 154 513 149 497 153 479 144Z"
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
                        transform="translate(495 129)"
                        id="text57">高萩市</text>
                </g>
                <g
                    id="g114">
                    <path
                        d="M478 146 470 152 471 166 468 178 459 179 472 209 490 203 489 227 496 236 497 253 497 253 488 258 482 268 494 273 513 284 520 264 521 247 534 225 551 202 549 190 564 178 565 162 556 153 523 153 512 149 495 153 478 146Z"
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
                        transform="translate(497 195)"
                        id="text58">日立市</text>
                </g>
                <g
                    id="g120">
                    <path
                        d="M393 289 387 294 397 305 384 311 371 307 367 312 376 328 358 333 361 342 370 351 363 360 371 373 397 379 392 368 402 361 410 370 412 376 431 375 436 378 447 373 450 382 466 384 475 375 479 379 494 364 470 348 455 343 445 342 443 322 437 325 428 321 426 297 409 301 402 290 393 289Z"
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
                        transform="translate(387 346)"
                        id="text59">水戸市</text>
                </g>
                <g
                    id="g110">
                    <path
                        d="M324 256 321 266 313 268 309 282 302 283 295 310 313 306 318 312 345 303 367 306 385 313 398 306 388 295 394 290 402 294 407 282 401 279 396 282 395 269 383 251 363 242 343 250 336 255 324 256Z"
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
                        transform="translate(330 281)"
                        id="text60">城里町</text>
                </g>
                <g
                    id="g109">
                    <path
                        d="M295 308 295 308 293 315 292 323 286 328 289 334 282 342 284 349 277 352 277 364 283 365 291 376 303 372 310 394 320 396 333 405 354 398 371 405 380 384 378 373 372 373 364 360 371 350 362 343 359 334 376 327 368 311 371 305 345 302 318 310 312 305 295 308Z"
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
                        transform="translate(305 356)"
                        id="text63">笠間市</text>
                </g>
                <g
                    id="g123">
                    <path
                        d="M409 427 408 433 420 441 425 445 420 451C420 456 420 461 420 466L428 469 426 486 445 488 458 483 463 488 466 486 471 501 470 507 484 525 487 524 500 514 511 510 491 459 481 408 463 399 449 399 449 414 440 423 428 419 419 426 409 427Z"
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
                        transform="translate(436 460)"
                        id="text64">鉾田市</text>
                </g>
                <g
                    id="g151">
                    <path
                        d="M285 371 263 382 269 393 259 409 250 429 264 461 267 462 288 461 301 447 304 447 306 445 303 439 305 439 312 438 327 457 329 458 333 466 320 481 364 487 361 477 351 465 354 452 369 451 365 446 353 439 331 422 346 409 353 408 348 399 332 403 320 395 309 393 303 372 290 375 285 371Z"
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
                        transform="translate(278 429)"
                        id="text65">石岡市</text>
                </g>
                <g
                    id="g137">
                    <path
                        d="M221 429 219 435 208 443 200 449 203 458 194 461 189 481C190 485 191 490 192 494 192 499 192 504 192 509L194 524 207 534 217 540 214 553 224 554 234 563 238 578 248 587 251 584 248 568 256 571 266 566 261 556 267 556 263 538 261 534 279 521 269 506 273 497 257 485 264 468 257 461 261 454 250 428 221 429Z"
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
                        transform="translate(196 506)"
                        id="text66">つくば市</text>
                </g>
                <g
                    id="g149">
                    <path
                        d="M211 343 204 339 185 345 175 343 171 354 148 360 141 370 145 383 138 385 137 392 143 395 132 411 140 424 159 418 163 425 180 423 190 429 197 442 208 444 219 434 221 428 224 400 220 397 217 394 220 377 210 354 216 351 211 343Z"
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
                        transform="translate(158 393)"
                        id="text67">筑西市</text>
                </g>
                <g
                    id="g150">
                    <path
                        d="M285 328 271 329 260 319 248 320 244 330 225 326 222 336 210 343 215 352 210 356 220 377 215 395 223 401 220 430 248 428 251 427 260 408 269 393 264 381 285 371 282 365 276 363 275 352 285 349 282 343 289 337 285 328Z"
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
                        transform="translate(221 369)"
                        id="text68">桜川市</text>
                </g>
                <g
                    id="g127">
                    <path
                        d="M378 469 376 472 382 474 398 489 397 506 408 511 409 524 423 537 424 541 426 552 434 553 437 567 450 573 458 571 457 557 463 555 469 566 473 555 483 542 473 537 478 533 471 527 473 525 466 519 469 516 467 508 462 504 465 499 461 487 458 483 444 488 426 485 427 467 418 466 403 476 395 467 378 469Z"
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
                        transform="translate(412 527)"
                        id="text70">行方市</text>
                </g>
                <g
                    id="g122">
                    <path
                        d="M402 362 392 367 397 379 378 375 379 384 372 404 391 411 391 418 407 434 409 427 418 427 427 421 439 423 448 416 450 399 462 399 468 392 467 384 451 382 447 373 436 378 432 375 412 375 410 371 402 362Z"
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
                        transform="translate(394 404)"
                        id="text71">茨城町</text>
                </g>
                <g
                    id="g130">
                    <path
                        d="M362 557 354 568 345 573 333 567 327 570 332 587 330 595 322 595 320 612 351 625 362 613 365 619 385 606 388 613 425 609 433 602 452 612 445 599 450 595 453 583 448 580 445 584 424 577 424 572C421 571 423 571 421 571L404 564 401 563 386 568 374 565 370 570 369 565 376 562 369 557 362 557Z"
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
                        transform="translate(356 595)"
                        id="text72">稲敷市</text>
                </g>
                <g
                    id="g125">
                    <path
                        d="M552 600 559 601 563 614 579 631 586 652 625 703 636 705 626 710 568 680 566 665 544 646 522 640 504 615 505 603 514 598 520 602 552 600Z"
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
                        transform="translate(528 632)"
                        id="text73">神栖市</text>
                </g>
                <g
                    id="g124">
                    <path
                        d="M483 524 490 543 497 544 492 550 501 557 507 569 501 576 508 580 507 583 509 587 514 598 523 602 553 599 554 588 548 581 552 577 541 575 510 510 498 514 483 524Z"
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
                        transform="translate(501 561)"
                        id="text74">鹿嶋市</text>
                </g>
                <g
                    id="g135">
                    <path
                        d="M306 528 299 526 293 534 287 536 288 541 282 536 274 552 281 558 286 572 299 579 302 569 306 573 317 566 326 571 334 569 337 563 333 546 330 537 315 534 306 528Z"
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
                        transform="translate(287 556)"
                        id="text75">阿見町</text>
                </g>
                <g
                    id="g113">
                    <path
                        d="M426 264 428 255 419 240 420 227 411 220 417 207 407 193 423 180 418 171 426 163 419 155 419 147 408 138 418 132 423 140 427 127 434 124 432 103 443 95 445 86 460 78 474 63 487 61 481 79 473 86 472 103 469 111 479 119C480 127 480 135 480 143L470 151 473 167 470 180 460 182 472 207 491 202 489 226 498 238 497 246 500 257 489 262 481 269 467 269 454 268 445 273 426 264Z"
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
                        transform="translate(407 191)"
                        id="text53">常陸太田市</text>
                </g>
                <g
                    id="g136">
                    <path
                        d="M261 454 256 460 262 467 256 486 272 496 268 506 278 520 261 534 273 551 282 538 289 542 289 536 294 535 299 526 307 528C306 522 304 516 304 510L313 511 316 519 329 521 328 513 325 508 328 505 332 506 339 498 326 490 294 485 297 475 294 464 286 464 284 459 265 459 261 454Z"
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
                        transform="translate(277 516)"
                        id="text77">土浦市</text>
                </g>
                <g
                    id="g128">
                    <path
                        d="M301 447 285 462 286 466 294 465 297 477 292 486 325 491 338 500 331 505 327 503 323 509 327 517 328 522 343 524 349 519 377 526 395 511 386 503 390 499 373 490 363 487 321 481 334 466 328 458 325 456 312 437 302 439 301 447Z"
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
                        transform="translate(310 499)"
                        id="text78">かすみがうら市</text>
                </g>
                <g
                    id="g152">
                    <path
                        d="M353 408 347 408 331 423 349 437 352 441 367 447 370 451 355 452 351 466 367 474 369 481 380 469 396 467 404 477 419 467 420 453 427 447 421 441 407 432 392 418 393 411 371 403 354 398 349 400 353 408Z"
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
                        transform="translate(355 440)"
                        id="text79">小美玉市</text>
                </g>
                <g
                    id="g119">
                    <path
                        d="M469 294 459 301 456 316 444 323 446 342 456 343 472 349 490 363 505 366 508 354 520 341 510 332 509 310 484 308 469 294Z"
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
                        transform="translate(453 337)"
                        id="text80">ひたちなか市</text>
                </g>
                <g
                    id="g121">
                    <path
                        d="M478 377 473 375 467 384 467 392 462 400 480 410 484 392 505 366 494 363 478 377Z"
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
                        transform="translate(475 392)"
                        id="text81">大洗町</text>
                </g>
                <g
                    id="g117">
                    <path
                        d="M484 269 474 276 470 293 484 309 519 313C518 309 518 305 518 301L510 300 510 280 484 269Z"
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
                        transform="translate(484 295)"
                        id="text82">東海村</text>
                </g>
                <g
                    id="g118">
                    <path
                        d="M406 261 401 271 396 271 396 282 396 282 405 281 402 290 411 302 426 299 429 321 437 327 457 317 460 302 471 293 475 277 485 269 450 267 445 270 406 261Z"
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
                        transform="translate(417 292)"
                        id="text83">那珂市</text>
                </g>
                <g
                    id="g144">
                    <path
                        d="M42 483 46 492 46 506 68 512 76 501 79 498 69 492 65 484 42 483Z"
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
                        transform="translate(29 504)"
                        id="text84">五霞町</text>
                </g>
                <g
                    id="g143">
                    <path
                        d="M64 482 69 492 81 501 92 523 99 527 115 517 108 510 111 483 102 474 99 477 91 478 89 470 75 470 75 480 66 477 64 482Z"
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
                        transform="translate(79 497)"
                        id="text85">境町</text>
                </g>
                <g
                    id="g147">
                    <path
                        d="M140 423 143 431 157 448 164 465 155 470 155 463 147 464C147 468 147 472 147 477L154 483 167 481 166 474 169 475 191 481 195 461 203 458 201 448 206 445 198 443 190 428 181 423 162 425 159 419 140 423Z"
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
                        transform="translate(160 451)"
                        id="text87">下妻市</text>
                </g>
                <g
                    id="g129">
                    <path
                        d="M332 539 346 543 353 539 359 545 371 540C377 543 375 542 378 543L386 552 380 561 375 561 369 557 361 556 356 566 345 573 336 569 337 563 332 539Z"
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
                        transform="translate(341 556)"
                        id="text76">美浦村</text>
                </g>
                <g
                    id="g148">
                    <path
                        d="M138 385 132 374 121 377 107 381 104 392 108 398 99 407 98 419 95 431 101 443 107 433 114 433 114 433 127 431 129 437 135 432 134 427 139 423 133 410 144 395 139 392 138 385Z"
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
                        transform="translate(93 412)"
                        id="text88">結城市</text>
                </g>
                <g
                    id="g145">
                    <path
                        d="M97 419 71 427 51 442 34 437 30 443 33 449 32 460 41 482 63 484 66 478C67 478 68 478 69 478 76 480 73 480 75 480L75 480 75 470 89 470 91 479 99 477 103 471 114 472 113 458 120 451 112 433 107 432 101 442 94 429 97 419Z"
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
                        transform="translate(53 457)"
                        id="text89">古河市</text>
                </g>
                <g
                    id="g142">
                    <path
                        d="M150 577 130 569 128 553 99 528 114 518 108 510 111 484 101 475 103 472 118 473 126 477 136 490 152 505 158 521 168 531 164 542 147 548 150 577Z"
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
                        transform="translate(115 531)"
                        id="text90">坂東市</text>
                </g>
                <g
                    id="g141">
                    <path
                        d="M147 477 144 481 137 481 136 490 152 505 158 520 168 531 163 541 147 547 150 576 154 578 161 572 175 574 176 571 178 555 186 560 188 549 198 544 207 532 194 524 192 506C192 501 192 497 193 492L188 479 165 473 166 479 153 481 147 477Z"
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
                        transform="translate(157 519)"
                        id="text91">常総市</text>
                </g>
                <g
                    id="g140">
                    <path
                        d="M176 572 175 574 162 572 156 575 159 580 153 591 171 603 189 609 199 597 201 587 176 572Z"
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
                        transform="translate(158 597)"
                        id="text93">守谷市</text>
                </g>
                <g
                    id="g139">
                    <path
                        d="M202 588 199 597 189 608 199 609 218 624 226 634 228 631 232 628 249 629 255 633 259 626 259 626 272 615 260 607 260 601 251 585 245 591 231 589 223 596 215 594 211 597 202 588Z"
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
                        transform="translate(216 615)"
                        id="text94">取手市</text>
                </g>
                <g
                    id="g146">
                    <path
                        d="M113 434 116 443 120 452 112 460 114 473 126 477 135 489 137 481 145 481 148 476 147 463 154 462 156 469 164 465 158 446 142 430 139 424 134 427 135 432 127 436 126 431 113 434Z"
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
                        transform="translate(109 460)"
                        id="text86">八千代町</text>
                </g>
                <g
                    id="g133">
                    <path
                        d="M250 584 259 601 258 606 270 615 257 624 272 627 280 622 285 622 291 631 299 629 306 619 319 612 323 594 318 590 305 588 294 583 287 586 280 597 277 590 273 585 270 590 250 584Z"
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
                        transform="translate(268 613)"
                        id="text95">龍ケ崎市</text>
                </g>
                <g
                    id="g134">
                    <path
                        d="M273 552 273 552 264 540 265 556 259 555 265 565 255 569 247 566 250 584 270 591 274 586 278 592 280 598 287 586 293 584 304 587 317 590 326 597 331 595 333 587 327 569 319 564 307 571 302 568 298 576 285 571 281 556 273 552Z"
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
                        transform="translate(268 581)"
                        id="text96">牛久市</text>
                </g>
                <g
                    id="g131">
                    <path
                        d="M319 612 305 620 299 629 304 634 305 642 316 648 327 634 342 632 359 640 374 623 389 614 386 607 365 618 362 612 352 624 319 612Z"
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
                        transform="translate(323 636)"
                        id="text97">河内町</text>
                </g>
                <g
                    id="g138">
                    <path
                        d="M206 532 218 539 215 552 225 553 235 563 238 578 249 585 244 590 231 590 223 596 215 594 209 598 201 587 177 571 179 553 185 559 188 548 198 544 206 532Z"
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
                        transform="translate(169 572)"
                        id="text92">つくばみらい市</text>
                </g>
                <g
                    id="g132">
                    <path
                        d="M261 625 253 632 259 647 273 653 292 640 306 640 303 632 300 629 291 631 287 623 279 623 272 627 261 625Z"
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
                        transform="translate(260 645)"
                        id="text99">利根町</text>
                </g>

                <text
                    fill="#7F7F7F"
                    font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                    font-weight="900"
                    font-size="18"
                    transform="translate(105 225)"
                    id="text101">栃木県</text>
                <text
                    fill="#7F7F7F"
                    font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                    font-weight="900"
                    font-size="18"
                    transform="translate(402 35)"
                    id="text103">福島県</text>
                <text
                    fill="#7F7F7F"
                    font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                    font-weight="900"
                    font-size="18"
                    transform="translate(21 589)"
                    id="text105">埼玉県</text>
                <text
                    fill="#7F7F7F"
                    font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                    font-weight="900"
                    font-size="18"
                    transform="translate(345 682)"
                    id="text107">千葉県</text>
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

export default Ibaraki;