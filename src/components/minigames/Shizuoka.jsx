import MapQuizManager from './MapQuizManager';

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
                d="M-11 632.067-11 725 1315 725 1302.33 254 522.497 258.224-9.77718 487.344C-10.1848 535.585-10.5923 583.826-11 632.067Z"
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
                d="M171 635 153 635 87.9998 645-11 670-12 609 54.0001 593 58.0001 540-3.99989 545-3.00021 263 67 250 97.0001 217 117 216 110 259 197 246 197 246 221 244 212 265 229 299 264 292 281 271 341 286 344 299 369 286 381 315 270 509 189 543 183 627 171 635Z"
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
                font-size="21.3333"
                transform="translate(360.568 124)"
                id="text77">長野県</text>
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21.3333"
                transform="translate(424.568 124)"
                id="text78" />
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21.3333"
                transform="translate(779.66 103)"
                id="text79">山梨県</text>
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21.3333"
                transform="translate(843.66 103)"
                id="text80" />
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21.3333"
                transform="translate(1123.3 170)"
                id="text81">神奈川県</text>
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21.3333"
                transform="translate(1208.63 170)"
                id="text82" />
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21.3333"
                transform="translate(115.284 405)"
                id="text83">愛知県</text>
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21.3333"
                transform="translate(179.284 405)"
                id="text84" />
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21.3333"
                transform="translate(91.4999 127)"
                id="text85">岐阜県</text>
            <text
                fill="#7F7F7F"
                font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
                font-weight="900"
                font-size="21.3333"
                transform="translate(155.5 127)"
                id="text86" />
            <g
                id="group">
                <g
                    id="g96">
                    <path
                        d="M572.189 412 571.527 423.333 562.257 434 555.635 452.667 551 472 558.284 481.333 556.297 487.333 570.203 488.667 570.865 501.333 582.122 506.667 586.757 526.667 592.716 525.333 588.743 535.333 603.311 542 611.257 534.667 622.513 534.667 625.162 526 622.513 515.333 627.811 504 634.432 500.667 631.122 488.667 645.027 484.667 649 478.667 648.338 468.667 633.77 466 627.811 448 611.919 430 584.108 416 572.189 412Z"
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
                        transform="translate(578.072 484)"
                        id="text42">藤枝市</text>
                </g>
                <g
                    id="g114">
                    <path
                        d="M763.391 292.123 767.922 287.77 759.78 261.27 760.797 239.866 756.726 220.5 770.975 209.289 762.833 192.981 769.957 179.731 766.904 167.5 788.277 143.038 796.419 141 806.597 159.346 806.597 172.596 822.881 168.519 842.218 169.539 847.307 194 879.876 192.981 887 209.289 878.858 220.5 874.787 244.962 866.645 248.02 838.147 267.385 844.254 288.789 827.97 284.712 823.899 293.885 828.988 306.116 817.792 305.097 807.615 297.962 787.259 300.001 783.188 315.289 781.153 324.463 770.705 327 756 314.705 758.762 298.982 763.391 292.123Z"
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
                        transform="translate(788.394 237)"
                        id="text43">富士宮市</text>
                </g>
                <g
                    id="g112">
                    <path
                        d="M880 194.667 886.651 210.667 901.284 220.667C903.595 230.703 902.344 226.521 904.61 233.333L904.61 233.333 919.908 238.667 916.583 248.667 929.885 255.333 960.482 245.333 962.477 256.667 973.784 266 971.124 272.667 988.417 284 1020.34 276 1017.68 254.667 1025 237.333 1008.37 222.667 1015.02 214 988.417 206 969.128 201.333 963.807 194 957.821 209.333 951.835 201.333 887.317 198 880 194.667Z"
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
                        transform="translate(933.464 236)"
                        id="text44">御殿場市</text>
                </g>
                <g
                    id="g111">
                    <path
                        d="M888 213 891.341 226.92 910.719 265.366 913.392 276.634 929.429 283.263 958.161 303.811 975.535 322.371 975.535 329 989.567 312.429 1002.93 315.08 1010.95 308.451 1021.64 309.777 1033 301.823 1024.31 293.206 1019.64 275.971 989.567 283.263 971.525 273.983 973.53 266.691 962.839 257.411 961.502 246.143 932.101 254.76 916.733 249.457 921.41 239.514 905.373 233.549 901.364 219.629 888 213Z"
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
                        transform="translate(944.477 290)"
                        id="text45">裾野市</text>
                </g>
                <g
                    id="g115">
                    <path
                        d="M826.439 353 826.439 353 854.502 335.667 889.247 341 907.955 321 895.928 317 909.96 295 928 281.667 913.969 276.333 911.964 267 891.919 227 887.242 209 877.888 218.333 873.879 243 864.525 247.667 837.13 265.667 843.143 290.333 825.103 283 823.099 293 828.444 303.667 818.422 304.333 809.067 296.333 786.35 301 779 325 785.682 331 795.036 329 807.731 343.667 820.426 341.667 826.439 353Z"
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
                        transform="translate(837.129 311)"
                        id="text46">富士市</text>
                </g>
                <g
                    id="g103">
                    <path
                        d="M979.333 421 980.667 427.667 999.333 430.333 1023.33 424.333 1029.33 415 1044.67 419.667 1054 415.667 1052.67 427.667 1062 436.333 1068 433 1068 439.667 1058.67 447.667 1060 456.333 1054.67 470.333 1059.33 480.333 1051.33 496.333 1044 511.667 1030.67 509.667 1007.33 518.333 1012 527.667 993.333 533 966.667 529.667 968 521.667 948.667 511.667 940.667 515 935.333 497.667 924.667 503.667 906.667 505 900 513.667 890 508.333 894.667 503.667 891.333 496.333 908 479.667 902.667 467 929.333 457 939.333 461.667 937.333 447 934 441 958 429.667 979.333 421Z"
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
                        transform="translate(965.667 477)"
                        id="text47">伊豆市</text>
                </g>
                <g
                    id="g116">
                    <path
                        d="M1057.67 404.653 1069.67 408.642 1081.67 400 1085.67 403.989 1086.33 417.284 1078.33 421.273 1085 429.915 1086.33 440.551 1099.67 438.557 1106.33 451.852 1115 449.193 1113 478.443 1106.33 484.426 1110.33 495.727 1100.33 505.034 1085.67 507.693 1082.33 517 1072.33 517 1049 500.381 1057.67 479.108 1053 469.801 1059 455.841 1055.67 445.205 1067 437.892 1067 431.909 1060.33 434.568 1051 426.591 1057.67 404.653Z"
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
                        transform="translate(1063.67 471)"
                        id="text48">伊東市</text>
                </g>
                <g
                    id="g95">
                    <path
                        d="M483.737 422.333 469 431.667 470.34 448.333 473.019 465 488.426 468.333 486.416 475 495.124 485 487.756 501.667 495.794 515.667 506.512 516.333 505.172 523.667 516.56 523.667 522.589 545 527.278 543.667 531.966 552.333 540.005 545.667 544.694 551.667 560.1 547.667 581.536 556.333 596.273 561 602.971 553.667 609 546.333 602.971 542.333 588.904 535 594.933 525 588.234 525 581.536 507 573.498 499 568.139 488.333 558.091 486.333 560.1 481 552.732 473.667 556.081 453.667 563.45 435.667 572.158 424.333 572.158 415.667 578.187 391 571.488 384.333 565.459 391 556.081 381 527.278 425.667 513.88 443 507.852 427.667 486.416 427 483.737 422.333Z"
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
                        transform="translate(509.679 500)"
                        id="text49">島田市</text>
                </g>
                <g
                    id="g98">
                    <path
                        d="M559.333 547 546 550.333 547.333 567 540 573.667 548 599.667 546 614.333 563.333 623.667 560.667 632.333 567.333 634.333 568 640.333 560.667 647.667 566.667 661.667 577.333 665 584 661.667 574.667 649.667 578 635 584 625 584.667 611.667 588.667 607.667 592.667 592.333 602.667 593 604 577 598 570.333 597.333 561 559.333 547Z"
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
                        transform="translate(549.917 608)"
                        id="text50">牧之原市</text>
                </g>
                <g
                    id="g97">
                    <path
                        d="M607.045 549.333 623.899 568.667 636.034 570 642.101 550.667 655.584 530 653.562 508.667 663 487.333 650.191 474 645.472 483.333 629.292 488 634.011 500 626.596 504 621.202 514.667 625.247 523.333 622.551 533.333 611.09 532.667 603 541.333 607.045 549.333Z"
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
                        transform="translate(627.759 532)"
                        id="text51">焼津市</text>
                </g>
                <g
                    id="g101">
                    <path
                        d="M607.576 547 597.661 559.176 597 570.676 602.949 578.794 602.949 593 620.797 582.853 632.695 578.118 636 567.971 623.441 568.647 607.576 547Z"
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
                        transform="translate(604.267 583)"
                        id="text52">吉田町</text>
                </g>
                <g
                    id="g121">
                    <path
                        d="M901.143 574.333 889.729 587 889.057 598.333 881 595 882.343 615 899.8 609 909.871 605.667 917.257 610.333 946.8 610.333 946.129 599 958.214 586.333 967.614 589.667 975 569 963.586 559.667 948.814 561.667 949.486 550.333 943.443 543 938.743 557 915.914 576.333 901.143 574.333Z"
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
                        transform="translate(905.656 595)"
                        id="text53">松崎町</text>
                </g>
                <g
                    id="g102">
                    <path
                        d="M904.926 506.915 887 528.729 896.295 573.017 916.213 575 937.459 557.814 944.098 545.254 948.746 553.847 948.746 562.441 966.008 559.136 964.68 541.288 968 522.119 949.41 509.559 942.107 514.186 937.459 497 922.852 502.288 904.926 506.915Z"
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
                        transform="translate(895.435 537)"
                        id="text54">西伊豆町</text>
                </g>
                <g
                    id="g118">
                    <path
                        d="M966.333 527.661 993 532.287 1011.67 527 1029 553.435 1037.67 556.739 1045 572.6 1039.67 583.174 1031 581.191 1031 587.139 1027.67 603 1008.33 603 1005.67 587.139 998.333 581.852 997.667 570.617 975 570.617 963 561.365 964.333 541.539 966.333 527.661Z"
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
                        transform="translate(985.802 564)"
                        id="text55">河津町</text>
                </g>
                <g
                    id="g117">
                    <path
                        d="M1011.67 527.667 1030.33 552.333 1039 558.333 1043.67 575 1056.33 573 1057.67 563.667 1067.67 554.333 1068.33 545 1079 537.667 1075 528.333 1076.33 515.667 1071.67 515 1049 501 1043.67 509.667 1032.33 507 1007 517.667 1011.67 527.667Z"
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
                        transform="translate(1026.49 538)"
                        id="text56">東伊豆町</text>
                </g>
                <g
                    id="g120">
                    <path
                        d="M882.324 613.745 881 623.164 896.225 624.509 904.169 637.964 900.197 648.055 912.775 659.491 915.423 672.273 927.338 668.909 929.986 679 946.535 678.327 975 658.818 969.042 646.709 975 632.582 964.408 627.873 971.028 615.091 949.183 607.691 945.873 610.382 916.746 609.036 910.789 605 882.324 613.745Z"
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
                        transform="translate(906.366 647)"
                        id="text57">南伊豆町</text>
                </g>
                <g
                    id="g119">
                    <path
                        d="M974.452 570 997.879 570.669 997.879 580.038 1007.25 587.398 1009.26 602.12 1028 602.789 1017.96 615.504 1020.64 631.564 1025.32 639.594 1005.24 646.955 1005.91 632.233 998.548 633.571 996.54 639.594 983.153 644.947 981.815 654.316 975.121 659 969.766 647.624 973.782 634.241 964.411 627.549 969.766 616.173 945.669 608.143 945 599.444 955.04 584.722 967.758 590.075 974.452 570Z"
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
                        transform="translate(969.033 616)"
                        id="text58">下田市</text>
                </g>
                <g
                    id="g104">
                    <path
                        d="M924 285 908.667 292.347 896 317.727 906 320.399 890 341.103 934.667 355.797 950 377.17 958 379.173 970 397.207 959.333 411.232 939.333 414.572 932.667 407.225 922 409.229 915.333 409.897 908 404.553 899.333 431.937 901.333 437.28 894.667 443.292 906 466 929.333 455.982 938.667 459.989 940 446.631 935.333 442.624 953.333 433.273 977.333 419.915 978.667 404.553 975.333 395.871 984 375.834 976.667 371.159 970.667 373.83 964.667 361.14 967.333 342.439 962 331.753 951.333 327.077 934.667 293.015 924 285Z"
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
                        transform="translate(909.207 427)"
                        id="text60">沼津市</text>
                </g>
                <g
                    id="g106">
                    <path
                        d="M1045 324 1045 324 1064.21 330.693 1096 333.37 1075.47 360.142 1076.13 372.858 1071.49 390.929 1087.39 391.598 1088.05 404.315 1080.77 401.638 1070.83 409 1055.6 406.323 1045.66 394.945 1049.64 382.228 1045.66 370.85 1052.95 341.402 1045 336.717 1045 324Z"
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
                        transform="translate(1055.26 370)"
                        id="text63">熱海市</text>
                </g>
                <g
                    id="g107">
                    <path
                        d="M1037.93 308 1045.29 311.333 1044.62 334 1054 341.333 1048.64 358 1043.96 373.333 1026.54 371.333 1007.79 370.667 991.054 384 979 384 984.357 372.667 1009.13 342.667 1029.22 323.333 1033.91 320.667 1037.93 308Z"
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
                        d="M979.705 383.667 991.131 383 1007.93 369 1044.9 373 1050.28 381.667 1046.92 393.667 1057 405.667 1052.97 417 1044.9 420.333 1030.79 415.667 1024.07 425.667 1001.21 431 979.705 428.333 976.344 421 978.361 406.333 975 397.667 979.705 383.667Z"
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
                        d="M989.926 311.667 976.663 328.333 978.653 339.667 976 347.667 979.316 353.667 981.305 373 985.947 375 995.895 363.667 1021.09 331 1033.03 321 1039 307 1031.71 301 1021.76 309 1011.81 307 1001.86 313.667 989.926 311.667Z"
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
                        transform="translate(987.434 333)"
                        id="text62">三島市</text>
                </g>
                <g
                    id="g110">
                    <path
                        d="M927.614 283 923 286.3 934.205 292.9 952 329.2 960.568 331.18 967.159 343.72 975.068 349 981 341.08 974.409 329.86 975.068 319.96 955.955 301.48 927.614 283Z"
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
                        transform="translate(940.101 321)"
                        id="text65">長泉町</text>
                </g>
                <g
                    id="g113">
                    <path
                        d="M881 193.545 923 178.945 930.333 184.918 946.333 172.309 954.333 173.636 960.333 183.591 985 167 990.333 170.318 1030.33 167.664 1031 186.909 1035 192.218 1036.33 200.845 1037 210.136 1037 210.136 1034.33 236.018 1025.67 240 1008.33 223.409 1015.67 214.118 988.333 205.491 970.333 202.173 970.333 202.173 963.667 194.873 959.667 210.8 949.667 202.173 921 200.845 890.333 198.855 881 193.545Z"
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
                        transform="translate(964.134 193)"
                        id="text66">小山町</text>
                </g>
                <g
                    id="g88">
                    <path
                        d="M593.582 14 585.428 22.1736 581.35 25.2386 585.428 35.4555 572.177 60.9979 559.945 51.8027 550.772 69.1714 555.868 81.4317 543.637 90.627 550.772 94.7137 544.656 105.952 553.83 103.909 557.907 125.364 547.714 137.625 536.502 133.538 533.444 142.733 538.54 149.885 548.733 156.015 543.637 162.145 553.83 169.297 548.733 183.601 533.444 190.753 524.27 190.753 517.135 211.187 510 219.36 530.386 234.686 541.598 240.816 541.598 256.141 555.868 259.206 569.119 257.163 579.312 270.445 568.1 283.727 571.158 289.857 567.08 300.074 576.254 304.161 583.389 291.9 593.582 297.009 597.659 314.377 588.486 321.529 586.447 332.768 571.158 337.876 576.254 357.289 574.215 368.527 584.408 378.744 577.273 388.961 573.196 412.46 582.37 415.525 582.37 415.525 593.582 420.633 610.91 429.829 610.91 429.829 629.257 451.284 633.334 465.588 647.604 469.675 644.278 475.01 656.113 481.495 661.875 485 686.338 464.566 726.09 457.414 763.804 432.894 763.804 415.525 758.707 410.417 745.457 418.59 745.457 404.286 772.977 385.896 778.074 359.332 800.498 350.137 827 352.18 820.884 341.963 807.633 342.985 794.383 329.703 787.248 330.725 781.132 323.573 769.92 326.638 757.688 314.377 758.707 302.117 748.514 316.421 733.225 310.291 719.974 313.356 698.569 297.009 689.396 298.03 685.318 286.792 687.357 273.51 670.029 246.946 675.125 233.664 663.913 220.382 643.527 213.23 631.296 231.62 601.736 216.295 610.91 194.84 595.621 188.709 596.64 180.536 610.91 160.102 611.929 148.863 601.736 138.646 607.852 119.234 609.891 100.844 618.045 94.7137 611.929 85.5184 613.968 77.3449 603.775 68.1497 598.679 32.3905 593.582 14Z"
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
                        transform="translate(638.667 335)"
                        id="text67">静岡市</text>
                </g>
                <g
                    id="g87">
                    <path
                        d="M516.699 217.468 503.651 202 494.617 208.986 480.565 218.965 475.547 234.433 471.03 251.896 463 262.375 484.58 283.331 479.059 302.292 464.004 322.25 473.539 343.706 499.636 355.182 487.591 382.126 493.613 395.598 474.543 412.064 476.048 417.054 487.089 426.534 507.665 429.029 514.691 443 527.74 425.536 553.836 383.623 563.874 392.605 568.892 386.617 578.427 389.112 584.45 377.636 574.914 367.656 576.42 356.679 571.401 337.219 587.963 332.729 589.468 321.752 598 314.766 593.483 296.304 583.446 290.317 575.416 301.294 567.387 299.797 570.398 291.315 568.892 285.826 579.933 270.358 567.888 256.387 554.338 258.882 542.796 257.884 541.29 239.921 527.74 234.433 511.178 220.462 516.699 217.468Z"
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
                        transform="translate(498.658 327)"
                        id="text68">川根本町</text>
                </g>
                <g
                    id="g89">
                    <path
                        d="M222.715 553.158 212.037 553.823 207.366 559.148 210.702 567.136 216.708 567.136ZM468.967 231 476.975 236.325 472.971 253.631 463.628 260.953 485.651 280.256 478.977 304.218 466.298 322.189 474.973 345.486 501 352.142 488.988 382.76 495.661 397.404 475.641 417.372 482.982 422.032 470.302 433.347 471.637 445.994 450.949 447.325 440.271 459.972 434.265 457.975 422.253 469.29 411.575 467.293 412.91 481.271 420.251 491.255 398.895 501.905 388.218 498.577 378.875 507.23 366.195 513.221 367.53 521.208 364.86 548.498 366.862 565.804 356.852 585.773 358.187 599.085 346.842 617.057 348.844 627.707 345.507 639.688 353.515 653 310.805 639.022 282.109 634.363 238.731 628.372 241.4 622.382 235.394 618.388 242.068 611.732 252.078 607.073 252.745 599.085 262.088 593.76 260.754 585.773 266.76 578.451 259.419 577.785 240.733 597.754 245.405 603.079 230.055 605.741 234.727 587.77 244.07 581.779 245.405 569.798 254.747 567.136 262.088 559.814 252.745 550.495 243.402 558.483 226.051 561.811 217.376 574.457 212.037 571.795 200.025 575.789 176.667 561.145 180.004 551.161 176 544.505 183.341 539.845 184.676 529.861 198.69 522.539 208.033 523.871 212.704 517.214 221.38 519.211 235.394 511.89 243.402 504.568 264.09 495.915 266.092 473.284 278.105 456.644 282.776 459.306 294.789 446.659 300.127 437.341 296.791 418.038 307.468 399.401 326.154 384.091 343.505 366.12 352.181 354.139 348.844 338.83 354.85 342.158 361.524 332.839 369.532 322.189 355.517 306.88 365.528 298.893 368.197 290.24 382.879 282.252 390.887 286.912 398.228 282.252 399.563 266.278 404.234 262.284 414.244 265.612 427.591 249.637Z"
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
                        transform="translate(338.691 449)"
                        id="text69">浜松市</text>
                </g>
                <g
                    id="g90">
                    <path
                        d="M177.612 562 200.163 575.396 204.806 589.462 213.429 599.509 214.092 609.557 226.694 614.245 228.684 622.953 232 626.302 216.082 627.641 174.296 633 178.939 608.217 170.98 586.113 167 578.076 177.612 562Z"
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
                        transform="translate(168.65 610)"
                        id="text70">湖西市</text>
                </g>
                <g
                    id="g91">
                    <path
                        d="M413.346 494 399.411 501.983 389.458 497.326 380.832 506.64 365.57 510.632 368.224 518.615 364.243 546.556 366.897 564.519 355.617 587.803 358.935 600.443 346.327 619.071 349.645 625.724 345 638.364 354.953 653 369.551 643.686 415.336 635.703 416 619.736 406.71 615.745 410.028 591.13 407.374 581.151 401.402 584.477 402.729 571.172 394.766 561.858 391.449 563.188 379.505 545.226 394.766 537.908 394.766 523.272 402.729 519.28 399.411 512.628 413.346 494Z"
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
                        transform="translate(359.333 606)"
                        id="text71">磐田市</text>
                </g>
                <g
                    id="g94">
                    <path
                        d="M430.21 536.89 442.168 522.805 441.503 508.049 458.776 497.988 464.755 484.573 487.343 474.512 490 467.134 472.727 461.768 473.392 449.024 472.063 445 452.133 446.341 439.51 459.085 432.203 455.732 423.566 467.805 410.944 465.793 412.937 481.89 418.916 491.28 410.28 492.622 398.322 510.061 400.979 516.768 395 522.805 395 539.573 402.308 540.915 404.301 555 418.252 553.659 430.21 536.89Z"
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
                        transform="translate(422.568 492)"
                        id="text72">森町</text>
                </g>
                <g
                    id="g93">
                    <path
                        d="M486.54 476 463.122 483.32 457.77 497.293 440.374 505.278 441.043 519.917 429 534.556 431.676 543.872 429 553.853 438.367 566.496 443.719 583.797 461.115 583.132 467.806 587.124 448.403 597.771 451.079 606.421 435.691 620.395 447.734 630.376 450.41 637.695 480.518 640.357 512.633 653 513.971 627.049 505.942 621.726 508.619 611.744 497.914 605.09 493.899 590.451 499.252 580.47 491.892 570.489 503.266 565.831 511.295 553.188 522 543.872 515.978 521.914 505.942 523.244 507.95 515.925 497.914 514.594 489.885 502.617 495.237 483.32 486.54 476Z"
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
                        d="M527.212 544 519.165 544 509.776 552.667 504.412 566 491 570.667 497.706 581.333 493.682 589.333 496.365 606.667 507.094 612 504.412 621.333 513.8 628.667 512.459 639.333 524.529 640 529.224 622 546.659 613.333 548 600.667 543.976 586 539.953 575.333 546.659 567.333 545.988 549.333 540.624 546 532.576 551.333 527.212 544Z"
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
                        transform="translate(500.299 590)"
                        id="text74">菊川市</text>
                </g>
                <g
                    id="g99">
                    <path
                        d="M545.459 615 528.729 620.282 524.045 638.767 514.008 637.447 512 651.311 536.09 664.515 556.165 672.437 570.218 679.039 581.594 675.738 593.639 683 601 673.757 590.293 670.456 588.955 661.874 583.602 661.214 578.248 664.515 568.211 661.874 561.519 646.029 568.88 640.748 568.211 634.146 568.211 634.146 563.526 623.583 545.459 615Z"
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
                        transform="translate(518.006 663)"
                        id="text75">御前崎市</text>
                </g>
                <g
                    id="g92">
                    <path
                        d="M394.221 538 403.485 540 404.809 555.333 417.382 552 430.618 536 432.603 544.667 430.618 555.333 438.559 567.333 438.559 567.333 445.176 582.667 463.706 584.667 469 588 449.147 599.333 451.132 608 445.176 613.333 437.235 622 447.824 630.667 449.147 638 429.956 633.333 414.735 636 414.074 620 406.794 616 410.103 594 408.118 582 402.162 587.333 402.162 572.667 394.882 562 390.25 564.667 379 544.667 394.221 538Z"
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
                        transform="translate(409.639 604)"
                        id="text76">袋井市</text>
                </g>
                <g
                    id="g109">
                    <path
                        d="M968.261 345 976.087 347.636 980 356.205 980 372.023 972.174 374 965 363.455 968.261 345Z"
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
                        transform="translate(954.141 364)"
                        id="text64">清水町</text>
                </g>
            </g>
            {/* ここまでSVGを貼り付ける */}

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

export default Shizuoka;