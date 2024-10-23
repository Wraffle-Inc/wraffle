export const getTypeText = (type: 'event' | 'raffle') => {
  const texts = {
    raffle: {
      titleStep: '래플을 생성해볼까요?',
      placeholder: '래플 제목을 입력해주세요',
      dateStep: '래플 일정은 어떻게 되나요?',
      successWithReview: '래플 생성 요청이<br /> 정상적으로 전달되었어요!',
      successWithReviewButton: '다른 래플 구경하기',
      successWithoutReview: '래플이 생성되었어요',
      successWithoutReviewButton: '방금 생성한 래플 확인하러가기',
    },
    event: {
      titleStep: '이벤트를 생성해볼까요?',
      placeholder: '이벤트 제목을 입력해주세요',
      dateStep: '이벤트 일정은 어떻게 되나요?',
      successWithReview: '이벤트 생성 요청이<br /> 정상적으로 전달되었어요!',
      successWithReviewButton: '다른 이벤트 구경하기',
      successWithoutReview: '이벤트가 생성되었어요',
      successWithoutReviewButton: '방금 생성한 이벤트 확인하러가기',
    },
  };
  return texts[type];
};
