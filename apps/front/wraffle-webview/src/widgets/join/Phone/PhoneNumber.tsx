import {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import type {JoinPayload} from '@/entities/auth/join/schema';
import useAutoFocus from '@/shared/hook/useAutoFocus';
import useInput from '@/shared/hook/useInput';
import {handleMaxLength} from '@/shared/util';
import {Button, InputField, Select, Typography} from '@wraffle/ui';

const MAX_INPUT_LENGTH = 4;

interface PhoneNumberProps {
  onNext(phoneNumber: string): void;
}

const PhoneNumber = ({onNext}: PhoneNumberProps) => {
  const {
    formState: {errors},
    setValue,
    getValues,
    trigger,
  } = useFormContext<JoinPayload>();

  const [middleInputRef, handleMiddleKeyUp] = useAutoFocus(MAX_INPUT_LENGTH);
  const [lastInputRef, handleLastKeyUp] = useAutoFocus(MAX_INPUT_LENGTH);

  const [first, setFirst] = useState('');
  const [middle, handleMiddle] = useInput('');
  const [last, handleLast] = useInput('');

  const isValid =
    first &&
    (middle.length === MAX_INPUT_LENGTH ||
      middle.length === MAX_INPUT_LENGTH - 1) &&
    last.length === MAX_INPUT_LENGTH;

  useEffect(() => {
    if (isValid) {
      setValue('phoneNumber', first.concat(middle, last));
      trigger('phoneNumber');
    }
  }, [first, middle, last]);

  return (
    <div>
      <div className='mb-12'>
        <Typography className='text-2xl font-bold'>
          휴대폰 인증을 진행할게요!
        </Typography>
        <Typography className='text-sm font-medium text-[#ADB5BD]'>
          휴대폰 정보를 입력해주세요.
        </Typography>
      </div>

      <InputField>
        <InputField.Label htmlFor='phone'>휴대폰 번호*</InputField.Label>
        <Select
          onValueChange={value => setFirst(value)}
          placeholder='선택'
          items={[
            {value: '010', name: '010'},
            {value: '02', name: '02'},
            {value: '031', name: '031'},
            {value: '032', name: '032'},
          ]}
        />
        <InputField.Input
          ref={middleInputRef}
          id='middle'
          placeholder=''
          type='number'
          maxLength={MAX_INPUT_LENGTH}
          value={middle}
          onChange={handleMiddle}
          onInput={handleMaxLength}
          onKeyUp={e => handleMiddleKeyUp(e, lastInputRef)}
        />
        <InputField.Input
          ref={lastInputRef}
          id='last'
          placeholder=''
          type='number'
          maxLength={MAX_INPUT_LENGTH}
          value={last}
          onChange={handleLast}
          onInput={handleMaxLength}
          onKeyUp={e => handleLastKeyUp(e, null)}
        />
        <InputField.ErrorMessage isError>
          {errors.phoneNumber?.message}
        </InputField.ErrorMessage>
      </InputField>

      <div className='fixed inset-x-0 bottom-0 bg-white p-5'>
        <Button
          onClick={() => onNext(getValues('phoneNumber'))}
          disabled={!isValid || !!errors.phoneNumber}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default PhoneNumber;
