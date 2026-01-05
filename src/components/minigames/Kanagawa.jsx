import MapApp from '../assets/MapApp';

const Kanagawa = () => {

    const gameTitle = '神奈川県の市区町村全部言えるかな？';

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
                fontSize="21"
                transform="translate(70 514)"
                id="text38">静岡県</text>
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="21"
                transform="translate(102 126)"
                id="text40">山梨県</text>
            <text
                fill="#7F7F7F"
                fontFamily="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                fontWeight="900"
                fontSize="21"
                transform="translate(647 47)"
                id="text42">東京都</text>
            <g id="group">

                <g
                    id="g79">
                    <path
                        d="M1020 253 1033 270 1017 278 1006 258 1020 253ZM811 116 847 133 863 146 887 146 904 157 924 157 930 158 954 160 947 180 963 191 984 184 988 198 1007 226 1020 246 1004 254 1000 244 995 260 982 272 988 271 995 270 1006 287 999 296 968 278 970 264 954 265 951 283 939 274 937 288 960 297 958 307 969 293 994 308 984 341 998 350 977 364 956 347 932 348 942 356 934 362 928 377 954 376 946 386 956 399 948 403 959 430 947 443 934 438 935 454 905 471 888 470 880 446 871 444 859 426 849 428 830 407 809 413 782 404 775 414 763 409 771 390 762 377 753 369 755 336 747 328 755 302 749 296 749 280 748 258 742 242 741 225 764 230 760 218 768 192 756 178 755 159 745 154 756 130 767 130 764 141 769 150 788 139 794 147 807 138 811 116Z"
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
                        transform="translate(836 304)"
                        id="text44">横浜市</text>
                </g>
                <g
                    id="g78">
                    <path
                        d="M1069 224 1091 226 1089 234 1056 251 1046 245 1051 259 1046 269 1030 269 1020 253 1042 241ZM810 52 848 63 861 75 907 86 948 117 962 116 981 151 1008 169 998 173 1006 189 1032 179 1057 176 1117 203 1104 222 1097 219 1062 225 1020 246 1008 227 985 194 985 184 964 191 947 178 954 161 901 156 889 147 863 147 849 133 810 116 808 139 793 147 787 136 775 129 773 119 741 96 727 99 723 85 739 75 760 91 777 97 779 80 795 73Z"
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
                        transform="translate(911 141)"
                        id="text45">川崎市</text>
                </g>
                <g
                    id="g77">
                    <path
                        d="M368 17 350 27 353 44 357 77 367 90 355 114 366 145 344 163 342 182 314 209 292 225 306 247 316 247 323 255 331 260 357 262 367 247 401 268 434 224 463 204 465 186 481 191 500 172 521 173 532 160 553 167 569 182 587 179 615 198 641 210 636 242 673 237 687 215 699 227 731 204 720 189 704 177 674 136 624 109 583 99 565 102 554 99 545 90 520 93 508 102 470 82 454 45 439 41 428 48 415 49 406 30 393 21C373 19 381 20 368 17Z"
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
                        transform="translate(476 141)"
                        id="text46">相模原市</text>
                </g>
                <g
                    id="g91">
                    <path
                        d="M613 196 605 212 608 217 605 238 582 225 566 205 554 205 539 217 528 219 540 251 550 262 550 278 506 287 484 278 477 291C477 297 477 303 477 308L489 309 501 298 507 301 524 308 554 315 578 332 583 328 606 341 612 363 632 367 634 363 634 356 627 346 634 335 636 313 631 307 640 292 644 267 636 258 637 240 641 207 613 196Z"
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
                        transform="translate(571 283)"
                        id="text47">厚木市</text>
                </g>
                <g
                    id="g92">
                    <path
                        d="M402 267 404 279 398 293 438 299 446 285 477 293 486 280 507 287 550 280 552 263 540 250 528 219 512 220 508 209 500 205 492 179 481 189 466 184 462 204 433 222 402 267Z"
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
                        transform="translate(455 253)"
                        id="text48">清川村</text>
                </g>
                <g
                    id="g82">
                    <path
                        d="M934 453 960 452 962 461 947 466 931 488 937 494 951 478 958 488 950 501 958 506 963 485 982 490 978 505 997 531 1043 533 1058 547 1032 563 1041 579 1034 585 1025 581 1021 584 1033 596 994 602 967 623 952 606 924 605 919 617 904 625 889 619 904 601 919 601 918 592 900 586 887 586 893 573 885 558 866 547 900 543 910 538C914 541 912 540 917 543L921 546 935 533 934 520 917 514 916 506 918 498 912 485 903 477 904 470 934 453Z"
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
                        transform="translate(934 567)"
                        id="text49">横須賀市</text>
                </g>
                <g
                    id="g83">
                    <path
                        d="M919 618 905 624 910 635 913 658 902 660 901 676 908 687 901 700 928 699 928 692 962 695 967 685C969 688 969 686 969 688L972 692 984 693 983 666 961 665 954 635 967 621 951 606 924 605 919 618Z"
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
                        transform="translate(912 659)"
                        id="text50">三浦市</text>
                </g>
                <g
                    id="g85">
                    <path
                        d="M782 404 776 413 795 432 793 441 778 448 774 461 765 476 810 486 820 478 834 481 837 487 853 476 856 476 871 469 884 457 881 445 871 444 859 425 850 428 830 406 809 413 782 404Z"
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
                        transform="translate(803 457)"
                        id="text51">鎌倉市</text>
                </g>
                <g
                    id="g84">
                    <path
                        d="M720 324 716 325 730 342 718 350 703 336 683 338 670 357 659 361 668 373 665 381 676 387 693 380 704 385 702 394 712 402 709 407 715 425 712 462 757 478 749 489 767 493 765 475 776 457 779 448 794 441 797 432 776 412 765 408 771 388 763 376 752 368 756 335 750 327 738 331 720 324Z"
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
                        transform="translate(720 426)"
                        id="text52">藤沢市</text>
                </g>
                <g
                    id="g86">
                    <path
                        d="M636 423 629 435 639 443 631 453 637 467 678 470 712 462 715 424 710 407 714 402 701 393 704 384 694 380 673 386 671 386 670 402 658 405 659 422 636 423Z"
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
                        transform="translate(643 448)"
                        id="text53">茅ヶ崎市</text>
                </g>
                <g
                    id="g94">
                    <path
                        d="M537 381 544 391 526 395 519 412 495 420 485 436 497 450 511 445 550 452 557 460 588 454 586 462 590 471 615 473 639 469 633 453 640 444 629 435 636 424 636 421 630 407 633 399 636 398 634 366 631 366 612 362 617 376 613 385 610 378 603 384 597 378 579 385 576 404 556 373 554 374 553 385 537 381Z"
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
                        transform="translate(553 432)"
                        id="text54">平塚市</text>
                </g>
                <g
                    id="g93">
                    <path
                        d="M477 308 481 330 497 350 505 365 497 379 510 385 522 377 538 380 553 384 555 376 575 403 579 384C582 385 581 385 583 385L596 378 603 385 610 375 612 387 619 376 612 361 605 340 583 327 576 331 555 313 526 308 502 298 487 308 477 308Z"
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
                        transform="translate(519 354)"
                        id="text55">伊勢原市</text>
                </g>
                <g
                    id="g99">
                    <path
                        d="M398 293 390 305 377 305 373 316 382 346 384 372 376 383 397 415 409 414 419 429 452 411 460 421 495 420 519 413 525 393 545 391 537 381 522 376 511 384 499 380 505 364 496 347 481 330 476 308 476 291 446 284 439 297 398 293Z"
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
                        transform="translate(420 366)"
                        id="text56">秦野市</text>
                </g>
                <g
                    id="g108">
                    <path
                        d="M292 225 272 218 266 224 265 235 247 256 221 264 204 263 196 275 186 273 137 305 130 322 138 329 131 344 122 347C122 351 122 356 122 360L142 364 185 353 215 356C215 363 215 371 215 379L228 409 232 420 225 426 237 449 247 448 251 441 266 435 281 418 309 425 328 419 339 421 347 417 347 414 361 390 332 372 330 349 335 345 330 334 363 302 376 305 391 305 399 292 405 277 401 266 366 246 357 261 332 260 323 255 316 246 305 246 292 225Z"
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
                        transform="translate(245 335)"
                        id="text57">山北町</text>
                </g>
                <g
                    id="g104">
                    <path
                        d="M250 441 245 448 236 448 222 478 220 496 231 512 253 518 267 509 282 524 338 514 358 505 365 475 362 463 354 459 346 440 338 430 339 421 328 419 308 425 281 419 263 435 250 441Z"
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
                        transform="translate(260 475)"
                        id="text58">南足柄市</text>
                </g>
                <g
                    id="g102">
                    <path
                        d="M373 457 361 464 365 476 358 505 338 513 283 524 291 546 283 555 311 569 321 558 326 560 351 565 343 581 319 589 310 597 306 615 340 636 354 634 361 641 372 640 379 603 377 579 396 550 429 538 449 514 467 512 482 502 479 486 483 469 478 462 440 472 433 462 418 449 387 471 373 457Z"
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
                        d="M219 497 191 527 190 529 187 555 188 558 198 594 204 603 202 613 228 635 249 646 285 624 296 612 306 615 310 597 319 588 343 581 352 564 327 560 322 558 312 568 283 555 291 547 283 525 267 509 252 517 232 513 219 497Z"
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
                        transform="translate(226 583)"
                        id="text60">箱根町</text>
                </g>
                <g
                    id="g106">
                    <path
                        d="M297 613 285 624 267 634 249 646 250 677 263 675 267 676 288 681 304 680 318 690 327 687C330 689 329 689 331 690L345 692 368 676 358 667 361 658 348 646 340 636 306 616 297 613Z"
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
                        transform="translate(274 661)"
                        id="text61">湯河原町</text>
                </g>
                <g
                    id="g107">
                    <path
                        d="M342 635 349 646 361 658 358 666 371 680 388 693 392 692 402 690 393 681 389 680 381 679 375 662 380 651 371 639 361 639 354 634 342 635Z"
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
                        d="M643 268 639 292 630 307 636 314 634 335 627 345 635 359 661 361 672 357 675 348 678 319 671 299 690 274 667 267 652 273 643 268Z"
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
                        transform="translate(617 326)"
                        id="text63">海老名市</text>
                </g>
                <g
                    id="g95">
                    <path
                        d="M635 359 635 398 632 399 630 408 637 425 660 422C660 417 660 411 660 406L672 401 672 383 667 382 670 375 659 360 635 359Z"
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
                        transform="translate(625 396)"
                        id="text64">寒川町</text>
                </g>
                <g
                    id="g87">
                    <path
                        d="M688 273 680 286 671 299 677 319 674 350 684 338 704 337 718 352 731 341 717 325 720 321 721 305 727 295 724 277 706 274 708 260 688 273Z"
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
                        transform="translate(677 311)"
                        id="text65">綾瀬市</text>
                </g>
                <g
                    id="g88">
                    <path
                        d="M741 225 740 210 730 204 701 226 710 259 705 275 724 278 727 296 721 306 720 324 740 332 750 328 756 301 750 296 749 257 742 242 741 225Z"
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
                        transform="translate(711 263)"
                        id="text66">大和市</text>
                </g>
                <g
                    id="g89">
                    <path
                        d="M637 242C637 247 637 253 637 258L648 273 652 274 667 268 671 269 690 273 711 258 700 228 687 215 673 236 637 242Z"
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
                        transform="translate(654 256)"
                        id="text67">座間市</text>
                </g>
                <g
                    id="g90">
                    <path
                        d="M493 178 499 206 509 209 511 220 539 218 555 206 566 206 582 226 605 239 610 218 606 212 613 195 588 179 568 183 554 167 531 160 519 173 497 171 493 178Z"
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
                        transform="translate(524 198)"
                        id="text68">愛川町</text>
                </g>
                <g
                    id="g96">
                    <path
                        d="M497 450 506 469 513 471 519 491 575 481 591 470 587 462 588 452 557 458 551 452 511 445 497 450Z"
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
                        transform="translate(528 475)"
                        id="text69">大磯町</text>
                </g>
                <g
                    id="g97">
                    <path
                        d="M479 462 483 470 479 486 482 504 521 490 513 471 507 469 496 450 479 462Z"
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
                        transform="translate(468 486)"
                        id="text70">二宮町</text>
                </g>
                <g
                    id="g98">
                    <path
                        d="M497 420 497 420 461 422 451 412 429 421 433 434 430 448 429 459 440 474 442 474 474 464 498 449 485 436 497 420Z"
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
                        transform="translate(440 446)"
                        id="text71">中井町</text>
                </g>
                <g
                    id="g101">
                    <path
                        d="M397 415 395 427 367 438 373 456 386 473 417 449 429 459 431 443 434 433 429 422 418 427 409 414 397 415Z"
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
                        transform="translate(382 447)"
                        id="text72">大井町</text>
                </g>
                <g
                    id="g100">
                    <path
                        d="M362 301 329 334 334 344 329 350 332 372 361 390 345 414 346 417 364 427 369 439 396 427 398 413 377 382 383 371 384 343 373 315 377 305 362 301Z"
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
                        transform="translate(337 366)"
                        id="text73">松田町</text>
                </g>
                <g
                    id="g103">
                    <path
                        d="M346 417 339 422 337 431 347 442 353 460 364 465 375 458 369 437 364 426 346 417Z"
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
                        transform="translate(323 447)"
                        id="text74">開成町</text>
                </g>
                <g
                    id="g81">
                    <path
                        d="M856 505 851 510 858 527 854 534 868 549 907 542 911 539 921 546 936 533 933 519 917 514 916 518 892 515 899 510 903 500 878 497 863 509 856 505Z"
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
                        transform="translate(868 533)"
                        id="text75">葉山町</text>
                </g>
                <g
                    id="g80">
                    <path
                        d="M884 457 872 468 855 476 852 475 848 477 837 484 836 494 843 500 860 499 855 505 863 509 879 497 904 500 899 510 890 514 918 519 916 508 920 498 913 484 909 482 904 477 903 469 888 469 884 457Z"
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
                        transform="translate(854 491)"
                        id="text76">逗子市</text>
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

export default Kanagawa;