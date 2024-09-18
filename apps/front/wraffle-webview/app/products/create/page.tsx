'use client';

import {useState} from 'react';
import {Header} from '@/shared/ui/header/core/Header';
import {Step1, Step2, Step3, Step4} from '@/widgets/product-image-list';
import {Button, Typography} from '@wraffle/ui';

export default function CreatePage() {
  const [step, setStep] = useState(1);

  const goNextStep = () => setStep(step + 1);
  const goPrevStep = () => setStep(step - 1);

  return (
    <>
      <Header>
        <Header.BackButton onClick={goPrevStep} />
      </Header>
      <div className={'h-1 w-full bg-[#F2F2F2]'}>
        <div
          style={{
            width: `${(step / 4) * 100}%`,
          }}
          className={'transition-width h-1 bg-black duration-150'}
        ></div>
      </div>
      <Typography>래플을 생성해볼까요?</Typography>
      <Typography>기본 정보를 입력해주세요</Typography>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}

      <Button onClick={goNextStep}>다음</Button>
    </>
  );
}
