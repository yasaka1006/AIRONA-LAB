import { useState, useRef, useEffect } from 'react';
import Timer from '../assets/Timer';

const gameid = 'element';

const Element = () => {

  const initialElements = [
    // 第1周期
    { id: 1, symbol: 'H', name: ['水素', 'すいそ', 'Hydrogen'], atomicNumber: 1, atomicMass: 1.008, color: 'cyan', column: 1, row: 1, correct: false },
    { id: 2, symbol: 'He', name: ['ヘリウム', 'へりうむ', 'Helium'], atomicNumber: 2, atomicMass: 4.0026, color: 'blue', column: 18, row: 1, correct: false },

    // 第2周期
    { id: 3, symbol: 'Li', name: ['リチウム', 'りちうむ', 'Lithium'], atomicNumber: 3, atomicMass: 6.94, color: 'orange', column: 1, row: 2, correct: false },
    { id: 4, symbol: 'Be', name: ['ベリリウム', 'べりりうむ', 'Beryllium'], atomicNumber: 4, atomicMass: 9.0122, color: 'gold', column: 2, row: 2, correct: false },
    { id: 5, symbol: 'B', name: ['ホウ素', 'ほうそ', 'Boron'], atomicNumber: 5, atomicMass: 10.81, color: 'lime', column: 13, row: 2, correct: false },
    { id: 6, symbol: 'C', name: ['炭素', 'たんそ', 'Carbon'], atomicNumber: 6, atomicMass: 12.011, color: 'cyan', column: 14, row: 2, correct: false },
    { id: 7, symbol: 'N', name: ['窒素', 'ちっそ', 'Nitrogen'], atomicNumber: 7, atomicMass: 14.007, color: 'cyan', column: 15, row: 2, correct: false },
    { id: 8, symbol: 'O', name: ['酸素', 'さんそ', 'Oxygen'], atomicNumber: 8, atomicMass: 15.999, color: 'cyan', column: 16, row: 2, correct: false },
    { id: 9, symbol: 'F', name: ['フッ素', 'ふっそ', 'Fluorine'], atomicNumber: 9, atomicMass: 18.998, color: 'lightblue', column: 17, row: 2, correct: false },
    { id: 10, symbol: 'Ne', name: ['ネオン', 'ねおん', 'Neon'], atomicNumber: 10, atomicMass: 20.180, color: 'blue', column: 18, row: 2, correct: false },

    // 第3周期
    { id: 11, symbol: 'Na', name: ['ナトリウム', 'なとりうむ', 'Sodium'], atomicNumber: 11, atomicMass: 22.990, color: 'orange', column: 1, row: 3, correct: false },
    { id: 12, symbol: 'Mg', name: ['マグネシウム', 'まぐねしうむ', 'Magnesium'], atomicNumber: 12, atomicMass: 24.305, color: 'gold', column: 2, row: 3, correct: false },
    { id: 13, symbol: 'Al', name: ['アルミニウム', 'あるみにうむ', 'Aluminium'], atomicNumber: 13, atomicMass: 26.982, color: 'lime', column: 13, row: 3, correct: false },
    { id: 14, symbol: 'Si', name: ['ケイ素', 'けいそ', 'Silicon'], atomicNumber: 14, atomicMass: 28.085, color: 'green', column: 14, row: 3, correct: false },
    { id: 15, symbol: 'P', name: ['リン', 'りん', 'Phosphorus'], atomicNumber: 15, atomicMass: 30.974, color: 'cyan', column: 15, row: 3, correct: false },
    { id: 16, symbol: 'S', name: ['硫黄', 'いおう', 'Sulfur'], atomicNumber: 16, atomicMass: 32.06, color: 'cyan', column: 16, row: 3, correct: false },
    { id: 17, symbol: 'Cl', name: ['塩素', 'えんそ', 'Chlorine'], atomicNumber: 17, atomicMass: 35.45, color: 'lightblue', column: 17, row: 3, correct: false },
    { id: 18, symbol: 'Ar', name: ['アルゴン', 'あるごん', 'Argon'], atomicNumber: 18, atomicMass: 39.948, color: 'blue', column: 18, row: 3, correct: false },

    // 第4周期
    { id: 19, symbol: 'K', name: ['カリウム', 'かりうむ', 'Potassium'], atomicNumber: 19, atomicMass: 39.098, column: 1, row: 4, color: 'orange', correct: false },
    { id: 20, symbol: 'Ca', name: ['カルシウム', 'かるしうむ', 'Calcium'], atomicNumber: 20, atomicMass: 40.078, column: 2, row: 4, color: 'gold', correct: false },
    { id: 21, symbol: 'Sc', name: ['スカンジウム', 'すかんじうむ', 'Scandium'], atomicNumber: 21, atomicMass: 44.956, column: 3, row: 4, color: 'yellow', correct: false },
    { id: 22, symbol: 'Ti', name: ['チタン', 'ちたん', 'Titanium'], atomicNumber: 22, atomicMass: 47.867, column: 4, row: 4, color: 'yellow', correct: false },
    { id: 23, symbol: 'V', name: ['バナジウム', 'ばなじうむ', 'Vanadium'], atomicNumber: 23, atomicMass: 50.942, column: 5, row: 4, color: 'yellow', correct: false },
    { id: 24, symbol: 'Cr', name: ['クロム', 'くろむ', 'Chromium'], atomicNumber: 24, atomicMass: 51.996, column: 6, row: 4, color: 'yellow', correct: false },
    { id: 25, symbol: 'Mn', name: ['マンガン', 'まんがん', 'Manganese'], atomicNumber: 25, atomicMass: 54.938, column: 7, row: 4, color: 'yellow', correct: false },
    { id: 26, symbol: 'Fe', name: ['鉄', 'てつ', 'Iron'], atomicNumber: 26, atomicMass: 55.845, column: 8, row: 4, color: 'yellow', correct: false },
    { id: 27, symbol: 'Co', name: ['コバルト', 'こばると', 'Cobalt'], atomicNumber: 27, atomicMass: 58.933, column: 9, row: 4, color: 'yellow', correct: false },
    { id: 28, symbol: 'Ni', name: ['ニッケル', 'にっける', 'Nickel'], atomicNumber: 28, atomicMass: 58.693, column: 10, row: 4, color: 'yellow', correct: false },
    { id: 29, symbol: 'Cu', name: ['銅', 'どう', 'Copper'], atomicNumber: 29, atomicMass: 63.546, column: 11, row: 4, color: 'yellow', correct: false },
    { id: 30, symbol: 'Zn', name: ['亜鉛', 'あえん', 'Zinc'], atomicNumber: 30, atomicMass: 65.38, column: 12, row: 4, color: 'yellow', correct: false },
    { id: 31, symbol: 'Ga', name: ['ガリウム', 'がりうむ', 'Gallium'], atomicNumber: 31, atomicMass: 69.723, column: 13, row: 4, color: 'lime', correct: false },
    { id: 32, symbol: 'Ge', name: ['ゲルマニウム', 'げるまにうむ', 'Germanium'], atomicNumber: 32, atomicMass: 72.63, column: 14, row: 4, color: 'green', correct: false },
    { id: 33, symbol: 'As', name: ['ヒ素', 'ひそ', 'Arsenic'], atomicNumber: 33, atomicMass: 74.922, column: 15, row: 4, color: 'green', correct: false },
    { id: 34, symbol: 'Se', name: ['セレン', 'せれん', 'Selenium'], atomicNumber: 34, atomicMass: 78.96, column: 16, row: 4, color: 'cyan', correct: false },
    { id: 35, symbol: 'Br', name: ['臭素', 'しゅうそ', 'Bromine'], atomicNumber: 35, atomicMass: 79.904, column: 17, row: 4, color: 'lightblue', correct: false },
    { id: 36, symbol: 'Kr', name: ['クリプトン', 'くりぷとん', 'Krypton'], atomicNumber: 36, atomicMass: 83.798, column: 18, row: 4, color: 'blue', correct: false },

    // 第5周期
    { id: 37, symbol: 'Rb', name: ['ルビジウム', 'るびじうむ', 'Rubidium'], atomicNumber: 37, atomicMass: 85.468, color: 'orange', column: 1, row: 5, correct: false },
    { id: 38, symbol: 'Sr', name: ['ストロンチウム', 'すとろんちうむ', 'Strontium'], atomicNumber: 38, atomicMass: 87.62, color: 'gold', column: 2, row: 5, correct: false },
    { id: 39, symbol: 'Y', name: ['イットリウム', 'いっとりうむ', 'Yttrium'], atomicNumber: 39, atomicMass: 88.906, color: 'yellow', column: 3, row: 5, correct: false },
    { id: 40, symbol: 'Zr', name: ['ジルコニウム', 'じるこにうむ', 'Zirconium'], atomicNumber: 40, atomicMass: 91.224, color: 'yellow', column: 4, row: 5, correct: false },
    { id: 41, symbol: 'Nb', name: ['ニオブ', 'におぶ', 'Niobium'], atomicNumber: 41, atomicMass: 92.906, color: 'yellow', column: 5, row: 5, correct: false },
    { id: 42, symbol: 'Mo', name: ['モリブデン', 'もりぶでん', 'Molybdenum'], atomicNumber: 42, atomicMass: 95.95, color: 'yellow', column: 6, row: 5, correct: false },
    { id: 43, symbol: 'Tc', name: ['テクネチウム', 'てくねちうむ', 'Technetium'], atomicNumber: 43, atomicMass: 98, color: 'yellow', column: 7, row: 5, correct: false },
    { id: 44, symbol: 'Ru', name: ['ルテニウム', 'るてにうむ', 'Ruthenium'], atomicNumber: 44, atomicMass: 101.07, color: 'yellow', column: 8, row: 5, correct: false },
    { id: 45, symbol: 'Rh', name: ['ロジウム', 'ろじうむ', 'Rhodium'], atomicNumber: 45, atomicMass: 102.91, color: 'yellow', column: 9, row: 5, correct: false },
    { id: 46, symbol: 'Pd', name: ['パラジウム', 'ぱらじうむ', 'Palladium'], atomicNumber: 46, atomicMass: 106.42, color: 'yellow', column: 10, row: 5, correct: false },
    { id: 47, symbol: 'Ag', name: ['銀', 'ぎん', 'Silver'], atomicNumber: 47, atomicMass: 107.87, color: 'yellow', column: 11, row: 5, correct: false },
    { id: 48, symbol: 'Cd', name: ['カドミウム', 'かどみうむ', 'Cadmium'], atomicNumber: 48, atomicMass: 112.41, color: 'yellow', column: 12, row: 5, correct: false },
    { id: 49, symbol: 'In', name: ['インジウム', 'いんじうむ', 'Indium'], atomicNumber: 49, atomicMass: 114.82, color: 'lime', column: 13, row: 5, correct: false },
    { id: 50, symbol: 'Sn', name: ['スズ', 'すず', 'Tin'], atomicNumber: 50, atomicMass: 118.71, color: 'lime', column: 14, row: 5, correct: false },
    { id: 51, symbol: 'Sb', name: ['アンチモン', 'あんちもん', 'Antimony'], atomicNumber: 51, atomicMass: 121.76, color: 'green', column: 15, row: 5, correct: false },
    { id: 52, symbol: 'Te', name: ['テルル', 'てるる', 'Tellurium'], atomicNumber: 52, atomicMass: 127.6, color: 'green', column: 16, row: 5, correct: false },
    { id: 53, symbol: 'I', name: ['ヨウ素', 'ようそ', 'Iodine'], atomicNumber: 53, atomicMass: 126.9, color: 'lightblue', column: 17, row: 5, correct: false },
    { id: 54, symbol: 'Xe', name: ['キセノン', 'きせのん', 'Xenon'], atomicNumber: 54, atomicMass: 131.29, color: 'blue', column: 18, row: 5, correct: false },

    // 第6周期
    { id: 55, symbol: 'Cs', name: ['セシウム', 'せしうむ', 'Caesium'], atomicNumber: 55, atomicMass: 132.91, color: 'orange', column: 1, row: 6, correct: false },
    { id: 56, symbol: 'Ba', name: ['バリウム', 'ばりうむ', 'Barium'], atomicNumber: 56, atomicMass: 137.33, color: 'gold', column: 2, row: 6, correct: false },
    { id: 72, symbol: 'Hf', name: ['ハフニウム', 'はふにうむ', 'Hafnium'], atomicNumber: 72, atomicMass: 178.49, color: 'yellow', column: 4, row: 6, correct: false },
    { id: 73, symbol: 'Ta', name: ['タンタル', 'たんたる', 'Tantalum'], atomicNumber: 73, atomicMass: 180.95, color: 'yellow', column: 5, row: 6, correct: false },
    { id: 74, symbol: 'W', name: ['タングステン', 'たんぐすてん', 'Tungsten'], atomicNumber: 74, atomicMass: 183.84, color: 'yellow', column: 6, row: 6, correct: false },
    { id: 75, symbol: 'Re', name: ['レニウム', 'れにうむ', 'Rhenium'], atomicNumber: 75, atomicMass: 186.21, color: 'yellow', column: 7, row: 6, correct: false },
    { id: 76, symbol: 'Os', name: ['オスミウム', 'おすみうむ', 'Osmium'], atomicNumber: 76, atomicMass: 190.23, color: 'yellow', column: 8, row: 6, correct: false },
    { id: 77, symbol: 'Ir', name: ['イリジウム', 'いりじうむ', 'Iridium'], atomicNumber: 77, atomicMass: 192.22, color: 'yellow', column: 9, row: 6, correct: false },
    { id: 78, symbol: 'Pt', name: ['白金', 'はっきん', 'Platinum'], atomicNumber: 78, atomicMass: 195.08, color: 'yellow', column: 10, row: 6, correct: false },
    { id: 79, symbol: 'Au', name: ['金', 'きん', 'Gold'], atomicNumber: 79, atomicMass: 196.97, color: 'yellow', column: 11, row: 6, correct: false },
    { id: 80, symbol: 'Hg', name: ['水銀', 'すいぎん', 'Mercury'], atomicNumber: 80, atomicMass: 200.59, color: 'yellow', column: 12, row: 6, correct: false },
    { id: 81, symbol: 'Tl', name: ['タリウム', 'たりうむ', 'Thallium'], atomicNumber: 81, atomicMass: 204.38, color: 'lime', column: 13, row: 6, correct: false },
    { id: 82, symbol: 'Pb', name: ['鉛', 'なまり', 'Lead'], atomicNumber: 82, atomicMass: 207.2, color: 'lime', column: 14, row: 6, correct: false },
    { id: 83, symbol: 'Bi', name: ['ビスマス', 'びすます', 'Bismuth'], atomicNumber: 83, atomicMass: 208.98, color: 'lime', column: 15, row: 6, correct: false },
    { id: 84, symbol: 'Po', name: ['ポロニウム', 'ぽろにうむ', 'Polonium'], atomicNumber: 84, atomicMass: 209, color: 'green', column: 16, row: 6, correct: false },
    { id: 85, symbol: 'At', name: ['アスタチン', 'あすたちん', 'Astatine'], atomicNumber: 85, atomicMass: 210, color: 'lightblue', column: 17, row: 6, correct: false },
    { id: 86, symbol: 'Rn', name: ['ラドン', 'らどん', 'Radon'], atomicNumber: 86, atomicMass: 222, color: 'blue', column: 18, row: 6, correct: false },

    // 第7周期
    { id: 87, symbol: 'Fr', name: ['フランシウム', 'ふらんしうむ', 'Francium'], atomicNumber: 87, atomicMass: 223, color: 'orange', column: 1, row: 7, correct: false },
    { id: 88, symbol: 'Ra', name: ['ラジウム', 'らじうむ', 'Radium'], atomicNumber: 88, atomicMass: 226, color: 'gold', column: 2, row: 7, correct: false },
    { id: 104, symbol: 'Rf', name: ['ラザホージウム', 'らざほーじうむ', 'Rutherfordium'], atomicNumber: 104, atomicMass: 267, color: 'yellow', column: 4, row: 7, correct: false },
    { id: 105, symbol: 'Db', name: ['ドブニウム', 'どぶにうむ', 'Dubnium'], atomicNumber: 105, atomicMass: 268, color: 'yellow', column: 5, row: 7, correct: false },
    { id: 106, symbol: 'Sg', name: ['シーボーギウム', 'しーぼーぎうむ', 'Seaborgium'], atomicNumber: 106, atomicMass: 269, color: 'yellow', column: 6, row: 7, correct: false },
    { id: 107, symbol: 'Bh', name: ['ボーリウム', 'ぼーりうむ', 'Bohrium'], atomicNumber: 107, atomicMass: 270, color: 'yellow', column: 7, row: 7, correct: false },
    { id: 108, symbol: 'Hs', name: ['ハッシウム', 'はっしうむ', 'Hassium'], atomicNumber: 108, atomicMass: 269, color: 'yellow', column: 8, row: 7, correct: false },
    { id: 109, symbol: 'Mt', name: ['マイトネリウム', 'まいとねりうむ', 'Meitnerium'], atomicNumber: 109, atomicMass: 278, color: 'yellow', column: 9, row: 7, correct: false },
    { id: 110, symbol: 'Ds', name: ['ダームスタチウム', 'だーむすたちうむ', 'Darmstadtium'], atomicNumber: 110, atomicMass: 281, color: 'yellow', column: 10, row: 7, correct: false },
    { id: 111, symbol: 'Rg', name: ['レントゲニウム', 'れんとげにうむ', 'Roentgenium'], atomicNumber: 111, atomicMass: 282, color: 'yellow', column: 11, row: 7, correct: false },
    { id: 112, symbol: 'Cn', name: ['コペルニシウム', 'こぺるにしうむ', 'Copernicium'], atomicNumber: 112, atomicMass: 285, color: 'yellow', column: 12, row: 7, correct: false },
    { id: 113, symbol: 'Nh', name: ['ニホニウム', 'にほにうむ', 'Nihonium'], atomicNumber: 113, atomicMass: 286, color: 'lime', column: 13, row: 7, correct: false },
    { id: 114, symbol: 'Fl', name: ['フレロビウム', 'ふれろびうむ', 'Flerovium'], atomicNumber: 114, atomicMass: 289, color: 'lime', column: 14, row: 7, correct: false },
    { id: 115, symbol: 'Mc', name: ['モスコビウム', 'もすこびうむ', 'Moscovium'], atomicNumber: 115, atomicMass: 290, color: 'lime', column: 15, row: 7, correct: false },
    { id: 116, symbol: 'Lv', name: ['リバモリウム', 'りばもりうむ', 'Livermorium'], atomicNumber: 116, atomicMass: 293, color: 'lime', column: 16, row: 7, correct: false },
    { id: 117, symbol: 'Ts', name: ['テネシン', 'てねしん', 'Tennessine'], atomicNumber: 117, atomicMass: 294, color: 'lightblue', column: 17, row: 7, correct: false },
    { id: 118, symbol: 'Og', name: ['オガネソン', 'おがねそん', 'Oganesson'], atomicNumber: 118, atomicMass: 294, color: 'blue', column: 18, row: 7, correct: false },

    // ランタノイド (row 9 に配置)
    { id: 57, symbol: 'La', name: ['ランタン', 'らんたん', 'Lanthanum'], atomicNumber: 57, atomicMass: 138.91, color: 'pink', column: 3, row: 9, correct: false },
    { id: 58, symbol: 'Ce', name: ['セリウム', 'せりうむ', 'Cerium'], atomicNumber: 58, atomicMass: 140.12, color: 'pink', column: 4, row: 9, correct: false },
    { id: 59, symbol: 'Pr', name: ['プラセオジム', 'ぷらせおじむ', 'Praseodymium'], atomicNumber: 59, atomicMass: 140.91, color: 'pink', column: 5, row: 9, correct: false },
    { id: 60, symbol: 'Nd', name: ['ネオジム', 'ねおじむ', 'Neodymium'], atomicNumber: 60, atomicMass: 144.24, color: 'pink', column: 6, row: 9, correct: false },
    { id: 61, symbol: 'Pm', name: ['プロメチウム', 'ぷろめちうむ', 'Promethium'], atomicNumber: 61, atomicMass: 145, color: 'pink', column: 7, row: 9, correct: false },
    { id: 62, symbol: 'Sm', name: ['サマリウム', 'さまりうむ', 'Samarium'], atomicNumber: 62, atomicMass: 150.36, color: 'pink', column: 8, row: 9, correct: false },
    { id: 63, symbol: 'Eu', name: ['ユウロピウム', 'ゆうろぴうむ', 'Europium'], atomicNumber: 63, atomicMass: 151.96, color: 'pink', column: 9, row: 9, correct: false },
    { id: 64, symbol: 'Gd', name: ['ガドリニウム', 'がどりにうむ', 'Gadolinium'], atomicNumber: 64, atomicMass: 157.25, color: 'pink', column: 10, row: 9, correct: false },
    { id: 65, symbol: 'Tb', name: ['テルビウム', 'てるびうむ', 'Terbium'], atomicNumber: 65, atomicMass: 158.93, color: 'pink', column: 11, row: 9, correct: false },
    { id: 66, symbol: 'Dy', name: ['ジスプロシウム', 'じすぷろしうむ', 'Dysprosium'], atomicNumber: 66, atomicMass: 162.5, color: 'pink', column: 12, row: 9, correct: false },
    { id: 67, symbol: 'Ho', name: ['ホルミウム', 'ほるみうむ', 'Holmium'], atomicNumber: 67, atomicMass: 164.93, color: 'pink', column: 13, row: 9, correct: false },
    { id: 68, symbol: 'Er', name: ['エルビウム', 'えるびうむ', 'Erbium'], atomicNumber: 68, atomicMass: 167.26, color: 'pink', column: 14, row: 9, correct: false },
    { id: 69, symbol: 'Tm', name: ['ツリウム', 'つりうむ', 'Thulium'], atomicNumber: 69, atomicMass: 168.93, color: 'pink', column: 15, row: 9, correct: false },
    { id: 70, symbol: 'Yb', name: ['イッテルビウム', 'いってるびうむ', 'Ytterbium'], atomicNumber: 70, atomicMass: 173.05, color: 'pink', column: 16, row: 9, correct: false },
    { id: 71, symbol: 'Lu', name: ['ルテチウム', 'るてちうむ', 'Lutetium'], atomicNumber: 71, atomicMass: 174.97, color: 'pink', column: 17, row: 9, correct: false },

    // アクチノイド (row 10 に配置)
    { id: 89, symbol: 'Ac', name: ['アクチニウム', 'あくちにうむ', 'Actinium'], atomicNumber: 89, atomicMass: 227, color: 'purple', column: 3, row: 10, correct: false },
    { id: 90, symbol: 'Th', name: ['トリウム', 'とりうむ', 'Thorium'], atomicNumber: 90, atomicMass: 232.04, color: 'purple', column: 4, row: 10, correct: false },
    { id: 91, symbol: 'Pa', name: ['プロトアクチニウム', 'ぷろとあくちにうむ', 'Protactinium'], atomicNumber: 91, atomicMass: 231.04, color: 'purple', column: 5, row: 10, correct: false },
    { id: 92, symbol: 'U', name: ['ウラン', 'うらん', 'Uranium'], atomicNumber: 92, atomicMass: 238.03, color: 'purple', column: 6, row: 10, correct: false },
    { id: 93, symbol: 'Np', name: ['ネプツニウム', 'ねぷつにうむ', 'Neptunium'], atomicNumber: 93, atomicMass: 237, color: 'purple', column: 7, row: 10, correct: false },
    { id: 94, symbol: 'Pu', name: ['プルトニウム', 'ぷるとにうむ', 'Plutonium'], atomicNumber: 94, atomicMass: 244, color: 'purple', column: 8, row: 10, correct: false },
    { id: 95, symbol: 'Am', name: ['アメリシウム', 'あめりしうむ', 'Americium'], atomicNumber: 95, atomicMass: 243, color: 'purple', column: 9, row: 10, correct: false },
    { id: 96, symbol: 'Cm', name: ['キュリウム', 'きゅりうむ', 'Curium'], atomicNumber: 96, atomicMass: 247, color: 'purple', column: 10, row: 10, correct: false },
    { id: 97, symbol: 'Bk', name: ['バークリウム', 'ばーくりうむ', 'Berkelium'], atomicNumber: 97, atomicMass: 247, color: 'purple', column: 11, row: 10, correct: false },
    { id: 98, symbol: 'Cf', name: ['カリホルニウム', 'かりほるにうむ', 'Californium'], atomicNumber: 98, atomicMass: 251, color: 'purple', column: 12, row: 10, correct: false },
    { id: 99, symbol: 'Es', name: ['アインシュタイニウム', 'あいんしゅたいにうむ', 'Einsteinium'], atomicNumber: 99, atomicMass: 252, color: 'purple', column: 13, row: 10, correct: false },
    { id: 100, symbol: 'Fm', name: ['フェルミウム', 'ふぇるみうむ', 'Fermium'], atomicNumber: 100, atomicMass: 257, color: 'purple', column: 14, row: 10, correct: false },
    { id: 101, symbol: 'Md', name: ['メンデレビウム', 'めんでれびうむ', 'Mendelevium'], atomicNumber: 101, atomicMass: 258, color: 'purple', column: 15, row: 10, correct: false },
    { id: 102, symbol: 'No', name: ['ノーベリウム', 'のーべりうむ', 'Nobelium'], atomicNumber: 102, atomicMass: 259, color: 'purple', column: 16, row: 10, correct: false },
    { id: 103, symbol: 'Lr', name: ['ローレンシウム', 'ろーれんしうむ', 'Lawrencium'], atomicNumber: 103, atomicMass: 262, color: 'purple', column: 17, row: 10, correct: false },

    // 回答とは関係ない要素
    { id: 201, symbol: '57-71', name: '', atomicnumber: '', atomicMass: '', color: 'pink', column: 3, row: 6, correct: true },
    { id: 202, symbol: '89-103', name: '', atomicnumber: '', atomicMass: '', color: 'purple', column: 3, row: 7, correct: true },
  ];

  const actualColor = (color) => {
    switch (color) {
      case 'orange':
        return '#D49466'; // コーラルオレンジ
      case 'gold':
        return '#C9A961'; // アンバーゴールド
      case 'yellow':
        return '#B1B25B'; // マスタードイエロー
      case 'lime':
        return '#7A9D5F'; // オリーブグリーン
      case 'green':
        return '#5A8C6B'; // エメラルドグリーン
      case 'cyan':
        return '#5B9FAF'; // ティール
      case 'lightblue':
        return '#6B8FB8'; // スカイブルー
      case 'blue':
        return '#5A7BB0'; // スレートブルー
      case 'purple':
        return '#8B6FA3'; // ラベンダー
      case 'pink':
        return '#C08BA8'; // ローズ
      case 'gray':
        return '#6B7280'; // グレー

      default:
        return color; // カラーコードが直接指定されている場合はそのまま返す
    }
  }

  const correctSoundRef = useRef(new Audio('/audio/correct.mp3'));
  const wrongSoundRef = useRef(new Audio('/audio/wrong.mp3'));
  const startOrClearSoundRef = useRef(new Audio('/audio/start_or_clear.mp3'));
  const inputRef = useRef(null);

  const [elements, setElements] = useState(initialElements);
  const [input, setInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSurrenderModal, setShowSurrenderModal] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [clearTime, setClearTime] = useState('');
  const [rankingName, setRankingName] = useState('');
  const [showRankingInput, setShowRankingInput] = useState(false);
  const [isSubmittingRanking, setIsSubmittingRanking] = useState(false);

  const [status, setStatus] = useState('idle');

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const shareUrl = `https://x.com/intent/post?text=${encodeURIComponent(`周期表の元素全部言えるかな？を\n${clearTime}でクリアしました！\n`)}&url=https://airona-lab.com/element`


  const isStarted = status === 'started';
  const isCleared = status === 'cleared';
  const isSurrendered = status === 'surrendered';

  const playSound = (soundRef) => {
    soundRef.current.currentTime = 0;
    soundRef.current.play().catch(err => console.log('Audio play failed:', err));
  };

  const startGame = (e) => {
    // タイマーをリセット
    setResetTimer(true);
    setTimeout(() => setResetTimer(false), 0);
    setCurrentTime(0);
    setClearTime('');

    // 要素をリセット
    setElements(initialElements);
    setInput('');
    setStatus('started');
    playSound(startOrClearSoundRef);

    // 開始ボタンを押したらinputにフォーカス
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // デバッグ用: "allcomplete"と入力したら全問正解
    if (trimmedInput.toLowerCase() === 'allcomplete') {
      setElements(prevElements =>
        prevElements.map(el => {
          // nameが配列で空でない要素のみ正解にする（id: 201, 202は除外）
          if (el.id < 200 && Array.isArray(el.name) && el.name.length > 0) {
            return { ...el, correct: true };
          }
          return el;
        })
      );
      playSound(correctSoundRef);
      setInput('');
      return;
    }

    // まず、正解したかどうかをチェック
    const isCorrect = elements.some(el =>
      !el.correct &&
      Array.isArray(el.name) &&
      el.name.length > 0 &&
      el.name.some(name => name.toLowerCase() === trimmedInput.toLowerCase())
    );

    if (isCorrect) {
      setElements(prevElements =>
        prevElements.map(el => {
          // まだ未回答、かつnameが配列で空でない、かつ入力が名前（日本語、読み方、英語）のいずれかに一致するか判定
          if (!el.correct && Array.isArray(el.name) && el.name.length > 0 && el.name.some(name =>
            name.toLowerCase() === trimmedInput.toLowerCase()
          )) {
            return { ...el, correct: true };
          }
          return el;
        })
      );
      playSound(correctSoundRef);
      setInput(''); // 入力欄をクリア
    } else {
      playSound(wrongSoundRef);
    }
  };

  // 全要素正解チェック（id: 201, 202は除外）
  useEffect(() => {
    const correctCount = elements.filter(el =>
      el.correct && el.id < 200 && Array.isArray(el.name) && el.name.length > 0
    ).length;

    if (correctCount >= 118 && status === 'started') {
      // クリア時のタイムを保存
      setClearTime(formatTime(currentTime));
      setShowModal(true);
      setStatus('cleared');
      playSound(startOrClearSoundRef);
    }
  }, [elements, currentTime]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSurrender = () => {
    setShowSurrenderModal(false);
    setStatus('surrendered');
  };

  const openSurrenderModal = () => {
    setShowSurrenderModal(true);
  };

  const handleElementTooltip = (element) => {
    // nameが配列で空でない要素のみ表示（id: 201, 202は除外）
    if (element.id < 200 && Array.isArray(element.name) && element.name.length > 0) {
      setSelectedElement(element);
    }
  };

  const handleSubmitRanking = async () => {
    if (!rankingName.trim()) {
      alert('名前を入力してください');
      return;
    }

    setIsSubmittingRanking(true);
    try {
      // APIのベースURLを環境変数から取得、なければデフォルト値を使用
      const apiUrl = import.meta.env.VITE_RANKING_API_URL || '/api/ranking';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameid: 'element',
          user: rankingName.trim(),
          cleartime: currentTime, // 秒数で送信
        }),
      });

      if (response.ok) {
        alert('ランキングに登録しました！');
        setShowRankingInput(false);
        setRankingName('');
      } else {
        alert('ランキングの登録に失敗しました');
      }
    } catch (error) {
      console.error('Error submitting ranking:', error);
      alert('ランキングの登録に失敗しました');
    } finally {
      setIsSubmittingRanking(false);
    }
  };

  // 正解数を計算
  const correctCount = elements.filter(el =>
    el.correct && el.id < 200 && Array.isArray(el.name) && el.name.length > 0
  ).length;

  return (
    <>
      <section className="w-full max-w-full overflow-x-auto my-3 bg-white rounded-lg shadow mx-auto relative">

        <div className="items-center flex justify-center gap-5 lg:gap-13 text-md lg:text-2xl font-mono absolute top-7 lg:top-12 left-0 right-0">
          <div className="flex items-baseline">
            <p className="text-[8px] md:text-base text-slate-500 mr-2">正解数</p>
            <p className="text-[11px] md:text-2xl font-bold text-slate-600">{String(correctCount).padStart(2, '0')} / 118</p>
          </div>
          <div className="flex items-baseline">
            <p className="text-[8px] md:text-base text-slate-500 mr-2">経過時間</p>
            <p className="text-[11px] md:text-2xl font-bold text-red-500"><Timer isRunning={isStarted} reset={resetTimer} onTimeUpdate={setCurrentTime} /></p>
          </div>
        </div>

        <h1 className="text-lg lg:text-3xl font-bold text-center mt-1">周期表の元素全部言えるかな？</h1>
        <div
          style={{
            gridTemplateColumns: 'repeat(18, 1fr)'
          }}
          className="grid gap-[1px] md:gap-1 p-1 md:p-4 font-bold "
        >
          {elements.map((el) => (
            el.correct || isSurrendered ? (
              // 回答時
              <div
                key={el.id}
                style={{
                  gridColumn: el.column,
                  gridRow: el.row,
                  backgroundColor: actualColor(el.color),
                  marginTop: el.row === 9 ? '50%' : undefined
                }}
                onClick={() => handleElementTooltip(el)}
                className={`@container flex flex-col text-white rounded-[10%] shadow overflow-hidden aspect-[2/2.4] justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg select-none cursor-pointer ${isSurrendered && !el.correct ? 'opacity-60 border-1 border-red-700' : ''}`}
              >
                <div className="ml-[2px] lg:ml-[4px] text-[16cqw] lg:mb-[-12px] font-normal">
                  {el.atomicNumber}
                </div>
                <div className={`font-bold text-center ${el.id >= 201 && el.id <= 204 ? 'text-[30cqw]' : 'text-[50cqw]'} ${isSurrendered && !el.correct ? 'text-red-900' : ''}`}>
                  {el.symbol}
                </div>
                <div className="text-[15cqw] text-center hidden lg:block mt-[-4px]">
                  {el.atomicMass}
                </div>
                <div className={`${el.id === 91 || el.id === 99 ? 'text-[13cqw]' : 'text-[16cqw]'} text-center hidden lg:block ${isSurrendered && !el.correct ? 'text-red-900' : ''}`}>
                  {el.name[0]}
                </div>
              </div>

            ) : (
              // 未回答時
              <div
                key={el.id}
                style={{
                  gridColumn: el.column,
                  gridRow: el.row,
                  marginTop: el.row === 9 ? '50%' : undefined
                }}
                className={`@container flex flex-col text-white rounded-[10%] shadow overflow-hidden aspect-[2/2.4] justify-between bg-gray-300 select-none`}
              >
                <div className="ml-[2px] lg:ml-[4px] text-[16cqw] lg:mb-[-12px] font-normal">
                  {el.atomicNumber}
                </div>
                <div className={`font-bold text-center ${el.id >= 201 && el.id <= 204 ? 'text-[30cqw]' : 'text-[50cqw]'}`}>
                  ?
                </div>
                <div>
                </div>
              </div>

            )
          ))}
        </div>

        {/* 入力欄 */}


        <div className="flex justify-center mb-4 gap-1 lg:text-base h-8 md:h-14">
          <input
            ref={inputRef}
            type="text"
            className="border-2 border-gray-300 rounded-md px-2 focus:outline-none focus:border-blue-500 w-3/5 lg:w-1/3"
            placeholder={status === 'started' ? '元素名を入力してEnter' : status === 'surrendered' ? '右のボタンで再挑戦' : '開始を押してね'}
            disabled={status === 'idle' || isSurrendered || isCleared}
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />

          {status === 'idle' && (
            <button
              onClick={startGame}
              className="font-bold px-4 rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
            >
              開始
            </button>
          )}
          {isStarted && (
            <button
              onClick={handleSubmit}
              className="font-bold px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            >
              回答
            </button>
          )}
          {(isSurrendered || isCleared) && (
            <button
              onClick={startGame}
              className="font-bold px-4 rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
            >
              再挑戦
            </button>
          )}
          {isStarted && (
            <button
              onClick={openSurrenderModal}
              className="font-bold px-4 rounded-md bg-gray-500 text-white hover:bg-gray-600 cursor-pointer"
            >
              降参
            </button>
          )}
          {isCleared && (
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold px-4 rounded-md bg-cyan-500 text-white hover:bg-cyan-600 cursor-pointer flex items-center justify-center"
            >
              共有
            </a>
          )}
        </div>

      </section>

      {/* 完了モーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-4">おめでとうございます！</h2>
            <p className="text-center mb-6">
              全118元素を正解しました！
            </p>
            {clearTime && (
              <p className="text-center mb-4 text-lg font-semibold text-blue-600">
                クリアタイム: {clearTime}
              </p>
            )}
            
            {!showRankingInput ? (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowRankingInput(true)}
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 font-bold"
                >
                  ランキングに登録する
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold"
                >
                  閉じる
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    名前を入力してください
                  </label>
                  <input
                    type="text"
                    value={rankingName}
                    onChange={(e) => setRankingName(e.target.value)}
                    placeholder="あなたの名前"
                    className="w-full border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                    maxLength={20}
                    disabled={isSubmittingRanking}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSubmitRanking}
                    disabled={isSubmittingRanking || !rankingName.trim()}
                    className="flex-1 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmittingRanking ? '登録中...' : '登録する'}
                  </button>
                  <button
                    onClick={() => {
                      setShowRankingInput(false);
                      setRankingName('');
                    }}
                    disabled={isSubmittingRanking}
                    className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 降参確認モーダル */}
      {showSurrenderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-4">降参しますか？</h2>
            <p className="text-center mb-6">※解答が全て表示されます</p>
            <div className="flex justify-center gap-2">
              <button
                onClick={handleSurrender}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 font-bold">
                降参
              </button>
              <button
                onClick={() => setShowSurrenderModal(false)}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold">
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 元素情報モーダル */}
      {selectedElement && (
        <div
          className="fixed inset-0 bg-black/15 flex items-center justify-center z-50"
          onClick={() => setSelectedElement(null)}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="text-center mb-6 p-6 rounded-lg"
              style={{ backgroundColor: actualColor(selectedElement.color) }}
            >
              <div className="text-4xl font-bold text-white mb-2">
                {selectedElement.symbol}
              </div>
              <div className="text-xl text-white">
                {selectedElement.name[0]}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold text-gray-700">元素番号:</span>
                <span className="text-lg font-bold">{selectedElement.atomicNumber}</span>
              </div>

              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold text-gray-700">原子量:</span>
                <span className="text-lg font-bold">{selectedElement.atomicMass}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">読み:</span>
                <span className="text-sm text-gray-600 font-semibold">{selectedElement.name[1]}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">英語名:</span>
                <span className="text-sm text-gray-600 font-semibold">{selectedElement.name[2]}</span>
              </div>

            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => setSelectedElement(null)}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Element