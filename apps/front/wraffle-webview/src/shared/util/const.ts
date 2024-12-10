export const TITLE_LIMIT = 40;
export const TAG_LIMIT = 9;
export const PRICE_LIMIT = 11; // 쉼표까지 포함하여 억단위까지
export const ETC_LIMIT = 400;
export const WINNER_LIMIT = 3; // 3자리

export const ACCESS_TOKEN_EXPIRES_IN = 604800; // 7 Day

export const ERROR_STATUS = {
  NON_EXISTENT_ACCOUNT: {
    code: 'A007',
    message: '존재하지 않는 계정입니다.',
  },
  MISMATCHED_PASSWORD: {
    code: 'A012',
    message: '비밀번호가 일치하지 않습니다.',
  },
};
