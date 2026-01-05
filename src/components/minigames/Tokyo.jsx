import MapApp from '../assets/MapApp';

const Tokyo = () => {

  const gameTitle = '東京都の市区町村全部言えるかな？';

  const allDistricts = [
    { id: '奥多摩町', names: ['奥多摩町', 'おくたままち'] },
    { id: '檜原村', names: ['檜原村', 'ひのはらむら'] },
    { id: '青梅市', names: ['青梅市', 'おうめし'] },
    { id: '日の出町', names: ['日の出町', 'ひのでまち'] },
    { id: 'あきる野市', names: ['あきる野市', 'あきるのし'] },
    { id: '八王子市', names: ['八王子市', 'はちおうじし'] },
    { id: '昭島市', names: ['昭島市', 'あきしまし'] },
    { id: '福生市', names: ['福生市', 'ふっさし'] },
    { id: '羽村市', names: ['羽村市', 'はむらし'] },
    { id: '瑞穂町', names: ['瑞穂町', 'みずほまち'] },
    { id: '東村山市', names: ['東村山市', 'ひがしむらやまし'] },
    { id: '武蔵村山市', names: ['武蔵村山市', 'むさしむらやまし'] },
    { id: '東大和市', names: ['東大和市', 'ひがしやまとし'] },
    { id: '小平市', names: ['小平市', 'こだいらし'] },
    { id: '清瀬市', names: ['清瀬市', 'きよせし'] },
    { id: '練馬区', names: ['練馬区', 'ねりまく'] },
    { id: '西東京市', names: ['西東京市', 'にしとうきょうし'] },
    { id: '東久留米市', names: ['東久留米市', 'ひがしくるめし'] },
    { id: '立川市', names: ['立川市', 'たちかわし'] },
    { id: '国分寺市', names: ['国分寺市', 'こくぶんじし'] },
    { id: '小金井市', names: ['小金井市', 'こがねいし'] },
    { id: '町田市', names: ['町田市', 'まちだし'] },
    { id: '世田谷区', names: ['世田谷区', 'せたがやく'] },
    { id: '大田区', names: ['大田区', 'おおたく'] },
    { id: '品川区', names: ['品川区', 'しながわく'] },
    { id: '港区', names: ['港区', 'みなとく'] },
    { id: '江東区', names: ['江東区', 'こうとうく'] },
    { id: '江戸川区', names: ['江戸川区', 'えどがわく'] },
    { id: '葛飾区', names: ['葛飾区', 'かつしかく'] },
    { id: '足立区', names: ['足立区', 'あだちく'] },
    { id: '板橋区', names: ['板橋区', 'いたばしく'] },
    { id: '杉並区', names: ['杉並区', 'すぎなみく'] },
    { id: '新宿区', names: ['新宿区', 'しんじゅくく'] },
    { id: '中野区', names: ['中野区', 'なかのく'] },
    { id: '渋谷区', names: ['渋谷区', 'しぶやく'] },
    { id: '府中市', names: ['府中市', 'ふちゅうし'] },
    { id: '調布市', names: ['調布市', 'ちょうふし'] },
    { id: '狛江市', names: ['狛江市', 'こまえし'] },
    { id: '多摩市', names: ['多摩市', 'たまし'] },
    { id: '稲城市', names: ['稲城市', 'いなぎし'] },
    { id: '三鷹市', names: ['三鷹市', 'みたかし'] },
    { id: '武蔵野市', names: ['武蔵野市', 'むさしのし'] },
    { id: '日野市', names: ['日野市', 'ひのし'] },
    { id: '国立市', names: ['国立市', 'くにたちし'] },
    { id: '豊島区', names: ['豊島区', 'としまく'] },
    { id: '北区', names: ['北区', 'きたく'] },
    { id: '荒川区', names: ['荒川区', 'あらかわく'] },
    { id: '台東区', names: ['台東区', 'たいとうく'] },
    { id: '墨田区', names: ['墨田区', 'すみだく'] },
    { id: '文京区', names: ['文京区', 'ぶんきょうく'] },
    { id: '目黒区', names: ['目黒区', 'めぐろく'] },
    { id: '中央区', names: ['中央区', 'ちゅうおうく'] },
    { id: '千代田区', names: ['千代田区', 'ちよだく'] },
    { id: '大島町', names: ['大島町', 'おおしままち'] },
    { id: '利島村', names: ['利島村', 'としまむら'] },
    { id: '新島村', names: ['新島村', 'にいじまむら'] },
    { id: '神津島村', names: ['神津島村', 'こうづしまむら'] },
    { id: '三宅村', names: ['三宅村', 'みやけむら'] },
    { id: '御蔵島村', names: ['御蔵島村', 'みくらじまむら'] },
    { id: '八丈町', names: ['八丈町', 'はちじょうまち'] },
    { id: '青ヶ島村', names: ['青ヶ島村', 'あおがしまむら', "青ケ島村"] },
    { id: '小笠原村', names: ['小笠原村', 'おがさわらむら'] }
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
      <rect
        x="0"
        y="0"
        width="1280"
        height="720"
        fill="#CAEEFB"
        id="rect3" />
      <path
        d="M1170 181 1181 180 1189 168 1182 151 1185 125 1180 103 1196 56 1179 22 1161-5-2-3-6 108 92 60 190 61 372 114 499 159 606 226 717 198 806 232 949 176 1076 198 1156 183 1170 181Z"
        stroke="#FFFFFF"
        stroke-width="2"
        stroke-miterlimit="8"
        fill="#A0EBD2"
        fill-rule="evenodd"
        id="path3" />
      <path
        d="M273 317 256 289 204 275 151 246 126 196 101 142 85 82 59 71 35 86-6 103-11 462 273 460 277 444 271 428 284 415 274 408 284 400 270 383 272 358 268 352 280 328 273 317Z"
        stroke="#FFFFFF"
        stroke-width="2"
        stroke-miterlimit="8"
        fill="#A0EBD2"
        fill-rule="evenodd"
        id="path4" />
      <path
        d="M1155 376 1161 390 1186 393 1186 393 1203 385 1231 367 1224 348 1212 343 1238 324 1228 307 1235 275 1258 271 1285 262 1284-5 1148-6 1190 57 1173 109 1185 140 1179 164 1182 172 1161 192 1191 250 1179 299 1160 359 1155 376Z"
        stroke="#FFFFFF"
        stroke-width="2"
        stroke-miterlimit="8"
        fill="#A0EBD2"
        fill-rule="evenodd"
        id="path5" />
      <path
        d="M946 589 949 597 960 611 952 621 925 607 923 595ZM1050 540 1045 548 1050 551 1031 561 1019 554 1021 564 1006 571 997 565 1008 577 1002 592 985 590 968 598 958 579 993 562 1031 543ZM274 306 309 318 339 329 381 338 405 387 432 406 447 388 528 404 593 425 611 430 660 487 650 411 670 376 717 386 736 362 778 353 827 384 903 415 946 455 979 487 1021 486 1062 509 1061 514 1070 523 1055 536 1047 530 995 554 942 576 919 593 922 583 901 582 911 586 900 600 886 591 881 593 889 612 917 628 943 634 941 645 925 658 933 671 945 664 949 674 918 688 897 662 869 666 888 678 862 691 883 695 903 706 893 703 893 722 584 720 523 463 272 466 270 450 273 442 267 433 276 416 270 406 277 398 268 383 270 367 264 355 276 329 272 316Z"
        stroke="#FFFFFF"
        stroke-width="2"
        stroke-miterlimit="8"
        fill="#A0EBD2"
        fill-rule="evenodd"
        id="path6" />
      <path
        d="M1 459 533 459 592 719 0 719 1 459Z"
        fill="#CAEEFB"
        fill-rule="evenodd"
        id="path7" />
      <path
        d="M0 458 532 458"
        stroke="#000000"
        stroke-width="2"
        stroke-miterlimit="8"
        fill="none"
        fill-rule="evenodd"
        id="path68" />
      <path
        d="M533 458 592 719"
        stroke="#000000"
        stroke-width="2"
        stroke-miterlimit="8"
        fill="none"
        fill-rule="evenodd"
        id="path69" />
      <path
        d="M198 492 198 675"
        stroke="#000000"
        stroke-width="2"
        stroke-miterlimit="8"
        fill="none"
        fill-rule="evenodd"
        id="path70" />
      <path
        d="M387 492 387 675"
        stroke="#000000"
        stroke-width="2"
        stroke-miterlimit="8"
        fill="none"
        fill-rule="evenodd"
        id="path71" />
      <path
        d="M495 644 495 717"
        stroke="#000000"
        stroke-width="2"
        stroke-miterlimit="8"
        fill="none"
        fill-rule="evenodd"
        id="path72" />
      <path
        d="M495 645 573 645"
        stroke="#000000"
        stroke-width="2"
        stroke-miterlimit="8"
        fill="none"
        fill-rule="evenodd"
        id="path73" />
      <text
        fill="#7F7F7F"
        font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
        font-weight="900"
        font-size="21"
        transform="translate(633 607)"
        id="text74">神奈川県</text>
      <text
        fill="#7F7F7F"
        font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
        font-weight="900"
        font-size="21"
        transform="translate(57 317)"
        id="text76">山梨県</text>
      <text
        fill="#7F7F7F"
        font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
        font-weight="900"
        font-size="21"
        transform="translate(763 72)"
        id="text78">埼玉県</text>
      <text
        fill="#7F7F7F"
        font-family="Noto Sans JP Black,Noto Sans JP Black_MSFontService,sans-serif"
        font-weight="900"
        font-size="21"
        transform="translate(1199 153)"
        id="text80">千葉県</text>
      <g
        id="group">
        <g
          id="g145">
          <path
            d="M137 18 131 34 104 42 99 35 78 47 58 63 56 76 63 82 67 98 82 113 88 117 91 133 93 164 106 170 105 190 114 208 134 223 137 236 161 228 173 222 172 205 195 200 214 188 235 193 246 177 273 200 287 195 290 176 302 171 302 153 326 148 338 122 333 99 322 94 305 70 287 63 249 64 224 55 214 47 200 60 188 43 186 48 165 26 137 18Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path74" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="16"
            transform="translate(172 133)"
            id="text82">奥多摩町</text>
        </g>
        <g
          id="g146">
          <path
            d="M137 237 174 222 172 203 195 199 213 188 236 194 246 176 273 200 289 194 298 200 293 207 306 216 309 223 321 236 321 261 319 270 330 279 329 297 327 305 316 329 296 328 286 318 273 316 258 305 255 296 242 290 230 294 219 288 201 288 180 271 151 259 137 237Z"
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
            transform="translate(221 254)"
            id="text83">檜原村</text>
        </g>
        <g
          id="g159">
          <path
            d="M648 194 655 194 669 187 694 182 702 174 717 177 721 206 713 206 713 215 702 215 700 224 705 240 697 239 689 228 682 229 682 225 668 234 660 235 663 229 659 221 659 210 649 203 648 194Z"
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
            transform="translate(656 209)"
            id="text94">東村山市</text>
        </g>
        <path
          d="M288 190 301 182 316 185 329 173 349 164 369 176 372 186 397 186 407 193 430 201 437 206 471 203 476 193 470 178 480 175 500 185 511 180 506 166 517 160 502 145 499 125 490 114 482 122 482 103 466 102 454 98 437 103 418 98 406 97 397 102 379 92 374 84 368 92 349 98 320 81 309 74 323 98 333 103 337 117 327 146 302 152 300 170 288 177 288 190Z"
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
          transform="translate(389,154)"
          id="text84">青梅市</text>
        <g
          id="g147" />
        <g
          id="g148">
          <path
            d="M322 182 328 174 350 163 371 175 375 184 401 186 410 195 437 204 438 210 458 215 458 232 464 236 457 246 431 242 413 234 398 236 377 226 373 214 346 203 338 203 333 189 322 182Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path11" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(375 213)"
            id="text85">日の出町</text>
        </g>
        <g
          id="g149">
          <path
            d="M288 188 288 194 298 201 293 208 305 215 309 225 321 235 320 263 319 271 330 279 328 298 361 300 361 287 367 283 369 266 392 260 414 269 434 270 446 275 453 266 485 272 501 267 505 260 519 272 517 257 506 231 494 217 480 207 473 211 468 203 435 206 438 213 458 215 458 229 463 238 456 245 432 241 414 234 399 236 378 224 375 212 349 202 338 202 335 191 319 180 313 185 301 182 288 188Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path9" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(374 255)"
            id="text86">あきる野市</text>
        </g>
        <g
          id="g195">

          <path
            d="M328 299 325 308 316 328 325 334 322 350 333 352 340 361 349 356 361 347 369 351 378 352 383 370 390 379 387 386 399 393 404 406 420 416 439 415 443 407 467 392 477 399 512 400 527 397 537 405 544 413 561 409 580 419 582 425 594 404 606 398 614 385 638 376 632 365 621 363 621 357 611 359 593 365 574 363 552 350 550 342 562 329 566 326 572 316 573 301 576 296 562 298 532 296 521 284 519 271 505 259 501 267 485 273 452 264 446 275 434 270 415 268 390 259 368 268 366 284 360 287 360 300 328 299Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path86" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="16"
            transform="translate(440 345)"
            id="text87">八王子市</text>
        </g>
        <g
          id="g151">
          <path
            d="M518 266 522 285 531 295 563 299 581 297 593 283 600 268 594 267 579 257 580 251 571 252 561 249 533 254 529 261 518 266Z"
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
            transform="translate(534 282)"
            id="text88">昭島市</text>
        </g>
        <g
          id="g208">
          <path
            d="M499 224 505 232 513 252 516 257 517 267 527 262 534 255 549 250 545 240 554 234 547 225 542 231 531 219 509 212 499 224Z"
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
            transform="translate(504 244)"
            id="text89">福生市</text>
        </g>
        <g
          id="g157">
          <path
            d="M469 179 474 192 470 203 473 212 479 207 498 223 509 211 532 220 530 209 522 202 520 189 509 184 509 184 497 185 479 174 469 179Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path12" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(476 204)"
            id="text90">羽村市</text>
        </g>
        <g
          id="g156">
          <path
            d="M509 184 505 168 516 158 526 162 535 157 546 161 555 162 566 168 566 181 578 180 575 190 568 195 562 187 555 206 549 219 542 232 532 221 530 209 522 202 519 188 509 184Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path13" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(518 184)"
            id="text91">瑞穂町</text>
        </g>
        <g
          id="g158">
          <path
            d="M596 202 605 192 613 192 631 199 647 192 649 203 660 211 659 222 664 230 660 236 639 241 631 246 617 238 615 224 608 220 610 203 596 202Z"
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
            transform="translate(613 222)"
            id="text93">東大和市</text>
        </g>
        <g
          id="g155">
          <path
            d="M561 187 555 204 546 225 554 234 566 234 589 240 591 235 614 242 620 239 616 227 609 219 611 209 611 204 597 203 587 192 578 198 576 192 568 194 561 187Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path14" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="12"
            transform="translate(549 221)"
            id="text92">武蔵村山市</text>
        </g>
        <g
          id="g162">
          <path
            d="M634 244 639 240 660 236 671 233 681 225 683 231 689 227 697 239 703 239 700 226 710 229 726 225 729 234 739 229 751 237 741 245 751 257 744 262 731 262 724 269 716 266 702 278 697 267 688 273 681 261 667 259 656 253 637 249 634 244Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path23" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(680 254)"
            id="text95">小平市</text>
        </g>
        <g
          id="g160">
          <path
            d="M716 177 745 166 751 158 762 152 770 141 779 146 772 157 767 164 774 174 767 183 744 188 743 195 728 206 719 203 716 177Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path22" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(723 182)"
            id="text96">清瀬市</text>
        </g>

        <g
          id="g154">
          <path
            d="M552 234 546 238 550 250 560 249 570 252 580 251 579 256 586 261 594 268 599 268 594 283 581 296 599 299 607 306 619 308 626 297 637 298 638 290 633 282 635 277 642 274 636 263 638 260 651 264 656 253 639 250 634 244 620 239 612 242 591 235 589 239 568 234 552 234Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path17" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(595 271)"
            id="text99">立川市</text>
        </g>
        <g
          id="g207">
          <path
            d="M655 254 652 262 638 259 638 264 642 271 635 278 649 288 663 285 669 293 675 290 685 302 708 295 711 285 703 279 698 265 688 273 682 261 667 258 655 254Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path24" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="13"
            transform="translate(646 284)"
            id="text100">国分寺市</text>
        </g>
        <g
          id="g194">
          <path
            d="M452 401 471 402 485 413 499 414 508 410 520 415 528 410 543 420 555 423 564 424 576 432 591 434 603 444 606 450 616 457 630 473 635 487 648 493 669 514 669 529 676 528 684 548 701 551 697 542 691 536 703 529 705 512 696 496 696 474 686 471 688 455 703 438 705 446 702 462 710 471 722 457 726 459 730 449 722 451 712 441 713 434 694 421 685 421 678 406 663 416 659 405 646 407 640 412 624 409 620 402 592 405 581 425 579 417 563 408 544 412 528 395 514 399 475 399 469 391 452 401Z"
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
            transform="translate(629 461)"
            id="text102">町田市</text>
        </g>
        <g
          id="g188">
          <path
            d="M915 320 925 326 930 338 940 362 935 385 916 376 910 377 916 395 910 407 933 409 935 430 928 431 916 420 903 423 906 434 895 430 881 415 858 399 837 396 826 394 830 379 825 373 824 355 831 348 825 336 829 329 819 320 824 310 831 307 837 309 844 321 852 320 874 325 882 334 899 324 915 320Z"
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
            transform="translate(841 371)"
            id="text103">世田谷区</text>
        </g>
        <g
          id="g187">
          <path
            d="M950 405 957 410 972 419 978 422 986 433 994 429 1001 434 1024 435 1033 442 1036 427 1047 424 1049 433 1045 439 1056 441 1062 447 1032 451 1043 456 1043 456 1059 459 1077 489 1088 501 1073 509 1068 517 1024 492 1011 495 1000 490 992 497 986 493 976 503 956 502 958 489 964 481 956 476C950 473 952 473 950 473L934 469 924 453 923 443 912 433 905 432 904 422 917 418 930 431 937 430 933 411 939 408 936 400 950 405Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path45" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="16"
            transform="translate(969 465)"
            id="text104">大田区</text>
        </g>

        <g
          id="g186">
          <path
            d="M976 374 971 384 954 386 959 394 950 404 978 423 985 434 993 429 1002 434 1025 435 1032 443 1035 427 1045 424 1038 417 1028 400 1026 385 997 386 992 375 976 374Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path46" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="16"
            transform="translate(974 409)"
            id="text105">品川区</text>
        </g>
        <g
          id="g183">
          <path
            d="M975 373 977 366 988 360 984 342 969 333 973 320 977 320 981 313 994 312 1007 320 1030 326 1032 336 1027 341 1026 371 1051 373 1056 379 1049 385 1045 396 1037 382 1045 374 1026 372 1025 384 994 386 991 375 975 373Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path47" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="16"
            transform="translate(991 357)"
            id="text106">港区</text>
        </g>
        <g
          id="g180">
          <path
            d="M1088 399 1101 408 1109 422 1112 432 1105 430 1094 431 1083 438 1068 434 1068 427 1064 424 1073 410ZM1104 273 1120 282 1135 287 1135 297 1132 311 1132 326 1131 359 1125 361 1122 388 1116 404 1104 380 1099 363 1077 370 1076 390 1069 386 1062 381 1074 394 1069 401 1060 388 1056 390 1066 405 1057 413 1045 395 1049 383 1055 379 1050 369 1056 368 1070 366 1074 356 1070 354 1063 343 1064 334 1059 319 1068 306 1068 299 1082 303 1092 295 1101 293Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path57" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="16"
            transform="translate(1072 344)"
            id="text107">江東区</text>
        </g>
        <g
          id="g182">
          <path
            d="M1164 232 1156 263 1159 269 1144 266 1135 270 1127 259 1122 261 1125 271 1119 281 1134 287 1131 308 1132 330 1131 360 1135 364 1138 370 1145 363 1156 377 1156 365 1164 370 1181 347 1181 320 1179 314 1183 307 1198 307 1218 292 1216 272 1206 270 1198 259 1191 249 1196 235 1193 225 1184 219 1174 229 1164 232Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path58" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="16"
            transform="translate(1139 299)"
            id="text108">江戸川区</text>
        </g>
        <g
          id="g170">
          <path
            d="M1134 154 1144 162 1149 155 1169 156 1162 166 1165 177 1179 172 1189 176 1188 181 1171 190 1183 218 1172 228 1164 232 1156 261 1158 270 1145 267 1135 270 1128 259 1112 243 1101 224 1092 211 1094 205 1102 212 1112 200 1130 188 1136 197 1146 197 1142 182 1129 165 1134 154Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path50" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="16"
            transform="translate(1120 224)"
            id="text109">葛飾区</text>
        </g>
        <g
          id="g169">
          <path
            d="M1007 174 1007 174 1017 168 1022 170 1030 151 1022 143 1020 134 1044 127 1050 142 1075 144 1088 138 1104 132 1101 154 1113 158 1124 150 1133 154 1129 166 1142 185 1145 198 1138 197 1130 190 1110 204 1102 213 1095 205 1093 212 1101 227 1094 234 1082 232 1069 232 1060 224 1064 213 1050 212 1022 211 1015 204 1028 197 1028 190 1007 196 1002 181 1007 174Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path49" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="16"
            transform="translate(1050 187)"
            id="text110">足立区</text>
        </g>
        <g
          id="g167">
          <path
            d="M867 181 888 155 917 150 925 155 953 151 947 170 959 175 967 199 985 213 981 226 972 221 963 231 952 228 939 232 934 227 923 224 928 213 920 193 881 195 879 188 867 181Z"
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
            transform="translate(899 187)"
            id="text111">板橋区</text>
        </g>
        <g
          id="g166">
          <path
            d="M798 200 814 190 831 178 840 180 836 193 848 191 857 188 865 196 869 181 878 188 882 194 921 194 928 214 923 224 935 227 932 244 923 238 915 247 892 252 881 250 875 235 867 240 845 245 831 259 823 257 816 264 801 254 800 230 802 208 798 200Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path35" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="16"
            transform="translate(840 221)"
            id="text112">練馬区</text>
        </g>
        <g
          id="g189">
          <path
            d="M817 263 822 257 831 259 845 245 868 241 869 246 874 251 873 259 893 270 900 273 909 273 916 290 920 295 914 303 908 304 916 320 899 325 882 335 872 324 852 321 846 322 838 309 831 307 827 294 829 283 835 281 828 273 817 263Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path36" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="16"
            transform="translate(848 296)"
            id="text113">杉並区</text>
        </g>
        <g
          id="g177">
          <path
            d="M875 236 869 239 870 245 873 250 873 259 903 273 909 272 915 292 918 295 915 302 909 305 914 316 926 306 940 295 944 278 950 270 937 267 929 257 932 245 923 238 915 247 892 252 881 249 875 236Z"
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
            transform="translate(901 277)"
            id="text114">中野区</text>
        </g>
        <g
          id="g178">
          <path
            d="M963 252 969 268 983 264 991 274 1011 273 1014 284 994 302 993 313 983 313 980 322 975 321 972 308 961 301 952 306 942 306 939 294 944 278 950 270 936 266 930 257 932 244 937 254 958 256 963 252Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path44" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(956 290)"
            id="text115">新宿区</text>
        </g>
        <g
          id="g184">
          <path
            d="M915 315 940 296 943 308 950 307 960 301 972 308 975 321 968 333 985 345 988 361 977 369 973 363 969 366 961 360 944 333 928 332 924 326 917 322 915 315Z"
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
            transform="translate(925 325)"
            id="text117">渋谷区</text>
        </g>
        <g
          id="g205">
          <path
            d="M676 290 676 290C669 293 672 292 668 293L668 292 664 298 664 309 661 319 639 321 645 337 650 341 668 346 677 346 686 352 701 349 720 352 727 355 736 351 747 359 740 337 752 324 750 317 743 309 747 300 736 291 735 304 716 304 707 296 684 302 676 290Z"
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
            transform="translate(676 328)"
            id="text118">府中市</text>
        </g>
        <g
          id="g191">
          <path
            d="M751 320 750 326 739 336 746 359 756 367 770 365 777 369 796 376 798 357 816 351 823 358 831 349 830 345 826 336 829 329 817 318 808 327 813 330 807 337 801 332 794 314 784 306 769 315 769 326 771 335 758 328 751 320Z"
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
            transform="translate(760 351)"
            id="text119">調布市</text>
        </g>
        <g
          id="g163">
          <path
            d="M745 301 743 308 749 321 772 336 772 324 770 314 785 306 796 313 802 333 807 338 814 330 809 327 818 320 820 320 825 311 833 308 828 296 822 297 812 278 810 287 796 287 786 276 777 275 783 270 760 280 762 270 754 250 760 250 745 301Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path34" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(771 307)"
            id="text123">三鷹市</text>
        </g>
        <g
          id="g190">
          <path
            d="M798 357 817 351 825 358 825 370 832 379 827 394 816 386 805 388 796 376 798 357Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path39" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="13"
            transform="translate(792 378)"
            id="text120">狛江市</text>
        </g>
        <g
          id="g193">
          <path
            d="M652 341 668 345 677 344 685 351 682 362 687 374 677 382 677 382 666 389 659 405 644 407 640 413 623 410 621 402 593 404 605 396 613 383 636 375 631 365 620 363C620 361 620 358 620 356L633 358 639 352 647 350 652 341Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path27" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(633 380)"
            id="text121">多摩市</text>
        </g>
        <g
          id="g192">
          <path
            d="M685 353 683 362 687 374 678 382 679 389 693 396 700 411 722 414 721 402 712 398 725 388 743 379 748 366 746 359 736 351 728 355 721 351 703 349 685 353Z"
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
            transform="translate(692 378)"
            id="text122">稲城市</text>
        </g>
        <g
          id="g152">
          <path
            d="M576 297 572 301 572 314 566 324 551 339 552 350 572 362 595 367 622 355 632 358 640 353 647 351 653 341 645 334 638 322 624 314 620 307 606 306 599 298 576 297Z"
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
            transform="translate(579 340)"
            id="text125">日野市</text>
        </g>
        <g
          id="g153">
          <path
            d="M635 279 649 288 665 285 670 292 665 299 665 312 660 323 638 323 623 316 620 307 626 297 637 298 632 282 635 279Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path25" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="13"
            transform="translate(625 308)"
            id="text126">国立市</text>
        </g>
        <g
          id="g165">
          <path
            d="M764 215 775 208 784 210 797 200 803 208 800 232 800 254 791 259 785 256 770 267 756 269 751 260 741 245 749 235 740 228 758 229 764 215Z"
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
            transform="translate(745 246)"
            id="text98">西東京市</text>
        </g>
        <g
          id="g176">
          <path
            d="M935 228 935 228 933 244 938 255 957 257 962 253 969 269 983 266 987 253 1003 251 1005 244 1015 239 1011 230 998 230 993 224 984 232 981 225 972 220 965 231 953 227 947 230 935 228Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path43" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(952 247)"
            id="text127">豊島区</text>
        </g>
        <g
          id="g168">
          <path
            d="M948 170 953 150 967 163 985 164 991 169 1006 164 1008 172 1003 180 1008 195 1028 190 1029 198 1016 205 1022 212 1018 215 1029 225 1039 232 1034 242 1015 240 1011 230 997 228 993 223 985 232 980 224 984 212 965 198 959 176 948 170Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path48" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(976 202)"
            id="text128">北区</text>
        </g>
        <g
          id="g172">
          <path
            d="M1023 212 1050 212 1064 213 1060 222 1069 231 1093 232 1088 247 1073 247 1067 242 1056 252 1040 249 1028 241 1035 240 1038 234 1019 215 1023 212Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path51" />
          <g
            id="g171">
            <text
              font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
              font-weight="700"
              font-size="13"
              transform="translate(1041 239)"
              id="text129">荒川区</text>
          </g>
        </g>
        <g
          id="g174">
          <path
            d="M1102 227 1112 244 1130 259 1123 262 1125 272 1119 283 1104 275 1101 294 1093 297 1082 303 1064 297 1076 269 1090 247 1092 232 1102 227Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path53" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="13"
            transform="translate(1083 269)"
            id="text131">墨田区</text>
        </g>
        <g
          id="g175">
          <path
            d="M1013 240 1030 242 1039 248 1034 256 1039 265 1038 272 1043 280 1034 287 1019 280 1011 281 1010 273 990 273 984 265 986 254 1003 250C1006 247 1006 242 1013 240Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path52" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="13"
            transform="translate(994 267)"
            id="text132">文京区</text>
        </g>
        <g
          id="g185">
          <path
            d="M928 333 943 334 957 355C962 362 958 358 964 362 966 363 968 365 968 365L973 364 978 369 970 385 954 386 959 397 949 407 937 401 937 410 932 413 930 408 909 407 916 393 910 376 917 376 935 384 939 360 928 333Z"
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
            transform="translate(934 379)"
            id="text133">目黒区</text>
        </g>
        <g
          id="g161">
          <path
            d="M712 214 713 206 719 204 720 196 728 203 745 193 758 192 778 182 774 209 764 215 758 229 741 229 728 234 727 223 709 228 702 223 702 214 712 214Z"
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
            transform="translate(712 217)"
            id="text97">東久留米市</text>
        </g>
        <g
          id="g164">
          <path
            d="M757 268 757 268 758 274 759 283 765 290 778 293 783 285 778 276 786 278 797 287 810 289 812 280 822 297 828 297 830 285 835 282 829 273 821 268 801 255 792 259 786 257 771 267 757 268Z"
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
            transform="translate(769 275)"
            id="text124">武蔵野市</text>
        </g>
        <g
          id="g181">
          <path
            d="M1056 293 1065 295 1070 307 1060 321 1065 334 1063 344 1071 356 1055 366 1049 363 1062 354 1058 343 1044 355 1028 342 1032 337 1030 325 1041 313 1041 296 1056 293Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path56" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="12"
            transform="translate(1032 336)"
            id="text134">中央区</text>
        </g>
        <g
          id="g179">
          <path
            d="M1012 282 995 302 993 311 998 314 1009 322 1030 327 1042 311 1042 297 1056 292 1047 281 1043 281 1035 286 1020 280 1012 282Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path55" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="12"
            transform="translate(997 307)"
            id="text116">千代田区</text>
        </g>
        <g
          id="g199">
          <path
            d="M96 492 94 501 99 509 96 517 111 524 119 509 114 496 96 492Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path59" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(119 514)"
            id="text135">大島町</text>
        </g>
        <g
          id="g206">
          <path
            d="M702 276 715 264 723 268 731 260 748 260 751 261 756 270 757 276 760 287 760 296 749 301 744 300 736 291 736 296 733 303 715 305 706 295 709 284 702 276Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path32" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="13"
            transform="translate(706 285)"
            id="text101">小金井市</text>
        </g>
        <g
          id="g200">
          <path
            d="M76 544 72 537 77 531 81 538 76 544Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path60" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(82 542)"
            id="text136">利島村</text>
        </g>
        <g
          id="g201">
          <path
            d="M80 556 69 567 74 581 78 573 79 563 80 556Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path61" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(82 574)"
            id="text138">新島村</text>
        </g>
        <g
          id="g202">
          <path
            d="M46 597 44 610 44 610 51 606 56 606 46 597Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path62" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(55 608)"
            id="text139">神津島村</text>
        </g>
        <g
          id="g203">
          <path
            d="M131 622 128 631 123 634 127 642 134 644 146 634 143 624 131 622Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path63" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(147 634)"
            id="text140">三宅村</text>
        </g>
        <g
          id="g173">
          <path
            d="M1039 249 1057 252 1069 242 1073 246 1090 246 1085 260 1079 267 1065 297 1055 291 1046 282 1041 280 1038 270 1037 262 1034 255 1039 249Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path54" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="13"
            transform="translate(1039 271)"
            id="text130">台東区</text>
        </g>
        <g
          id="g204">
          <path
            d="M151 649 147 656 153 662 157 662 160 652 151 649Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path64" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(136 680)"
            id="text141">御蔵島村</text>
        </g>
        <path
          d="M264 522 272 528 274 534 266 534 259 524ZM292 513 303 520 311 524 314 525 324 525 331 537 332 546 326 553 322 562 318 558 303 555 301 546 298 541 290 542 284 533 283 518Z"
          stroke="#FFFFFF"
          stroke-width="2"
          stroke-miterlimit="8"
          fill="#10B981"
          fill-rule="evenodd"
          id="path65" />
        <text
          font-family="'Noto Sans JP Bold', 'Noto Sans JP Bold_MSFontService', sans-serif"
          font-weight="700"
          font-size="14px"
          id="text142"
          x="310"
          y="536">八丈町</text>
        <g
          id="g197" />
        <g
          id="g198">
          <path
            d="M289 621 290 630 298 634 304 630 302 623C298 622 295 620 289 621Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path66" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(305 633)"
            id="text143">青ヶ島村</text>
        </g>
        <g
          id="g196">
          <path
            d="M535 675C537 675 538 677 540 677L536 681 532 675C534 675 534 675 535 675ZM456 602 460 607 468 607 466 612 472 613 469 618 471 622 475 620 479 625 472 629 477 635 479 640 474 644 470 635 462 628 464 625 463 617 458 614ZM497 519 502 520 503 527 494 525ZM473 504 479 504 483 510 480 516 481 523 491 528 493 533 486 536 491 540 491 547 494 554 492 554 489 560 486 559 473 561 477 556 476 549 482 542 475 538 484 536 472 531 477 532 484 530 477 525 479 522 476 516 476 509Z"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-miterlimit="8"
            fill="#10B981"
            fill-rule="evenodd"
            id="path67" />
          <text
            font-family="Noto Sans JP Bold,Noto Sans JP Bold_MSFontService,sans-serif"
            font-weight="700"
            font-size="14"
            transform="translate(449 588)"
            id="text144">小笠原村</text>
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

export default Tokyo;
