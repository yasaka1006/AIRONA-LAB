import MapApp from '../assets/MapApp';

const Shizuoka = () => {

    const gameTitle = '静岡県の市区町村全部言えるかな？';

    const allDistricts = [
        // 市部 (23市)
        { id: '静岡市', names: ['静岡市', 'しずおかし'] },
        { id: '浜松市', names: ['浜松市', 'はままつし'] },
        { id: '沼津市', names: ['沼津市', 'ぬまづし'] },
        { id: '熱海市', names: ['熱海市', 'あたみし'] },
        { id: '三島市', names: ['三島市', 'みしまし'] },
        { id: '富士宮市', names: ['富士宮市', 'ふじのみやし'] },
        { id: '伊東市', names: ['伊東市', 'いとうし'] },
        { id: '島田市', names: ['島田市', 'しまだし'] },
        { id: '富士市', names: ['富士市', 'ふじし'] },
        { id: '磐田市', names: ['磐田市', 'いわたし'] },
        { id: '焼津市', names: ['焼津市', 'やいづし'] },
        { id: '掛川市', names: ['掛川市', 'かけがわし'] },
        { id: '藤枝市', names: ['藤枝市', 'ふじえだし'] },
        { id: '御殿場市', names: ['御殿場市', 'ごてんばし'] },
        { id: '袋井市', names: ['袋井市', 'ふくろいし'] },
        { id: '下田市', names: ['下田市', 'しもだし'] },
        { id: '裾野市', names: ['裾野市', 'すそのし'] },
        { id: '湖西市', names: ['湖西市', 'こさいし'] },
        { id: '伊豆市', names: ['伊豆市', 'いずし'] },
        { id: '御前崎市', names: ['御前崎市', 'おまえざきし'] },
        { id: '菊川市', names: ['菊川市', 'きくがわし'] },
        { id: '伊豆の国市', names: ['伊豆の国市', 'いずのくにし'] },
        { id: '牧之原市', names: ['牧之原市', 'まきのはらし'] },

        // 町村部 (12町)
        { id: '東伊豆町', names: ['東伊豆町', 'ひがしいずちょう'] },
        { id: '河津町', names: ['河津町', 'かわづちょう'] },
        { id: '南伊豆町', names: ['南伊豆町', 'みなみいずちょう'] },
        { id: '松崎町', names: ['松崎町', 'まつざきちょう'] },
        { id: '西伊豆町', names: ['西伊豆町', 'にしいずちょう'] },
        { id: '函南町', names: ['函南町', 'かんなみちょう'] },
        { id: '清水町', names: ['清水町', 'しみずちょう'] },
        { id: '長泉町', names: ['長泉町', 'ながいずみちょう'] },
        { id: '小山町', names: ['小山町', 'おやまちょう'] },
        { id: '吉田町', names: ['吉田町', 'よしだちょう'] },
        { id: '川根本町', names: ['川根本町', 'かわねほんちょう'] },
        { id: '森町', names: ['森町', 'もりまち'] }
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
                d="M-11 632-11 725 1315 725 1302 254 522 258-9 487C-10 535-10 583-11 632Z"
                fill="#CAEEFB"
                fill-rule="evenodd"
                id="path2" />
            <path
                d="M1105-6 1127-6 1286-6 1285 271 1226 256 1168 253 1114 272 1107 307 1123 336 1099 332 1064 335 982 300 969 149 1097 46 1081 9 1105-6Z"
                stroke="#FFFFFF"
                stroke-width="2"
                stroke-miterlimit="8"
                fill="#A0EBD2"
                fill-rule="evenodd"
                id="path3" />
            <path
                d="M596 24 576-7 1103-5 1096 14 1102 39 1095 82 1061 99 1041 122 1018 124 1000 138 989 173 852 225 757 325 651 295 592 205 590 45 596 24Z"
                stroke="#FFFFFF"
                stroke-width="2"
                stroke-miterlimit="8"
                fill="#A0EBD2"
                fill-rule="evenodd"
                id="path4" />
            <path
                d="M201-7 204 10 182 37 203 56 199 70 213 97 235 86 252 98 254 121 223 143 257 167 247 174 224 169 230 179 233 197 237 209 216 234 220 244 207 268 215 288 229 300 265 296 283 280 304 275 317 287 332 284 345 299 369 287 390 296 570 190 591 15 578-6 201-7Z"
                stroke="#FFFFFF"
                stroke-width="2"
                stroke-miterlimit="8"
                fill="#A0EBD2"
                fill-rule="evenodd"
                id="path5" />
            <path
                d="M-8-9 204-6 206 12 190 38 203 57 210 95 241 85 249 92 257 123 233 141 259 166 245 178 225 170 236 192 240 214 218 229 220 242 190 257-12 286-8-9Z"
                stroke="#FFFFFF"
                stroke-width="2"
                stroke-miterlimit="8"
                fill="#A0EBD2"
                fill-rule="evenodd"
                id="path6" />
            <path
                d="M171 635 153 635 87 645-11 670-12 609 54 593 58 540-3 545-3 263 67 250 97 217 117 216 110 259 197 246 197 246 221 244 212 265 229 299 264 292 281 271 341 286 344 299 369 286 381 315 270 509 189 543 183 627 171 635Z"
                stroke="#FFFFFF"
                stroke-width="2"
                stroke-miterlimit="8"
                fill="#A0EBD2"
                fill-rule="evenodd"
                id="path7" />
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21"
                transform="translate(360 124)"
                id="text77">長野県</text>
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21"
                transform="translate(424 124)"
                id="text78" />
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21"
                transform="translate(779 103)"
                id="text79">山梨県</text>
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21"
                transform="translate(843 103)"
                id="text80" />
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21"
                transform="translate(1123 170)"
                id="text81">神奈川県</text>
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21"
                transform="translate(1208 170)"
                id="text82" />
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21"
                transform="translate(115 405)"
                id="text83">愛知県</text>
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21"
                transform="translate(179 405)"
                id="text84" />
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21"
                transform="translate(91 127)"
                id="text85">岐阜県</text>
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21"
                transform="translate(155 127)"
                id="text86" />
            <g
                id="group">
                <g
                    id="g96">
                    <path
                        d="M572 412 571 423 562 434 555 452 551 472 558 481 556 487 570 488 570 501 582 506 586 526 592 525 588 535 603 542 611 534 622 534 625 526 622 515 627 504 634 500 631 488 645 484 649 478 648 468 633 466 627 448 611 430 584 416 572 412Z"
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
                        transform="translate(578 484)"
                        id="text42">藤枝市</text>
                </g>
                <g
                    id="g114">
                    <path
                        d="M763 292 767 287 759 261 760 239 756 220 770 209 762 192 769 179 766 167 788 143 796 141 806 159 806 172 822 168 842 169 847 194 879 192 887 209 878 220 874 244 866 248 838 267 844 288 827 284 823 293 828 306 817 305 807 297 787 300 783 315 781 324 770 327 756 314 758 298 763 292Z"
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
                        transform="translate(788 237)"
                        id="text43">富士宮市</text>
                </g>
                <g
                    id="g112">
                    <path
                        d="M880 194 886 210 901 220C903 230 902 226 904 233L904 233 919 238 916 248 929 255 960 245 962 256 973 266 971 272 988 284 1020 276 1017 254 1025 237 1008 222 1015 214 988 206 969 201 963 194 957 209 951 201 887 198 880 194Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path26" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="16"
                        transform="translate(933 236)"
                        id="text44">御殿場市</text>
                </g>
                <g
                    id="g111">
                    <path
                        d="M888 213 891 226 910 265 913 276 929 283 958 303 975 322 975 329 989 312 1002 315 1010 308 1021 309 1033 301 1024 293 1019 275 989 283 971 273 973 266 962 257 961 246 932 254 916 249 921 239 905 233 901 219 888 213Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path27" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="16"
                        transform="translate(944 290)"
                        id="text45">裾野市</text>
                </g>
                <g
                    id="g115">
                    <path
                        d="M826 353 826 353 854 335 889 341 907 321 895 317 909 295 928 281 913 276 911 267 891 227 887 209 877 218 873 243 864 247 837 265 843 290 825 283 823 293 828 303 818 304 809 296 786 301 779 325 785 331 795 329 807 343 820 341 826 353Z"
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
                        transform="translate(837 311)"
                        id="text46">富士市</text>
                </g>
                <g
                    id="g103">
                    <path
                        d="M979 421 980 427 999 430 1023 424 1029 415 1044 419 1054 415 1052 427 1062 436 1068 433 1068 439 1058 447 1060 456 1054 470 1059 480 1051 496 1044 511 1030 509 1007 518 1012 527 993 533 966 529 968 521 948 511 940 515 935 497 924 503 906 505 900 513 890 508 894 503 891 496 908 479 902 467 929 457 939 461 937 447 934 441 958 429 979 421Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path32" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="16"
                        transform="translate(965 477)"
                        id="text47">伊豆市</text>
                </g>
                <g
                    id="g116">
                    <path
                        d="M1057 404 1069 408 1081 400 1085 403 1086 417 1078 421 1085 429 1086 440 1099 438 1106 451 1115 449 1113 478 1106 484 1110 495 1100 505 1085 507 1082 517 1072 517 1049 500 1057 479 1053 469 1059 455 1055 445 1067 437 1067 431 1060 434 1051 426 1057 404Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path40" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="16"
                        transform="translate(1063 471)"
                        id="text48">伊東市</text>
                </g>
                <g
                    id="g95">
                    <path
                        d="M483 422 469 431 470 448 473 465 488 468 486 475 495 485 487 501 495 515 506 516 505 523 516 523 522 545 527 543 531 552 540 545 544 551 560 547 581 556 596 561 602 553 609 546 602 542 588 535 594 525 588 525 581 507 573 499 568 488 558 486 560 481 552 473 556 453 563 435 572 424 572 415 578 391 571 384 565 391 556 381 527 425 513 443 507 427 486 427 483 422Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path16" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="16"
                        transform="translate(509 500)"
                        id="text49">島田市</text>
                </g>
                <g
                    id="g98">
                    <path
                        d="M559 547 546 550 547 567 540 573 548 599 546 614 563 623 560 632 567 634 568 640 560 647 566 661 577 665 584 661 574 649 578 635 584 625 584 611 588 607 592 592 602 593 604 577 598 570 597 561 559 547Z"
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
                        transform="translate(549 608)"
                        id="text50">牧之原市</text>
                </g>
                <g
                    id="g97">
                    <path
                        d="M607 549 623 568 636 570 642 550 655 530 653 508 663 487 650 474 645 483 629 488 634 500 626 504 621 514 625 523 622 533 611 532 603 541 607 549Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path20" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="14"
                        transform="translate(627 532)"
                        id="text51">焼津市</text>
                </g>
                <g
                    id="g101">
                    <path
                        d="M607 547 597 559 597 570 602 578 602 593 620 582 632 578 636 567 623 568 607 547Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path21" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="14"
                        transform="translate(604 583)"
                        id="text52">吉田町</text>
                </g>
                <g
                    id="g121">
                    <path
                        d="M901 574 889 587 889 598 881 595 882 615 899 609 909 605 917 610 946 610 946 599 958 586 967 589 975 569 963 559 948 561 949 550 943 543 938 557 915 576 901 574Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path37" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="14"
                        transform="translate(905 595)"
                        id="text53">松崎町</text>
                </g>
                <g
                    id="g102">
                    <path
                        d="M904 506 887 528 896 573 916 575 937 557 944 545 948 553 948 562 966 559 964 541 968 522 949 509 942 514 937 497 922 502 904 506Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path36" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="14"
                        transform="translate(895 537)"
                        id="text54">西伊豆町</text>
                </g>
                <g
                    id="g118">
                    <path
                        d="M966 527 993 532 1011 527 1029 553 1037 556 1045 572 1039 583 1031 581 1031 587 1027 603 1008 603 1005 587 998 581 997 570 975 570 963 561 964 541 966 527Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path42" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="14"
                        transform="translate(985 564)"
                        id="text55">河津町</text>
                </g>
                <g
                    id="g117">
                    <path
                        d="M1011 527 1030 552 1039 558 1043 575 1056 573 1057 563 1067 554 1068 545 1079 537 1075 528 1076 515 1071 515 1049 501 1043 509 1032 507 1007 517 1011 527Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path41" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="14"
                        transform="translate(1026 538)"
                        id="text56">東伊豆町</text>
                </g>
                <g
                    id="g120">
                    <path
                        d="M882 613 881 623 896 624 904 637 900 648 912 659 915 672 927 668 929 679 946 678 975 658 969 646 975 632 964 627 971 615 949 607 945 610 916 609 910 605 882 613Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path38" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="14"
                        transform="translate(906 647)"
                        id="text57">南伊豆町</text>
                </g>
                <g
                    id="g119">
                    <path
                        d="M974 570 997 570 997 580 1007 587 1009 602 1028 602 1017 615 1020 631 1025 639 1005 646 1005 632 998 633 996 639 983 644 981 654 975 659 969 647 973 634 964 627 969 616 945 608 945 599 955 584 967 590 974 570Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path39" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="14"
                        transform="translate(969 616)"
                        id="text58">下田市</text>
                </g>
                <g
                    id="g104">
                    <path
                        d="M924 285 908 292 896 317 906 320 890 341 934 355 950 377 958 379 970 397 959 411 939 414 932 407 922 409 915 409 908 404 899 431 901 437 894 443 906 466 929 455 938 459 940 446 935 442 953 433 977 419 978 404 975 395 984 375 976 371 970 373 964 361 967 342 962 331 951 327 934 293 924 285Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path28" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="14"
                        transform="translate(909 427)"
                        id="text60">沼津市</text>
                </g>
                <g
                    id="g106">
                    <path
                        d="M1045 324 1045 324 1064 330 1096 333 1075 360 1076 372 1071 390 1087 391 1088 404 1080 401 1070 409 1055 406 1045 394 1049 382 1045 370 1052 341 1045 336 1045 324Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path34" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="16"
                        transform="translate(1055 370)"
                        id="text63">熱海市</text>
                </g>
                <g
                    id="g107">
                    <path
                        d="M1037 308 1045 311 1044 334 1054 341 1048 358 1043 373 1026 371 1007 370 991 384 979 384 984 372 1009 342 1029 323 1033 320 1037 308Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path33" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="14"
                        transform="translate(1009 357)"
                        id="text61">函南町</text>
                </g>
                <g
                    id="g105">
                    <path
                        d="M979 383 991 383 1007 369 1044 373 1050 381 1046 393 1057 405 1052 417 1044 420 1030 415 1024 425 1001 431 979 428 976 421 978 406 975 397 979 383Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path35" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="14"
                        transform="translate(979 403)"
                        id="text59">伊豆の国市</text>
                </g>

                <g
                    id="g108">
                    <path
                        d="M989 311 976 328 978 339 976 347 979 353 981 373 985 375 995 363 1021 331 1033 321 1039 307 1031 301 1021 309 1011 307 1001 313 989 311Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path31" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="14"
                        transform="translate(987 333)"
                        id="text62">三島市</text>
                </g>
                <g
                    id="g110">
                    <path
                        d="M927 283 923 286 934 292 952 329 960 331 967 343 975 349 981 341 974 329 975 319 955 301 927 283Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path29" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="12"
                        transform="translate(940 321)"
                        id="text65">長泉町</text>
                </g>
                <g
                    id="g113">
                    <path
                        d="M881 193 923 178 930 184 946 172 954 173 960 183 985 167 990 170 1030 167 1031 186 1035 192 1036 200 1037 210 1037 210 1034 236 1025 240 1008 223 1015 214 988 205 970 202 970 202 963 194 959 210 949 202 921 200 890 198 881 193Z"
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
                        transform="translate(964 193)"
                        id="text66">小山町</text>
                </g>
                <g
                    id="g88">
                    <path
                        d="M593 14 585 22 581 25 585 35 572 60 559 51 550 69 555 81 543 90 550 94 544 105 553 103 557 125 547 137 536 133 533 142 538 149 548 156 543 162 553 169 548 183 533 190 524 190 517 211 510 219 530 234 541 240 541 256 555 259 569 257 579 270 568 283 571 289 567 300 576 304 583 291 593 297 597 314 588 321 586 332 571 337 576 357 574 368 584 378 577 388 573 412 582 415 582 415 593 420 610 429 610 429 629 451 633 465 647 469 644 475 656 481 661 485 686 464 726 457 763 432 763 415 758 410 745 418 745 404 772 385 778 359 800 350 827 352 820 341 807 342 794 329 787 330 781 323 769 326 757 314 758 302 748 316 733 310 719 313 698 297 689 298 685 286 687 273 670 246 675 233 663 220 643 213 631 231 601 216 610 194 595 188 596 180 610 160 611 148 601 138 607 119 609 100 618 94 611 85 613 77 603 68 598 32 593 14Z"
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
                        transform="translate(638 335)"
                        id="text67">静岡市</text>
                </g>
                <g
                    id="g87">
                    <path
                        d="M516 217 503 202 494 208 480 218 475 234 471 251 463 262 484 283 479 302 464 322 473 343 499 355 487 382 493 395 474 412 476 417 487 426 507 429 514 443 527 425 553 383 563 392 568 386 578 389 584 377 574 367 576 356 571 337 587 332 589 321 598 314 593 296 583 290 575 301 567 299 570 291 568 285 579 270 567 256 554 258 542 257 541 239 527 234 511 220 516 217Z"
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
                        transform="translate(498 327)"
                        id="text68">川根本町</text>
                </g>
                <g
                    id="g89">
                    <path
                        d="M222 553 212 553 207 559 210 567 216 567ZM468 231 476 236 472 253 463 260 485 280 478 304 466 322 474 345 501 352 488 382 495 397 475 417 482 422 470 433 471 445 450 447 440 459 434 457 422 469 411 467 412 481 420 491 398 501 388 498 378 507 366 513 367 521 364 548 366 565 356 585 358 599 346 617 348 627 345 639 353 653 310 639 282 634 238 628 241 622 235 618 242 611 252 607 252 599 262 593 260 585 266 578 259 577 240 597 245 603 230 605 234 587 244 581 245 569 254 567 262 559 252 550 243 558 226 561 217 574 212 571 200 575 176 561 180 551 176 544 183 539 184 529 198 522 208 523 212 517 221 519 235 511 243 504 264 495 266 473 278 456 282 459 294 446 300 437 296 418 307 399 326 384 343 366 352 354 348 338 354 342 361 332 369 322 355 306 365 298 368 290 382 282 390 286 398 282 399 266 404 262 414 265 427 249Z"
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
                        transform="translate(338 449)"
                        id="text69">浜松市</text>
                </g>
                <g
                    id="g90">
                    <path
                        d="M177 562 200 575 204 589 213 599 214 609 226 614 228 622 232 626 216 627 174 633 178 608 170 586 167 578 177 562Z"
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
                        transform="translate(168 610)"
                        id="text70">湖西市</text>
                </g>
                <g
                    id="g91">
                    <path
                        d="M413 494 399 501 389 497 380 506 365 510 368 518 364 546 366 564 355 587 358 600 346 619 349 625 345 638 354 653 369 643 415 635 416 619 406 615 410 591 407 581 401 584 402 571 394 561 391 563 379 545 394 537 394 523 402 519 399 512 413 494Z"
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
                        transform="translate(359 606)"
                        id="text71">磐田市</text>
                </g>
                <g
                    id="g94">
                    <path
                        d="M430 536 442 522 441 508 458 497 464 484 487 474 490 467 472 461 473 449 472 445 452 446 439 459 432 455 423 467 410 465 412 481 418 491 410 492 398 510 400 516 395 522 395 539 402 540 404 555 418 553 430 536Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path15" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="16"
                        transform="translate(422 492)"
                        id="text72">森町</text>
                </g>
                <g
                    id="g93">
                    <path
                        d="M486 476 463 483 457 497 440 505 441 519 429 534 431 543 429 553 438 566 443 583 461 583 467 587 448 597 451 606 435 620 447 630 450 637 480 640 512 653 513 627 505 621 508 611 497 605 493 590 499 580 491 570 503 565 511 553 522 543 515 521 505 523 507 515 497 514 489 502 495 483 486 476Z"
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
                        transform="translate(451 556)"
                        id="text73">掛川市</text>
                </g>
                <g
                    id="g100">
                    <path
                        d="M527 544 519 544 509 552 504 566 491 570 497 581 493 589 496 606 507 612 504 621 513 628 512 639 524 640 529 622 546 613 548 600 543 586 539 575 546 567 545 549 540 546 532 551 527 544Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path18" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="16"
                        transform="translate(500 590)"
                        id="text74">菊川市</text>
                </g>
                <g
                    id="g99">
                    <path
                        d="M545 615 528 620 524 638 514 637 512 651 536 664 556 672 570 679 581 675 593 683 601 673 590 670 588 661 583 661 578 664 568 661 561 646 568 640 568 634 568 634 563 623 545 615Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path23" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="16"
                        transform="translate(518 663)"
                        id="text75">御前崎市</text>
                </g>
                <g
                    id="g92">
                    <path
                        d="M394 538 403 540 404 555 417 552 430 536 432 544 430 555 438 567 438 567 445 582 463 584 469 588 449 599 451 608 445 613 437 622 447 630 449 638 429 633 414 636 414 620 406 616 410 594 408 582 402 587 402 572 394 562 390 564 379 544 394 538Z"
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
                        transform="translate(409 604)"
                        id="text76">袋井市</text>
                </g>
                <g
                    id="g109">
                    <path
                        d="M968 345 976 347 980 356 980 372 972 374 965 363 968 345Z"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-miterlimit="8"
                        fill="#10B981"
                        fill-rule="evenodd"
                        id="path30" />
                    <text
                        font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
                        font-weight="700"
                        font-size="12"
                        transform="translate(954 364)"
                        id="text64">清水町</text>
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

export default Shizuoka;