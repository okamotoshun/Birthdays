// あなたの誕生日
export function getAge(year, month, day) {
  const yourBirthDay = {
    year: year,
    month: month,
    day: day,
  };

  // Dateインスタンスに変換
  const birthDate = new Date(
    yourBirthDay.year,
    yourBirthDay.month - 1,
    yourBirthDay.day
  );

  // 文字列に分解
  const y2 = birthDate.getFullYear().toString().padStart(4, '0');
  const m2 = (birthDate.getMonth() + 1).toString().padStart(2, '0');
  const d2 = birthDate.getDate().toString().padStart(2, '0');

  // 今日の日付
  const today = new Date();
  const y1 = today.getFullYear().toString().padStart(4, '0');
  const m1 = (today.getMonth() + 1).toString().padStart(2, '0');
  const d1 = today.getDate().toString().padStart(2, '0');

  // 引き算
  const age = Math.floor((Number(y1 + m1 + d1) - Number(y2 + m2 + d2)) / 10000);
  return age;
}
