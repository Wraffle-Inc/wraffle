import dayjs from 'dayjs';

export const formatDate = (
  dateString: string,
  format: string = 'M월 D일 HH:mm:ss',
): string => {
  return dayjs(dateString).format(format);
};

/*
  사용 예시
  formatDate("2021-08-05T00:00:00.000Z"); // 기본 포맷: "8월 5일 00:00:00"
  formatDate("2021-08-05T00:00:00.000Z", "YYYY.MM.DD HH:mm"); // "2021.08.05 00:00"
  formatDate("2021-08-05T00:00:00.000Z", "YYYY-MM-DD"); // "2021-08-05"
 */
