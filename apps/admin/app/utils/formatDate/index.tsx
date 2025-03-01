/**
 * ISO 형식의 날짜 문자열을 'YYYY.MM.DD' 포맷으로 변환합니다.
 *
 * @param {string} dateStr - ISO 형식의 날짜 문자열 (예: '2025-03-01T00:00:00.000Z')
 * @returns {string} 변환된 날짜 문자열 (예: '2025.03.01')
 */
function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default formatDate;
