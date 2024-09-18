import {useState} from 'react';
import {Typography, InputField, Select} from '@wraffle/ui';
import CalendarForm from '@wraffle/ui/src/ui/calendar/Calendar';

export const Step1 = () => {
  return (
    <>
      <InputField>
        <InputField.Label htmlFor='example-success'>제목</InputField.Label>
        <InputField.Input id='example-success' placeholder='Enter text here' />
      </InputField>
      <Typography>카테고리*</Typography>
      <Select
        placeholder='카테고리를 선택해주세요'
        items={[
          {
            value: 'light',
            name: 'Light',
          },
          {
            value: 'dark',
            name: 'Dark',
          },
          {
            value: 'system',
            name: 'System',
          },
        ]}
      />
      <InputField>
        <InputField.Label htmlFor='example-success'>
          응모 금액*
        </InputField.Label>
        <InputField.Input id='example-success' placeholder='Enter text here' />
      </InputField>
    </>
  );
};

export const Step2 = () => {
  const [selected, setSelected] = useState<Date | undefined>();
  return (
    <>
      <CalendarForm
        formLabel='응모 시작 일정*'
        className=''
        dateLabel='응모 시작 시간을 입력해주세요.'
        selected={selected}
        setSelected={setSelected}
      />
      <CalendarForm
        formLabel='응모 마감 일정*'
        className=''
        dateLabel='응모 마감 시간을 입력해주세요.'
        selected={selected}
        setSelected={setSelected}
      />
      <CalendarForm
        formLabel='당첨자 발표 일정*'
        className=''
        dateLabel='당첨자 발표 시간을 입력해주세요.'
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
};

export const Step3 = () => {
  return (
    <>
      <div>이미지~~~</div>
    </>
  );
};

export const Step4 = () => {
  return (
    <InputField>
      <InputField.Label htmlFor='example-success'>유의사항*</InputField.Label>
      <InputField.Input
        id='example-success'
        placeholder='유의사항을 작성해주세요'
      />
    </InputField>
  );
};
