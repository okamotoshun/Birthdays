////Formで使う関数

// 今年を表す関数
const time = new Date();
export const thisYear = time.getFullYear();
// console.log(thisYear);

export const years = [];
for (let i = thisYear - 100; i < thisYear + 1; i++) {
  years.push({ id: i, name: i, value: `${i}` });
}


export const months = [];
for (let i = 1; i < 12 + 1; i++) {
  if (i < 10) {
    months.push({ id: i, name: i, value: `0${i}` });
  } else {
    months.push({ id: i, name: i, value: `${i}` });
  }
}


export const days = [];
for (let i = 1; i < 31 + 1; i++) {
  if (i < 10) {
    days.push({ id: i, name: i, value: `0${i}` });
  }
  if (9 < i) {
    days.push({ id: i, name: i, value: `${i}` });
  }
}

// イメージカラーリスト(追加予定)
export const colors = [
  { id: 1, name: 'ブラック', value: 'black', textColor: 'white' },
  { id: 2, name: 'ブルー', value: '#3788D8' },
  { id: 3, name: 'オレンジ', value: '#F39803' },
  { id: 4, name: 'レッド', value: '#E60114' },
  { id: 5, name: 'パープル', value: '#920783' },
  { id: 6, name: 'イエロー', value: '#FEEF55' },
  { id: 7, name: 'ピンク', value: '#F8C1D8' },
];
